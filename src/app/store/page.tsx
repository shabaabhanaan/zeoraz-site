import React from "react";
import { Metadata } from "next";
import { MegaStoreInterface } from "@/components/organisms/MegaStoreInterface";

export const metadata: Metadata = {
  title: "Zeoraz Mart | E-Commerce Megastore",
  description: "Browse 50,000+ curated luxury products, weekly flash deals, and verified merchant collections.",
};

export default function StorePage() {
  return <MegaStoreInterface />;
}
