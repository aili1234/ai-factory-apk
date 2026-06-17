"use client";

import Link from "next/link";

export default function Home() {
  const cards = [
    ["AI App Builder","/app-builder"],
    ["AI Website Builder","/website-builder"],
    ["AI Web App Builder","/webapp-builder"],
    ["AI SEO Engine","/seo-engine"],
    ["AI Testing Lab","/testing-lab"],
    ["AI Chatbot","/chatbot"],
    ["AI Payments","/payments"]
  ];

  return (
    <main style={{padding:30,background:"#eef2f7",minHeight:"100vh"}}>
      <h1>AI FACTORY ULTIMATE</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
        gap:20,
        marginTop:30
      }}>
        {cards.map((c,i)=>(
          <Link key={i} href={c[1]}
            style={{
              background:"white",
              padding:25,
              borderRadius:18,
              textDecoration:"none",
              color:"#111",
              boxShadow:"0 8px 20px rgba(0,0,0,0.1)"
            }}>
            <h2>{c[0]}</h2>
            <p>Open module</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
