import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { level, goal } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const prompt = `Buatkan 1 pertanyaan kuis pilihan ganda yang sangat relevan tentang ekonomi atau keuangan untuk pengguna dengan tingkat pengetahuan finansial "${level}" dan tujuan keuangan "${goal}".
    
Berikan respons HANYA berupa JSON murni (tanpa tag markdown \`\`\`json) dengan format berikut:
{
  "question": "teks pertanyaan?",
  "options": ["opsi 1", "opsi 2", "opsi 3", "opsi 4"],
  "correctIndex": 0, // index dari jawaban benar (0-3)
  "analysis": "Penjelasan AI maksimal 2 kalimat mengenai jawaban benar"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting if Gemini still included it
    let jsonString = responseText.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.slice(7, -3).trim();
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.slice(3, -3).trim();
    }

    const quizData = JSON.parse(jsonString);

    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json({ error: "Gagal men-generate kuis." }, { status: 500 });
  }
}
