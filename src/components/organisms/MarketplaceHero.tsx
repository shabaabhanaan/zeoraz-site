"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap, Building2 } from "lucide-react";

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
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2563eb] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
          </span>
          ⚡ Production-Ready Open Architecture Blueprints
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Discover Premium <br className="hidden sm:inline" />
          <span className="text-[#2563eb] underline decoration-blue-200 decoration-wavy underline-offset-8">
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
          Explore production-ready software blueprints and component libraries engineered by Zeoraz Software. Partner with our team to customize and launch your project.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <a
            href="#template-grid"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Explore Architectures <Layers className="w-4 h-4" />
          </a>

          {onTalkToUs && (
            <button
              onClick={onTalkToUs}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              Request Custom Build <ArrowRight className="w-4 h-4 text-[#2563eb]" />
            </button>
          )}
        </motion.div>

        {/* Stats Pill */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-500 uppercase tracking-wider mb-12">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#2563eb]" /> Production-Verified Code</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Sub-100ms LCP Optimized</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-blue-500" /> Open Source Blueprints</span>
        </div>

        {/* Enterprise Office Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl shadow-slate-400/20 group"
        >
          <div 
            className="w-full h-[320px] sm:h-[440px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(/images/office-workspace.png), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Building2 className="w-3.5 h-3.5 text-[#2563eb]" /> Zeoraz Engineering Labs
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Designed & Tested in Real Enterprise Environments
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
              Every architecture blueprint is battle-tested by our engineering pods before release.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
