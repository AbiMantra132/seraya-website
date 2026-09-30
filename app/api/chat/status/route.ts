import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey = process.env.XKIRO_API_KEY;

  // Static responses always available — service is always "online"
  // AI is checked separately as a bonus status
  if (!apiKey) {
    return NextResponse.json({
      status: "online",
      mode: "static-only",
      detail: "AI unavailable (no API key), static responses active",
    });
  }

  // Try AI ping with short timeout — non-blocking to status
  try {
    const baseUrl = process.env.XKIRO_BASE_URL || "https://api.xkiro.com/v1";
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseUrl,
      timeout: 5000,
    });

    try {
      await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: "ping" }],
        max_tokens: 1,
      });
      return NextResponse.json({ status: "online", mode: "static+ai" });
    } catch (apiError: any) {
      const quota = apiError?.status === 429;
      // Quota exhausted = AI temporarily unavailable, but static still works
      return NextResponse.json({
        status: "online",
        mode: quota ? "static+ai-quota" : "static-only",
        detail: quota ? "AI quota limit reached, using static responses" : `AI error ${apiError?.status}`,
      });
    }
  } catch {
    return NextResponse.json({
      status: "online",
      mode: "static-only",
      detail: "AI unreachable, static responses active",
    });
  }
}
