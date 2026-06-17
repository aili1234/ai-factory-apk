export default function Payments(){

  return (
    <main style={{padding:30}}>
      <h1>AI PAYMENTS</h1>

      <button
      style={{
        padding:25,
        fontSize:24
      }}
      onClick={()=>alert("Stripe payment test working")}
      >
      Test £9.99 Payment
      </button>
    </main>
  );
}
