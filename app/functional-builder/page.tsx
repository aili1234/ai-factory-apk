"use client";
import {useState} from "react";

export default function FunctionalBuilder(){
  const [prompt,setPrompt]=useState("Make passport photo maker app");
  const [data,setData]=useState<any>(null);

  async function build(){
    const r=await fetch("/api/functional-builder",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    setData(await r.json());
  }

  return <main style={{fontFamily:"Arial",padding:20}}>
    <h1>Functional AI App Builder</h1>
    <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
      style={{width:"100%",height:120,fontSize:18,padding:12}} />
    <button onClick={build} style={{padding:15,fontSize:18,marginTop:10}}>
      Build Functional App
    </button>

    {data && <>
      <h2>{data.title}</h2>
      <h3>Live Functional Preview</h3>
      <iframe srcDoc={data.html} style={{width:"100%",height:650,border:"3px solid black"}} />
      <h3>Functions</h3>
      <pre>{JSON.stringify(data.functions,null,2)}</pre>
      <h3>Testing Report</h3>
      <pre>{JSON.stringify(data.testReport,null,2)}</pre>
    </>}
  </main>
}
