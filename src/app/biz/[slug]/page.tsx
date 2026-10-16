import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Globe,
  Mail,
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
      return list.find((b: { slug: string }) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
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

  if (!business || business.status === "SUSPENDED") {
    notFound();
  }

  let products: Product[] = [];
  try {
    products = JSON.parse(business.productsJson || "[]");
  } catch {
    products = [];
  }

  const themeColor = business.themeColor || "#1E1F22";

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#121316] text-[#1E1F22] dark:text-[#FAF8F5] transition-colors duration-300 flex flex-col justify-between">
      {/* Top Banner / Store Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#121316]/90 border-b border-[#DDD6C8] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="p-2.5 rounded-2xl bg-[#EAE4DA] hover:bg-[#DDD5C7] dark:bg-white/5 dark:hover:bg-white/10 text-[#1E1F22] dark:text-white transition-colors border border-[#DDD6C8] dark:border-white/10 cursor-pointer"
              title="Return to Zeoraz"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shadow-sm text-base"
                style={{ backgroundColor: themeColor }}
              >
                {business.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={business.logoUrl}
                    alt={business.businessName}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  business.businessName.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <span className="font-extrabold text-[#1E1F22] dark:text-white text-base tracking-tight block">
                  {business.businessName}
                </span>
                <span className="text-[11px] text-[#7A766F] dark:text-slate-400 font-medium">
                  {business.category}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Merchant
            </span>
            <div className="px-3.5 py-1 rounded-full bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-blue-400 text-xs font-mono font-bold">
              {business.subdomain}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-[#DDD6C8] dark:border-white/10 bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3] dark:from-[#121316] dark:to-[#0d0e10]">
        {business.bannerUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-xs"
            style={{ backgroundImage: `url(${business.bannerUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${themeColor} 0%, transparent 70%)`,
            }}
          />
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-xs font-bold uppercase tracking-[0.14em] text-[#4A4741] dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-[#1E1F22] dark:text-blue-400" />
            <span>{business.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#1E1F22] dark:text-white uppercase tracking-tight leading-[1.05]">
            {business.businessName}
          </h1>

          {business.tagline && (
            <p className="text-lg sm:text-xl font-normal text-[#55524B] dark:text-slate-300 max-w-2xl mx-auto font-serif italic">
              &ldquo;{business.tagline}&rdquo;
            </p>
          )}

          <p className="text-sm sm:text-base text-[#68645C] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {business.description}
          </p>

          {/* Action Contacts */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello! I am inquiring about products from ${business.businessName} on Zeoraz.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Direct Order</span>
              </a>
            )}

            <a
              href={`mailto:${business.contactEmail}?subject=Inquiry%20regarding%20${encodeURIComponent(
                business.businessName
              )}`}
              className="px-6 py-3 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] dark:bg-white dark:text-[#121316] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Merchant</span>
            </a>

            {business.websiteUrl && (
              <a
                href={business.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#EAE4DA] hover:bg-[#DDD5C7] text-[#1E1F22] dark:bg-white/10 dark:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#DDD6C8] dark:border-white/10 transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3 text-[#7C7871]" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Catalog & Offerings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E6E0D4] dark:border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C7871] block mb-1">
              Storefront Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E1F22] dark:text-white uppercase tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-[#1E1F22] dark:text-blue-400" />
              Featured Offerings &amp; Products
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#55524B] dark:text-slate-400 px-3.5 py-1 rounded-full bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 self-start sm:self-auto">
            {products.length} {products.length === 1 ? "Product" : "Products"} Available
          </span>
        </div>

        {products.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10 max-w-md mx-auto space-y-3">
            <ShoppingBag className="w-10 h-10 text-[#8F8A80] mx-auto" />
            <h3 className="text-base font-bold text-[#1E1F22] dark:text-white uppercase">No items listed yet</h3>
            <p className="text-xs text-[#6F6B63] dark:text-slate-400">
              Check back soon or contact {business.contactEmail} for custom orders.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <div
                key={item.id || index}
                className="group rounded-3xl bg-white dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#1E1F22]/30 shadow-xs"
              >
                <div>
                  {item.imageUrl && (
                    <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base font-extrabold text-[#1E1F22] dark:text-white">
                      {item.name}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full font-mono font-bold text-xs shrink-0 shadow-xs"
                      style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                    >
                      {business.currency} {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#5D5952] dark:text-slate-400 leading-relaxed mb-6">
                    {item.description || `Verified item offered by ${business.businessName}.`}
                  </p>
                </div>

                {/* Purchase / Inquire Button */}
                <div className="pt-4 border-t border-[#EAE4DA] dark:border-white/5">
                  {business.whatsappNumber ? (
                    <a
                      href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${business.businessName}! I would like to order: "${item.name}" (${business.currency} ${item.price}) from your Zeoraz storefront.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                  ) : (
                    <a
                      href={`mailto:${business.contactEmail}?subject=Order%20Request:%20${encodeURIComponent(
                        item.name
                      )}&body=I%20would%20like%20to%20order%20${encodeURIComponent(
                        item.name
                      )}%20for%20${business.currency}%20${item.price}.`}
                      className="w-full py-3 px-4 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Order / Inquire</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD6C8] dark:border-white/10 bg-[#FAF8F5] dark:bg-[#0e0f12] py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#7C7871] dark:text-slate-400">
          <div>
            <p>
              &copy; {new Date().getFullYear()} {business.businessName}. Verified Storefront on{" "}
              <Link href="/" className="text-[#1E1F22] dark:text-white font-bold hover:underline">
                Zeoraz Commerce
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/publish" className="hover:text-[#1E1F22] dark:hover:text-white font-bold transition-colors">
              Publish Your Own Store
            </Link>
            <span>&bull;</span>
            <Link href="/marketplace" className="hover:text-[#1E1F22] dark:hover:text-white font-bold transition-colors">
              Marketplace
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
