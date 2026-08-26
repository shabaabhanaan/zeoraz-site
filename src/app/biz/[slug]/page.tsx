import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
}

async function getBusinessBySlug(slug: string) {
  try {
    const business = await prisma.businessListing.findUnique({
      where: { slug: slug.toLowerCase() },
    });
    if (business) return business;
  } catch (err) {
    console.warn("MongoDB query failed, checking sandbox fallback:", err);
  }

  // Fallback to local sandbox mock data
  try {
    const fs = await import("fs");
    const path = await import("path");
    const mockFile = path.join(process.cwd(), "prisma", "mock-businesses.json");
    if (fs.existsSync(mockFile)) {
      const list = JSON.parse(fs.readFileSync(mockFile, "utf-8"));
      return list.find((b: any) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
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
      title: "Business Not Found | Zeoraz",
    };
  }

  return {
    title: `${business.businessName} | Official Storefront`,
    description: business.tagline || business.description.slice(0, 160),
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

  if (!business || business.status === "SUSPENDED") {
    notFound();
  }

  let products: Product[] = [];
  try {
    products = JSON.parse(business.productsJson || "[]");
  } catch {
    products = [];
  }

  const themeColor = business.themeColor || "#06b6d4";

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner / Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#030014]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Return to Zeoraz Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-md text-sm"
                style={{ backgroundColor: themeColor }}
              >
                {business.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={business.logoUrl}
                    alt={business.businessName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  business.businessName.charAt(0).toUpperCase()
                )}
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                {business.businessName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Merchant
            </span>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono">
              {business.subdomain}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        {business.bannerUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 filter blur-sm"
            style={{ backgroundImage: `url(${business.bannerUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${themeColor} 0%, transparent 70%)`,
            }}
          />
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{business.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            {business.businessName}
          </h1>

          {business.tagline && (
            <p className="text-lg sm:text-xl font-medium text-slate-300 max-w-2xl mx-auto">
              {business.tagline}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {business.description}
          </p>

          {/* Action Contacts */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href={`mailto:${business.contactEmail}?subject=Inquiry%20regarding%20${encodeURIComponent(
                business.businessName
              )}`}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/10 transition-all shadow-lg"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              Contact: {business.contactEmail}
            </a>

            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello! I am interested in products from ${business.businessName} on Zeoraz.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-2 border border-emerald-500/30 transition-all shadow-lg shadow-emerald-500/10"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Direct Order
              </a>
            )}

            {business.websiteUrl && (
              <a
                href={business.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs flex items-center gap-2 border border-white/10 transition-all"
              >
                <Globe className="w-4 h-4" />
                Official Site
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Catalog & Offerings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-cyan-400" />
              Featured Offerings & Products
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore available items and place orders directly with {business.businessName}.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
            {products.length} {products.length === 1 ? "Item" : "Items"} Listed
          </span>
        </div>

        {products.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto">
            <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No products listed yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Check back soon or contact {business.contactEmail} for custom requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1"
              >
                <div>
                  {item.imageUrl && (
                    <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 bg-black/40 border border-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <span
                      className="px-2.5 py-1 rounded-lg font-mono font-bold text-xs shadow"
                      style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                    >
                      {business.currency} {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description || "High-quality offering from " + business.businessName}
                  </p>
                </div>

                {/* Purchase / Inquire Button */}
                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                  {business.whatsappNumber ? (
                    <a
                      href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${business.businessName}! I would like to order: "${item.name}" (${business.currency} ${item.price}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Order via WhatsApp
                    </a>
                  ) : (
                    <a
                      href={`mailto:${business.contactEmail}?subject=Order%20Request:%20${encodeURIComponent(
                        item.name
                      )}&body=I%20would%20like%20to%20order%20${encodeURIComponent(
                        item.name
                      )}%20for%20${business.currency}%20${item.price}.`}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                      Order / Inquire
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} {business.businessName}. Powered by{" "}
              <Link href="/" className="text-cyan-400 hover:underline font-semibold">
                Zeoraz Platform
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Publish Your Own Business
            </Link>
            <span>&bull;</span>
            <Link href="/marketplace" className="hover:text-slate-300 transition-colors">
              Templates
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
