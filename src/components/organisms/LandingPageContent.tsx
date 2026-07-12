"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { FeaturesGrid } from "@/components/organisms/FeaturesGrid";
import { ProductTeaser } from "@/components/organisms/ProductTeaser";
import { Newsletter } from "@/components/organisms/Newsletter";
import { Footer } from "@/components/organisms/Footer";
import { OnboardingModal } from "@/components/organisms/OnboardingModal";

export const LandingPageContent = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* Sticky Navigation Bar */}
      <Navbar onGetStarted={() => setIsOnboardingOpen(true)} />

      {/* Main Landing content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onGetStarted={() => setIsOnboardingOpen(true)} />

        {/* Bento Grid Value Proposition */}
        <FeaturesGrid />

        {/* Product Teaser Dashboard Preview */}
        <ProductTeaser />

        {/* Lead Capture Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Onboarding Interactive Modal */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
};
