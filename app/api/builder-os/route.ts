import { createClient } from "@supabase/supabase-js";

const SYSTEM = `
You are AI Builder OS.
Build one connected production package.

Must include:
1 AI web app builder output
2 AI APK/mobile app builder output
3 Wix-style website builder output
4 AI description maker
5 Intelligence layer improvements
6 SEO overlay for website + app store ranking
7 Chatbot AI flow
8 Email AI flow
9 Refund/customer service automation
10 Testing AI checklist

Return ONLY valid JSON:
{
 "name":"",
 "description":"",
 "intelligenceLayer":"",
 "websiteHtml":"",
 "webAppSpec":"",
 "apkSpec":"",
 "seoPack":"",
 "chatbotFlow":"",
 "emailFlow":"",
 "refundFlow":"",
 "testingReport":"",
 "nextSteps":[]
}
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "Build AI business app";

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method:"POST",
      headers:{
        Authorization:`Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"llama-3.1-8b-instant",
        messages:[
          {role:"system",content:SYSTEM},
          {role:"user",content:prompt}
        ],
        temperature:0.5
      })
    });

    const aiJson = await aiRes.json();
    let text = aiJson?.choices?.[0]?.message?.content || "{}";
    text = text.replace(/```json/g,"").replace(/```/g,"").trim();

    let output:any;
    try { output = JSON.parse(text); }
    catch { output = { name:"AI Builder Output", description:text }; }

    const supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    await supabase.from("generations").insert({
      prompt:"[BUILDER_OS] " + prompt,
      result:JSON.stringify(output,null,2)
    });

    return Response.json({ ok:true, saved:true, output });
  } catch(err:any) {
    return Response.json({ ok:false,error:err.message }, {status:500});
  }
}
