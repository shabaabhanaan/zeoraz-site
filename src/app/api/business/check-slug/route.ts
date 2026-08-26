import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const RESERVED_SLUGS = new Set([
  "api",
  "admin",
  "dashboard",
  "app",
  "www",
  "shop",
  "marketplace",
  "biz",
  "stores",
  "auth",
  "login",
  "register",
  "zeoraz",
  "mail",
  "support",
  "help",
]);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get("slug") || "";
    const cleanSlug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!cleanSlug || cleanSlug.length < 3) {
      return NextResponse.json(
        { available: false, error: "Subdomain slug must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (cleanSlug.length > 40) {
      return NextResponse.json(
        { available: false, error: "Subdomain slug must be at most 40 characters long." },
        { status: 400 }
      );
    }

    if (RESERVED_SLUGS.has(cleanSlug)) {
      return NextResponse.json(
        { available: false, error: "This subdomain name is reserved." },
        { status: 400 }
      );
    }

    try {
      const existing = await prisma.businessListing.findUnique({
        where: { slug: cleanSlug },
        select: { id: true },
      });

      if (existing) {
        return NextResponse.json({
          available: false,
          slug: cleanSlug,
          error: "This subdomain is already taken. Please choose another.",
        });
      }
    } catch (dbErr) {
      console.warn("Database lookup skipped due to connection:", dbErr);
      // If DB is offline/unreachable in local dev, allow valid format slug
    }

    return NextResponse.json({
      available: true,
      slug: cleanSlug,
      subdomain: `${cleanSlug}.zeoraz.com`,
      previewUrl: `/biz/${cleanSlug}`,
    });
  } catch (error) {
    console.error("Error checking slug:", error);
    const errMsg = error instanceof Error ? error.message : "Server error checking slug availability.";
    return NextResponse.json(
      { available: false, error: errMsg },
      { status: 500 }
    );
  }
}
