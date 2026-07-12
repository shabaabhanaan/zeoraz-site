"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { FeaturesGrid } from "@/components/organisms/FeaturesGrid";
import { ProductTeaser } from "@/components/organisms/ProductTeaser";
import { Newsletter } from "@/components/organisms/Newsletter";
import { Footer } from "@/components/organisms/Footer";
import { OnboardingModal } from "@/components/organisms/OnboardingModal";
import { Shield, Sparkles } from "lucide-react";

export const LandingPageContent = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLaunchConsole = (orgName: string) => {
    setIsOnboardingOpen(false);
    
    // Trigger smooth scroll to dashboard console section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }

    // Set success toast message
    setToastMessage(`Workspace initialized for ${orgName}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

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
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onLaunchConsole={handleLaunchConsole}
      />

      {/* Success Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl glassmorphism glow-cyan max-w-sm transition-all duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-primary/20 text-cyan-primary">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              Workspace Provisioned <Sparkles className="h-3 w-3 text-cyan-primary" />
            </h5>
            <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
