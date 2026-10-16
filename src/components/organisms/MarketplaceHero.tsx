"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap, Building2 } from "lucide-react";

interface MarketplaceHeroProps {
  onTalkToUs?: () => void;
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ onTalkToUs }) => {
  return (
    <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3] border-b border-[#DDD6C8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4D9] border border-[#DDD6C9] text-xs font-bold uppercase tracking-[0.16em] text-[#4A4741] shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#1E1F22] animate-pulse" />
          Production-Ready Architecture Blueprints
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1E1F22] tracking-[-0.03em] uppercase leading-[0.98]">
            CURATED COMMERCE <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#66625B]">storefront flagships</span> <br />
            &amp; LUXURY COLLECTIONS
          </h1>
        </motion.div>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[#55524B] leading-relaxed mb-10 font-normal"
        >
          Explore verified luxury physical collections, direct-to-consumer goods, and production-ready digital storefront blueprints curated by Zeoraz. (For technical software engineering, visit Zeoraz Labs).
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
        >
          <a
            href="#template-grid"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.14em] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Blueprints</span>
            <Layers className="w-4 h-4" />
          </a>

          {onTalkToUs && (
            <button
              onClick={onTalkToUs}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E8E2D7] hover:bg-[#DCD5C8] text-[#1E1F22] border border-[#D5CDC0] text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Custom Build</span>
              <ArrowRight className="w-4 h-4 text-[#1E1F22]" />
            </button>
          )}
        </motion.div>

        {/* Stats / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-bold text-[#706C64] uppercase tracking-[0.16em] mb-14">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1E1F22]" /> Production-Verified Code
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#1E1F22]" /> Sub-100ms LCP Optimized
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#1E1F22]" /> Commercial Blueprints
          </span>
        </div>

        {/* Enterprise Studio Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#DFD8CC] shadow-xl bg-[#1E1F22] group"
        >
          <div
            className="w-full h-[280px] sm:h-[400px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/85 via-[#141517]/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[#1E1F22] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-[#1E1F22]" /> Zeoraz Architecture Labs
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
              Tested In Real Enterprise Production
            </h3>
            <p className="text-[#D8D4CC] text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Every blueprint is benchmarked for high concurrency, type safety, and Core Web Vitals before catalog inclusion.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
