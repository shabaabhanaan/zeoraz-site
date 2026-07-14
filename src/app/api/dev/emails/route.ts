import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  // Prevent access in production
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "prisma", "mock-emails.json");
    let emails = [];

    if (fs.existsSync(filePath)) {
      try {
        emails = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        // ignore JSON corruption
      }
    }

    // Render a premium developer email preview inbox
    const htmlInbox = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Zeoraz Developer Local Mail Inbox</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              background-color: #030014;
              color: #e2e8f0;
              margin: 0;
              padding: 0;
              display: flex;
              height: 100vh;
              overflow: hidden;
            }
            .sidebar {
              width: 320px;
              border-right: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(255, 255, 255, 0.01);
              display: flex;
              flex-direction: column;
              flex-shrink: 0;
            }
            .sidebar-header {
              padding: 24px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(0, 0, 0, 0.2);
            }
            .sidebar-title {
              font-size: 18px;
              font-weight: 800;
              background: linear-gradient(to right, #a78bfa, #06b6d4);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin: 0 0 4px 0;
            }
            .sidebar-subtitle {
              font-size: 11px;
              color: #64748b;
              margin: 0;
            }
            .email-list {
              flex: 1;
              overflow-y: auto;
              padding: 12px;
            }
            .email-item {
              padding: 16px;
              border-radius: 16px;
              border: 1px solid transparent;
              margin-bottom: 8px;
              cursor: pointer;
              transition: all 0.2s;
              background: rgba(255, 255, 255, 0.02);
            }
            .email-item:hover {
              background: rgba(255, 255, 255, 0.04);
              border-color: rgba(255, 255, 255, 0.05);
            }
            .email-item.active {
              background: rgba(6, 182, 212, 0.08);
              border-color: rgba(6, 182, 212, 0.3);
            }
            .email-item-subject {
              font-size: 13px;
              font-weight: 700;
              color: #ffffff;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-ellipsis: true;
            }
            .email-item-to {
              font-size: 11px;
              color: #06b6d4;
              margin-bottom: 4px;
            }
            .email-item-date {
              font-size: 10px;
              color: #64748b;
              text-align: right;
            }
            .main-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              background: #02000a;
            }
            .email-view-header {
              padding: 24px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              background: rgba(255, 255, 255, 0.01);
            }
            .email-view-subject {
              font-size: 20px;
              font-weight: 800;
              color: #ffffff;
              margin: 0 0 8px 0;
            }
            .email-view-meta {
              font-size: 12px;
              color: #94a3b8;
            }
            .email-view-body {
              flex: 1;
              padding: 24px;
              background: #02000a;
              overflow-y: auto;
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }
            .email-iframe {
              width: 100%;
              max-width: 600px;
              height: 500px;
              border: none;
              background: #030014;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .empty-state {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100%;
              color: #64748b;
              text-align: center;
              padding: 40px;
            }
            .empty-icon {
              font-size: 48px;
              margin-bottom: 16px;
            }
          </style>
        </head>
        <body>
          <div class="sidebar">
            <div class="sidebar-header">
              <h1 class="sidebar-title">Zeoraz Mock Mailbox</h1>
              <p class="sidebar-subtitle">Local Dev Sandbox Delivery Inbox</p>
            </div>
            <div class="email-list">
              ${
                emails.length === 0
                  ? '<div style="text-align:center; padding:40px; color:#64748b; font-size:12px;">No emails received yet.</div>'
                  : emails
                      .map(
                        (mail: any, index: number) => `
                    <div 
                      class="email-item ${index === 0 ? "active" : ""}" 
                      onclick="selectEmail(this, ${index})"
                    >
                      <div class="email-item-subject">${mail.subject}</div>
                      <div class="email-item-to">To: ${mail.to}</div>
                      <div class="email-item-date">${new Date(mail.createdAt).toLocaleTimeString()}</div>
                    </div>
                  `
                      )
                      .join("")
              }
            </div>
          </div>
          <div class="main-content">
            ${
              emails.length === 0
                ? `
              <div class="empty-state">
                <div class="empty-icon">✉️</div>
                <h3>Your Dev Inbox is Empty</h3>
                <p>Trigger an OTP forgot password workflow to see emails generated in real-time here.</p>
              </div>
            `
                : `
              <div class="email-view-header" id="email-header">
                <h2 class="email-view-subject" id="subject-el">${emails[0].subject}</h2>
                <div class="email-view-meta">
                  <span id="to-el">To: ${emails[0].to}</span> &bull; 
                  <span id="date-el">${new Date(emails[0].createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div class="email-view-body">
                <iframe 
                  id="preview-iframe" 
                  class="email-iframe"
                  srcdoc="${emails[0].html.replace(/"/g, "&quot;")}"
                ></iframe>
              </div>
            `
            }
          </div>

          <script>
            const emails = ${JSON.stringify(emails)};
            
            function selectEmail(element, index) {
              // Update active list state
              document.querySelectorAll('.email-item').forEach(el => el.classList.remove('active'));
              element.classList.add('active');
              
              // Load email preview
              const mail = emails[index];
              document.getElementById('subject-el').innerText = mail.subject;
              document.getElementById('to-el').innerText = 'To: ' + mail.to;
              document.getElementById('date-el').innerText = new Date(mail.createdAt).toLocaleString();
              document.getElementById('preview-iframe').srcdoc = mail.html;
            }
          </script>
        </body>
      </html>
    `;

    return new NextResponse(htmlInbox, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error displaying mailbox";
    return new NextResponse(`Error: ${errMsg}`, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
