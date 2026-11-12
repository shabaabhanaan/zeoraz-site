import React from "react";
import { Metadata } from "next";
import { DigitalAgencyTemplate } from "@/components/templates/digital-agency/DigitalAgencyTemplate";

export const metadata: Metadata = {
  title: "Zeoraz Studio | Minimalist Digital Agency (Grey & Beige Template) - Zeoraz",
  description:
    "An editorial minimalist digital agency website template engineered with warm greige, beige, and white aesthetics, portfolio case studies, and project inquiry workflows.",
  keywords: [
    "Digital Agency Template",
    "Minimalist Website",
    "Grey Beige White Web Design",
    "Zeoraz Templates",
    "Next.js Agency Blueprint",
  ],
  openGraph: {
    title: "Zeoraz Studio | Minimalist Digital Agency Template",
    description: "An editorial minimalist digital agency website in refined grey, beige, and white tones.",
    type: "website",
  },
};

export default function DigitalAgencyPage() {
  return <DigitalAgencyTemplate />;
}
