"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Globe, Users, CheckCircle2, Building2 } from "lucide-react";

interface HeroProps {
  onTalkToUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTalkToUs }) => {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden bg-hero-radial bg-enterprise-pattern border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2563eb] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
          </span>
          Diversified Services & Global Consultancy Studio
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          Engineering Technology, <br className="hidden sm:inline" />
          <span className="text-[#2563eb]">
            Commerce & Physical Products
          </span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed mb-10"
        >
          Zeoraz is a multi-vertical product studio. We build custom software & AI, manage and scale high-volume e-commerce brands, and deliver precision 3D printing services. All in one unified consultancy.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={onTalkToUs}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-base font-bold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Talk to Us <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-base font-bold shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Key Metrics / Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-8 border-t border-slate-200/80 mb-14"
        >
          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">20+</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Projects Shipped</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-[#2563eb]">100%</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Client Satisfaction</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">2-Wk</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">MVP Sprints</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">$0</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Bloat. Just Code.</p>
          </div>
        </motion.div>

        {/* Enterprise Office Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl shadow-slate-400/20 group"
        >
          <div
            className="w-full h-[360px] sm:h-[480px] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(/images/office-workspace.png), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Building2 className="w-3.5 h-3.5 text-[#2563eb]" /> Remote-First Studio
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2563eb] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" /> Actively Shipping
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Built for Founders, by Builders
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              A tight-knit team of engineers and designers who care about your product as much as you do — fast feedback loops, direct access, zero fluff.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
