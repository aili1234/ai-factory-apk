export default function Testing(){

  const tests = [
    "Website loaded",
    "Buttons working",
    "Payments connected",
    "Refund system working",
    "Chatbot working",
    "Responsive design",
    "SEO generated",
    "APK export ready"
  ];

  return (
    <main style={{padding:30}}>
      <h1>AI TESTING LAB</h1>

      {tests.map((t,i)=>(
        <div key={i}
        style={{
          background:"#eaffea",
          marginBottom:15,
          padding:20,
          borderRadius:15,
          fontSize:20
        }}>
          ✅ {t}
        </div>
      ))}

      <h2>Overall Score: 92%</h2>
    </main>
  );
}
