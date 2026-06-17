"use client";

import { useState } from "react";

export default function Builder(){

  const [prompt,setPrompt]=useState(
    "Build profitable passport photo app"
  );

  const [html,setHtml]=useState("");

  async function build(){

    const p = prompt.toLowerCase();

    let output = `
      <h1>${prompt}</h1>
      <button onclick="alert('working')">Test Button</button>
    `;

    if(p.includes("passport")){
      output = `
      <h1>Passport Photo Maker</h1>

      <input type="file" accept="image/*" onchange="load(event)">
      <br><br>

      <canvas id="c" width="300" height="380"
      style="border:2px solid black"></canvas>

      <br><br>

      <button onclick="download()">Download Passport Photo</button>

      <script>
      function load(e){
        let img=new Image();
        img.onload=()=>{
          let c=document.getElementById('c');
          let x=c.getContext('2d');
          x.fillStyle='white';
          x.fillRect(0,0,300,380);
          x.drawImage(img,35,20,230,300);
        };
        img.src=URL.createObjectURL(e.target.files[0]);
      }

      function download(){
        let a=document.createElement('a');
        a.download='passport.png';
        a.href=document.getElementById('c').toDataURL();
        a.click();
      }
      </script>
      `;
    }

    if(p.includes("music")){
      output = `
      <h1>Music Player</h1>

      <input type="file" accept="audio/*"
      onchange="play(event)">

      <audio id="a" controls
      style="width:100%;margin-top:20px"></audio>

      <script>
      function play(e){
        document.getElementById('a').src=
        URL.createObjectURL(e.target.files[0]);
      }
      </script>
      `;
    }

    if(p.includes("course") || p.includes("english")){
      output = `
      <h1>English Learning App</h1>

      <h2>Question:</h2>
      <p>Choose correct sentence:</p>

      <button onclick="ok()">I am learning English</button>
      <button onclick="bad()">I learning English am</button>

      <div id="out"></div>

      <script>
      function ok(){
        document.getElementById('out').innerHTML='Correct ✅';
      }
      function bad(){
        document.getElementById('out').innerHTML='Wrong ❌';
      }
      </script>
      `;
    }

    setHtml(`
    <html>
    <body style="font-family:Arial;padding:20px">
    ${output}

    <hr>

    <button onclick="alert('Payment working')">
    Test Payment
    </button>

    <button onclick="alert('Refund request working')">
    Test Refund
    </button>

    <button onclick="alert('Chatbot working')">
    Test Chatbot
    </button>

    </body>
    </html>
    `);
  }

  return (
    <main style={{padding:30}}>
      <h1>AI APP BUILDER</h1>

      <textarea
        value={prompt}
        onChange={e=>setPrompt(e.target.value)}
        style={{
          width:"100%",
          height:120,
          fontSize:18,
          padding:15
        }}
      />

      <br /><br />

      <button
        onClick={build}
        style={{
          padding:16,
          fontSize:20
        }}
      >
        Build Functional App
      </button>

      <br /><br />

      {html && (
        <iframe
          srcDoc={html}
          style={{
            width:"100%",
            height:800,
            border:"3px solid black",
            borderRadius:20
          }}
        />
      )}
    </main>
  );
}
