import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, fund, email, mode } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    if (!fund)
      return NextResponse.json({ error: "Fund required" }, { status: 400 });
    if (!amount || amount < 100)
      return NextResponse.json({ error: "Min 1.00 CAD" }, { status: 400 });
    if (!["payment", "subscription"].includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: 1,
      price_data: {
        currency: "cad",
        product_data: {
          name: `${mode === "subscription" ? "Monthly" : "One-time"} Donation – ${fund.toUpperCase()}`,
        },
        unit_amount: amount,
        ...(mode === "subscription"
          ? { recurring: { interval: "month" } }
          : {}),
      },
    };

    const session = await stripe.checkout.sessions.create({
      mode: mode as "payment" | "subscription",
      line_items: [lineItem],
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donation/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donation/cancel`,
      metadata: { fund, source: "website" },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Checkout error" },
      { status: 500 },
    );
  }
}
