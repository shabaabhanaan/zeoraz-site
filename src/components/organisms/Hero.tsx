"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Terminal } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

interface HeroProps {
  onGetStarted: () => void;
}

const terminalLines = [
  { text: "$ npm i -g @zeoraz/cli", color: "text-slate-400", delay: 0 },
  { text: "✓ Package installed successfully (14.2s)", color: "text-emerald-400", delay: 700 },
  { text: "$ zeoraz deploy --prod", color: "text-slate-400", delay: 1400 },
  { text: "ℹ  Analyzing project dependency graph...", color: "text-cyan-400", delay: 2100 },
  { text: "ℹ  Bundling 142 modules...", color: "text-cyan-400", delay: 2700 },
  { text: "✓ Compiled application layers  [1.8s]", color: "text-violet-400", delay: 3400 },
  { text: "⚡ Pushing to global edge network (24 regions)...", color: "text-amber-400", delay: 4100 },
  { text: "✓ Edge cache warmed  [0.3s]", color: "text-violet-400", delay: 4800 },
  { text: "🚀 Deployment complete!", color: "text-white font-semibold", delay: 5500 },
  { text: "   Preview:  https://my-app-git-main.zeoraz.app", color: "text-cyan-300 underline", delay: 5900 },
  { text: "   Live:     https://my-app.zeoraz.app", color: "text-emerald-300 underline font-semibold", delay: 6300 },
];

const AnimatedTerminal: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= terminalLines.length) return;
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, terminalLines[visibleCount]?.delay ?? 500);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  // Restart animation every 10 seconds
  useEffect(() => {
    const loop = setInterval(() => {
      setVisibleCount(0);
    }, 13000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="space-y-1.5 text-xs sm:text-sm min-h-[200px]">
      {terminalLines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -6 }}
          animate={i < visibleCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={line.color}
        >
          {line.text}
        </motion.p>
      ))}
      {/* Blinking cursor */}
      {visibleCount < terminalLines.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          className="inline-block w-2 h-4 bg-cyan-400 align-middle ml-0.5"
        />
      )}
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-grid-pattern">
      {/* Decorative Radial glow background */}
      <div className="absolute inset-0 bg-radial-gradient -z-10" />

      {/* Glowing neon background blobs */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-violet-primary/10 blur-[120px] -z-10 animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyan-primary/10 blur-[130px] -z-10 animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Release Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <Badge>Introducing Zeoraz Engine v2.0</Badge>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          Architecting the Future of <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-violet-primary to-cyan-primary bg-clip-text text-transparent">
            Digital Intelligence
          </span>
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-slate-400 leading-relaxed mb-12"
        >
          Empower your enterprise with scalable, automated next-generation UI/UX pipelines.
          Deploy lightning-fast applications with zero friction.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Button
            variant="primary"
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Book a Demo <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Animated Terminal Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto rounded-2xl glassmorphism p-[1px] glow-violet"
        >
          <div className="rounded-[15px] bg-slate-950/90 p-4 sm:p-6 text-left font-mono text-sm leading-relaxed overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Terminal className="h-3.5 w-3.5" />
                <span>bash — zeoraz deploy</span>
              </div>
            </div>

            {/* Animated Commands */}
            <AnimatedTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
