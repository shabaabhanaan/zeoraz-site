import { NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "bot" | "assistant";
  text: string;
}

const SYSTEM_PROMPT = `You are Zeo, the assistant for Zeoraz.
Keep replies short (2-3 sentences), clear, and friendly.
Zeoraz's core services:
1. Website Building: fast, modern responsive websites and web apps built with Next.js & React.
2. Mobile App Development: cross-platform iOS & Android mobile apps with clean UI and backend integration.
3. AI Agent Building: custom autonomous AI agents with tool/API calling, 24/7 customer chat, lead qualification, and automated email/WhatsApp/CRM workflows.
If the user asks about pricing, timelines, or starting a project, invite them to click "Start a Project" or fill out the contact form below.`;

function generateLocalReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("price") || q.includes("cost") || q.includes("pricing") || q.includes("how much")) {
    return "Project pricing depends on scope—whether you need a business website, a mobile app, a custom AI agent, or the full bundle. Click 'Start a Project' or message us below and we'll send a clear quote within 24 hours.";
  }
  if (q.includes("agent") || q.includes("workflow") || q.includes("autom")) {
    return "We build custom AI agents wired to your website, docs, calendars, and backend APIs—so the agent can qualify leads, answer customer questions 24/7, book calls, and send instant WhatsApp or email alerts.";
  }
  if (q.includes("mobile") || q.includes("app") || q.includes("ios") || q.includes("android")) {
    return "We build cross-platform iOS and Android mobile apps with clean interfaces, user authentication, and backend APIs. Tell us what your app should do or book a quick call!";
  }
  if (q.includes("web") || q.includes("site") || q.includes("landing") || q.includes("next")) {
    return "We design and develop fast, mobile-friendly websites and web apps tailored to your brand, complete with contact forms, SEO, and optional AI agent integration.";
  }
  if (q.includes("ai") || q.includes("chat") || q.includes("bot")) {
    return "Alongside websites and mobile apps, we build custom AI agents and 24/7 chat assistants with tool-calling workflows and instant email/WhatsApp inquiry alerts.";
  }
  return "Zeoraz builds custom websites, iOS & Android mobile apps, and custom AI agents for businesses. Tell me what you're looking to build, or click 'Start a Project' to get a quote!";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.text?.trim();

    if (!lastUserMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          max_tokens: 220,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-8).map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text,
            })),
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply, provider: "openai" });
      }
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: messages.slice(-8).map((m) => ({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            })),
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (reply) return NextResponse.json({ reply, provider: "gemini" });
      }
    }

    return NextResponse.json({
      reply: generateLocalReply(lastUserMessage),
      provider: "assistant",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Sorry, I hit a snag processing that. Feel free to use 'Book Audit' or the Contact form below." },
      { status: 200 }
    );
  }
}

