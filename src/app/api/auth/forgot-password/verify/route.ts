import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signToken } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email and OTP code are required" }, { status: 400 });
    }

    // 1. Hash the incoming code to compare with database
    const hashedOtp = crypto.createHash("sha256").update(code.trim()).digest("hex");

    // 2. Look up the OTP record
    const record = await prisma.otpVerification.findFirst({
      where: {
        email,
        code: hashedOtp,
        verified: false,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    // 3. Check for expiration
    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: "Verification code has expired. Please request a new one." }, { status: 400 });
    }

    // 4. Mark the OTP verification record as verified
    await prisma.otpVerification.update({
      where: { id: record.id },
      data: { verified: true }
    });

    // 5. Generate a secure, single-use reset token signed with JWT_SECRET
    // We include purpose and email to guarantee it cannot be abused for regular session login
    const resetToken = signToken({
      resetEmail: email,
      purpose: "password-reset",
      verifiedAt: Date.now()
    });

    return NextResponse.json({
      success: true,
      resetToken,
      message: "Code verified successfully."
    });
  } catch (error: unknown) {
    console.error("Forgot password verify API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal verification error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
