import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

/**
 * Production-grade Email Service Utility
 *
 * Priority order:
 *  1. Gmail OAuth2 (GMAIL_CLIENT_ID + GMAIL_CLIENT_SECRET + GMAIL_REFRESH_TOKEN + GMAIL_USER)
 *  2. Resend API  (RESEND_API_KEY)
 *  3. Dev mock    (logs to terminal + stores locally in prisma/mock-emails.json)
 */

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({
  to,
  subject,
  html,
  text,
}: MailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    GMAIL_USER,
    RESEND_API_KEY,
  } = process.env;

  // ─── 1. Gmail OAuth2 ─────────────────────────────────────────────────────
  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && GMAIL_USER) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: GMAIL_USER,
          clientId: GMAIL_CLIENT_ID,
          clientSecret: GMAIL_CLIENT_SECRET,
          refreshToken: GMAIL_REFRESH_TOKEN,
        },
      });

      const info = await transporter.sendMail({
        from: `"Zeoraz" <${GMAIL_USER}>`,
        to,
        subject,
        html,
        text: text ?? "",
      });

      return { success: true, id: info.messageId };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Gmail OAuth2 send failed";
      console.error("Gmail OAuth2 error:", err);
      return { success: false, error: errMsg };
    }
  }

  // ─── 2. Resend API fallback ───────────────────────────────────────────────
  if (RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Zeoraz <noreply@zeoraz.dev>",
          to: [to],
          subject,
          html,
          text: text || "",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Resend API error:", data);
        return { success: false, error: data.message || "Resend delivery failed" };
      }
      return { success: true, id: data.id };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Resend network error";
      console.error("Resend dispatch error:", err);
      return { success: false, error: errMsg };
    }
  }

  // ─── 3. Dev mock ─────────────────────────────────────────────────────────
  const mockMailId = `mock-${Date.now()}`;

  try {
    const mockDir = path.join(process.cwd(), "prisma");
    const filePath = path.join(mockDir, "mock-emails.json");

    if (!fs.existsSync(mockDir)) fs.mkdirSync(mockDir, { recursive: true });

    let emails: object[] = [];
    if (fs.existsSync(filePath)) {
      try {
        emails = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        /* ignore corrupt file */
      }
    }

    emails.unshift({
      id: mockMailId,
      to,
      subject,
      html,
      text: text || "",
      createdAt: new Date().toISOString(),
    });
    emails = emails.slice(0, 20);
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2), "utf-8");
  } catch (fsErr) {
    console.error("Failed to store mock email:", fsErr);
  }

  const border = "=".repeat(60);
  console.log(`\n${border}`);
  console.log(
    `✉️  [MOCK EMAIL] No transport configured — add Gmail OAuth2 or RESEND_API_KEY to .env`
  );
  console.log(`To:      ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Preview: http://localhost:3000/api/dev/emails`);
  console.log(`${border}\n`);

  // Extract OTP for dev convenience
  const otpMatch =
    html.match(/<span[^>]*font-size:\s*32px[^>]*>(\d{6})<\/span>/i) ||
    html.match(/>(\d{6})</);
  if (otpMatch?.[1]) {
    console.log(`\n🔑  OTP CODE: ${otpMatch[1]}\n`);
  }

  return { success: true, id: mockMailId };
}

/**
 * Generates the HTML email template for OTP / password reset codes
 */
export function getOtpHtmlTemplate(email: string, otpCode: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Zeoraz Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #030014;
            color: #f1f5f9;
            margin: 0;
            padding: 0;
          }
          .container { max-width: 580px; margin: 0 auto; padding: 40px 20px; }
          .card {
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            margin-bottom: 24px;
            background: linear-gradient(to right, #a78bfa, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .title { font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #ffffff; }
          .description { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 32px; }
          .otp-container {
            background: rgba(6, 182, 212, 0.1);
            border: 1px dashed rgba(6, 182, 212, 0.3);
            border-radius: 16px;
            padding: 16px 24px;
            display: inline-block;
            margin-bottom: 32px;
          }
          .otp-code { font-family: monospace; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #06b6d4; }
          .footer { font-size: 11px; color: #64748b; margin-top: 32px; line-height: 1.5; }
          .expiry { font-size: 12px; color: #60a5fa; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="logo">Zeoraz Platform</div>
            <div class="title">Verification Code</div>
            <div class="description">
              We received a request to reset the password for your Zeoraz developer account (<strong>${email}</strong>). Use the security verification code below to authorize this request:
            </div>
            <div class="otp-container">
              <span class="otp-code">${otpCode}</span>
            </div>
            <div class="expiry">This code will expire in 10 minutes.</div>
            <div class="footer">
              If you did not request a password reset, please ignore this email or contact support if you have security concerns.<br>
              &copy; ${new Date().getFullYear()} Zeoraz Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
