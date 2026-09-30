import { NextRequest, NextResponse } from "next/server";
import { findStaticAnswer } from "./staticResponses";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { history, message } = body;

    // 1. Try static answer first (instant, no API call)
    // DILUMPUHKAN SEMENTARA UNTUK TESTING AI
    /*
    const staticAnswer = findStaticAnswer(message);
    if (staticAnswer) {
      const intros = [
        "Tentu, saya bantu jelaskan. ",
        "Menarik pertanyaannya! ",
        "Biar saya jelaskan secara singkat. ",
        "Oke, begini penjelasannya: ",
        "Tentu! "
      ];
      const randomIntro = intros[Math.floor(Math.random() * intros.length)];
      return NextResponse.json({ reply: randomIntro + staticAnswer, source: "static" });
    }
    */

    // 2. Fallback to AI for questions not in static DB
    const apiKey = process.env.XKIRO_API_KEY;
    const baseUrl = process.env.XKIRO_BASE_URL || "https://api.xkiro.com/v1";
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key is missing" },
        { status: 500 },
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseUrl,
      maxRetries: 0, // Jangan retry otomatis jika API ngelag
      timeout: 60000, // Naikkan ke 60 detik karena API Xkiro gratisan bisa sangat lambat
    });

    const model = process.env.AI_MODEL || "gpt-4o-mini";

    // Tambahkan timestamp acak agar Xkiro tidak mendeteksi request sebagai duplikat (menghindari error 409)
    const salt = Date.now();
    const systemInstruction = `Kamu adalah Seraya, asisten AI spesialis ekonomi dan bisnis Indonesia. Jawab 1-2 kalimat secara ramah. [ID:${salt}]`;

    // Keep only last 2 turns for minimal context
    const recentHistory = (history || []).slice(-2);
    
    // Map to OpenAI format
    const messages: any[] = [
      { role: "system", content: systemInstruction },
      ...recentHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role === "model" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    try {
      const response = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.2,
      });

      const reply = response.choices[0]?.message?.content || "Maaf, saya tidak dapat memproses permintaan Anda.";
      return NextResponse.json({ reply, source: "ai" });
    } catch (apiError: any) {
      console.error("XKIRO API Error:", apiError);
      return NextResponse.json({
        reply:
          "Pertanyaan Anda menarik! Saat ini saya tidak dapat menjawab secara detail karena server AI sedang sibuk. Coba tanyakan topik seperti inflasi, saham, reksa dana, pajak, UMKM, atau topik ekonomi lainnya — saya punya banyak jawaban siap! 😊",
        source: "fallback",
      });
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal merespons. Coba lagi." },
      { status: 500 },
    );
  }
}
