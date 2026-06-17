"use client";
import {useState} from "react";

export default function BuildVisual(){
  const [prompt,setPrompt]=useState("Build me profitable app");
  const [data,setData]=useState<any>(null);
  const [loading,setLoading]=useState(false);

  async function build(){
    setLoading(true);
    const r=await fetch("/api/build-visual",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    const j=await r.json();
    setData(j.output);
    setLoading(false);
  }

  return <main style={{fontFamily:"Arial",padding:20}}>
    <h1>AI Visual Builder</h1>

    <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
      style={{width:"100%",height:120,fontSize:18,padding:12}} />

    <button onClick={build} style={{padding:15,fontSize:18,marginTop:12}}>
      {loading ? "Building..." : "Build Visual Website + Web App + APK Preview"}
    </button>

    {data && <>
      <h2>Wix-style Website Visual</h2>
      <iframe srcDoc={data.websiteHtml} style={{width:"100%",height:430,border:"3px solid black"}} />

      <h2>Web App Visual</h2>
      <iframe srcDoc={data.webAppHtml} style={{width:"100%",height:430,border:"3px solid black"}} />

      <h2>APK / Mobile App Visual Preview</h2>
      <iframe srcDoc={data.mobilePreviewHtml} style={{width:"100%",height:520,border:"3px solid black"}} />

      <h2>SEO AI</h2>
      <pre>{JSON.stringify(data.seo,null,2)}</pre>

      <h2>Chatbot / Refund AI</h2>
      <pre>{JSON.stringify(data.chatbot,null,2)}</pre>

      <h2>Testing AI</h2>
      <pre>{JSON.stringify(data.testing,null,2)}</pre>
    </>}
  </main>
}
