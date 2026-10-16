import React from "react";
import { Metadata } from "next";
import { MegaStoreInterface } from "@/components/organisms/MegaStoreInterface";

export const metadata: Metadata = {
  title: "Zeoraz Mart | E-Commerce Megastore & Verified Retail Platform",
  description: "Browse curated luxury horology, designer furniture, apparel, audio, and physical retail collections.",
};

export default function MarketplacePage() {
  return <MegaStoreInterface />;
}

