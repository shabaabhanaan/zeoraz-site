"use client";

import React, { useState } from "react";
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
  Monitor,
  Smartphone,
  Tablet,
  Star,
  MapPin,
  X,
  Menu,
  Send,
} from "lucide-react";
import Link from "next/link";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { TemplatePurchaseModal } from "@/components/organisms/TemplatePurchaseModal";
import { Template } from "@/components/molecules/TemplateCard";

// Mock template object for Zeoraz checkout
const currentTemplateData: Template = {
  id: "digital-agency",
  title: "Zeoraz Digital Agency (Grey & Beige Minimalist)",
  description: "Editorial minimalist digital agency architecture with warm greige & beige tones, portfolio gallery, team showcase, and consultation booking.",
  category: "Agency",
  imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  rating: 5.0,
  price: "Free",
};

interface ProjectItem {
  id: string;
  title: string;
  category: "Web App" | "E-Commerce" | "Branding" | "Digital Product";
  image: string;
  year: string;
  client: string;
  desc: string;
}

const portfolioProjects: ProjectItem[] = [
  {
    id: "p1",
    title: "Verve High-Performance Athletics",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
    year: "2025",
    client: "Verve Goods Inc.",
    desc: "Direct-to-consumer digital commerce flagship with headless cart and sub-second page transitions.",
  },
  {
    id: "p2",
    title: "Atelier Forme — Architecture Studio",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    year: "2024",
    client: "Forme Architekten",
    desc: "Complete visual identity and bespoke portfolio system with high-fidelity grid layouts.",
  },
  {
    id: "p3",
    title: "Kinetik Autonomous Logistics",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    year: "2025",
    client: "Kinetik Systems",
    desc: "Interactive fleet monitoring platform with real-time geospatial telematics and dark mode.",
  },
  {
    id: "p4",
    title: "Sylvan Sound & Acoustic Labs",
    category: "Digital Product",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
    year: "2024",
    client: "Sylvan Audio Zurich",
    desc: "Spatial audio configuration web app with dynamic 3D soundstage controls.",
  },
];

const services = [
  {
    icon: Palette,
    num: "01",
    title: "Brand Identity & Strategy",
    desc: "We define distinctive visual dialects, brand architecture, typography guidelines, and design systems built to endure.",
    tags: ["Visual Identity", "Design Systems", "Brand Positioning", "Packaging & Print"],
  },
  {
    icon: Code2,
    num: "02",
    title: "Web Engineering & Next.js",
    desc: "Ultra-fast headless websites and scalable web applications crafted with Next.js, TypeScript, and serverless infrastructure.",
    tags: ["Full-Stack Dev", "Headless CMS", "Micro-Interactions", "SEO & Core Web Vitals"],
  },
  {
    icon: Compass,
    num: "03",
    title: "UI/UX & Product Design",
    desc: "Intuitive human-centered interfaces, user journey mapping, and interactive prototypes tested for optimal conversion.",
    tags: ["User Research", "Wireframing", "Figma Design", "Accessibility (WCAG)"],
  },
  {
    icon: Layers,
    num: "04",
    title: "Creative Direction & 3D Motion",
    desc: "Cinematic digital storytelling, WebGL 3D product visualizations, and fluid micro-animations that captivate audiences.",
    tags: ["3D Modeling", "Motion Graphics", "Interactive WebGL", "Art Direction"],
  },
];

const teamMembers = [
  {
    name: "Elena Rostova",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Former design lead at Pentagram with 12+ years directing global brand launches.",
  },
  {
    name: "Marcus Vance",
    role: "Head of Web Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Ex-Vercel contributor specializing in high-throughput frontend architectures.",
  },
  {
    name: "Sophia Chen",
    role: "Principal Product Strategist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Bridging human psychology and digital product scalability for Tier-1 founders.",
  },
];

const testimonials = [
  {
    quote: "Zeoraz transformed our fragmented digital presence into a cohesive, high-converting masterpiece. Our customer inquiries surged by 180% within three weeks of launch.",
    author: "Julian Thorne",
    role: "CEO & Co-founder",
    company: "Verve Goods",
  },
  {
    quote: "The level of polish, typographic restraint, and technical execution they bring is genuinely rare. They deliver work that feels both timeless and futuristic.",
    author: "Claire Delacroix",
    role: "Partner",
    company: "L'Atelier Minimal",
  },
];

export const DigitalAgencyTemplate: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [activeDeviceView, setActiveDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Contact form state
  const [selectedServices, setSelectedServices] = useState<string[]>(["Web Engineering"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$15k - $30k");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredProjects = activeCategory === "All"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F3F0EA] text-[#1E1F22] selection:bg-amber-200 selection:text-stone-900 font-sans">
      {/* Top Template Live Preview Control Bar (Zeoraz Banner) */}
      <header className="sticky top-0 z-50 bg-[#1D1E20] text-[#E8E6E1] border-b border-[#2C2E32] px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left branding */}
          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="text-xs font-semibold text-[#B3B0A8] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>←</span>
              <span className="hidden sm:inline">Back to</span> Marketplace
            </Link>
            <div className="h-4 w-[1px] bg-[#3A3C42] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E5DFD5]/15 text-[#E4DFD5] text-[11px] font-medium tracking-wide">
                <Sparkles className="w-3 h-3 text-[#D4CDC2]" />
                Template Preview
              </span>
              <span className="text-xs font-bold text-white hidden md:inline">
                Zeoraz Digital Agency • Grey, Beige & White
              </span>
            </div>
          </div>

          {/* Center viewport switchers */}
          <div className="hidden lg:flex items-center gap-1 bg-[#141517] p-1 rounded-xl border border-[#2D2F33]">
            <button
              onClick={() => setActiveDeviceView("desktop")}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                activeDeviceView === "desktop"
                  ? "bg-[#2A2C30] text-white shadow-sm font-semibold"
                  : "text-[#98968F] hover:text-white"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setActiveDeviceView("tablet")}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                activeDeviceView === "tablet"
                  ? "bg-[#2A2C30] text-white shadow-sm font-semibold"
                  : "text-[#98968F] hover:text-white"
              }`}
              title="Tablet Simulation"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setActiveDeviceView("mobile")}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                activeDeviceView === "mobile"
                  ? "bg-[#2A2C30] text-white shadow-sm font-semibold"
                  : "text-[#98968F] hover:text-white"
              }`}
              title="Mobile Simulation"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Right action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsPurchaseOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#E8E4DC] hover:bg-[#FFFFFF] text-[#1E1F22] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Deploy Blueprint</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all hidden sm:flex items-center gap-1 cursor-pointer"
            >
              Request Custom Build
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Optional Viewport Simulation */}
      <div
        className={`mx-auto transition-all duration-300 ${
          activeDeviceView === "mobile"
            ? "max-w-md my-8 rounded-3xl shadow-2xl overflow-hidden border-8 border-[#1E1F22] bg-[#F7F5F0]"
            : activeDeviceView === "tablet"
            ? "max-w-3xl my-8 rounded-3xl shadow-2xl overflow-hidden border-8 border-[#1E1F22] bg-[#F7F5F0]"
            : "w-full"
        }`}
      >
        {/* Agency Navigation */}
        <nav className="bg-[#FAF8F5]/90 backdrop-blur-md sticky top-[49px] z-40 border-b border-[#E6E1D7] transition-all">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            {/* Wordmark */}
            <Link href="#hero" className="flex items-center gap-2 group">
              <span className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#1E1F22] uppercase">
                ZEORAZ<span className="text-[#8E8B83] font-serif italic text-lg ml-1">Studio</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E1F22]" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#5A5852]">
              <a href="#works" className="hover:text-[#1E1F22] transition-colors">
                Works
              </a>
              <a href="#services" className="hover:text-[#1E1F22] transition-colors">
                Capabilities
              </a>
              <a href="#about" className="hover:text-[#1E1F22] transition-colors">
                About
              </a>
            </div>

            {/* Right Header Action */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1E1F22] hover:bg-[#EBE6DC] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-[#E6E1D7] bg-[#F7F4EE] px-6 py-6 space-y-4"
              >
                <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wide text-[#3E3D39]">
                  <a
                    href="#works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-black py-1"
                  >
                    Works
                  </a>
                  <a
                    href="#services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-black py-1"
                  >
                    Capabilities
                  </a>
                  <a
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-black py-1"
                  >
                    About
                  </a>
                </div>
                <div className="pt-3 border-t border-[#E4DFD5]">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-full bg-[#1E1F22] text-[#FAF8F5] text-xs font-bold text-center block tracking-wide"
                  >
                    Start a Project
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* HERO SECTION */}
        <section id="hero" className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3]">
          <div className="max-w-7xl mx-auto">
            {/* Top pill & metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4D9] border border-[#DDD6C9] text-xs font-bold uppercase tracking-[0.18em] text-[#4A4741]">
                <span className="w-2 h-2 rounded-full bg-[#1E1F22] animate-pulse" />
                Creative Digital Agency — Est. 2021
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#86827B]">
                New York / Zurich / Tokyo
              </span>
            </div>

            {/* Giant Editorial Headline */}
            <div className="mb-10">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-[#1E1F22] uppercase leading-[0.95]">
                WE CRAFT <span className="font-serif italic font-normal text-[#66625B]">timeless</span> <br />
                DIGITAL REALITIES
              </h1>
            </div>

            {/* Subhead + Action buttons split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pt-4 border-t border-[#E0D8CB]">
              <div className="lg:col-span-7">
                <p className="text-lg sm:text-xl md:text-2xl text-[#53504A] font-normal leading-relaxed max-w-2xl">
                  A boutique studio at the confluence of minimalist editorial design and high-performance engineering. We design digital products and brand systems that define industries.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
                <a
                  href="#works"
                  className="px-7 py-3.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-md hover:shadow-lg flex items-center gap-2.5"
                >
                  <span>Explore Portfolio</span>
                  <ArrowDownIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-full bg-[#E8E2D7] hover:bg-[#DCD5C8] text-[#1E1F22] border border-[#D5CDC0] text-xs font-bold uppercase tracking-[0.14em] transition-all flex items-center gap-2"
                >
                  <span>Book Discovery</span>
                </a>
              </div>
            </div>

            {/* Hero Visual Banner Showcase */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DFD8CC] aspect-[16/9] md:aspect-[21/9] bg-[#1E1F22]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
                alt="Zeoraz Agency Studio"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating capability pill cards */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4 text-white">
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    01 / Brand Strategy
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    02 / Next.js Architecture
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
                    03 / UI/UX Systems
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-[#E0DCCE] uppercase tracking-widest font-mono">
                    SCROLL TO DISCOVER
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
                  We operate on the conviction that excessive ornamentation dilutes impact. True luxury in digital design is found in clarity, unhurried pacing, impeccable typography, and seamless interaction engineering.
                </p>
                <p className="text-sm sm:text-base text-[#6E6A63]">
                  Whether orchestrating a complete brand rebirth or engineering an enterprise web platform, we reject templates in favor of deeply considered architectures that elevate brand authority and drive measurable commercial success.
                </p>
              </div>
            </div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#DDD6C8]">
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  160+
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Projects Delivered
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  99.4%
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Client Satisfaction
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  14
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Design Honors
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-[#F6F3ED] border border-[#E0D8CB] shadow-sm">
                <span className="block text-3xl sm:text-5xl font-black text-[#1E1F22] tracking-tight mb-1">
                  &lt;100ms
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#7A766F]">
                  Sub-second Runtimes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / CAPABILITIES */}
        <section id="services" className="py-20 md:py-28 px-6 lg:px-12 bg-[#F3EFE7]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-[#DFD8CC]">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7D7971] block mb-2">
                  What We Do
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1E1F22] uppercase">
                  Core Capabilities
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6C6861] max-w-md">
                End-to-end digital craft tailored for companies seeking distinctive positioning and superior user retention.
              </p>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((srv) => {
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
                {["All", "Web App", "E-Commerce", "Branding", "Digital Product"].map((cat) => (
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
                        onClick={() => setIsConsultationOpen(true)}
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

        {/* CLIENT TESTIMONIALS / ENDORSEMENTS */}
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

        {/* TEAM LEADERSHIP */}
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

        {/* PROJECT INQUIRY / INTERACTIVE BRIEF FORM */}
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
                Have an ambitious product or brand in mind? Tell us about your timeline, scope, and objectives.
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
                      "Brand Identity",
                      "Web Engineering",
                      "UI/UX Design",
                      "3D & Motion",
                      "Design System",
                      "Full-Stack Replatforming",
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
                    className="w-full py-4 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Discovery Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-[#86827B] text-center mt-3">
                    We sign mutual NDAs before reviewing proprietary brand architectures. Response within 24 business hours.
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
                  Thank you, <strong className="text-[#1E1F22]">{contactName}</strong>. Our lead design director will review your specifications ({selectedServices.join(", ")}) and respond at <strong className="text-[#1E1F22]">{contactEmail}</strong> within 24 hours.
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

        {/* AGENCY FOOTER */}
        <footer className="bg-[#141517] text-[#D8D4CC] pt-16 pb-12 px-6 lg:px-12 border-t border-[#26282C]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2C2E33]">
              {/* Brand statement */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-[-0.04em] text-white uppercase">
                    ZEORAZ<span className="text-[#99968F] font-serif italic text-xl ml-1">Studio</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <p className="text-xs sm:text-sm text-[#9A968F] max-w-sm leading-relaxed">
                  A high-conviction creative agency engineering enduring digital flagships, web systems, and brand identities for visionary enterprises.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-[#8A867E]">
                  <MapPin className="w-3.5 h-3.5 text-[#C4C0B6]" />
                  <span>Manhattan • Zurich • Ginza Tokyo</span>
                </div>
              </div>

              {/* Navigation links */}
              <div className="md:col-span-3 space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">
                  Index
                </span>
                <div className="flex flex-col space-y-2 text-xs text-[#9E9B93]">
                  <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
                  <a href="#services" className="hover:text-white transition-colors">Capabilities</a>
                  <a href="#works" className="hover:text-white transition-colors">Selected Works</a>
                  <a href="#team" className="hover:text-white transition-colors">Studio Leadership</a>
                  <a href="#contact" className="hover:text-white transition-colors">Discovery Brief</a>
                </div>
              </div>

              {/* Zeoraz Integration Notice */}
              <div className="md:col-span-4 space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">
                  Architecture Specs
                </span>
                <div className="p-4 rounded-2xl bg-[#1D1E22] border border-[#2D3035] text-xs text-[#B5B2AA] space-y-2">
                  <div className="flex justify-between">
                    <span>Engine:</span>
                    <span className="text-white font-mono">Next.js 16 App Router</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Styling:</span>
                    <span className="text-white font-mono">Tailwind CSS + HSL Greige</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion:</span>
                    <span className="text-white font-mono">Framer Motion 12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>License:</span>
                    <span className="text-white font-mono">Zeoraz Commercial Blueprint</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPurchaseOpen(true)}
                  className="w-full py-3 rounded-full bg-[#E8E4DC] hover:bg-white text-[#141517] text-xs font-bold uppercase tracking-[0.14em] transition-all"
                >
                  Deploy This Blueprint
                </button>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7B7770]">
              <p>© {new Date().getFullYear()} Zeoraz Studio. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <a href="#hero" className="hover:text-white transition-colors">Back to Top ↑</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Zeoraz Consultation Modal */}
      <TalkToUsModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Zeoraz Template Purchase / Deploy Modal */}
      <TemplatePurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        template={currentTemplateData}
      />
    </div>
  );
};

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}
