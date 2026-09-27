import React from "react";
import { LandingPageContent } from "@/components/organisms/LandingPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeoraz | Modern Digital Marketplace Platform",
  description: "Zeoraz is a modern, clean, and professional digital marketplace platform for digital products, multi-vendor platforms, and online stores.",
  keywords: ["Zeoraz", "Digital Marketplace", "Multi-vendor Platform", "Digital Downloads", "Online Store"],
  authors: [{ name: "Zeoraz Technologies" }],
  openGraph: {
    title: "Zeoraz | Modern Digital Marketplace Platform",
    description: "Zeoraz is a modern, clean, and professional digital marketplace platform for digital products, multi-vendor platforms, and online stores.",
    type: "website",
  },
};

export default function Home() {
  return <LandingPageContent />;
}
