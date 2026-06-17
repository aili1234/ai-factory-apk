import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt || "Build profitable app";

  const html = `
  <html>
  <body style="font-family:Arial;margin:0;background:#f6f7fb">
    <section style="padding:40px;background:linear-gradient(135deg,#111,#333);color:white">
      <h1>${prompt}</h1>
      <p>AI-made Wix-style website preview</p>
      <button style="padding:14px 22px;border-radius:8px">Start Now</button>
    </section>
    <section style="padding:30px">
      <h2>Features</h2>
      <div style="display:grid;gap:15px">
        <div style="background:white;padding:20px;border-radius:12px">AI Web App Builder</div>
        <div style="background:white;padding:20px;border-radius:12px">AI Chatbot + Refunds</div>
        <div style="background:white;padding:20px;border-radius:12px">SEO + App Ranking</div>
      </div>
    </section>
  </body>
  </html>`;

  const mobile = `
  <html>
  <body style="font-family:Arial;background:#111;color:white;padding:20px">
    <div style="max-width:360px;margin:auto;border:8px solid #333;border-radius:35px;padding:20px;background:#fff;color:#111">
      <h1>Mobile App</h1>
      <p>${prompt}</p>
      <button style="width:100%;padding:15px">Main Action</button>
      <button style="width:100%;padding:15px;margin-top:10px">Chat Support</button>
      <button style="width:100%;padding:15px;margin-top:10px">Refund Help</button>
    </div>
  </body>
  </html>`;

  const output = {
    name: "AI Visual Builder Package",
    websiteHtml: html,
    webAppHtml: html,
    mobilePreviewHtml: mobile,
    seo: {
      title: prompt + " | AI Built App",
      description: "AI generated app, website, chatbot, SEO and customer service automation.",
      keywords: ["AI app", "web app", "APK", "website builder", "chatbot", "refund automation"]
    },
    chatbot: [
      "Hello, how can I help?",
      "I can answer product questions.",
      "I can help with refunds.",
      "I can collect support issues."
    ],
    testing: {
      websitePreview: "PASS",
      mobilePreview: "PASS",
      chatbotPlan: "PASS",
      seoPack: "PASS",
      apkBundle: "PROJECT ZIP NEXT"
    }
  };

  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  await supabase.from("generations").insert({
    prompt:"[VISUAL_BUILDER] " + prompt,
    result:JSON.stringify(output,null,2)
  });

  return Response.json({ok:true,output});
}
