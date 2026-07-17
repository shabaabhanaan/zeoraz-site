import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    });

    // Clear cookie by setting maxAge = 0 and an expired date
    response.cookies.set("zeoraz_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Logout failed";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
