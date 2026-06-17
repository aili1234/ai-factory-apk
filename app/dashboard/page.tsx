"use client";

import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function generate() {
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      setResult(data.result || JSON.stringify(data, null, 2));
    } catch (err:any) {
      setResult(err.message);
    }

    setLoading(false);
  }

  return (
    <main style={{
      padding: 30,
      fontFamily: "Arial",
      maxWidth: 1000,
      margin: "0 auto"
    }}>
      <h1>AI Factory Dashboard</h1>

      <textarea
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Describe app idea..."
        style={{
          width:"100%",
          minHeight:140,
          padding:15,
          fontSize:16
        }}
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          marginTop:20,
          padding:"12px 20px",
          fontSize:18,
          cursor:"pointer"
        }}
      >
        {loading ? "Generating..." : "Generate App"}
      </button>

      <pre style={{
        whiteSpace:"pre-wrap",
        background:"#111",
        color:"#0f0",
        padding:20,
        marginTop:30,
        borderRadius:10
      }}>
        {result}
      </pre>
    </main>
  );
}
