import React from "react";
import { LandingPageContent } from "@/components/organisms/LandingPageContent";
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
  return <LandingPageContent />;
}
