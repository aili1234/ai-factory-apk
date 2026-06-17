"use client";

import { useState } from "react";

const modes = [
  "all",
  "web_app_maker",
  "mobile_app_maker",
  "description_maker",
  "website_maker",
  "seo_ai",
  "chatbot_ai",
  "refund_support_ai",
  "intelligence_layer"
];

export default function FactoryPage() {
  const [mode,setMode] = useState("all");
  const [prompt,setPrompt] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResult("");

    const res = await fetch("/api/factory", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ mode, prompt })
    });

    const data = await res.json();
    setResult(data.result || JSON.stringify(data,null,2));
    setLoading(false);
  }

  return (
    <main style={{fontFamily:"Arial",padding:30,maxWidth:1000,margin:"auto"}}>
      <h1>AI Factory Super Builder</h1>

      <select value={mode} onChange={e=>setMode(e.target.value)} style={{fontSize:18,padding:10}}>
        {modes.map(m=><option key={m} value={m}>{m}</option>)}
      </select>

      <textarea
        value={prompt}
        onChange={e=>setPrompt(e.target.value)}
        placeholder="Example: Make me AI ecommerce app with website, SEO, chatbot, refunds and subscriptions"
        style={{width:"100%",height:160,marginTop:20,fontSize:16,padding:15}}
      />

      <button onClick={run} disabled={loading} style={{marginTop:20,padding:15,fontSize:18}}>
        {loading ? "Building..." : "Build With AI"}
      </button>

      <pre style={{whiteSpace:"pre-wrap",background:"#111",color:"#0f0",padding:20,marginTop:30,borderRadius:10}}>
        {result}
      </pre>
    </main>
  );
}
