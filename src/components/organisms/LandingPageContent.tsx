"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { AboutUsSection } from "@/components/organisms/AboutUsSection";
import { EnterpriseTrustGrid } from "@/components/organisms/EnterpriseTrustGrid";
import { ServicesGrid } from "@/components/organisms/ServicesGrid";
import { CustomerStoriesSection } from "@/components/organisms/CustomerStoriesSection";
import { CareersSection } from "@/components/organisms/CareersSection";
import { ResourcesSection } from "@/components/organisms/ResourcesSection";
import { Newsletter } from "@/components/organisms/Newsletter";
import { Footer } from "@/components/organisms/Footer";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { Shield, Sparkles } from "lucide-react";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";

export const LandingPageContent = () => {
  const [isTalkToUsOpen, setIsTalkToUsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check for Google OAuth success redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      const workspace = params.get("workspace") || "Default Workspace";
      window.history.replaceState({}, document.title, window.location.pathname);
      setToastMessage(`Workspace initialized for ${workspace}!`);
      setTimeout(() => setToastMessage(null), 4500);
    } else if (params.get("error")) {
      const errorMsg = params.get("error");
      setToastMessage(`Login Notice: ${errorMsg}`);
      setTimeout(() => setToastMessage(null), 4500);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleOpenTalkToUs = () => {
    setIsTalkToUsOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans select-none antialiased">
      {/* Sticky Navigation Bar */}
      <Navbar onTalkToUs={handleOpenTalkToUs} />

      {/* Main Landing content */}
      <main className="flex-1">
        {/* Enterprise Software Hero Section */}
        <Hero onTalkToUs={handleOpenTalkToUs} />

        {/* About Us Section */}
        <AboutUsSection />

        {/* Enterprise Security & Scalability Trust Cards Grid */}
        <EnterpriseTrustGrid />

        {/* End-to-End Engineering Expertise Services Grid */}
        <ServicesGrid onTalkToUs={handleOpenTalkToUs} />

        {/* Customer Success Stories Section */}
        <CustomerStoriesSection />

        {/* Careers Section */}
        <CareersSection onTalkToUs={handleOpenTalkToUs} />

        {/* Resources & Insights Section */}
        <ResourcesSection />

        {/* Lead Capture Newsletter */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive "Talk to Us" Consultation Modal */}
      <TalkToUsModal
        isOpen={isTalkToUsOpen}
        onClose={() => setIsTalkToUsOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white shadow-2xl max-w-sm transition-all duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e11d48]/20 text-[#e11d48]">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              Notice <Sparkles className="h-3 w-3 text-rose-400" />
            </h5>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Floating Chatbot Widget */}
      <ChatbotWidget />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
};
