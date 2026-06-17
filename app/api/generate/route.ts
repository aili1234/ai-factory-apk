export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return Response.json({
    ok: true,
    job: "generate",
    idea: body.idea || "AI Factory App",
    result: "AI generation endpoint is connected"
  });
}
