import React from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { FeaturesGrid } from "@/components/organisms/FeaturesGrid";
import { ProductTeaser } from "@/components/organisms/ProductTeaser";
import { Newsletter } from "@/components/organisms/Newsletter";
import { Footer } from "@/components/organisms/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeoraz | Next-Gen Digital Intelligence Platform",
  description: "Deploy lightning-fast applications with autonomous workflows, scalable serverless runtimes, and premium design patterns.",
  keywords: ["Zeoraz", "Developer Tools", "AI Pipelines", "Serverless Infrastructure", "Atomic Design"],
  authors: [{ name: "Zeoraz Technologies" }],
  openGraph: {
    title: "Zeoraz | Next-Gen Digital Intelligence Platform",
    description: "Deploy lightning-fast applications with autonomous workflows and premium design systems.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Landing content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Bento Grid Value Proposition */}
        <FeaturesGrid />

        {/* Product Teaser Dashboard Preview */}
        <ProductTeaser />

        {/* Lead Capture Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
