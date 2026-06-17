"use client";
import {useState} from "react";

export default function ProAppBuilder(){
  const [prompt,setPrompt]=useState("Build cleaning booking app with payment, chatbot and refunds");
  const [data,setData]=useState<any>(null);

  async function build(){
    const r=await fetch("/api/pro-app-builder",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    setData(await r.json());
  }

  return <main style={{fontFamily:"Arial",padding:20}}>
    <h1>Pro Functional App Builder</h1>
    <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
      style={{width:"100%",height:120,fontSize:18,padding:12}} />
    <button onClick={build} style={{padding:15,fontSize:18,marginTop:10}}>
      Build Real Functional App
    </button>

    {data && <>
      <h2>Try Generated App</h2>
      <iframe srcDoc={data.html} style={{width:"100%",height:700,border:"3px solid black"}} />
      <h2>Testing Report</h2>
      <pre>{JSON.stringify(data.testReport,null,2)}</pre>
    </>}
  </main>
}
