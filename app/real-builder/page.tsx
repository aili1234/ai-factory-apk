"use client";

import {useState} from "react";

export default function RealBuilder(){
  const [prompt,setPrompt]=useState("");
  const [data,setData]=useState<any>(null);
  const [loading,setLoading]=useState(false);

  async function build(){
    setLoading(true);
    const r=await fetch("/api/build-real",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    const j=await r.json();
    setData(j.build);
    setLoading(false);
  }

  return <main style={{fontFamily:"Arial",padding:25}}>
    <h1>Real AI App + Website + APK Maker</h1>

    <textarea
      style={{width:"100%",height:140,fontSize:18,padding:12}}
      value={prompt}
      onChange={e=>setPrompt(e.target.value)}
      placeholder="Example: Make money making app useful for people"
    />

    <button onClick={build} style={{fontSize:20,padding:15,marginTop:15}}>
      {loading ? "Building real files..." : "Build Real App"}
    </button>

    {data && <>
      <h2>{data.appName}</h2>

      <h2>Visual Website Preview</h2>
      <iframe
        style={{width:"100%",height:500,border:"2px solid #000"}}
        srcDoc={data.websiteHtml}
      />

      <h2>Description</h2>
      <pre>{data.description}</pre>

      <h2>SEO</h2>
      <p><b>{data.seoTitle}</b></p>
      <p>{data.seoDescription}</p>
      <p>{data.keywords?.join(", ")}</p>

      <h2>React Web App Code</h2>
      <pre style={{whiteSpace:"pre-wrap",background:"#111",color:"#0f0",padding:15}}>
        {data.webAppReact}
      </pre>

      <h2>APK Kotlin Code</h2>
      <pre style={{whiteSpace:"pre-wrap",background:"#111",color:"#0f0",padding:15}}>
        {data.apkMainActivity}
      </pre>
    </>}
  </main>
}
