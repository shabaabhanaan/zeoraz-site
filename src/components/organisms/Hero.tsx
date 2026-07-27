"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ShieldCheck, Award, Sparkles } from "lucide-react";

interface HeroProps {
  onTalkToUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTalkToUs }) => {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden min-h-[85vh] flex flex-col justify-center border-b border-slate-800">
      {/* Full Background Office Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url(/images/office-workspace.png), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80)`
        }}
      />

      {/* Lighter Atmospheric Overlay to showcase office environment image clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/45 to-[#030014]/75" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 w-full">

        {/* Hero Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
        >
          Engineering Technology, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
            Commerce & Physical Products
          </span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-xl text-slate-200 leading-relaxed mb-10 font-normal drop-shadow"
        >
          Zeoraz is a multi-vertical product studio. We build custom software & AI, manage and scale high-volume e-commerce brands, and deliver precision 3D printing services. All in one unified consultancy.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onTalkToUs}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-base font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Talk to Us <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md text-base font-bold shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Key Metrics Grid Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto pt-8 border-t border-white/15"
        >
          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60 shadow-xl text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-white">20+</h4>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Projects Shipped</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60 shadow-xl text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-blue-400">100%</h4>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Client Satisfaction</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60 shadow-xl text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-white">2-Wk</h4>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">MVP Sprints</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/60 shadow-xl text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-white">$0</h4>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-1">Bloat. Just Code.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
