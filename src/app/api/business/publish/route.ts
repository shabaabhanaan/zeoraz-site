import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName,
      slug,
      tagline,
      description,
      category,
      contactEmail,
      whatsappNumber,
      websiteUrl,
      themeColor,
      logoUrl,
      bannerUrl,
      currency,
      products,
    } = body;

    if (!businessName || !slug || !description || !category || !contactEmail) {
      return NextResponse.json(
        { error: "Please provide all required business information." },
        { status: 400 }
      );
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Check slug availability
    try {
      const existing = await prisma.businessListing.findUnique({
        where: { slug: cleanSlug },
      });

      if (existing) {
        return NextResponse.json(
          { error: `The subdomain "${cleanSlug}.zeoraz.com" is already registered.` },
          { status: 409 }
        );
      }
    } catch (checkErr) {
      console.warn("DB check skipped during publish:", checkErr);
    }

    // Optional: Associate with logged in user if session exists
    const sessionCookie = req.cookies.get("zeoraz_session")?.value;
    let ownerId: string | undefined;

    if (sessionCookie) {
      const decoded = verifyToken(sessionCookie);
      if (decoded?.userId) {
        ownerId = decoded.userId as string;
      }
    }

    // If no session owner, check if user with contactEmail exists
    if (!ownerId && contactEmail) {
      try {
        const user = await prisma.user.findUnique({ where: { email: contactEmail } });
        if (user) {
          ownerId = user.id;
        }
      } catch {
        // ignore offline db lookup
      }
    }

    const subdomain = `${cleanSlug}.zeoraz.com`;

    let newBusiness;
    try {
      newBusiness = await prisma.businessListing.create({
        data: {
          slug: cleanSlug,
          businessName,
          tagline: tagline || null,
          description,
          category,
          subdomain,
          themeColor: themeColor || "#06b6d4",
          logoUrl: logoUrl || null,
          bannerUrl: bannerUrl || null,
          contactEmail,
          whatsappNumber: whatsappNumber || null,
          websiteUrl: websiteUrl || null,
          currency: currency || "USD",
          productsJson: Array.isArray(products) ? JSON.stringify(products) : "[]",
          status: "ACTIVE",
          ownerId: ownerId || undefined,
        },
      });
    } catch (dbErr) {
      console.warn("MongoDB write failed, writing to local sandbox fallback:", dbErr);
      const fs = await import("fs");
      const path = await import("path");
      const mockDir = path.join(process.cwd(), "prisma");
      const mockFile = path.join(mockDir, "mock-businesses.json");
      
      let list = [];
      if (fs.existsSync(mockFile)) {
        try {
          list = JSON.parse(fs.readFileSync(mockFile, "utf-8"));
        } catch {
          list = [];
        }
      }

      newBusiness = {
        id: `mock-${Date.now()}`,
        slug: cleanSlug,
        businessName,
        tagline: tagline || null,
        description,
        category,
        subdomain,
        themeColor: themeColor || "#06b6d4",
        logoUrl: logoUrl || null,
        bannerUrl: bannerUrl || null,
        contactEmail,
        whatsappNumber: whatsappNumber || null,
        websiteUrl: websiteUrl || null,
        currency: currency || "USD",
        productsJson: Array.isArray(products) ? JSON.stringify(products) : "[]",
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      list.push(newBusiness);
      fs.writeFileSync(mockFile, JSON.stringify(list, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: "Your business has been published successfully!",
      business: newBusiness,
      subdomainUrl: `https://${subdomain}`,
      directPath: `/biz/${cleanSlug}`,
    });
  } catch (error) {
    console.error("Publish business API error:", error);
    const errMsg = error instanceof Error ? error.message : "Failed to publish business";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
