import Stripe from "stripe";

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: { name: "AI Factory Test Product" },
        unit_amount: 100
      },
      quantity: 1
    }],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
  return Response.json({ url: session.url });
}
