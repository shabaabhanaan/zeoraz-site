"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublishBusinessModal } from "@/components/organisms/PublishBusinessModal";
import {
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  ShoppingBag,
} from "lucide-react";

export default function PublishPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#131417] text-[#1E1F22] dark:text-[#FAF8F5] flex flex-col justify-between transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="border-b border-[#DDD6C8] dark:border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#FAF8F5]/90 dark:bg-[#131417]/90 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 text-[#1E1F22] dark:text-white font-extrabold text-xl uppercase tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 flex items-center justify-center text-[#1E1F22] dark:text-white">
            <Store className="w-4 h-4" />
          </div>
          <span>Zeoraz</span>
          <span className="text-[#7C7871] font-serif italic text-sm normal-case ml-1">Merchant Portal</span>
        </Link>
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-wider text-[#7C7871] hover:text-[#1E1F22] dark:hover:text-white transition-colors"
        >
          Return Home &rarr;
        </Link>
      </nav>

      {/* Main Showcase Hero */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center space-y-8 flex-1 flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#4A4741] dark:text-slate-300 text-xs font-bold uppercase tracking-[0.14em]">
          <Sparkles className="w-3.5 h-3.5 text-[#1E1F22] dark:text-blue-400" />
          <span>Instant Subdomain Provisioning &bull; Zero Hosting Setup</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-[1.05] text-[#1E1F22] dark:text-white">
          Launch &amp; Publish Your{" "}
          <span className="font-serif italic font-normal text-[#66625B] dark:text-slate-400">
            sales business
          </span>{" "}
          in 60 Seconds
        </h1>

        <p className="text-base sm:text-lg text-[#55524B] dark:text-slate-400 max-w-2xl leading-relaxed">
          Get your own verified branded storefront on Zeoraz with direct WhatsApp ordering, catalog management, and automated sales capture. (For technical software engineering, visit Zeoraz Labs).
        </p>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left pt-4">
          <div className="p-6 rounded-2xl bg-[#EAE4DA]/50 dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10 space-y-2">
            <Globe className="w-5 h-5 text-[#1E1F22] dark:text-blue-400" />
            <h3 className="font-bold text-sm text-[#1E1F22] dark:text-white uppercase tracking-wide">Brand Subdomain</h3>
            <p className="text-xs text-[#6F6B63] dark:text-slate-400 leading-relaxed">
              Get an instant URL like <code>yourbrand.zeoraz.com</code> with zero DNS configuration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#EAE4DA]/50 dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10 space-y-2">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-[#1E1F22] dark:text-white uppercase tracking-wide">Direct WhatsApp Sales</h3>
            <p className="text-xs text-[#6F6B63] dark:text-slate-400 leading-relaxed">
              Customers can trigger 1-click orders and inquiries straight to your phone.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#EAE4DA]/50 dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10 space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#1E1F22] dark:text-blue-400" />
            <h3 className="font-bold text-sm text-[#1E1F22] dark:text-white uppercase tracking-wide">Verified Badge</h3>
            <p className="text-xs text-[#6F6B63] dark:text-slate-400 leading-relaxed">
              Establish instant buyer trust with a Zeoraz-verified merchant badge.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] dark:bg-[#2563eb] dark:hover:bg-blue-500 font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Open Business Publisher Wizard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDD6C8] dark:border-white/10 py-6 text-center text-xs text-[#7C7871] dark:text-slate-500">
        &copy; {new Date().getFullYear()} Zeoraz Commerce Platform. All rights reserved. For deep software engineering R&amp;D, visit Zeoraz Labs.
      </footer>

      {/* Publishing Modal */}
      <PublishBusinessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
