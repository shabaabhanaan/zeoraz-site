"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublishBusinessModal } from "@/components/organisms/PublishBusinessModal";
import {
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Globe,
  Zap,
} from "lucide-react";

export default function PublishPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-[#030014]/60">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Store className="w-4 h-4" />
          </div>
          Zeoraz <span className="text-cyan-400 font-light text-sm ml-1">Merchant Portal</span>
        </Link>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Return Home &rarr;
        </Link>
      </nav>

      {/* Main Showcase Hero */}
      <main className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Instant Subdomain Provisioning &bull; Zero Hosting Config</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl">
          Launch & Publish Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Sales Business
          </span>{" "}
          in 60 Seconds
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Get your own verified branded storefront on Zeoraz with direct WhatsApp ordering, catalog management, and automated lead capture.
        </p>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left pt-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Brand Subdomain</h3>
            <p className="text-xs text-slate-400">
              Get an instant URL like <code>yourbrand.zeoraz.com</code> with zero DNS hassles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <Zap className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Direct WhatsApp Sales</h3>
            <p className="text-xs text-slate-400">
              Customers can trigger 1-click orders straight to your WhatsApp.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h3 className="font-bold text-sm text-white">Verified Badge</h3>
            <p className="text-xs text-slate-400">
              Establish instant credibility with a Zeoraz-verified storefront.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-2xl shadow-cyan-500/25 transition-all transform hover:scale-105"
          >
            Open Business Publisher Wizard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Zeoraz Digital Platform. All rights reserved.
      </footer>

      {/* Publishing Modal */}
      <PublishBusinessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
