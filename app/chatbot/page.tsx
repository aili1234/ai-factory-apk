"use client";

import { useState } from "react";

export default function Chatbot(){

  const [q,setQ]=useState("");
  const [a,setA]=useState("");

  function ask(){
    setA("AI reply: " + q);
  }

  return (
    <main style={{padding:30}}>
      <h1>AI CHATBOT</h1>

      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Ask question"
        style={{
          width:"100%",
          padding:20,
          fontSize:20
        }}
      />

      <br /><br />

      <button
        onClick={ask}
        style={{
          padding:20,
          fontSize:20
        }}
      >
        Ask AI
      </button>

      <br /><br />

      <div style={{
        background:"#111",
        color:"#0f0",
        padding:20,
        borderRadius:20
      }}>
        {a}
      </div>
    </main>
  );
}
