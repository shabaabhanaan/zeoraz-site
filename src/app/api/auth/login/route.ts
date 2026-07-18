import { NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { rateLimiter } from "@/lib/rate-limit";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Rate limit check: max 5 login requests per 15 minutes per IP/email
    const clientIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const limiterKey = `login_${email || clientIp}`;
    if (rateLimiter.isRateLimited(limiterKey, { limit: 5, windowMs: 15 * 60 * 1000 })) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { workspaces: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // If user has no password (e.g. they signed up with Google), block email login
    if (!user.password) {
      return NextResponse.json({ error: "Please sign in with Google" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Get the first workspace or create a default one if somehow missing
    let workspace = user.workspaces[0];
    if (!workspace) {
      const apiKey = `zr_live_${crypto.randomBytes(16).toString("hex")}`;
      workspace = await prisma.workspace.create({
        data: {
          name: "Default Workspace",
          apiKey,
          runtimes: "node,python",
          ownerId: user.id,
        },
      });
    }

    // Sign JWT token
    const token = signToken({ userId: user.id, email: user.email, workspaceId: workspace.id });

    const response = NextResponse.json({
      success: true,
      workspaceName: workspace.name,
      apiKey: workspace.apiKey,
    });

    // Set cookie
    response.cookies.set("zeoraz_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Login API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal login error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
