import React from "react";
import { Metadata } from "next";
import { MarketplaceContent } from "@/components/organisms/MarketplaceContent";

export const metadata: Metadata = {
  title: "Zeoraz Marketplace | Premium Website Templates",
  description: "Browse and deploy premium website building templates and components with Zeoraz.",
};

export default function MarketplacePage() {
  return <MarketplaceContent />;
}
