import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { resetToken, newPassword } = await req.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: "Reset token and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    // 1. Decode and verify the reset token
    const decoded = verifyToken(resetToken) as { resetEmail: string; purpose: string; verifiedAt: number } | null;

    if (!decoded || decoded.purpose !== "password-reset" || !decoded.resetEmail) {
      return NextResponse.json({ error: "Invalid or expired password reset session. Please start over." }, { status: 400 });
    }

    // 2. Enforce token expiration (maximum 15 minutes since verification)
    const tokenAgeMs = Date.now() - decoded.verifiedAt;
    const fifteenMinutesMs = 15 * 60 * 1000;
    if (tokenAgeMs > fifteenMinutesMs) {
      return NextResponse.json({ error: "Password reset session has expired. Please verify your OTP again." }, { status: 400 });
    }

    const email = decoded.resetEmail;

    // 3. Verify user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Hash new password and save it
    const hashedPassword = hashPassword(newPassword);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    // 5. Cleanup OTP verification records for this user
    await prisma.otpVerification.deleteMany({ where: { email } });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now log in with your new credentials."
    });
  } catch (error: unknown) {
    console.error("Forgot password reset API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
