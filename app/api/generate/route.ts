import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Create app idea";

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are an expert app builder. Return practical app idea, features, monetisation, and build plan." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const aiJson = await aiRes.json();
    const result =
      aiJson?.choices?.[0]?.message?.content ||
      "AI provider did not return text.";

    const supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    const { error } = await supabase.from("generations").insert({
      prompt,
      result
    });

    if (error) throw error;

    return Response.json({ ok: true, saved: true, prompt, result });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
