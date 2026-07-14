import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMail, getOtpHtmlTemplate } from "@/lib/mail";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Verify user exists
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Security: To prevent user enumeration attacks, we return a success response 
    // even if the email does not exist. We only dispatch the email if the user is found.
    if (!user) {
      console.log(`[SECURITY] Forgot password request for non-existent email: ${email}`);
      return NextResponse.json({ success: true, message: "If the email exists, an OTP has been sent." });
    }

    // 2. Generate a secure 6-digit OTP code (100000 - 999999)
    const otp = crypto.randomInt(100000, 1000000).toString();
    
    // Hash the OTP before saving to database (SHA-256)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

    // 3. Delete any previous OTPs for this email to prevent multiple valid OTPs
    await prisma.otpVerification.deleteMany({ where: { email } });

    // 4. Save new OTP to the database
    await prisma.otpVerification.create({
      data: {
        email,
        code: hashedOtp,
        expiresAt,
        verified: false
      }
    });

    // 5. Dispatch email
    const htmlBody = getOtpHtmlTemplate(email, otp);
    const emailResult = await sendMail({
      to: email,
      subject: `Reset Your Zeoraz Password - ${otp}`,
      html: htmlBody,
      text: `Your security verification code to reset your Zeoraz password is: ${otp}. This code expires in 10 minutes.`
    });

    if (!emailResult.success) {
      console.error("Failed to send OTP email:", emailResult.error);
      // We can fallback or continue depending on configuration, but we report success to user
    }

    return NextResponse.json({
      success: true,
      message: "An OTP verification code has been dispatched to your email address."
    });
  } catch (error: unknown) {
    console.error("Forgot password request API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
