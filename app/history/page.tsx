async function getData() {
  const res = await fetch(
    "https://eytakmfqhpcpkfxmdmdh.supabase.co/rest/v1/generations?select=*",
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        Authorization:
          `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}`
      },
      cache: "no-store"
    }
  );

  return res.json();
}

export default async function HistoryPage() {
  const data = await getData();

  return (
    <main style={{
      padding:30,
      fontFamily:"Arial"
    }}>
      <h1>Generation History</h1>

      {data?.map((item:any)=>(
        <div
          key={item.id}
          style={{
            border:"1px solid #ccc",
            padding:20,
            marginBottom:20,
            borderRadius:10
          }}
        >
          <h3>{item.prompt}</h3>

          <pre style={{
            whiteSpace:"pre-wrap",
            background:"#111",
            color:"#0f0",
            padding:15,
            borderRadius:10
          }}>
            {item.result}
          </pre>

          <small>
            {item.created_at}
          </small>
        </div>
      ))}
    </main>
  );
}
