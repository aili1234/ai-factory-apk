import { createClient } from "@supabase/supabase-js";

const SYSTEM = `
You are AI Factory Super Builder.
Create complete practical outputs for:
- web app maker
- mobile app maker
- website maker like Wix AI
- app description maker
- SEO AI
- chatbot AI
- refund/customer support AI
- intelligence layer that improves all outputs
Return structured sections with build plan, pages, features, UI, database, SEO, chatbot, payment/refund logic.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mode = body.mode || "all";
    const prompt = body.prompt || "Build business app";

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: `MODE: ${mode}\nREQUEST: ${prompt}` }
        ],
        temperature: 0.7
      })
    });

    const data = await aiRes.json();
    const result = data?.choices?.[0]?.message?.content || "No AI result";

    const supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    await supabase.from("generations").insert({
      prompt: `[${mode}] ${prompt}`,
      result
    });

    return Response.json({ ok: true, mode, saved: true, result });
  } catch (err:any) {
    return Response.json({ ok:false, error:err.message }, { status:500 });
  }
}
