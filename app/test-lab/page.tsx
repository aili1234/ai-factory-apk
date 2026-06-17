"use client";
import {useState} from "react";

export default function TestLab(){
  const [prompt,setPrompt]=useState("Generate and test passport photo maker app");
  const [data,setData]=useState<any>(null);

  async function test(){
    const r=await fetch("/api/test-lab",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({prompt})
    });
    setData(await r.json());
  }

  return <main style={{fontFamily:"Arial",padding:20}}>
    <h1>AI Factory Test Lab</h1>
    <textarea value={prompt} onChange={e=>setPrompt(e.target.value)}
      style={{width:"100%",height:120,fontSize:18,padding:12}} />
    <button onClick={test} style={{padding:15,fontSize:18,marginTop:10}}>
      Run Functionality Test
    </button>

    {data && <>
      <h2>Score: {data.score}% — {data.status}</h2>
      <h3>Tests</h3>
      {data.tests.map((x:any,i:number)=>(
        <p key={i}>✅ {x.test}: {x.result}</p>
      ))}
      <h3>AI Improvements</h3>
      <pre>{JSON.stringify(data.improvements,null,2)}</pre>
    </>}
  </main>
}
