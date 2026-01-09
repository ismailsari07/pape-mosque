export const runtime = "nodejs";

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { to } = body;
  try {
    const { data, error } = await resend.emails.send({
      from: "duyuru@papemosque.ca",
      to: [to],
      subject: "Cenaze Duyurusu",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px">
          <h2>Cenaze Duyurusu</h2>
          <p>Bugün ikindi namazına müteakip cenaze namazı vardır.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Email sending failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      sent: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 },
    );
  }
}
