import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  MerchantStoreInterface,
  MerchantProduct,
  MerchantBusinessData,
} from "@/components/organisms/MerchantStoreInterface";

async function getBusinessBySlug(slug: string): Promise<MerchantBusinessData | null> {
  if (process.env.DATABASE_URL) {
    try {
      const business = await prisma.businessListing.findUnique({
        where: { slug: slug.toLowerCase() },
      });
      if (business) return business as unknown as MerchantBusinessData;
    } catch (err) {
      console.warn("MongoDB query failed, checking sandbox fallback:", err);
    }
  }

  // Fallback to local sandbox mock data
  try {
    const fs = await import("fs");
    const path = await import("path");
    const mockFile = path.join(process.cwd(), "prisma", "mock-businesses.json");
    if (fs.existsSync(mockFile)) {
      const list = JSON.parse(fs.readFileSync(mockFile, "utf-8"));
      return (
        list.find((b: { slug: string }) => b.slug.toLowerCase() === slug.toLowerCase()) || null
      );
    }
  } catch {
    // ignore
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    return {
      title: "Storefront Not Found | Zeoraz",
      description: "The requested business storefront could not be located.",
    };
  }

  return {
    title: `${business.businessName} | Official Storefront`,
    description: business.description,
    openGraph: {
      title: `${business.businessName} - ${business.tagline || "Official Storefront"}`,
      description: business.description,
      images: business.bannerUrl ? [business.bannerUrl] : [],
    },
  };
}

export default async function BusinessStorefrontPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  let products: MerchantProduct[] = [];
  try {
    const raw = (business as any).productsJson;
    products = typeof raw === "string" ? JSON.parse(raw) : (raw || []);
  } catch {
    products = [];
  }

  return <MerchantStoreInterface business={business} initialProducts={products} />;
}
