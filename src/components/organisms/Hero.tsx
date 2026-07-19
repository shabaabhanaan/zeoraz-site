"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Globe, Users, CheckCircle2 } from "lucide-react";

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
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#e11d48] shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48]"></span>
          </span>
          Global Enterprise Software & Engineering Partner
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          Transforming Ideas Into <br className="hidden sm:inline" />
          <span className="text-[#e11d48] underline decoration-rose-200 decoration-wavy underline-offset-8">
            Enterprise-Grade Software
          </span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 leading-relaxed mb-10"
        >
          Partner with dedicated, high-performing software engineering teams. We design, scale, and secure custom applications, AI pipelines, and cloud solutions for enterprise market leaders.
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white text-base font-bold shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-8 border-t border-slate-200/80"
        >
          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">500+</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Software Engineers</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-[#e11d48]">99.8%</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Client Retention</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">99.99%</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">SLA Reliability</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-center">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">24/7</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Global Delivery</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
