"use client";

import { useState } from "react";

export default function WebsiteBuilder(){

  const [html,setHtml]=useState("");

  function build(){

    setHtml(`
    <html>
    <body style="margin:0;font-family:Arial">

    <section style="
      padding:60px;
      background:linear-gradient(135deg,#111,#333);
      color:white;
      text-align:center;
    ">
      <h1>AI Website Builder</h1>
      <p>Wix-style generated website</p>
      <button style="
        padding:16px 28px;
        border-radius:12px;
        border:none;
      ">
      Start Now
      </button>
    </section>

    <section style="padding:40px">
      <h2>Services</h2>

      <div style="
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:20px;
      ">
        <div style="padding:20px;background:#eee;border-radius:15px">
          AI SEO
        </div>

        <div style="padding:20px;background:#eee;border-radius:15px">
          AI Chatbot
        </div>

        <div style="padding:20px;background:#eee;border-radius:15px">
          AI Payments
        </div>
      </div>
    </section>

    </body>
    </html>
    `);
  }

  return (
    <main style={{padding:30}}>
      <h1>AI WEBSITE BUILDER</h1>

      <button
        onClick={build}
        style={{padding:20,fontSize:22}}
      >
        Generate Website
      </button>

      <br /><br />

      {html && (
        <iframe
          srcDoc={html}
          style={{
            width:"100%",
            height:900,
            border:"3px solid black"
          }}
        />
      )}
    </main>
  );
}
