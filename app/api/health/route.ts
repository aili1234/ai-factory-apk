export async function GET() {
  return Response.json({
    ok: true,
    app: "AI Factory",
    status: "production backend online",
    time: new Date().toISOString()
  });
}
