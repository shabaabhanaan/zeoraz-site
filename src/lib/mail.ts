import fs from "fs";
import path from "path";

/**
 * Production-grade Email Service Utility
 * Supports real Resend API delivery when RESEND_API_KEY is configured,
 * and falls back to a clean terminal console preview and local storage in development.
 */

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: MailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Zeoraz Security <security@zeoraz.dev>",
          to: [to],
          subject,
          html,
          text: text || "Your security verification code is enclosed.",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Resend API error response:", data);
        return { success: false, error: data.message || "Failed to dispatch email via Resend" };
      }
      return { success: true, id: data.id };
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Network error during email dispatch";
      console.error("Resend dispatch network error:", err);
      return { success: false, error: errMsg };
    }
  } else {
    const mockMailId = `mock-${Date.now()}`;

    // Store the mock email locally in development for visual preview
    try {
      const mockDir = path.join(process.cwd(), "prisma");
      const filePath = path.join(mockDir, "mock-emails.json");
      
      // Ensure directory exists
      if (!fs.existsSync(mockDir)) {
        fs.mkdirSync(mockDir, { recursive: true });
      }

      let emails = [];
      if (fs.existsSync(filePath)) {
        try {
          emails = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch {
          // If JSON is invalid, start with empty list
        }
      }

      const newMail = {
        id: mockMailId,
        to,
        subject,
        html,
        text: text || "",
        createdAt: new Date().toISOString(),
      };

      emails.unshift(newMail);
      // Limit list to last 20 emails
      emails = emails.slice(0, 20);

      fs.writeFileSync(filePath, JSON.stringify(emails, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("Failed to store mock email locally:", fsErr);
    }

    // Development Fallback: output a beautifully formatted terminal mail template
    const border = "=".repeat(60);
    console.log(`\n${border}`);
    console.log(`✉️  [MOCK EMAIL DISPATCHED] (Set RESEND_API_KEY in env to send for real)`);
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Preview: Check http://localhost:3000/api/dev/emails to view visually in browser`);
    console.log(`${border}`);
    
    // Extract OTP if present in the HTML to print clearly
    const otpMatch = html.match(/<span[^>]*font-size:\s*32px[^>]*>(\d{6})<\/span>/i) || html.match(/>(\d{6})</);
    if (otpMatch && otpMatch[1]) {
      console.log(`\n🔑  YOUR OTP CODE IS: ${otpMatch[1]}\n`);
    }
    
    console.log(`HTML Body Content Summary:`);
    console.log(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().substring(0, 200) + "...");
    console.log(`${border}\n`);
    
    return { success: true, id: mockMailId };
  }
}

/**
 * Generates the premium HTML email template for the OTP code
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
          .container {
            max-width: 580px;
            margin: 0 auto;
            padding: 40px 20px;
          }
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
          .title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #ffffff;
          }
          .description {
            font-size: 14px;
            line-height: 1.6;
            color: #94a3b8;
            margin-bottom: 32px;
          }
          .otp-container {
            background: rgba(6, 182, 212, 0.1);
            border: 1px dashed rgba(6, 182, 212, 0.3);
            border-radius: 16px;
            padding: 16px 24px;
            display: inline-block;
            margin-bottom: 32px;
          }
          .otp-code {
            font-family: monospace;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: 6px;
            color: #06b6d4;
          }
          .footer {
            font-size: 11px;
            color: #64748b;
            margin-top: 32px;
            line-height: 1.5;
          }
          .expiry {
            font-size: 12px;
            color: #fb7185;
            font-weight: 600;
          }
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
