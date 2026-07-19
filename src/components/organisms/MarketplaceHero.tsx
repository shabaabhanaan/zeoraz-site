"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/atoms/Badge";

export const MarketplaceHero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 bg-radial-gradient -z-10" />

      {/* Glowing neon background blobs */}
      <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-violet-primary/10 blur-[120px] -z-10 animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[20%] right-[30%] w-[350px] h-[350px] rounded-full bg-cyan-primary/10 blur-[130px] -z-10 animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <Badge>Premium Templates Marketplace</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          Discover Premium <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-primary to-violet-primary bg-clip-text text-transparent">
            Website Architectures
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-8"
        >
          Jumpstart your next project with production-ready, highly optimized components and templates built on Zeoraz infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm font-medium text-slate-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          ⚡ Instant 1-Click Payment Checkout Enabled
        </motion.div>
      </div>
    </section>
  );
};
