import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "";

    const result = "AI generation endpoint is connected and saved";

    const supabase = createClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || ""
    );

    const { error } = await supabase.from("generations").insert({
      prompt,
      result
    });

    if (error) throw error;

    return NextResponse.json({ ok: true, saved: true, prompt, result });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
