"use client";

export default function SEO(){

  const seo = {
    title:"AI Factory Ultimate",
    description:"AI generated websites, webapps and APK apps.",
    keywords:[
      "AI app builder",
      "AI website builder",
      "AI SEO",
      "APK generator",
      "web app maker"
    ],
    score:96,
    competitors:[
      "Yoast",
      "RankMath",
      "Semrush",
      "Ahrefs"
    ]
  };

  return (
    <main style={{padding:30}}>
      <h1>AI SEO ENGINE</h1>

      <pre style={{
        background:"#111",
        color:"#0f0",
        padding:20,
        borderRadius:20,
        fontSize:18
      }}>
      {JSON.stringify(seo,null,2)}
      </pre>
    </main>
  );
}
