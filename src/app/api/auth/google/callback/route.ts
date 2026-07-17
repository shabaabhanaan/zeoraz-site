import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${url.protocol}//${url.host}`;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    if (!code) {
      return NextResponse.redirect(`${baseUrl}?error=MissingCode`);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Missing Google Client ID or Secret");
      return NextResponse.redirect(`${baseUrl}?error=ServerConfigError`);
    }

    // 1. Exchange auth code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Google Token Error:", errorText);
      return NextResponse.redirect(`${baseUrl}?error=TokenExchangeFailed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch user profile from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      return NextResponse.redirect(`${baseUrl}?error=ProfileFetchFailed`);
    }

    const userData = await userResponse.json();
    const email = userData.email;

    if (!email) {
      return NextResponse.redirect(`${baseUrl}?error=EmailNotProvided`);
    }

    // 3. Find or create user in DB
    let user = await prisma.user.findUnique({
      where: { email },
      include: { workspaces: true }
    });

    if (!user) {
      // Create user
      user = await prisma.user.create({
        data: {
          email,
          authProvider: "google",
        },
        include: { workspaces: true }
      });
    } else if (user.authProvider !== "google") {
      // Optionally link account or just proceed, but we'll update authProvider
      await prisma.user.update({
        where: { id: user.id },
        data: { authProvider: "google" }
      });
    }

    // 4. Ensure workspace exists
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

    // 5. Sign JWT token
    const token = signToken({ userId: user.id, email: user.email, workspaceId: workspace.id });

    // 6. Create response and set cookie
    const response = NextResponse.redirect(`${baseUrl}?login=success&workspace=${encodeURIComponent(workspace.name)}`);
    
    response.cookies.set("zeoraz_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Google Callback Error:", error);
    const url = new URL(request.url);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${url.protocol}//${url.host}`;
    return NextResponse.redirect(`${baseUrl}?error=InternalError`);
  }
}
