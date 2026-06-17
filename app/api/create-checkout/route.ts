import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "gbp",
          product_data: { name: body.name || "AI App Test Product" },
          unit_amount: body.amount || 999
        },
        quantity: 1
      }],
      success_url: "https://ai-factory-apk.vercel.app/success",
      cancel_url: "https://ai-factory-apk.vercel.app/cancel"
    });

    return Response.json({ ok: true, url: session.url });
  } catch (err:any) {
    return Response.json({ ok:false, error:err.message }, { status:500 });
  }
}
