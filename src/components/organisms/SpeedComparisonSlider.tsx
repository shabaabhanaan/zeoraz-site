"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Smartphone,
  Gauge,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface SpeedComparisonSliderProps {
  onOpenConsultation?: () => void;
}

export function SpeedComparisonSlider({ onOpenConsultation }: SpeedComparisonSliderProps) {
  // Slider position from 0 to 100 (percentage)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"compare" | "before" | "after">("compare");
  
  // Simulated load test state
  const [simulating, setSimulating] = useState<"legacy" | "zeoraz" | null>(null);
  const [legacyProgress, setLegacyProgress] = useState(0);
  const [zeorazLoaded, setZeorazLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.round((x / rect.width) * 100);
      setSliderPos(percent);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Run simulated legacy load (4.2 seconds)
  const runLegacySimulation = () => {
    setSimulating("legacy");
    setLegacyProgress(0);
    const start = Date.now();
    const duration = 4200; // 4.2s

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setLegacyProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setSimulating(null), 1200);
      }
    }, 50);
  };

  // Run simulated Zeoraz load (0.38 seconds)
  const runZeorazSimulation = () => {
    setSimulating("zeoraz");
    setZeorazLoaded(false);
    setTimeout(() => {
      setZeorazLoaded(true);
      setTimeout(() => setSimulating(null), 1200);
    }, 380);
  };

  return (
    <section id="comparison" className="scroll-mt-24 py-16 sm:py-24 px-6 lg:px-12 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Benchmark</span>
          </div>
          <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] leading-[1.1] mb-4">
            The Cost of a Slow Website vs. Zeoraz
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Drag the slider to see why legacy websites lose over 50% of their mobile visitors, and how Zeoraz engineered platforms convert visitors into paying clients 24/7.
          </p>

          {/* Quick tab toggle for mobile users */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                setActiveTab("before");
                setSliderPos(15);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
                activeTab === "before"
                  ? "bg-rose-100 text-rose-800 border border-rose-300"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Legacy Website (Slow)
            </button>
            <button
              onClick={() => {
                setActiveTab("compare");
                setSliderPos(50);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
                activeTab === "compare"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Split View (Drag Slider)
            </button>
            <button
              onClick={() => {
                setActiveTab("after");
                setSliderPos(85);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all ${
                activeTab === "after"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Zeoraz Engine (Fast + AI)
            </button>
          </div>
        </div>

        {/* The Interactive Before/After Visual Frame */}
        <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden mb-12">
          {/* Top Browser Bar Mockup */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900 text-slate-400 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="hidden sm:inline-block ml-3 font-mono text-[11px] text-slate-400">
                https://yourbusiness.com (Live Performance & AI Audit)
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              <span className="hidden sm:inline">Drag handle left/right to compare</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {sliderPos}% Zeoraz
              </span>
            </div>
          </div>

          {/* Interactive Split Screen Container */}
          <div
            ref={containerRef}
            className="relative h-[560px] sm:h-[500px] w-full select-none cursor-ew-resize overflow-hidden bg-slate-950"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* RIGHT SIDE: ZEORAZ MODERN PLATFORM (Underneath) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a1128] to-slate-900 p-6 sm:p-10 flex flex-col justify-between text-white">
              {/* Badge & Speed Score */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs tracking-wide uppercase">
                    Zeoraz Next.js + AI Platform
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <Gauge className="w-4 h-4 text-emerald-400" />
                    <span>Lighthouse 99/100</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span>0.38s Load</span>
                  </div>
                </div>
              </div>

              {/* Main Content Showcase */}
              <div className="my-auto max-w-xl pl-auto ml-auto text-right pr-4 sm:pr-8">
                <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">
                  Engineered For High Growth
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white mt-2 mb-3 leading-tight">
                  Instant Load & 24/7 AI Lead Capture
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Built on modern Next.js with sub-second response times, zero layout shift, and an autonomous AI agent that engages visitors and routes qualified inquiries straight to WhatsApp.
                </p>

                {/* Live Feature Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-left mb-6">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sub-second page speeds</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Autonomous AI chat agent</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp & CRM alerts</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Top 1% mobile experience</span>
                  </div>
                </div>

                {/* Interactive Test Button */}
                <button
                  type="button"
                  onClick={runZeorazSimulation}
                  disabled={simulating !== null}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Test Instant 0.38s Load</span>
                </button>

                {simulating === "zeoraz" && (
                  <span className="block mt-2 text-emerald-400 text-xs font-mono animate-pulse">
                    {zeorazLoaded ? "Loaded in 380ms! Full score." : "Fetching Next.js chunks..."}
                  </span>
                )}
              </div>

              {/* Bottom Metrics Bar */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 font-mono">
                <span>Result: +3.5x Mobile Conversion</span>
                <span className="text-emerald-400 font-semibold">Zero Dropped Leads</span>
              </div>
            </div>

            {/* LEFT SIDE: LEGACY WEBSITE (Clipped on top by sliderPos) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e1722] to-[#181119] p-6 sm:p-10 flex flex-col justify-between text-white border-r border-rose-500/40 shadow-2xl overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              {/* Badge & Speed Score */}
              <div className="flex flex-wrap items-center justify-between gap-4 w-[1080px] max-w-[calc(100vw-3rem)]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-3 w-3 relative">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold text-xs tracking-wide uppercase">
                    Typical Legacy Website (WordPress / Wix)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
                    <Gauge className="w-4 h-4 text-rose-400" />
                    <span>Lighthouse 38/100</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>4.2s Delay</span>
                  </div>
                </div>
              </div>

              {/* Main Content Showcase */}
              <div className="my-auto max-w-xl text-left pl-2 sm:pl-4 w-[1080px] max-w-[calc(100vw-4rem)]">
                <span className="text-rose-400 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Losing 53% of Mobile Visitors
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-normal text-white mt-2 mb-3 leading-tight">
                  Bloated Plugins & Lost Client Leads
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                  Heavy templates, unoptimized assets, and static email forms where leads sit unattended for 24+ hours while competitors close the client first.
                </p>

                {/* Pain Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-left mb-6 max-w-md">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>4+ second initial load lag</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>No automated weekend response</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Leads buried in spam folders</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Clunky mobile viewport shift</span>
                  </div>
                </div>

                {/* Interactive Test Button */}
                <button
                  type="button"
                  onClick={runLegacySimulation}
                  disabled={simulating !== null}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-500/40 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${simulating === "legacy" ? "animate-spin" : ""}`} />
                  <span>Simulate 4.2s Lag</span>
                </button>

                {simulating === "legacy" && (
                  <div className="mt-3 max-w-xs">
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-rose-500 h-1.5 rounded-full transition-all duration-75"
                        style={{ width: `${legacyProgress}%` }}
                      />
                    </div>
                    <span className="block mt-1 text-rose-400 text-[11px] font-mono">
                      {legacyProgress < 100
                        ? `Waiting for server response... ${legacyProgress}%`
                        : "Finally loaded after 4.2s (User bounced!)"}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Metrics Bar */}
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 font-mono w-[1080px] max-w-[calc(100vw-3rem)]">
                <span>Bounce Rate: 68%</span>
                <span className="text-rose-400 font-semibold">Lost Revenue Daily</span>
              </div>
            </div>

            {/* THE DRAGGABLE DIVIDER HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] cursor-ew-resize z-30"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center font-bold text-xs select-none border-2 border-blue-600 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                ↔
              </div>
            </div>
          </div>
        </div>

        {/* 4-Metric Direct Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs text-slate-500 mb-2">
              <span>Mobile Page Speed</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-emerald-600">0.38s</span>
              <span className="text-xs text-slate-400 line-through">4.2s Legacy</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-semibold">91% faster load time</strong> eliminating mobile visitor drop-offs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs text-slate-500 mb-2">
              <span>Inquiry Response Time</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-emerald-600">&lt; 3 Seconds</span>
              <span className="text-xs text-slate-400 line-through">18+ Hours</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-semibold">AI answers immediately</strong>, qualifies the prospect, and logs contact details.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs text-slate-500 mb-2">
              <span>After-Hours Capture</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-emerald-600">100% 24/7</span>
              <span className="text-xs text-slate-400 line-through">0% Offline</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-semibold">Captures midnight leads</strong> directly to WhatsApp &amp; email notifications.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="text-xs text-slate-500 mb-2">
              <span>Google Core Web Vitals</span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-emerald-600">99 / 100</span>
              <span className="text-xs text-slate-400 line-through">38 / 100</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-semibold">Clean Next.js architecture</strong> boosting SEO rankings and Google Ad quality.
            </p>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mb-2">
              Want to see how fast your business site could be?
            </h3>
            <p className="text-slate-300 text-sm">
              We will run a free performance and AI automation audit on your existing website, or design a clean sub-second prototype for your new venture.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                if (onOpenConsultation) {
                  e.preventDefault();
                  onOpenConsultation();
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md shadow-blue-900/30 cursor-pointer"
            >
              <span>Request Free Website Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
