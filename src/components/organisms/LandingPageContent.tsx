"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Code2,
  Palette,
  Compass,
  Star,
  MapPin,
  X,
  Menu,
  Send,
  Shield,
  ExternalLink,
  Store,
} from "lucide-react";
import Link from "next/link";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { PublishBusinessModal } from "@/components/organisms/PublishBusinessModal";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";

interface ProjectItem {
  id: string;
  title: string;
  category: "E-Commerce" | "Branding" | "Luxury Retail";
  image: string;
  year: string;
  client: string;
  desc: string;
}

const portfolioProjects: ProjectItem[] = [
  {
    id: "p1",
    title: "Verve High-Throughput E-Commerce",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
    year: "2025",
    client: "Verve Goods Global",
    desc: "Direct-to-consumer digital commerce flagship with instant checkout, live inventory sync, and multi-currency billing.",
  },
  {
    id: "p2",
    title: "Atelier Forme — Architectural Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    year: "2024",
    client: "Forme Architekten Zurich",
    desc: "Complete luxury brand identity, typographic design system, and editorial commerce showcase with minimalist aesthetics.",
  },
  {
    id: "p3",
    title: "Lumina Haute Horology Boutique",
    category: "Luxury Retail",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    year: "2025",
    client: "Lumina Horology Geneva",
    desc: "Bespoke digital timepiece boutique featuring verified merchant provenance, concierge reservation, and global checkout.",
  },
  {
    id: "p4",
    title: "Maison Royale — Haute Parfumerie",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    year: "2024",
    client: "Royale Parfums Paris",
    desc: "Direct-to-consumer fragrance storefront featuring custom scent profiles, localized pricing, and 1-click WhatsApp orders.",
  },
];

const capabilities = [
  {
    icon: Store,
    num: "01",
    title: "Turnkey Digital Storefronts",
    desc: "Launch branded storefronts with an instant .zeoraz.com subdomain, product catalogue, and integrated customer checkout.",
    tags: ["Live Subdomain", "Product Catalogue", "Mobile Checkout", "Merchant Dashboard"],
  },
  {
    icon: Palette,
    num: "02",
    title: "Brand Identity & Commerce Design",
    desc: "Timeless visual systems, editorial lookbooks, typography standards, and high-conversion storefront aesthetics.",
    tags: ["Visual Identity", "Editorial Lookbooks", "Storefront UI/UX", "Brand Guidelines"],
  },
  {
    icon: Compass,
    num: "03",
    title: "Global E-Commerce Scaling",
    desc: "Multi-currency sales, seamless Stripe payment orchestration, WhatsApp ordering, and zero-friction checkout funnels.",
    tags: ["Multi-Currency", "WhatsApp Ordering", "Stripe Checkout", "Conversion Optimization"],
  },
  {
    icon: Layers,
    num: "04",
    title: "Curated Marketplace & Distribution",
    desc: "Connect directly with global buyers on the Zeoraz Marketplace, scaling physical luxury collections and digital blueprints.",
    tags: ["Marketplace Listing", "Merchant Scaling", "Luxury Retail", "Wholesale & Direct"],
  },
];

const teamMembers = [
  {
    name: "Elena Rostova",
    role: "Principal Design Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Guiding brand architecture, typography standards, and luxury storefront design across global client engagements.",
  },
  {
    name: "Marcus Vance",
    role: "Head of Commerce Operations & Growth",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Pioneering high-velocity merchant storefronts, direct checkout funnels, and global retail scaling.",
  },
  {
    name: "Sophia Chen",
    role: "Product Strategy & Commerce Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Translating complex retail operations and direct-to-consumer models into high-conversion digital realities.",
  },
];

const testimonials = [
  {
    quote: "Zeoraz delivered our entire digital commerce storefront in three weeks. Their conversion focus, typography discipline, and attention to detail are unmatched.",
    author: "Julian Thorne",
    role: "CEO & Co-founder",
    company: "Verve Goods Global",
  },
  {
    quote: "From our brand identity to our multi-channel storefront expansion, Zeoraz operates with exceptional clarity and execution velocity. A true partner.",
    author: "Claire Delacroix",
    role: "Managing Director",
    company: "L'Atelier Minimal",
  },
];

export const LandingPageContent = () => {
  const [isTalkToUsOpen, setIsTalkToUsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Inquiry form states
  const [selectedServices, setSelectedServices] = useState<string[]>(["Digital Storefront Launch"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$15k - $30k");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      const workspace = params.get("workspace") || "Default Workspace";
      window.history.replaceState({}, document.title, window.location.pathname);
      setToastMessage(`Workspace initialized for ${workspace}!`);
      setTimeout(() => setToastMessage(null), 4500);
    } else if (params.get("error")) {
      const errorMsg = params.get("error");
      setToastMessage(`Login Notice: ${errorMsg}`);
      setTimeout(() => setToastMessage(null), 4500);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          serviceNeeded: selectedServices.join(", "),
          company: `Budget: ${selectedBudget}`,
          message: contactMessage,
        }),
      });
    } catch {
      // ignore network errors for mock resilience
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const filteredProjects = activeCategory === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#F3F0EA] text-[#1E1F22] selection:bg-amber-200 selection:text-stone-900 font-sans transition-colors duration-300">
      {/* Editorial Minimalist Navigation */}
      <nav className="bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#E6E1D7] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Zeoraz Brand Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#1E1F22] uppercase">
              ZEORAZ<span className="text-[#8E8B83] font-serif italic text-lg ml-1">Studio</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E1F22]" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#5A5852]">
            <a href="#works" className="hover:text-[#1E1F22] transition-colors">Works</a>
            <Link href="/marketplace" className="hover:text-[#1E1F22] transition-colors flex items-center gap-1.5">
              <span>Marketplace</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E8E2D6] text-[#4A4741] font-bold">New</span>
            </Link>
            <a href="#about" className="hover:text-[#1E1F22] transition-colors">About</a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-4 py-2 rounded-full border border-[#DDD6C8] hover:bg-[#EBE5DA] text-[#4F4C45] text-xs font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Publish Store</span>
            </button>
            <button
              onClick={() => setIsTalkToUsOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Talk to Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1E1F22] hover:bg-[#EBE6DC] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E6E1D7] bg-[#F7F4EE] px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wide text-[#3E3D39]">
                <a href="#works" onClick={() => setMobileMenuOpen(false)}>Works</a>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              </div>
              <div className="pt-3 border-t border-[#E4DFD5] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsPublishModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full border border-[#DDD6C8] text-xs font-bold text-center block"
                >
                  Publish Store
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTalkToUsOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-[#1E1F22] text-[#FAF8F5] text-xs font-bold text-center block tracking-wide"
                >
                  Talk to Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Landing Content */}
      <main className="flex-1">
        {/* HERO SECTION (GREY, BEIGE & WHITE STYLE) */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3]">
          <div className="max-w-7xl mx-auto">
            {/* Top pill metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4D9] border border-[#DDD6C9] text-xs font-bold uppercase tracking-[0.18em] text-[#4A4741]">
                <span className="w-2 h-2 rounded-full bg-[#1E1F22] animate-pulse" />
                Modern Commerce Platform &amp; Digital Storefronts — Est. 2021
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#86827B]">
                New York / Zurich / Tokyo
              </span>
            </div>

            {/* Giant Editorial Headline */}
            <div className="mb-10">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-[#1E1F22] uppercase leading-[0.95]">
                WE LAUNCH <span className="font-serif italic font-normal text-[#66625B]">modern</span> <br />
                DIGITAL COMMERCE
              </h1>
            </div>

            {/* Subhead + Action buttons split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pt-4 border-t border-[#E0D8CB]">
              <div className="lg:col-span-7">
                <p className="text-lg sm:text-xl md:text-2xl text-[#53504A] font-normal leading-relaxed max-w-2xl">
                  Zeoraz is a premier business and digital commerce ecosystem. We launch high-conversion storefronts on custom subdomains, curate luxury retail collections, and empower modern merchants to scale globally.
                </p>
                <p className="text-xs sm:text-sm text-[#7D7971] mt-2 font-medium">
                  Looking for technical software engineering or deep tech R&amp;D? Visit <strong className="text-[#1E1F22]">Zeoraz Labs</strong>.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
                <button
                  onClick={() => setIsPublishModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Publish Store</span>
                </button>
                <Link
                  href="/marketplace"
                  className="px-6 py-3.5 rounded-full bg-[#E8E2D7] hover:bg-[#DCD5C8] text-[#1E1F22] border border-[#D5CDC0] text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center gap-2"
                >
                  <span>Explore Marketplace</span>
                </Link>
              </div>
            </div>

            {/* Hero Visual Banner Showcase */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DFD8CC] aspect-[16/9] md:aspect-[21/9] bg-[#1E1F22]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
                alt="Zeoraz Commerce"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating capability pill cards */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4 text-white">
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    01 / Digital Storefronts
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    02 / Multi-Currency Checkout
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    03 / Luxury Retail Marketplace
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-[#E0DCCE] uppercase tracking-widest font-mono">
                    SCROLL TO EXPLORE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO / PHILOSOPHY / STATS */}
        <section id="about" className="py-20 md:py-28 px-6 lg:px-12 bg-[#EDE8E0] border-y border-[#DDD6C8]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#78746D] block mb-3">
                  Philosophy & Ethos
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1F22] uppercase">
                  Design is purpose rendered visible.
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-6 text-[#4F4C46] text-base sm:text-lg leading-relaxed">
                <p>
                  We operate on the conviction that excessive ornamentation dilutes impact. True luxury in commerce is found in clarity, unhurried pacing, impeccable typography, and high-conversion storefront design.
                </p>
                <p className="text-sm sm:text-base text-[#6E6A63]">
                  Whether orchestrating a complete brand rebirth, launching live merchant subdomains, or curating direct-to-consumer luxury retail, we reject complexity in favor of seamless commerce experiences that convert.
                </p>
              </div>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#DDD6C8]">
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  100+
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Stores Published
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  100%
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Merchant Satisfaction
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  60s
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Storefront Launch
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  $0
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Bloat. Pure Commerce.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES / SERVICES */}
        <section id="capabilities" className="py-20 md:py-28 px-6 lg:px-12 bg-[#F3EFE7]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-[#DFD8CC]">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7D7971] block mb-2">
                  What We Do
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1F22] uppercase">
                  Commerce Capabilities
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6C6861] max-w-md">
                Unifying digital storefronts, brand identity, and luxury commerce distribution in one integrated platform.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {capabilities.map((srv) => {
                const IconComponent = srv.icon;
                return (
                  <div
                    key={srv.num}
                    className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E3DCD0] shadow-sm hover:shadow-xl hover:border-[#1E1F22]/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-xs font-mono font-bold text-[#8C8880] tracking-widest">
                          {srv.num} //
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-[#EDE7DD] text-[#1E1F22] flex items-center justify-center group-hover:bg-[#1E1F22] group-hover:text-[#FAF8F5] transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-[#1E1F22] mb-3 group-hover:text-black">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-[#5D5A53] leading-relaxed mb-8">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-[#ECE5D9] flex flex-wrap gap-2">
                      {srv.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[#EFEAE1] text-[#4F4C45] text-[11px] font-semibold tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SELECTED WORKS / PORTFOLIO */}
        <section id="works" className="py-20 md:py-28 px-6 lg:px-12 bg-[#EDE7DF] border-y border-[#DCD5C7]">
          <div className="max-w-7xl mx-auto">
            {/* Header + Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C7871] block mb-2">
                  Portfolio Gallery
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1F22] uppercase">
                  Selected Works
                </h2>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {["All", "E-Commerce", "Branding", "Luxury Retail"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#1E1F22] text-[#FAF8F5] shadow-sm"
                        : "bg-[#F7F4EE] text-[#55524B] hover:bg-[#E2DDD2] border border-[#DDD6C8]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className="group rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#DFD8CC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#1E1F22]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-[#FAF8F5]/90 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#1E1F22] shadow-sm">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      </div>

                      {/* Content block */}
                      <div className="p-6 sm:p-8">
                        <div className="flex justify-between items-center text-xs font-mono text-[#8C8880] mb-2">
                          <span>{project.client}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1E1F22] group-hover:text-black mb-3">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5B5851] leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="px-6 sm:px-8 pb-6 pt-2">
                      <button
                        onClick={() => setIsTalkToUsOpen(true)}
                        className="w-full py-3 rounded-full bg-[#EFEAE1] hover:bg-[#1E1F22] text-[#1E1F22] hover:text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Request Architecture Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* MARKETPLACE HIGHLIGHT BANNER */}
        <section className="py-16 px-6 lg:px-12 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto rounded-3xl bg-[#EAE4DA] border border-[#DDD5C7] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider text-[#57544C]">
                <Sparkles className="w-3.5 h-3.5 text-[#1E1F22]" /> Zeoraz Architecture Marketplace
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1E1F22] uppercase tracking-tight">
                Production-Ready Next.js Blueprints
              </h3>
              <p className="text-xs sm:text-sm text-[#5F5B54] leading-relaxed">
                Accelerate time-to-market with tested enterprise architectures, SaaS starter kits, and curated agency templates like Zeoraz Studio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/marketplace"
                className="px-6 py-3 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Browse Marketplace</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CLIENT TESTIMONIALS */}
        <section className="py-20 md:py-24 px-6 lg:px-12 bg-[#F6F3EC]">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C7871] block mb-3 text-center">
              Trust & Partnerships
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-center text-[#1E1F22] uppercase tracking-tight mb-16">
              What Founders Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-[#E3DDD1] shadow-sm flex flex-col justify-between"
                >
                  <div className="mb-8">
                    <div className="flex gap-1 text-[#1E1F22] mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-[#1E1F22]" />
                      ))}
                    </div>
                    <blockquote className="text-base sm:text-lg text-[#3E3C36] font-serif italic leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-[#EAE3D6] flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#1E1F22]">{t.author}</h4>
                      <p className="text-xs text-[#7A766F]">{t.role}, {t.company}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#9D988E] uppercase tracking-widest">
                      Verified Client
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM / LEADERSHIP */}
        <section id="team" className="py-20 md:py-28 px-6 lg:px-12 bg-[#EFE9E0] border-t border-[#DFD8CC]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-[#D8D1C3]">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7E7A72] block mb-2">
                  Studio Leadership
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1F22] uppercase">
                  Craft Practitioners
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6A665E] max-w-sm">
                Senior architects and art directors who steer your project from first sketch through global deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="rounded-3xl overflow-hidden bg-[#FAF8F5] border border-[#E3DCD0] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#1E1F22]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#1E1F22]">{member.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8A857D] mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#5E5A53] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCOVERY BRIEF / CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 px-6 lg:px-12 bg-[#FAF8F5]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#7C7870] block mb-3">
                Let&apos;s Build Together
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1F22] uppercase mb-4">
                Initiate a Discovery Brief
              </h2>
              <p className="text-sm sm:text-base text-[#68645C] max-w-xl mx-auto">
                Have an ambitious commerce brand, storefront launch, or retail scaling goal in mind? Tell us about your timeline and objectives. (For deep software engineering R&amp;D, visit Zeoraz Labs).
              </p>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-8 bg-[#F4F0E8] p-8 sm:p-12 rounded-3xl border border-[#DFD8CB] shadow-md">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#55524B] mb-3">
                    01 / Scope of Services Needed
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "Digital Storefront Launch",
                      "Brand Identity",
                      "E-Commerce Scaling",
                      "Marketplace Listing",
                      "WhatsApp Ordering",
                      "Wholesale & Retail Operations",
                    ].map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          selectedServices.includes(srv)
                            ? "bg-[#1E1F22] text-[#FAF8F5] shadow-sm"
                            : "bg-[#FAF8F5] text-[#524F47] hover:bg-[#EBE5DA] border border-[#DDD5C7]"
                        }`}
                      >
                        {selectedServices.includes(srv) ? "✓ " : ""}{srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#55524B] mb-3">
                    02 / Anticipated Investment
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["$5k - $15k", "$15k - $30k", "$30k - $60k", "$60k+"].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setSelectedBudget(tier)}
                        className={`py-3 px-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer ${
                          selectedBudget === tier
                            ? "bg-[#1E1F22] text-[#FAF8F5] shadow-sm"
                            : "bg-[#FAF8F5] text-[#524F47] hover:bg-[#EBE5DA] border border-[#DDD5C7]"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#55524B] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#1E1F22] placeholder-[#A39E94] focus:outline-none focus:ring-2 focus:ring-[#1E1F22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#55524B] mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#1E1F22] placeholder-[#A39E94] focus:outline-none focus:ring-2 focus:ring-[#1E1F22]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[#55524B] mb-2">
                    Project Overview & Ambition
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your brand, current challenges, and ideal timeline..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DDD5C7] text-sm text-[#1E1F22] placeholder-[#A39E94] focus:outline-none focus:ring-2 focus:ring-[#1E1F22]"
                  />
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Dispatching..." : "Submit Discovery Inquiry"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-[#86827B] text-center mt-3">
                    We sign mutual NDAs before reviewing proprietary architectures. Response within 24 business hours.
                  </p>
                </div>
              </form>
            ) : (
              <div className="bg-[#F4F0E8] p-12 rounded-3xl border border-[#DFD8CB] text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1E1F22] text-[#FAF8F5] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#1E1F22] uppercase">
                  Discovery Brief Received
                </h3>
                <p className="text-sm text-[#5D5952] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1E1F22]">{contactName}</strong>. Our commerce directors will review your brief ({selectedServices.join(", ")}) and follow up at <strong className="text-[#1E1F22]">{contactEmail}</strong> promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setContactName("");
                      setContactEmail("");
                      setContactMessage("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#E5DFD4] hover:bg-[#D9D2C6] text-[#1E1F22] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#141517] text-[#D8D4CC] pt-16 pb-12 px-6 lg:px-12 border-t border-[#26282C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2C2E33]">
            {/* Brand statement */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-[-0.04em] text-white uppercase">
                  ZEORAZ<span className="text-[#99968F] font-serif italic text-xl ml-1">Commerce</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-xs sm:text-sm text-[#9A968F] max-w-sm leading-relaxed">
                Modern commerce platform and digital storefront ecosystem. Launching verified merchant stores and curating luxury retail.
              </p>
              <p className="text-[11px] text-[#7C7871]">
                For deep software engineering and technical R&amp;D, visit <strong>Zeoraz Labs</strong>.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#8A867E]">
                <MapPin className="w-3.5 h-3.5 text-[#C4C0B6]" />
                <span>Manhattan • Zurich • Ginza Tokyo</span>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">Index</span>
              <div className="flex flex-col space-y-2 text-xs text-[#9E9B93]">
                <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
                <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
                <a href="#works" className="hover:text-white transition-colors">Selected Works</a>
                <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
                <a href="#team" className="hover:text-white transition-colors">Studio Leadership</a>
                <a href="#contact" className="hover:text-white transition-colors">Discovery Brief</a>
              </div>
            </div>

            {/* Architecture Specs */}
            <div className="md:col-span-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">Architecture Specs</span>
              <div className="p-4 rounded-2xl bg-[#1D1E22] border border-[#2D3035] text-xs text-[#B5B2AA] space-y-2">
                <div className="flex justify-between">
                  <span>Platform:</span>
                  <span className="text-white font-mono">Next.js 16 App Router</span>
                </div>
                <div className="flex justify-between">
                  <span>Design Aesthetic:</span>
                  <span className="text-white font-mono">Grey, Beige & White Minimalist</span>
                </div>
                <div className="flex justify-between">
                  <span>Runtime:</span>
                  <span className="text-white font-mono">Sub-100ms Edge Optimized</span>
                </div>
              </div>
              <button
                onClick={() => setIsTalkToUsOpen(true)}
                className="w-full py-3 rounded-full bg-[#E8E4DC] hover:bg-white text-[#141517] text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7B7770]">
            <p>© {new Date().getFullYear()} Zeoraz Technologies. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <a href="#" className="hover:text-white transition-colors">Back to Top ↑</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Consultation Modal */}
      <TalkToUsModal
        isOpen={isTalkToUsOpen}
        onClose={() => setIsTalkToUsOpen(false)}
      />

      {/* Interactive Publish Business Modal */}
      <PublishBusinessModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 text-white shadow-2xl max-w-sm transition-all duration-300">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb]/20 text-[#2563eb]">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              Notice <Sparkles className="h-3 w-3 text-blue-400" />
            </h5>
            <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Floating Chatbot & WhatsApp */}
      <ChatbotWidget />
      <WhatsAppWidget />
    </div>
  );
};
