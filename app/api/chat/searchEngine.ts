/**
 * searchEngine.ts
 * Information Retrieval engine using BM25 ranking algorithm.
 * Applied to static FAQ entries for the Seraya chatbot.
 *
 * Pipeline:
 *  1. Tokenize & normalize (lowercase, strip punctuation)
 *  2. Remove Indonesian stopwords
 *  3. Expand synonyms (alias map)
 *  4. Build inverted index with TF per document
 *  5. Score queries with BM25 (k1=1.5, b=0.75)
 *  6. Return best match above threshold
 */

// ─── Indonesian stopwords ─────────────────────────────────────────────────────
const STOPWORDS = new Set([
  "yang", "dan", "di", "ke", "dari", "dengan", "untuk", "pada", "adalah",
  "ini", "itu", "atau", "juga", "dalam", "tidak", "ada", "akan", "bisa",
  "oleh", "lebih", "sudah", "saya", "anda", "kamu", "kita", "mereka",
  "kalau", "jika", "maka", "karena", "sehingga", "namun",
  "tetapi", "tapi", "sedangkan", "setelah", "sebelum", "antara", "tentang",
  "bagi", "atas", "bawah", "lain", "nya", "pun", "lah", "kah", "pula",
  "mau", "perlu", "harus", "dapat", "agar", "supaya", "seperti", "yaitu",
  "yakni", "misalnya", "contoh", "antara", "sampai", "hingga", "serta",
  "maupun", "baik", "hal", "cara", "setiap", "semua", "seluruh",
]);

// ─── Synonym / alias map ──────────────────────────────────────────────────────
// token → canonical term(s) to add alongside
const SYNONYMS: Record<string, string[]> = {
  "bunga":        ["suku bunga", "interest rate"],
  "beli":         ["beli saham", "investasi"],
  "nabung":       ["tabungan", "deposito"],
  "untung":       ["laba", "profit", "keuntungan"],
  "rugi":         ["kerugian", "loss"],
  "uang":         ["modal", "dana"],
  "duit":         ["uang", "modal"],
  "harga":        ["nilai", "price"],
  "naik":         ["kenaikan", "inflasi"],
  "turun":        ["penurunan", "deflasi"],
  "kerja":        ["lapangan kerja", "pengangguran"],
  "negara":       ["pemerintah", "indonesia"],
  "modal":        ["investasi", "capital"],
  "bank":         ["perbankan", "bi", "bank indonesia"],
  "pasar":        ["market", "bursa"],
  "ekspor":       ["perdagangan", "neraca"],
  "impor":        ["perdagangan", "neraca"],
  "ekonomi":      ["ilmu ekonomi", "perekonomian"],
  "pengertian":   ["definisi", "apa itu", "adalah"],
  "definisi":     ["pengertian", "apa itu", "adalah"],
  "jelaskan":     ["apa itu", "pengertian", "definisi"],
  "maksud":       ["pengertian", "definisi"],
  "penjelasan":   ["pengertian", "definisi", "apa itu"],
};

// ─── BM25 parameters ─────────────────────────────────────────────────────────
const K1 = 1.5;   // term frequency saturation
const B  = 0.75;  // length normalization factor
const SCORE_THRESHOLD = 0.5; // minimum score to consider a match

// ─── Types ────────────────────────────────────────────────────────────────────
interface Document {
  id: number;
  /** combined text used for indexing: keywords + answer */
  text: string;
  /** original answer to return */
  answer: string;
  /** token frequencies in this document */
  tf: Map<string, number>;
  /** total token count */
  length: number;
}

interface InvertedIndex {
  /** token → set of doc IDs that contain it */
  postings: Map<string, Set<number>>;
  docs: Document[];
  avgDocLength: number;
  /** total number of documents */
  N: number;
}

// ─── Tokenizer ────────────────────────────────────────────────────────────────
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")   // strip punctuation
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function expandWithSynonyms(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const t of tokens) {
    if (SYNONYMS[t]) {
      for (const syn of SYNONYMS[t]) {
        // also tokenize multi-word synonyms
        for (const s of tokenize(syn)) expanded.add(s);
      }
    }
  }
  return [...expanded];
}

// ─── Index builder ────────────────────────────────────────────────────────────
export function buildIndex(
  entries: Array<{ keywords: string[]; answer: string }>,
): InvertedIndex {
  const postings = new Map<string, Set<number>>();
  const docs: Document[] = [];
  let totalLength = 0;

  for (let id = 0; id < entries.length; id++) {
    const entry = entries[id];
    // Index ONLY keywords — not answer text — to avoid false positives
    // (answer text often contains words from other topics)
    const rawText = entry.keywords.join(" ");
    const tokens = expandWithSynonyms(tokenize(rawText));

    const tf = new Map<string, number>();
    for (const t of tokens) {
      tf.set(t, (tf.get(t) ?? 0) + 1);
    }

    totalLength += tokens.length || 1;

    docs.push({ id, text: rawText, answer: entry.answer, tf, length: tokens.length || 1 });

    for (const t of tf.keys()) {
      if (!postings.has(t)) postings.set(t, new Set());
      postings.get(t)!.add(id);
    }
  }

  return {
    postings,
    docs,
    avgDocLength: totalLength / (docs.length || 1),
    N: docs.length,
  };
}

// ─── BM25 scorer ─────────────────────────────────────────────────────────────
function idf(df: number, N: number): number {
  // Robertson-Sparck Jones IDF (smoothed)
  return Math.log((N - df + 0.5) / (df + 0.5) + 1);
}

function bm25Score(
  query: string[],
  doc: Document,
  index: InvertedIndex,
): number {
  let score = 0;
  const { N, avgDocLength, postings } = index;

  for (const term of query) {
    const df = postings.get(term)?.size ?? 0;
    if (df === 0) continue;

    const tf_d = doc.tf.get(term) ?? 0;
    if (tf_d === 0) continue;

    const idfScore = idf(df, N);
    const tfNorm =
      (tf_d * (K1 + 1)) /
      (tf_d + K1 * (1 - B + B * (doc.length / avgDocLength)));

    score += idfScore * tfNorm;
  }

  return score;
}

// ─── Public search function ───────────────────────────────────────────────────
export interface SearchResult {
  answer: string;
  score: number;
  matched: boolean;
}

export function search(
  query: string,
  index: InvertedIndex,
): SearchResult | null {
  const rawTokens = tokenize(query);
  if (rawTokens.length === 0) return null;

  const queryTokens = expandWithSynonyms(rawTokens);

  // Candidate documents: union of postings for all query terms
  const candidates = new Set<number>();
  for (const t of queryTokens) {
    const posting = index.postings.get(t);
    if (posting) posting.forEach((id) => candidates.add(id));
  }

  if (candidates.size === 0) return null;

  // Score each candidate
  let best: { doc: Document; score: number } | null = null;
  for (const id of candidates) {
    const doc = index.docs[id];
    const score = bm25Score(queryTokens, doc, index);
    if (!best || score > best.score) {
      best = { doc, score };
    }
  }

  if (!best || best.score < SCORE_THRESHOLD) return null;

  return { answer: best.doc.answer, score: best.score, matched: true };
}
