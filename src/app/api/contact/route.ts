import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { sendMail, getContactInquiryHtmlTemplate } from "@/lib/mail";
import { prisma } from "@/lib/db";

const DB_TIMEOUT_MS = 4000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

function saveInquiryLocally(entry: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceNeeded: string;
  message: string | null;
  emailSent: boolean;
  emailError: string | null;
  createdAt: string;
}): boolean {
  try {
    const dir = path.join(process.cwd(), "prisma");
    const filePath = path.join(dir, "contact-inquiries.json");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let items: object[] = [];
    if (fs.existsSync(filePath)) {
      try {
        items = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        items = [];
      }
    }
    items.unshift(entry);
    fs.writeFileSync(filePath, JSON.stringify(items.slice(0, 100), null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to save local contact inquiry backup:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const company = typeof body?.company === "string" ? body.company.trim() : "";
    const serviceNeeded =
      typeof body?.serviceNeeded === "string" && body.serviceNeeded.trim()
        ? body.serviceNeeded.trim()
        : "Website Building";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Store submission in MongoDB first (bounded timeout so unreachable clusters do not stall)
    let savedInquiryId: string | null = null;
    try {
      const created = await withTimeout(
        prisma.contactInquiry.create({
          data: {
            name,
            email,
            phone: phone || null,
            company: company || null,
            serviceNeeded,
            message: message || null,
          },
        }),
        DB_TIMEOUT_MS,
        "MongoDB write"
      );
      savedInquiryId = created.id;
    } catch (dbErr) {
      console.error("Failed to save contact inquiry to MongoDB:", dbErr);
    }

    const html = getContactInquiryHtmlTemplate({
      name,
      email,
      phone: phone || null,
      company: company || null,
      serviceNeeded,
      message: message || null,
      inquiryId: savedInquiryId,
    });

    const result = await sendMail({
      to: "info.zeoraz@gmail.com",
      subject: `New Inquiry from ${name}${company ? ` (${company})` : ""} – ${serviceNeeded}`,
      html,
      text: `New inquiry from ${name} (${email}).\nCompany: ${company || "N/A"}\nPhone: ${phone || "N/A"}\nService: ${serviceNeeded}\nMessage: ${message || "N/A"}`,
    });

    if (savedInquiryId) {
      try {
        await withTimeout(
          prisma.contactInquiry.update({
            where: { id: savedInquiryId },
            data: {
              emailSent: result.success,
              emailError: result.success ? null : result.error || "Unknown mail error",
            },
          }),
          DB_TIMEOUT_MS,
          "MongoDB update"
        );
      } catch (updateErr) {
        console.error("Failed to update inquiry mail status:", updateErr);
      }
    }

    let savedLocally = false;
    if (!savedInquiryId) {
      const localId = `local-${Date.now()}`;
      savedLocally = saveInquiryLocally({
        id: localId,
        name,
        email,
        phone: phone || null,
        company: company || null,
        serviceNeeded,
        message: message || null,
        emailSent: result.success,
        emailError: result.success ? null : result.error || "Unknown mail error",
        createdAt: new Date().toISOString(),
      });
      if (savedLocally) savedInquiryId = localId;
    }

    if (!result.success) {
      console.error("Contact mail failed:", result.error);
      const isSavedToDb = Boolean(savedInquiryId) && !savedLocally;
      const canUseLocalFallback = savedLocally && process.env.NODE_ENV !== "production";
      if (!isSavedToDb && !canUseLocalFallback) {
        return NextResponse.json(
          { error: "Failed to save or send inquiry. Please contact us on WhatsApp." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      id: savedInquiryId,
      savedToDb: Boolean(savedInquiryId) && !savedLocally,
      savedLocally,
      emailSent: result.success,
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Contact submission failure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
