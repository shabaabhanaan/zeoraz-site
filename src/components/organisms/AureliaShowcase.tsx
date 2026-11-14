"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  Layers,
  MapPin,
  Maximize2,
  Phone,
  Shield,
  Sparkles,
  X,
} from "lucide-react";

interface SpaceItem {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  sqft: string;
  features: string[];
}

const SPACES: SpaceItem[] = [
  {
    id: "wellness",
    name: "Movement & Pilates Pavilion",
    category: "Wellness & Recovery",
    subtitle: "Restorative mind & body sanctuary",
    description:
      "A sunlit private wellness sanctuary crafted from honed travertine and natural linen. Features custom handcrafted oak reformer pilates apparatus, dedicated meditation daybed, and floor-to-ceiling glass framing mature palm foliage and the distant skyline.",
    image: "/images/aurelia/wellness.jpg",
    sqft: "1,150 sq.ft",
    features: [
      "Custom handcrafted oak reformer",
      "Concealed perimeter warm cove lighting",
      "Panoramic triple-glazed acoustic glass",
      "Integrated HEPA air purification",
    ],
  },
  {
    id: "kitchen",
    name: "Travertine Culinary & Dining Suite",
    category: "Living & Entertaining",
    subtitle: "Monolithic stone & fluted millwork",
    description:
      "The heart of social gathering. A monolithic honed travertine waterfall island paired with custom fluted oak cabinetry, Gaggenau concealed appliances, and a solid oak dining table opening directly to a private garden terrace.",
    image: "/images/aurelia/kitchen.jpg",
    sqft: "1,420 sq.ft",
    features: [
      "Monolithic honed travertine waterfall island",
      "Fluted natural oak millwork",
      "Sub-Zero & Gaggenau integrated suite",
      "Direct terrace slider transition",
    ],
  },
  {
    id: "courtyard",
    name: "Garden Courtyard & Water Lounge",
    category: "Outdoor Living",
    subtitle: "Infinity reflection pool & sunken fire pit",
    description:
      "An open-air retreat centered around a mirror-like limestone reflection pool. Sunken lounge seating with natural linen cushions surrounds a sculptural bronze fire bowl, framed by century-old olive trees and warm architectural uplighting.",
    image: "/images/aurelia/courtyard.jpg",
    sqft: "3,800 sq.ft",
    features: [
      "Stone-edged reflection pool",
      "Sunken 12-person fire pit lounge",
      "Specimen olive & palm canopy",
      "Automated mood lighting scenes",
    ],
  },
  {
    id: "bedroom",
    name: "Master Residence Sanctuary",
    category: "Private Quarters",
    subtitle: "Textured limestone & twilight views",
    description:
      "The primary suite pairs quiet minimalism with tactile warmth. A low-profile platform bed is anchored by a textured limestone slab and fluted timber wall, flanked by panoramic glass with commanding twilight city skyline views.",
    image: "/images/aurelia/bedroom.jpg",
    sqft: "1,280 sq.ft",
    features: [
      "Honed limestone accent wall with LED cove",
      "Walk-in dressing room with fluted oak",
      "Dual en-suite spa bath with soaking tub",
      "Private corner cantilevered balcony",
    ],
  },
  {
    id: "detail",
    name: "Artisanal Stone & Bronze Details",
    category: "Materiality",
    subtitle: "Fluted travertine & brushed bronze reveals",
    description:
      "Every corner at Aurelia demonstrates quiet architectural discipline. Vertically fluted travertine panels meet brushed bronze trim with millimetric precision, celebrating the tactile honesty of timeless Mediterranean materials.",
    image: "/images/aurelia/detail.jpg",
    sqft: "Tactile Finish",
    features: [
      "Hand-selected Roman travertine",
      "Bespoke brushed architectural bronze",
      "Acoustic micro-perforated wood paneling",
      "Museum-grade shadow gap reveals",
    ],
  },
  {
    id: "hero",
    name: "Terraces & Facade Architecture",
    category: "Exterior & Architecture",
    subtitle: "Deep limestone cantilevers & glass balustrades",
    description:
      "Sculpted by sunlight. Aurelia's exterior is characterized by generous cantilevered limestone slabs that shade expansive glass walls, creating deep private outdoor terraces for every single residence.",
    image: "/images/aurelia/hero.jpg",
    sqft: "Boutique Development",
    features: [
      "Overhanging cantilevered sun terraces",
      "Floor-to-ceiling ultra-clear glass",
      "Low-carbon architectural stone facade",
      "Private subterranean 3-bay parking",
    ],
  },
];

export function AureliaShowcase() {
  const [activeSpaceId, setActiveSpaceId] = useState<string>("wellness");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residenceType: "Sky Penthouse (6,200 sq.ft)",
    timeline: "Immediate / 2026",
    notes: "",
  });

  const activeSpace = SPACES.find((s) => s.id === activeSpaceId) || SPACES[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: `Aurelia VIP Inquiry - ${formData.residenceType}`,
          message: `Inquiry for Aurelia Residences: Preferred Timeline: ${formData.timeline}. Notes: ${formData.notes || "None"}`,
        }),
      });
    } catch {
      // Graceful fallback
    }
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#221F1B] font-sans selection:bg-[#E8DFC8] selection:text-[#1F1B16] antialiased">
      {/* ─── TOP AGENCY CASE STUDY STRIP ───────────────────────────────────── */}
      <div className="bg-[#1C1917] text-white px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono text-[11px]">
              Flagship Concept Project · Engineered by <strong className="text-white font-semibold">Zeoraz</strong>
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-slate-400 text-[11px]">
              Sub-second Next.js 16 · 99/100 Lighthouse
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              <span>Build a site like this for your business</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors text-[11px] underline underline-offset-2"
            >
              Back to Zeoraz
            </Link>
          </div>
        </div>
      </div>

      {/* ─── NAVIGATION ────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D2] px-6 lg:px-12 py-5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <Link
              href="#hero"
              className="font-serif text-2xl tracking-[0.25em] font-normal uppercase text-[#1C1917]"
            >
              A U R E L I A
            </Link>
            <span className="hidden md:inline-block text-[10px] tracking-[0.2em] uppercase text-[#8C8275] border-l border-[#D6CDBC] pl-3">
              Private Residences
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-10 text-xs tracking-[0.18em] uppercase text-[#6E6456]">
            <a href="#hero" className="hover:text-[#1C1917] transition-colors">
              Overview
            </a>
            <a href="#about" className="hover:text-[#1C1917] transition-colors">
              Philosophy
            </a>
            <a href="#spaces" className="hover:text-[#1C1917] transition-colors">
              Spaces
            </a>
            <a href="#residences" className="hover:text-[#1C1917] transition-colors">
              Penthouses
            </a>
            <a href="#location" className="hover:text-[#1C1917] transition-colors">
              Location
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#342F2B] text-white text-xs tracking-wider uppercase font-medium transition-all cursor-pointer shadow-xs"
            >
              Inquire / Viewing
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION (Matches Reference Video Frame 1) ────────────────── */}
      <section id="hero" className="relative pt-8 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Card Container */}
          <div className="relative rounded-3xl overflow-hidden bg-[#241F1A] shadow-2xl border border-[#DCD3C0]/40">
            {/* GIANT TYPOGRAPHY IN BACKGROUND */}
            <div className="absolute top-4 sm:top-8 inset-x-0 z-0 flex justify-center pointer-events-none select-none">
              <span className="font-serif text-[18vw] leading-none tracking-[0.12em] font-normal text-white/20 whitespace-nowrap">
                AURELIA
              </span>
            </div>

            {/* HERO IMAGE */}
            <div className="relative z-10 w-full h-[58vh] sm:h-[72vh] lg:h-[82vh]">
              <Image
                src="/images/aurelia/hero.jpg"
                alt="Aurelia Private Residences Exterior Architecture"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              {/* Subtle Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-[#141210]/30" />
            </div>

            {/* HERO CONTENT OVERLAY */}
            <div className="absolute bottom-0 inset-x-0 z-20 p-6 sm:p-12 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] tracking-[0.2em] uppercase font-mono text-white border border-white/20">
                  Emirates Hills · Private Sanctuary
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-white">
                  Shaped by Sunlight &amp; Quiet Calm.
                </h1>
                <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                  Eighteen bespoke private residences designed for lasting stillness, layered with cantilevered limestone terraces and panoramic horizon views.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F3EFE6] text-[#1C1917] font-medium text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer"
                >
                  Schedule Private Showing
                </button>
                <a
                  href="#spaces"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium text-xs tracking-wider uppercase border border-white/20 transition-all cursor-pointer"
                >
                  Explore Spaces
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT / PHILOSOPHY SECTION (Matches Reference Video Frame 3) ──── */}
      <section id="about" className="py-20 sm:py-28 px-6 lg:px-12 bg-[#F5F1E8] border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div className="flex items-center gap-2 mb-10 text-xs tracking-[0.2em] uppercase text-[#8C806F]">
            <span className="text-[#B39352] font-mono">[+]</span>
            <span>About Aurelia</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Thumbnail preview + Editorial Stats */}
            <div className="lg:col-span-5 space-y-10">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-[#DCD3C0]">
                <Image
                  src="/images/aurelia/bedroom.jpg"
                  alt="Aurelia Private Master Bedroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* 3 Architectural Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#DED4C1]">
                <div>
                  <span className="font-serif text-4xl sm:text-5xl text-[#1C1917] block leading-none mb-1">
                    18
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#736858] font-mono block">
                    Private Residences
                  </span>
                </div>
                <div>
                  <span className="font-serif text-4xl sm:text-5xl text-[#1C1917] block leading-none mb-1">
                    5
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#736858] font-mono block">
                    Residential Levels
                  </span>
                </div>
                <div>
                  <span className="font-serif text-4xl sm:text-5xl text-[#1C1917] block leading-none mb-1">
                    24/7
                  </span>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#736858] font-mono block">
                    Concierge &amp; Valet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Text + Dual Image Grid */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <p className="font-serif text-2xl sm:text-3xl text-[#1C1917] leading-snug">
                  Aurelia is a modern residential address shaped by warm limestone calm, refined architecture, and the quiet beauty of everyday living.
                </p>
                <p className="text-sm sm:text-base text-[#615748] leading-relaxed">
                  More than a place to stay, it is designed to change how home feels from the moment you arrive. Inspired by natural travertine, soft golden hour illumination, and the rhythm of private family life, Aurelia brings together spacious residences, calm outdoor spaces, and thoughtful details that make daily living feel considered.
                </p>
                <p className="text-xs sm:text-sm text-[#7D7160] leading-relaxed">
                  Every line, texture, and view is designed with purpose, not for excess, but to make home feel lasting, personal, and deeply comfortable.
                </p>
              </div>

              {/* Dual Secondary Images */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xs border border-[#DCD3C0]">
                  <Image
                    src="/images/aurelia/hero.jpg"
                    alt="Aurelia Cantilever Terraces"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] font-mono tracking-wider uppercase">
                    Cantilevered Terraces
                  </div>
                </div>
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xs border border-[#DCD3C0]">
                  <Image
                    src="/images/aurelia/detail.jpg"
                    alt="Aurelia Travertine Stone Detail"
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] font-mono tracking-wider uppercase">
                    Honed Travertine &amp; Bronze
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE BENTO GALLERY (Matches Reference Video Frames 4, 5, 6) ─ */}
      <section id="spaces" className="py-20 sm:py-32 px-6 lg:px-12 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8C806F]">
                <span className="text-[#B39352] font-mono">[+]</span>
                <span>Private Retreat</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1917]">
                A Slower Way to Live
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#665C4E] leading-relaxed">
              Designed as a quiet retreat within the city, Aurelia brings together spaces for rest, movement, gathering, and reflection. Hover or click any space to preview.
            </p>
          </div>

          {/* THE BENTO INTERACTIVE CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDE: ASYMMETRIC THUMBNAIL GRID (6 Spaces) */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
              {SPACES.map((space) => {
                const isActive = activeSpaceId === space.id;
                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => setActiveSpaceId(space.id)}
                    onMouseEnter={() => setActiveSpaceId(space.id)}
                    className={`group relative text-left rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                      isActive
                        ? "border-[#1C1917] ring-2 ring-[#1C1917]/20 shadow-lg scale-[1.02]"
                        : "border-[#E5DDD0] hover:border-[#8C806F] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-4/3 w-full bg-[#E8E2D5]">
                      <Image
                        src={space.image}
                        alt={space.name}
                        fill
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase ${
                            isActive
                              ? "bg-white text-[#1C1917] font-semibold"
                              : "bg-black/50 text-white/90"
                          }`}
                        >
                          {space.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-white text-xs font-medium block truncate">
                          {space.name}
                        </span>
                        <span className="text-white/70 text-[10px] font-mono block">
                          {space.sqft}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* RIGHT SIDE: LARGE DYNAMIC PREVIEW HERO (Smooth Crossfade) */}
            <div className="lg:col-span-7 sticky top-28">
              <div className="relative rounded-3xl overflow-hidden bg-[#241F1A] border border-[#DCD3C0] shadow-xl">
                {/* Large Preview Image */}
                <div className="relative w-full aspect-16/11 sm:aspect-16/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpace.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeSpace.image}
                        alt={activeSpace.name}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-mono tracking-wider uppercase border border-white/20">
                      {activeSpace.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-mono">
                      {activeSpace.sqft}
                    </span>
                  </div>
                </div>

                {/* Description & Feature Checklist */}
                <div className="p-6 sm:p-8 bg-[#1F1C18] text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-1">
                        {activeSpace.name}
                      </h3>
                      <p className="text-xs text-[#C2B59B] font-mono tracking-wide">
                        {activeSpace.subtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 rounded-full bg-white text-[#1C1917] hover:bg-[#F3EFE6] text-xs font-medium tracking-wider uppercase shrink-0 transition-colors cursor-pointer"
                    >
                      Inquire on this Space
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {activeSpace.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeSpace.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESIDENCES / PENTHOUSES SPECIFICATIONS ────────────────────────── */}
      <section id="residences" className="py-20 sm:py-28 px-6 lg:px-12 bg-[#F5F1E8] border-t border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#8C806F] block mb-2">
              Limited Availability
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1917] mb-3">
              Residential Collections
            </h2>
            <p className="text-xs sm:text-sm text-[#665C4E] leading-relaxed">
              Eighteen residences arranged across five boutique floors. Every residence features dedicated private elevator lobbies and direct horizon views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Collection 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2D9C8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#F5F1E8] text-[#736858] text-[10px] font-mono tracking-wider uppercase">
                  Floors 1 – 2
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Garden Duplex Villa
                </h3>
                <p className="text-xs text-[#6E6456] leading-relaxed">
                  Double-height living space with private reflection courtyard, heated plunge pool, and dedicated private street access.
                </p>
                <div className="pt-4 border-t border-[#F0EAE0] space-y-2 text-xs text-[#52493D]">
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Total Area</span>
                    <strong className="font-mono">4,850 sq.ft</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Bedrooms</span>
                    <strong className="font-mono">4 En-Suite</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Private Parking</span>
                    <strong className="font-mono">3 Underground Bays</strong>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, residenceType: "Garden Duplex Villa" }));
                  setIsModalOpen(true);
                }}
                className="mt-8 w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#342F2B] text-white text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer text-center"
              >
                Request Floor Plan
              </button>
            </div>

            {/* Collection 2 (Featured) */}
            <div className="bg-[#1C1917] text-white rounded-3xl p-8 border border-[#3D3730] shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-[#B39352] text-[#1C1917] font-semibold text-[10px] tracking-wider uppercase">
                  Flagship
                </span>
              </div>
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#C7BEAF] text-[10px] font-mono tracking-wider uppercase">
                  Floor 5 · Top Tier
                </span>
                <h3 className="font-serif text-2xl text-white">
                  The Sky Penthouse
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  A full-floor private penthouse with 360-degree wrapped limestone terraces, rooftop sky pavilion, and infinity pool overlooking the city.
                </p>
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300 font-light">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Total Area</span>
                    <strong className="font-mono text-white">6,200 sq.ft</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Bedrooms</span>
                    <strong className="font-mono text-white">5 En-Suite + Staff</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Private Rooftop</span>
                    <strong className="font-mono text-[#D4AF37]">Included (Heated Pool)</strong>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, residenceType: "The Sky Penthouse" }));
                  setIsModalOpen(true);
                }}
                className="mt-8 w-full py-3 rounded-full bg-[#B39352] hover:bg-[#C9A965] text-[#1C1917] font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer text-center"
              >
                Request Penthouse Dossier
              </button>
            </div>

            {/* Collection 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2D9C8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#F5F1E8] text-[#736858] text-[10px] font-mono tracking-wider uppercase">
                  Floors 3 – 4
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Horizon Terrace Residence
                </h3>
                <p className="text-xs text-[#6E6456] leading-relaxed">
                  Generous single-level floor plan with deep cantilevered limestone terraces off the master suite, kitchen, and salon.
                </p>
                <div className="pt-4 border-t border-[#F0EAE0] space-y-2 text-xs text-[#52493D]">
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Total Area</span>
                    <strong className="font-mono">3,900 sq.ft</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Bedrooms</span>
                    <strong className="font-mono">3 En-Suite</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F7F3EB]">
                    <span>Elevator Entry</span>
                    <strong className="font-mono">Direct Keycard</strong>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, residenceType: "Horizon Terrace Residence" }));
                  setIsModalOpen(true);
                }}
                className="mt-8 w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#342F2B] text-white text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer text-center"
              >
                Request Floor Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCATION & INQUIRY CALL TO ACTION ──────────────────────────────── */}
      <section id="location" className="py-20 sm:py-28 px-6 lg:px-12 bg-[#221E19] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#C7B591]">
              Location &amp; Connectivity
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              An Address of Uncompromised Seclusion.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
              Situated within the private gates of the Emirates Hills corridor, Aurelia offers absolute tranquility minutes from the city&apos;s cultural and financial center.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[#C7B591] font-serif text-2xl block mb-1">08 min</span>
                <span className="text-slate-300">Private Beach Clubs</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[#C7B591] font-serif text-2xl block mb-1">12 min</span>
                <span className="text-slate-300">Financial District</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[#C7B591] font-serif text-2xl block mb-1">20 min</span>
                <span className="text-slate-300">International Airport</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="font-serif text-2xl text-white mb-2">Schedule a Private Showing</h3>
            <p className="text-xs text-slate-300 mb-6 font-light">
              Private viewings of our scale architecture model and finishes gallery are available by appointment only.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 rounded-full bg-white text-[#1C1917] hover:bg-[#F3EFE6] text-xs font-semibold tracking-wider uppercase transition-all shadow-lg cursor-pointer mb-3"
            >
              Inquire With Private Sales
            </button>
            <a
              href="https://wa.me/94762070183?text=Hello%20Aurelia%20Private%20Residences%2C%20I%20would%20like%20to%20request%20information%20about%20a%20private%20showing."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 text-xs font-medium tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp VIP</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 lg:px-12 bg-[#171412] text-white/60 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-lg tracking-[0.2em] font-normal uppercase text-white block">
              A U R E L I A
            </span>
            <span className="text-[10px] text-white/40">
              © 2026 Aurelia Private Residences. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/" className="hover:text-white transition-colors">
              Zeoraz Agency Homepage
            </Link>
            <Link href="/#portfolio" className="hover:text-white transition-colors">
              Agency Portfolio
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Book Similar Build
            </Link>
          </div>
        </div>
      </footer>

      {/* ─── PRIVATE VIEWING MODAL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#FBF9F5] rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-2xl text-[#1C1917]"
            >
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setFormSubmitted(false);
                }}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EAE3D2] transition-colors cursor-pointer text-[#6B6152]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    Inquiry Received
                  </h3>
                  <p className="text-xs text-[#6B6152] leading-relaxed max-w-sm mx-auto">
                    Thank you, {formData.name || "valued guest"}. Our private client concierge has logged your inquiry for {formData.residenceType} and will contact you within 3 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormSubmitted(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-wider font-medium"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1 mb-6">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C806F]">
                      Private Client Advisory
                    </span>
                    <h3 className="font-serif text-2xl text-[#1C1917]">
                      Schedule a Private Showing
                    </h3>
                    <p className="text-xs text-[#6B6152]">
                      Experience Aurelia&apos;s architectural finishes and bespoke floor plans.
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-medium text-[#4D4539] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Lord Sterling / Sarah Al-Mansoori"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C2] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-[#4D4539] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@luxury.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C2] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#4D4539] mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C2] focus:outline-hidden focus:border-[#1C1917] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#4D4539] mb-1">
                        Collection of Interest
                      </label>
                      <select
                        value={formData.residenceType}
                        onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C2] focus:outline-hidden focus:border-[#1C1917] transition-colors cursor-pointer"
                      >
                        <option>The Sky Penthouse (6,200 sq.ft)</option>
                        <option>Garden Duplex Villa (4,850 sq.ft)</option>
                        <option>Horizon Terrace Residence (3,900 sq.ft)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[#4D4539] mb-1">
                        Acquisition Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD3C2] focus:outline-hidden focus:border-[#1C1917] transition-colors cursor-pointer"
                      >
                        <option>Immediate / 2026</option>
                        <option>Within 6 Months</option>
                        <option>Investment Portfolio Evaluation</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-3 rounded-full bg-[#1C1917] hover:bg-[#342F2B] text-white font-medium text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer"
                    >
                      Request Private Showing &amp; Dossier
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
