import React, { Suspense } from "react";
import { HomeClient } from "@/components/templates/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeoraz | Modern Commerce Platform & Storefront Publisher",
  description: "Launch, scale, and publish high-conversion digital storefronts and luxury retail commerce with Zeoraz.",
  keywords: ["Zeoraz", "E-Commerce", "Digital Storefronts", "Online Business", "Marketplace", "Merchant Subdomains", "Retail Commerce"],
  authors: [{ name: "Zeoraz Commerce" }],
  openGraph: {
    title: "Zeoraz | Modern Commerce Platform & Storefront Publisher",
    description: "Launch, scale, and publish high-conversion digital storefronts and luxury retail commerce with Zeoraz.",
    type: "website",
  },
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F4EF]" />}>
      <HomeClient />
    </Suspense>
  );
}

