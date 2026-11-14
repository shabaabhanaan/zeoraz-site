import { Metadata } from "next";
import { AureliaShowcase } from "@/components/organisms/AureliaShowcase";

export const metadata: Metadata = {
  title: "Aurelia Residences | Flagship Architectural Showcase | Zeoraz",
  description:
    "An ultra-luxury residential architectural experience designed and engineered by Zeoraz. Sub-second Next.js 16 performance, interactive space preview, and seamless VIP lead capture.",
  openGraph: {
    title: "Aurelia Residences | Flagship Architectural Showcase",
    description: "Eighteen bespoke private residences designed for lasting stillness.",
    images: ["/images/aurelia/hero.jpg"],
  },
};

export default function AureliaShowcasePage() {
  return <AureliaShowcase />;
}
