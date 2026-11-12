import React, { Suspense } from "react";
import { HomeClient } from "@/components/templates/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeoraz | Website Building, Mobile App Development & AI Solutions",
  description: "Zeoraz designs and builds modern websites, iOS & Android mobile applications, and built-in AI chat & lead automation.",
  keywords: ["Zeoraz", "Website Building", "Web Development", "Mobile App Development", "Next.js", "iOS & Android Apps", "AI Assistant"],
  authors: [{ name: "Zeoraz" }],
  openGraph: {
    title: "Zeoraz | Website Building, Mobile App Development & AI Solutions",
    description: "Modern websites, cross-platform mobile apps, and built-in AI features for businesses.",
    type: "website",
  },
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeClient />
    </Suspense>
  );
}

