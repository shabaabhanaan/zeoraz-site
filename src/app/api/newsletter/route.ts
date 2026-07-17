import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ success: true, email: subscriber.email });
  } catch (error: unknown) {
    console.error("Newsletter API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Newsletter subscription failure";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
