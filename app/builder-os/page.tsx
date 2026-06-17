"use client";

import {useState} from "react";

export default function BuilderOS(){
  const [prompt,setPrompt]=useState("");
  const [data,setData]=useState<any>(null);
  const [loading,setLoading]=useState(false);

  async function run(){
    setLoading(true);
    const r=await fetch("/api/builder-os",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    const j=await r.json();
    setData(j.output);
    setLoading(false);
  }

  return <main style={{fontFamily:"Arial",padding:25,maxWidth:1200,margin:"auto"}}>
    <h1>AI Builder OS</h1>
    <p>Web app builder + APK builder + Wix-style website + SEO + chatbot + email + refunds + testing.</p>

    <textarea
      value={prompt}
      onChange={e=>setPrompt(e.target.value)}
      placeholder="Example: Build me an AI ecommerce app with website, APK, SEO, chatbot, email support, refunds and testing."
      style={{width:"100%",height:150,fontSize:16,padding:15}}
    />

    <button onClick={run} disabled={loading} style={{marginTop:15,padding:15,fontSize:18}}>
      {loading ? "Building..." : "Build Everything"}
    </button>

    {data && <section style={{marginTop:30}}>
      <h2>{data.name}</h2>
      <p>{data.description}</p>

      <h2>Visual Website Preview</h2>
      <iframe srcDoc={data.websiteHtml || "<h1>No HTML returned</h1>"} style={{width:"100%",height:500,border:"2px solid black"}} />

      <h2>AI Intelligence Layer</h2>
      <pre>{data.intelligenceLayer}</pre>

      <h2>Web App Builder Output</h2>
      <pre>{data.webAppSpec}</pre>

      <h2>APK / Mobile App Builder Output</h2>
      <pre>{data.apkSpec}</pre>

      <h2>SEO AI Overlay</h2>
      <pre>{data.seoPack}</pre>

      <h2>Chatbot AI</h2>
      <pre>{data.chatbotFlow}</pre>

      <h2>Email AI</h2>
      <pre>{data.emailFlow}</pre>

      <h2>Refund / Customer Service AI</h2>
      <pre>{data.refundFlow}</pre>

      <h2>Testing AI Report</h2>
      <pre>{data.testingReport}</pre>

      <h2>Next Steps</h2>
      <pre>{JSON.stringify(data.nextSteps,null,2)}</pre>
    </section>}
  </main>
}
