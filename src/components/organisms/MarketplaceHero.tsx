"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

interface MarketplaceHeroProps {
  onTalkToUs?: () => void;
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ onTalkToUs }) => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-hero-radial bg-enterprise-pattern border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Release Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#e11d48] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          ⚡ Instant 1-Click Payment Checkout Enabled
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Discover Premium <br className="hidden sm:inline" />
          <span className="text-[#e11d48] underline decoration-rose-200 decoration-wavy underline-offset-8">
            Website Architectures
          </span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed mb-8"
        >
          Jumpstart your next enterprise application with production-ready, highly optimized components and architecture templates built on Zeoraz infrastructure.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#template-grid"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-bold shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Explore Architectures <Layers className="w-4 h-4" />
          </a>

          {onTalkToUs && (
            <button
              onClick={onTalkToUs}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Custom Build <ArrowRight className="w-4 h-4 text-[#e11d48]" />
            </button>
          )}
        </motion.div>

        {/* Stats Pill */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#e11d48]" /> Production-Verified Code</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Sub-100ms LCP Optimized</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-rose-500" /> Lifetime Updates</span>
        </div>
      </div>
    </section>
  );
};
