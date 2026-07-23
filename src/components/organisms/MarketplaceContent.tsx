"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { Shield, Sparkles } from "lucide-react";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";
import { MarketplaceHero } from "@/components/organisms/MarketplaceHero";
import { TemplateGrid } from "@/components/organisms/TemplateGrid";

export const MarketplaceContent = () => {
  const [isTalkToUsOpen, setIsTalkToUsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenTalkToUs = () => {
    setIsTalkToUsOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans select-none antialiased transition-colors duration-300">
      <Navbar onTalkToUs={handleOpenTalkToUs} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <MarketplaceHero onTalkToUs={handleOpenTalkToUs} />
        <TemplateGrid onSelectTemplate={handleOpenTalkToUs} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Technical Consultation Modal */}
      <TalkToUsModal
        isOpen={isTalkToUsOpen}
        onClose={() => setIsTalkToUsOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white shadow-2xl max-w-sm transition-all duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/20 text-[#2563eb]">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              Notice <Sparkles className="h-3 w-3 text-blue-400" />
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
