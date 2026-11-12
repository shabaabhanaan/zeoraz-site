import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

/**
 * Production-grade Email Service Utility
 *
 * Priority order (falls through to next configured provider on failure):
 *  1. Gmail App Password (GMAIL_USER + GMAIL_APP_PASSWORD)
 *  2. Gmail OAuth2       (GMAIL_CLIENT_ID + GMAIL_CLIENT_SECRET + GMAIL_REFRESH_TOKEN + GMAIL_USER)
 *  3. Resend API         (RESEND_API_KEY)
 *  4. Dev mock           (only when no transport is configured; stores locally in prisma/mock-emails.json)
 */

const SMTP_TIMEOUT_MS = 10000;

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
    GMAIL_USER,
    GMAIL_APP_PASSWORD,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
    RESEND_API_KEY,
  } = process.env;

  const errors: string[] = [];
  let hasConfiguredTransport = false;

  // ─── 1. Gmail App Password ───────────────────────────────────────────────
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    hasConfiguredTransport = true;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        connectionTimeout: SMTP_TIMEOUT_MS,
        greetingTimeout: SMTP_TIMEOUT_MS,
        socketTimeout: SMTP_TIMEOUT_MS,
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
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
      const errMsg = err instanceof Error ? err.message : "Gmail App Password send failed";
      console.error("Gmail App Password error:", errMsg);
      errors.push(`Gmail App Password: ${errMsg}`);
    }
  }

  // ─── 2. Gmail OAuth2 ─────────────────────────────────────────────────────
  if (GMAIL_CLIENT_ID && GMAIL_CLIENT_SECRET && GMAIL_REFRESH_TOKEN && GMAIL_USER) {
    hasConfiguredTransport = true;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        connectionTimeout: SMTP_TIMEOUT_MS,
        greetingTimeout: SMTP_TIMEOUT_MS,
        socketTimeout: SMTP_TIMEOUT_MS,
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
      console.error("Gmail OAuth2 error:", errMsg);
      errors.push(`Gmail OAuth2: ${errMsg}`);
    }
  }

  // ─── 3. Resend API fallback ───────────────────────────────────────────────
  if (RESEND_API_KEY) {
    hasConfiguredTransport = true;
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
        const msg = data.message || "Resend delivery failed";
        console.error("Resend API error:", msg);
        errors.push(`Resend: ${msg}`);
      } else {
        return { success: true, id: data.id };
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Resend network error";
      console.error("Resend dispatch error:", errMsg);
      errors.push(`Resend: ${errMsg}`);
    }
  }

  if (hasConfiguredTransport) {
    return { success: false, error: errors.join(" | ") || "Email delivery failed" };
  }

  // ─── 4. Dev mock (no transport env vars configured) ──────────────────────
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

export interface ContactInquiryTemplateInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceNeeded: string;
  message?: string | null;
  inquiryId?: string | null;
  submittedAt?: string;
}

function escapeEmailHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Generates a structured, Gmail-safe SaaS HTML email template for new contact inquiries
 */
export function getContactInquiryHtmlTemplate({
  name,
  email,
  phone,
  company,
  serviceNeeded,
  message,
  inquiryId,
  submittedAt,
}: ContactInquiryTemplateInput): string {
  const safeName = escapeEmailHtml(name);
  const safeEmail = escapeEmailHtml(email);
  const safePhone = phone ? escapeEmailHtml(phone) : "";
  const safeCompany = company ? escapeEmailHtml(company) : "";
  const safeService = escapeEmailHtml(serviceNeeded || "Website Building");
  const safeMessage = message ? escapeEmailHtml(message) : "";
  const safeRef = inquiryId ? escapeEmailHtml(inquiryId) : "";
  const timestamp =
    submittedAt ||
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }) + " UTC";

  const replySubject = encodeURIComponent(`Re: Your ${serviceNeeded || "Project"} Inquiry — Zeoraz`);
  const mailtoHref = `mailto:${encodeURIComponent(email)}?subject=${replySubject}`;

  const detailRow = (label: string, valueHtml: string, isLast = false) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:${isLast ? "none" : "1px solid #E2E8F0"};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#64748B;width:36%;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:12px 16px;border-bottom:${isLast ? "none" : "1px solid #E2E8F0"};font-size:14px;font-weight:500;color:#0F172A;vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Project Inquiry – Zeoraz</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#0F172A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F1F5F9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">

            <!-- HERO BANNER -->
            <tr>
              <td align="center" bgcolor="#1D4ED8" style="background:linear-gradient(135deg,#0F172A 0%,#1D4ED8 52%,#2563EB 100%);padding:40px 32px 36px 32px;text-align:center;">
                <p style="margin:0 0 18px 0;font-size:15px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:#FFFFFF;">
                  ZEORAZ
                </p>

                <h1 style="margin:0 0 8px 0;font-size:32px;line-height:1.15;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF;text-transform:uppercase;">
                  NEW PROJECT INQUIRY
                </h1>
                <p style="margin:0;font-size:15px;line-height:1.5;color:#DBEAFE;font-weight:400;">
                  A prospective client submitted the Start Your Project form.
                </p>
              </td>
            </tr>

            <!-- MAIN WHITE BODY -->
            <tr>
              <td style="padding:36px 32px 32px 32px;background-color:#FFFFFF;">
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#334155;">
                  Hello Zeoraz Team,
                </p>
                <p style="margin:0 0 24px 0;font-size:15px;line-height:1.65;color:#334155;">
                  You have received a new inquiry from <strong style="color:#0F172A;">${safeName}</strong>${safeCompany ? ` at <strong style="color:#0F172A;">${safeCompany}</strong>` : ""} regarding <strong style="color:#2563EB;">${safeService}</strong>. Review the submission summary below and respond within 24 hours.
                </p>

                <!-- STRUCTURED DETAILS TABLE -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;overflow:hidden;margin-bottom:24px;">
                  ${detailRow("Full Name", safeName)}
                  ${detailRow("Email Address", `<a href="mailto:${safeEmail}" style="color:#2563EB;text-decoration:none;font-weight:600;">${safeEmail}</a>`)}
                  ${safePhone ? detailRow("Phone Number", safePhone) : ""}
                  ${safeCompany ? detailRow("Company / Brand", safeCompany) : ""}
                  ${detailRow("Requested Scope", `<span style="font-weight:600;color:#0F172A;">${safeService}</span>`)}
                  ${detailRow("Submitted On", timestamp, !safeRef)}
                  ${safeRef ? detailRow("Reference ID", `<span style="font-family:monospace;font-size:12px;color:#475569;">${safeRef}</span>`, true) : ""}
                </table>

                ${
                  safeMessage
                    ? `
                <!-- PROJECT BRIEF CALLOUT -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                  <tr>
                    <td style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#64748B;padding-bottom:8px;">
                      Project Brief &amp; Requirements
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-left:4px solid #2563EB;border-radius:10px;padding:16px 18px;font-size:14px;line-height:1.65;color:#1E293B;white-space:pre-wrap;">${safeMessage}</td>
                  </tr>
                </table>`
                    : ""
                }

                <!-- PRIMARY CTA BUTTON -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:4px auto 4px auto;">
                  <tr>
                    <td align="center" bgcolor="#2563EB" style="border-radius:8px;background-color:#2563EB;">
                      <a href="${mailtoHref}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:8px;">
                        Reply to ${safeName} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- COOL SLATE WORKFLOW STRIP -->
            <tr>
              <td style="background-color:#F8FAFC;border-top:1px solid #E2E8F0;padding:28px 28px 30px 28px;">
                <p style="margin:0 0 18px 0;font-size:13px;line-height:1.5;color:#475569;text-align:center;">
                  Zeoraz Lead Response Workflow &middot; Next Steps
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="32%" align="center" style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:14px 8px;vertical-align:top;">
                      <div style="font-size:11px;font-weight:800;color:#2563EB;letter-spacing:0.08em;margin-bottom:4px;">STEP 01</div>
                      <div style="font-size:12px;font-weight:600;color:#0F172A;">Review Scope</div>
                    </td>
                    <td width="2%"></td>
                    <td width="32%" align="center" style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:14px 8px;vertical-align:top;">
                      <div style="font-size:11px;font-weight:800;color:#2563EB;letter-spacing:0.08em;margin-bottom:4px;">STEP 02</div>
                      <div style="font-size:12px;font-weight:600;color:#0F172A;">Reply &lt; 24h</div>
                    </td>
                    <td width="2%"></td>
                    <td width="32%" align="center" style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:14px 8px;vertical-align:top;">
                      <div style="font-size:11px;font-weight:800;color:#2563EB;letter-spacing:0.08em;margin-bottom:4px;">STEP 03</div>
                      <div style="font-size:12px;font-weight:600;color:#0F172A;">Kickoff Call</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- DARK SLATE FOOTER -->
            <tr>
              <td bgcolor="#0F172A" style="background-color:#0F172A;padding:28px 32px;text-align:center;">
                <div style="font-size:15px;font-weight:800;letter-spacing:0.1em;color:#FFFFFF;margin-bottom:8px;">
                  ZEORAZ<span style="color:#60A5FA;">.</span>
                </div>
                <p style="margin:0 0 10px 0;font-size:12px;line-height:1.5;color:#94A3B8;">
                  Websites &middot; iOS &amp; Android Mobile Apps &middot; AI Chat Automation
                </p>
                <p style="margin:0;font-size:11px;line-height:1.6;color:#64748B;">
                  Sent via Zeoraz Contact Pipeline &middot; <a href="mailto:info.zeoraz@gmail.com" style="color:#93C5FD;text-decoration:none;">info.zeoraz@gmail.com</a><br />
                  &copy; ${new Date().getFullYear()} Zeoraz. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
