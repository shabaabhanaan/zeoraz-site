"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { OnboardingModal } from "@/components/organisms/OnboardingModal";
import { Shield, Sparkles } from "lucide-react";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";
import { MarketplaceHero } from "@/components/organisms/MarketplaceHero";
import { TemplateGrid } from "@/components/organisms/TemplateGrid";
import { TemplatePurchaseModal } from "@/components/organisms/TemplatePurchaseModal";
import { Template } from "@/components/molecules/TemplateCard";

export const MarketplaceContent = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState<"register" | "login">("register");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedTemplateForPurchase, setSelectedTemplateForPurchase] = useState<Template | null>(null);

  const handleOpenOnboarding = (mode: "register" | "login" = "register") => {
    setOnboardingMode(mode);
    setIsOnboardingOpen(true);
  };

  const handleLaunchConsole = (orgName: string) => {
    setIsOnboardingOpen(false);
    
    // Set success toast message
    setToastMessage(`Workspace initialized for ${orgName}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplateForPurchase(template);
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 flex flex-col font-sans select-none antialiased">
      <Navbar onGetStarted={handleOpenOnboarding} />

      <main className="flex-1 flex flex-col pt-24">
        <MarketplaceHero />
        <TemplateGrid onUseTemplate={handleSelectTemplate} />
      </main>

      <Footer />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onLaunchConsole={handleLaunchConsole}
        initialMode={onboardingMode}
      />

      <TemplatePurchaseModal
        isOpen={!!selectedTemplateForPurchase}
        onClose={() => setSelectedTemplateForPurchase(null)}
        template={selectedTemplateForPurchase}
      />

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

      <ChatbotWidget />
      <WhatsAppWidget />
    </div>
  );
};
