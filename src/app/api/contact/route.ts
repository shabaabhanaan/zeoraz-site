import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, serviceNeeded, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Inquiry – Zeoraz</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; margin: 0; padding: 0; }
            .container { max-width: 580px; margin: 0 auto; padding: 40px 20px; }
            .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px; }
            .header { border-bottom: 3px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px; }
            .brand { font-size: 22px; font-weight: 800; color: #0f172a; }
            .brand span { color: #2563eb; }
            .badge { display: inline-block; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 99px; border: 1px solid #bfdbfe; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
            .row { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1e293b; font-weight: 500; }
            .message-box { background: #f1f5f9; border-radius: 10px; padding: 14px 16px; font-size: 14px; color: #334155; line-height: 1.6; margin-top: 4px; white-space: pre-wrap; }
            .footer { margin-top: 28px; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <div class="brand">Zeoraz<span>.</span></div>
                <div class="badge">🔔 New Contact Inquiry</div>
              </div>

              <div class="row">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="row">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></div>
              </div>

              ${phone ? `
              <div class="row">
                <div class="label">Phone</div>
                <div class="value">${phone}</div>
              </div>` : ""}

              ${company ? `
              <div class="row">
                <div class="label">Company / Organization</div>
                <div class="value">${company}</div>
              </div>` : ""}

              <div class="row">
                <div class="label">Primary Solution Needed</div>
                <div class="value">${serviceNeeded}</div>
              </div>

              ${message ? `
              <div class="row">
                <div class="label">Project Overview / Message</div>
                <div class="message-box">${message}</div>
              </div>` : ""}

              <div class="footer">
                © ${new Date().getFullYear()} Zeoraz · info.zeoraz@gmail.com
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const result = await sendMail({
      to: "info.zeoraz@gmail.com",
      subject: `New Inquiry from ${name}${company ? ` (${company})` : ""} – ${serviceNeeded}`,
      html,
      text: `New inquiry from ${name} (${email}).\nCompany: ${company || "N/A"}\nPhone: ${phone || "N/A"}\nService: ${serviceNeeded}\nMessage: ${message || "N/A"}`,
    });

    if (!result.success) {
      console.error("Contact mail failed:", result.error);
      return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Contact submission failure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
