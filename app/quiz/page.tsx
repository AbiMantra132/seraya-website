"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type QuizState = "intro" | "countdown" | "quiz" | "result";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

type CategoryData = {
  name: string;
  questions: Question[];
};

const QUIZ_DATA: Record<string, CategoryData> = {
  investasi: {
    name: "Investasi",
    questions: [
      {
        question: "Apa tujuan utama dari diversifikasi portofolio investasi?",
        options: [
          "Memaksimalkan keuntungan",
          "Mengurangi risiko",
          "Menghindari pajak",
          "Mendapatkan dividen tinggi",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Manakah instrumen investasi yang memiliki risiko paling rendah?",
        options: [
          "Saham",
          "Obligasi Pemerintah",
          "Cryptocurrency",
          "Reksa Dana Saham",
        ],
        correctIndex: 1,
      },
      {
        question: "Apa yang dimaksud dengan Capital Gain?",
        options: [
          "Bunga dari deposito",
          "Keuntungan dari selisih harga jual dan harga beli aset",
          "Pembagian laba perusahaan kepada pemegang saham",
          "Biaya transaksi saham",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Apa istilah untuk pasar saham yang sedang mengalami tren penurunan berkelanjutan?",
        options: ["Bull Market", "Bear Market", "Stagflation", "Correction"],
        correctIndex: 1,
      },
      {
        question:
          "Siapa pihak yang mengatur dan mengawasi kegiatan pasar modal di Indonesia?",
        options: [
          "Bappebti",
          "Bank Indonesia",
          "Otoritas Jasa Keuangan (OJK)",
          "Kementerian Keuangan",
        ],
        correctIndex: 2,
      },
      {
        question: "Apa itu Dividen?",
        options: [
          "Hutang perusahaan",
          "Keuntungan modal dari penjualan saham",
          "Pembagian sebagian laba perusahaan kepada pemegang saham",
          "Bunga obligasi",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Reksa dana yang dananya dialokasikan ke instrumen deposito dan obligasi jatuh tempo di bawah 1 tahun disebut?",
        options: [
          "Reksa Dana Pasar Uang",
          "Reksa Dana Pendapatan Tetap",
          "Reksa Dana Campuran",
          "Reksa Dana Saham",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Apa yang dimaksud dengan 'Buy and Hold' dalam strategi investasi?",
        options: [
          "Membeli saham dan menjualnya di hari yang sama",
          "Membeli saham saat harga turun tajam",
          "Membeli aset investasi dan menyimpannya dalam jangka waktu yang lama",
          "Menjual seluruh aset sebelum pasar tutup",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Kondisi di mana nilai uang menurun seiring waktu yang membuat harga barang naik disebut?",
        options: ["Deflasi", "Apresiasi", "Depresiasi", "Inflasi"],
        correctIndex: 3,
      },
      {
        question: "Apa itu IPO (Initial Public Offering)?",
        options: [
          "Pemisahan jumlah lembar saham",
          "Penawaran saham perdana sebuah perusahaan ke publik",
          "Pembelian kembali saham oleh perusahaan",
          "Penggabungan dua perusahaan besar",
        ],
        correctIndex: 1,
      },
    ],
  },
  akuntansi: {
    name: "Akuntansi",
    questions: [
      {
        question: "Persamaan dasar akuntansi yang benar adalah?",
        options: [
          "Aset = Liabilitas - Ekuitas",
          "Aset = Liabilitas + Ekuitas",
          "Liabilitas = Aset + Ekuitas",
          "Ekuitas = Aset + Liabilitas",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Laporan yang menunjukkan posisi keuangan perusahaan pada titik waktu tertentu adalah?",
        options: [
          "Laporan Laba Rugi",
          "Laporan Arus Kas",
          "Neraca (Balance Sheet)",
          "Laporan Perubahan Modal",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Jika sebuah perusahaan membeli peralatan secara tunai, bagaimana pengaruhnya terhadap persamaan dasar akuntansi?",
        options: [
          "Aset (Peralatan) bertambah, Aset (Kas) berkurang",
          "Aset bertambah, Liabilitas bertambah",
          "Aset berkurang, Ekuitas bertambah",
          "Liabilitas berkurang, Kas bertambah",
        ],
        correctIndex: 0,
      },
      {
        question: "Akun mana yang saldo normalnya berada di sebelah Kredit?",
        options: ["Kas", "Piutang Usaha", "Beban Sewa", "Pendapatan Jasa"],
        correctIndex: 3,
      },
      {
        question:
          "Depresiasi atau penyusutan biasanya dicatat dalam jurnal sebagai?",
        options: [
          "Debit: Beban Penyusutan, Kredit: Akumulasi Penyusutan",
          "Debit: Kas, Kredit: Beban Penyusutan",
          "Debit: Akumulasi Penyusutan, Kredit: Beban Penyusutan",
          "Debit: Aset Tetap, Kredit: Akumulasi Penyusutan",
        ],
        correctIndex: 0,
      },
      {
        question: "Apakah yang dimaksud dengan 'Piutang'?",
        options: [
          "Uang yang dipinjam perusahaan dari pihak lain",
          "Hak perusahaan untuk menerima uang dari pelanggan di masa depan",
          "Pembayaran dimuka untuk beban perusahaan",
          "Uang kas yang tersedia di bank",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Laporan yang mengikhtisarkan pendapatan dan beban selama satu periode akuntansi disebut?",
        options: [
          "Neraca Saldo",
          "Laporan Arus Kas",
          "Laporan Laba Rugi",
          "Jurnal Umum",
        ],
        correctIndex: 2,
      },
      {
        question: "Buku besar (General Ledger) digunakan untuk?",
        options: [
          "Mencatat transaksi pertama kali",
          "Mengklasifikasikan dan mengelompokkan akun dari jurnal",
          "Melaporkan pajak perusahaan",
          "Menghitung gaji karyawan",
        ],
        correctIndex: 1,
      },
      {
        question: "Metode persediaan FIFO merupakan singkatan dari?",
        options: [
          "First In, Final Out",
          "Fast In, Fast Out",
          "First In, First Out",
          "First In, Fixed Out",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Jika total aset adalah Rp100.000.000 dan total liabilitas adalah Rp40.000.000, berapakah total ekuitasnya?",
        options: [
          "Rp140.000.000",
          "Rp100.000.000",
          "Rp60.000.000",
          "Rp40.000.000",
        ],
        correctIndex: 2,
      },
    ],
  },
  ekonomi_makro: {
    name: "Ekonomi Makro",
    questions: [
      {
        question: "GDP (Gross Domestic Product) adalah?",
        options: [
          "Total ekspor negara dikurangi impor",
          "Total nilai barang dan jasa yang diproduksi dalam wilayah suatu negara",
          "Total kekayaan pemerintah",
          "Total jumlah uang beredar",
        ],
        correctIndex: 1,
      },
      {
        question: "Kebijakan Moneter dikendalikan oleh lembaga apa?",
        options: [
          "Kementerian Keuangan",
          "DPR",
          "Bank Sentral (Bank Indonesia)",
          "Presiden",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Tindakan bank sentral menaikkan suku bunga biasanya bertujuan untuk?",
        options: [
          "Mendorong konsumsi",
          "Mengendalikan atau menurunkan inflasi",
          "Melemahkan nilai tukar mata uang lokal",
          "Meningkatkan jumlah uang beredar",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Kebijakan pemerintah dalam mengatur penerimaan (pajak) dan pengeluaran negara disebut?",
        options: [
          "Kebijakan Moneter",
          "Kebijakan Perdagangan Luar Negeri",
          "Kebijakan Fiskal",
          "Kebijakan Nilai Tukar",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Apabila harga barang secara umum mengalami penurunan terus-menerus, kondisi ini disebut?",
        options: ["Inflasi", "Stagflasi", "Deflasi", "Resesi"],
        correctIndex: 2,
      },
      {
        question: "Apa yang dimaksud dengan Stagflasi?",
        options: [
          "Pertumbuhan ekonomi tinggi dibarengi inflasi rendah",
          "Stagnasi pertumbuhan ekonomi dibarengi tingkat inflasi yang tinggi",
          "Deflasi yang terus menerus",
          "Peningkatan drastis dalam investasi asing",
        ],
        correctIndex: 1,
      },
      {
        question: "Berikut ini yang BUKAN merupakan fungsi uang adalah?",
        options: [
          "Alat tukar",
          "Satuan hitung",
          "Penyimpan nilai",
          "Barang konsumsi",
        ],
        correctIndex: 3,
      },
      {
        question:
          "Nilai tukar rupiah terhadap dolar AS melemah. Hal ini akan paling menguntungkan bagi?",
        options: [
          "Importir Indonesia",
          "Wisatawan Indonesia di luar negeri",
          "Eksportir Indonesia",
          "Pemerintah yang berutang dalam dolar",
        ],
        correctIndex: 2,
      },
      {
        question: "Apa penyebab utama dari inflasi *Demand-pull*?",
        options: [
          "Kenaikan biaya bahan baku",
          "Kenaikan upah buruh",
          "Permintaan masyarakat terhadap barang/jasa melebihi kapasitas produksi",
          "Penurunan jumlah uang beredar",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Kondisi ekonomi di mana GDP mengalami pertumbuhan negatif selama dua kuartal berturut-turut disebut?",
        options: ["Booming", "Resesi", "Recovery", "Ekspansi"],
        correctIndex: 1,
      },
    ],
  },
  keuangan_pribadi: {
    name: "Keuangan Pribadi",
    questions: [
      {
        question:
          "Berapa persen alokasi ideal untuk tabungan/investasi dalam aturan budgeting 50-30-20?",
        options: ["50%", "30%", "20%", "10%"],
        correctIndex: 2,
      },
      {
        question: "Apa fungsi utama dari Dana Darurat?",
        options: [
          "Membeli barang diskon besar",
          "Berinvestasi di pasar saham",
          "Menutupi pengeluaran tak terduga seperti sakit atau PHK",
          "Membayar cicilan kendaraan bermotor",
        ],
        correctIndex: 2,
      },
      {
        question: "Mana dari berikut ini yang merupakan utang produktif?",
        options: [
          "Kredit Panci",
          "Kredit Modal Kerja untuk Usaha",
          "Cicilan Liburan ke Luar Negeri",
          "Kredit HP flagship terbaru",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Berapa idealnya besaran dana darurat bagi seorang lajang (belum menikah)?",
        options: [
          "1 bulan pengeluaran",
          "3-6 bulan pengeluaran",
          "12 bulan pengeluaran",
          "1 minggu pengeluaran",
        ],
        correctIndex: 1,
      },
      {
        question: "Konsep 'Pay Yourself First' berarti?",
        options: [
          "Membeli barang mewah setiap gajian",
          "Menyisihkan uang untuk tabungan dan investasi sebelum dipakai untuk pengeluaran lain",
          "Membayar semua tagihan utang terlebih dahulu",
          "Menghabiskan gaji untuk perawatan diri",
        ],
        correctIndex: 1,
      },
      {
        question: "Apa keuntungan utama memiliki asuransi kesehatan?",
        options: [
          "Mendapatkan uang bulanan",
          "Menghindari tagihan rumah sakit yang dapat menguras tabungan",
          "Menjadi kaya raya",
          "Syarat untuk bisa berinvestasi",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Istilah untuk bunga yang dihitung dari jumlah pokok ditambah bunga yang telah diakumulasi sebelumnya adalah?",
        options: [
          "Bunga Tunggal (Simple Interest)",
          "Bunga Majemuk (Compound Interest)",
          "Bunga Pinjaman",
          "Suku Bunga Acuan",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Manakah kartu yang penggunanya meminjam uang dari bank untuk transaksi dan harus dibayar di kemudian hari?",
        options: [
          "Kartu Debit",
          "Kartu ATM",
          "Kartu Kredit",
          "Kartu Pra-bayar",
        ],
        correctIndex: 2,
      },
      {
        question:
          "Tindakan mencatat setiap pemasukan dan pengeluaran harian disebut?",
        options: [
          "Investasi",
          "Cashflow tracking (Pencatatan arus kas)",
          "Diversifikasi",
          "Hedging",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Jika Anda memiliki cicilan rumah, cicilan mobil, dan hutang pinjaman online dengan bunga 24% per tahun, utang mana yang paling prioritas untuk dilunasi terlebih dahulu?",
        options: [
          "Cicilan rumah",
          "Cicilan mobil",
          "Pinjaman online berbunga tinggi",
          "Dibayar proporsional sama besar",
        ],
        correctIndex: 2,
      },
    ],
  },
  bisnis: {
    name: "Bisnis",
    questions: [
      {
        question: "Business model Canvas (BMC) memiliki berapa elemen dasar?",
        options: ["5", "7", "9", "12"],
        correctIndex: 2,
      },
      {
        question:
          "Konsep 4P dalam bauran pemasaran (Marketing Mix) terdiri dari?",
        options: [
          "Product, Price, Place, Promotion",
          "People, Process, Physical Evidence, Plan",
          "Product, Profit, Place, Pitch",
          "Price, Promotion, Packaging, Policy",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Keuntungan bersih yang diperoleh perusahaan setelah dikurangi semua biaya operasional, pajak, dan bunga disebut?",
        options: [
          "Gross Profit",
          "Net Profit (Laba Bersih)",
          "Revenue (Pendapatan)",
          "EBITDA",
        ],
        correctIndex: 1,
      },
      {
        question: "Apa arti dari 'B2B' (Business to Business)?",
        options: [
          "Model bisnis di mana perusahaan menjual langsung ke konsumen akhir",
          "Model bisnis di mana perusahaan menjual produk atau jasanya kepada perusahaan lain",
          "Model bisnis dari konsumen untuk konsumen",
          "Model bisnis yang didanai pemerintah",
        ],
        correctIndex: 1,
      },
      {
        question: "Dalam analisis SWOT, 'Threats' berarti?",
        options: [
          "Kekuatan internal perusahaan",
          "Kelemahan internal perusahaan",
          "Peluang yang ada di pasar",
          "Ancaman dari faktor eksternal",
        ],
        correctIndex: 3,
      },
      {
        question:
          "Titik di mana total pendapatan perusahaan sama persis dengan total biayanya, sehingga tidak untung maupun rugi, disebut?",
        options: [
          "Return on Investment (ROI)",
          "Break Even Point (BEP)",
          "Margin of Safety",
          "Cost of Goods Sold (COGS)",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Modal awal yang disuntikkan oleh pendiri atau investor untuk memulai bisnis (biasanya pada tahap paling awal) disebut?",
        options: [
          "Seed funding (Pendanaan awal)",
          "IPO",
          "Working Capital",
          "Series C",
        ],
        correctIndex: 0,
      },
      {
        question:
          "Upaya membedakan produk Anda dengan produk kompetitor di benak konsumen disebut?",
        options: [
          "Segmentasi",
          "Diferensiasi (Differentiation)",
          "Targeting",
          "Diversifikasi",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Istilah untuk rasio yang membandingkan laba bersih perusahaan terhadap total ekuitas pemegang saham adalah?",
        options: [
          "Return on Assets (ROA)",
          "Return on Equity (ROE)",
          "Debt to Equity Ratio (DER)",
          "Current Ratio",
        ],
        correctIndex: 1,
      },
      {
        question:
          "Proses mengidentifikasi kelompok konsumen tertentu yang akan menjadi fokus penjualan produk disebut?",
        options: ["Mass Marketing", "Targeting", "Pricing", "Distribution"],
        correctIndex: 1,
      },
    ],
  },
};

export default function QuizPage() {
  const [step, setStep] = useState<QuizState>("intro");
  const [countdown, setCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(
    null,
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);

  const activeCategory = selectedCategoryKey
    ? QUIZ_DATA[selectedCategoryKey]
    : null;
  const currentQuestion = activeCategory
    ? activeCategory.questions[currentQuestionIndex]
    : null;

  // Start Quiz
  const handleStart = () => {
    if (!selectedCategoryKey) return;
    setStep("countdown");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // Handle Countdown
  useEffect(() => {
    if (step === "countdown") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep("quiz");
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  // Handle Answer Select
  const handleAnswerSelect = (index: number) => {
    if (selectedAns !== null || !currentQuestion) return; // Prevent double clicks

    setSelectedAns(index);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      if (
        activeCategory &&
        currentQuestionIndex < activeCategory.questions.length - 1
      ) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAns(null);
      } else {
        setStep("result");
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full bg-[#111111] text-white overflow-x-hidden flex flex-col relative font-sans">
      {/* STEP 1: INTRO (CATEGORY SELECTION) */}
      {step === "intro" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 animate-in fade-in zoom-in duration-500">
          <Link
            href="/"
            className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-wider text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>

          <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[32px] shadow-2xl">
            <h1 className="text-[28px] md:text-[48px] font-black leading-tight mb-4 text-center tracking-tight">
              Pilih Kategori Kuis
            </h1>
            <p className="text-white/60 text-center mb-10 font-medium text-lg">
              Setiap kategori terdiri dari 10 pertanyaan menantang. Buktikan
              pengetahuanmu!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {Object.entries(QUIZ_DATA).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategoryKey(key)}
                  className={`w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] p-6 rounded-2xl font-bold text-xl transition-all duration-300 border-2 flex items-center justify-center text-center ${
                    selectedCategoryKey === key
                      ? "bg-[#FF7A00] border-[#FF7A00] text-white scale-105 shadow-[0_15px_30px_rgba(255,122,0,0.4)]"
                      : "bg-black/20 border-white/10 text-white/80 hover:border-[#FF7A00]/50 hover:bg-white/5"
                  }`}
                >
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedCategoryKey}
              className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-500 ${
                selectedCategoryKey
                  ? "bg-white text-[#111111] hover:bg-[#FF7A00] hover:text-white hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,122,0,0.4)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Mulai Kuis Sekarang
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: COUNTDOWN */}
      {step === "countdown" && (
        <div className="flex-1 flex items-center justify-center relative z-10">
          <span
            key={countdown}
            className="text-[150px] md:text-[400px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[#FF7A00] animate-in zoom-in spin-in-12 duration-500 ease-out drop-shadow-[0_20px_50px_rgba(255,122,0,0.5)] leading-none"
          >
            {countdown}
          </span>
        </div>
      )}

      {/* STEP 3: QUIZ */}
      {step === "quiz" && activeCategory && currentQuestion && (
        <div className="flex-1 flex flex-col p-4 md:p-8 relative z-10 w-full max-w-[1400px] mx-auto animate-in fade-in duration-500">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <span className="font-bold text-2xl tracking-widest text-[#F5F5F5] uppercase">
              <span className="text-[#FF7A00] mr-2">{activeCategory.name}</span>
            </span>
            <div className="flex items-center gap-6">
              <span className="font-bold text-white text-lg">
                {currentQuestionIndex + 1}/{activeCategory.questions.length}
              </span>
              <button
                onClick={() => setStep("intro")}
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="flex items-center gap-1.5 w-full mb-12">
            {activeCategory.questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  i < currentQuestionIndex
                    ? "bg-green-500"
                    : i === currentQuestionIndex
                      ? "bg-[#FF7A00] shadow-[0_0_10px_rgba(255,122,0,0.8)] scale-y-125"
                      : "bg-white/10"
                }`}
              ></div>
            ))}
          </div>

          {/* Question Text */}
          <h2 className="text-[24px] md:text-[36px] font-bold text-center mt-2 mb-8 md:mb-12 leading-tight max-w-4xl mx-auto px-2">
            {currentQuestion.question}
          </h2>

          {/* Answers Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-0 pt-6 pb-12 relative w-full">
            <style>{`
              @keyframes card-enter {
                0% { opacity: 0; transform: translateY(40px) scale(0.95); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
              }
            `}</style>

            {currentQuestion.options.map((opt: string, i: number) => {
              const delays = ["150ms", "300ms", "450ms", "600ms"];
              const rotations = ["-rotate-2", "", "rotate-2", "-rotate-3"];

              return (
                <div
                  key={i}
                  className="relative opacity-0 w-full"
                  style={{
                    animation: `card-enter 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delays[i]} forwards`,
                  }}
                >
                  <button
                    onClick={() => handleAnswerSelect(i)}
                    disabled={selectedAns !== null}
                    className={`relative flex flex-col items-center justify-center p-4 md:p-6 w-full h-[160px] md:h-[280px] lg:h-[320px] rounded-2xl md:rounded-3xl transition-all duration-300 ${
                      selectedAns === i
                        ? i === currentQuestion.correctIndex
                          ? "bg-[#FF7A00] text-white scale-105 shadow-[0_15px_30px_rgba(255,122,0,0.4)] z-10 -translate-y-2"
                          : "bg-red-500 text-white scale-105 shadow-xl z-10 -translate-y-2"
                        : selectedAns !== null &&
                            i === currentQuestion.correctIndex
                          ? "bg-[#FF7A00]/80 text-white shadow-xl z-10"
                          : selectedAns !== null
                            ? `bg-white/50 text-[#111111]/50 ${rotations[i]}`
                            : `bg-white text-[#111111] ${rotations[i]} hover:scale-105 hover:-translate-y-2 hover:shadow-xl`
                    }`}
                  >
                    <span className="font-bold text-center text-lg md:text-2xl lg:text-3xl line-clamp-4">
                      {opt}
                    </span>
                  </button>

                  {/* Correct Icon */}
                  {selectedAns !== null &&
                    i === currentQuestion.correctIndex && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#FF7A00"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  {/* Wrong Icon */}
                  {selectedAns === i && i !== currentQuestion.correctIndex && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="red"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: RESULT */}
      {step === "result" && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 animate-in fade-in zoom-in slide-in-from-bottom-8 duration-700">
          <div className="max-w-xl w-full flex flex-col gap-6">
            {/* Score Card */}
            <div className="bg-[#1A1A1A] border border-white/10 p-6 md:p-10 rounded-[32px] text-center flex flex-col items-center justify-center shadow-2xl">
              {/* SVG Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${score >= 70 ? "bg-green-500" : score >= 40 ? "bg-[#FF7A00]" : "bg-red-500"}`}
              >
                {score >= 70 ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ) : score >= 40 ? (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                )}
              </div>

              <h2 className="text-3xl font-black mb-2 text-white">
                Kuis Selesai!
              </h2>
              <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-6">
                Skor Akhir Kamu
              </p>
              <div
                className={`text-[80px] md:text-[100px] font-black leading-none mb-4 ${score >= 70 ? "text-green-500" : score >= 40 ? "text-[#FF7A00]" : "text-red-500"}`}
              >
                {score}
              </div>
            </div>

            {/* Result Analysis */}
            <div className="bg-[#1A1A1A] border border-white/10 p-6 md:p-8 rounded-[32px] flex flex-col justify-center shadow-2xl text-center">
              <p className="text-xl text-white font-medium leading-relaxed">
                {score === 100
                  ? "Luar biasa! Pengetahuanmu sangat sempurna. Pertahankan!"
                  : score >= 70
                    ? "Bagus sekali! Kamu memiliki pemahaman yang baik, namun masih ada ruang untuk berkembang."
                    : score >= 40
                      ? "Cukup baik, tapi kamu perlu lebih banyak belajar tentang topik ini."
                      : "Jangan menyerah! Terus belajar dan tingkatkan wawasan finansialmu bersama Seraya."}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
              <button
                onClick={() => setStep("intro")}
                className="w-full sm:w-auto text-center bg-[#FF7A00] text-white py-3 px-8 rounded-full font-bold hover:bg-white hover:text-[#111111] transition-colors shadow-lg"
              >
                Main Kategori Lain
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto text-center bg-transparent border border-white/20 text-white py-3 px-8 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
