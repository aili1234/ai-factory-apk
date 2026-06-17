import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = body.prompt || "Build app";

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const result =
      completion.choices?.[0]?.message?.content || "No output";

    await supabase.from("generations").insert({
      prompt,
      result,
      created_at: new Date().toISOString()
    });

    return NextResponse.json({
      ok: true,
      prompt,
      result
    });

  } catch (err:any) {
    return NextResponse.json({
      ok:false,
      error: err.message
    });
  }
}
