"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Menu,
  Send,
  Shield,
  Bot,
  Globe,
  Smartphone,
  Clock,
  MessageSquare,
  Plus,
  Minus,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
  Workflow,
} from "lucide-react";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";
import { WaterfallHeroBackdrop } from "@/components/atoms/WaterfallHeroBackdrop";

interface BenefitOption {
  id: string;
  label: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const benefitOptions: BenefitOption[] = [
  {
    id: "websites",
    label: "Fast Websites",
    title: "Conversion-focused websites engineered for speed",
    desc: "Clean responsive pages built with Next.js so your business loads instantly, ranks cleanly, and turns visitors into inquiries.",
    icon: Globe,
  },
  {
    id: "mobile",
    label: "iOS & Android Apps",
    title: "Cross-platform mobile apps customers love using",
    desc: "Smooth native-feeling iOS and Android experiences with secure accounts, real-time sync, and scalable APIs.",
    icon: Smartphone,
  },
  {
    id: "ai",
    label: "Custom AI Agents",
    title: "Autonomous AI agents wired to your tools and workflows",
    desc: "Deploy custom AI agents that qualify leads, book appointments, answer support questions, and trigger CRM, WhatsApp, or email actions 24/7.",
    icon: Workflow,
  },
];

const processSteps = [
  {
    num: "01",
    title: "Share Your Goals & Scope",
    desc: "Tell us whether you need a website, a mobile app, an AI agent, or a full bundle—along with your timeline and key features.",
  },
  {
    num: "02",
    title: "Design & Build With Live Previews",
    desc: "We craft clean screens, build responsive code, AI workflows, and backend APIs, and share interactive previews along the way.",
  },
  {
    num: "03",
    title: "Launch & Ongoing Support",
    desc: "We test across desktop, iOS, Android, and live agent prompts, deploy to production, and stay available as you scale.",
  },
];

const useCases = [
  {
    num: "01",
    title: "Business Websites",
    scopeKey: "Website Building",
    desc: "Custom company sites, product landing pages, and lead portals designed to establish immediate trust.",
    image: "/images/hero-glacial.jpg",
    icon: Globe,
  },
  {
    num: "02",
    title: "Mobile Apps",
    scopeKey: "Mobile App Development",
    desc: "Cross-platform iOS & Android apps with authentication, booking flows, notifications, and cloud sync.",
    image: "/images/alpine-mist.jpg",
    icon: Smartphone,
  },
  {
    num: "03",
    title: "E-Commerce & Portals",
    scopeKey: "Full Web + App + AI Package",
    desc: "Online storefronts, client dashboards, and ordering systems built seamlessly for web and mobile.",
    image: "/images/horizon-sky.jpg",
    icon: Layers,
  },
  {
    num: "04",
    title: "AI Agent Building",
    scopeKey: "AI Agent Building",
    desc: "Custom autonomous AI agents connected to your knowledge base, calendars, APIs, WhatsApp, and CRM.",
    image: "/images/hero-glacial.jpg",
    icon: Bot,
  },
];

interface FaqItem {
  category: "Websites" | "Mobile Apps" | "AI Agents";
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  {
    category: "Websites",
    q: "How long does it take to build a custom business website?",
    a: "Most business websites and landing pages launch in 1 to 3 weeks depending on page count, custom animations, and CMS or booking integrations.",
  },
  {
    category: "Websites",
    q: "Will I own my code, domain, and website files?",
    a: "Yes. You receive full ownership of your repository, custom domain configuration, and production deployment setup with zero vendor lock-in.",
  },
  {
    category: "Mobile Apps",
    q: "Do you build for both iOS and Android?",
    a: "Yes. We build cross-platform mobile apps targeting both Apple App Store (iOS) and Google Play Store (Android) from a unified, maintainable codebase.",
  },
  {
    category: "Mobile Apps",
    q: "Can my mobile app connect to an existing website or database?",
    a: "Absolutely. We can connect your app to your existing backend APIs, authentication, or build a fresh shared cloud backend for web and mobile together.",
  },
  {
    category: "AI Agents",
    q: "What can a custom AI Agent do on my website or app?",
    a: "Beyond answering FAQs, our AI agents can qualify leads, check availability, trigger tool/API calls, book calls, save records to your database or CRM, and notify your team on WhatsApp or email.",
  },
  {
    category: "AI Agents",
    q: "How do you embed an AI agent into an existing website?",
    a: "We deploy your agent as a secure Next.js API route (or webhook/SDK service) paired with an embedded chat/action widget, connected to your docs, database, and messaging channels with full human handoff.",
  },
];

export const LandingPageContent = () => {
  const [isTalkToUsOpen, setIsTalkToUsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive sections
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number>(1);
  const [activeStepNum, setActiveStepNum] = useState<string>("01");
  const [activeUseCaseNum, setActiveUseCaseNum] = useState<string>("02");
  const [activeFaqCategory, setActiveFaqCategory] = useState<"Websites" | "Mobile Apps" | "AI Agents">("Websites");
  const [openFaqQuestion, setOpenFaqQuestion] = useState<string>(faqItems[0].q);

  // Contact form state
  const [selectedServices, setSelectedServices] = useState<string[]>(["Website Building"]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loginStatus = params.get("login");
    const errorMsg = params.get("error");
    if (!loginStatus && !errorMsg) return;

    const timer = setTimeout(() => {
      if (loginStatus === "success") {
        const workspace = params.get("workspace") || "Default Workspace";
        setToastMessage(`Workspace initialized for ${workspace}!`);
      } else if (errorMsg) {
        setToastMessage(`Notice: ${errorMsg}`);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 0);

    const clearTimer = setTimeout(() => setToastMessage(null), 4500);
    return () => {
      clearTimeout(timer);
      clearTimeout(clearTimer);
    };
  }, []);

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSelectScopeAndScroll = (scopeKey: string) => {
    setSelectedServices((prev) => (prev.includes(scopeKey) ? prev : [...prev, scopeKey]));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          serviceNeeded: selectedServices.join(", ") || "Website Building",
          message: contactMessage,
        }),
      });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        setToastMessage("Failed to submit inquiry. Please try again.");
      }
    } catch {
      setToastMessage("Network error. Please try again or reach us via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFaqs = faqItems.filter((item) => item.category === activeFaqCategory);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans selection:bg-blue-100 selection:text-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/images/logo.png"
              alt="Zeoraz logo"
              width={32}
              height={32}
              priority
              className="w-8 h-8 object-contain"
            />
            <span className="font-serif text-2xl tracking-tight text-[#0F172A]">
              Zeoraz
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-[13px] font-medium text-[#475569]">
            <a href="#" className="hover:text-[#0F172A] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#0F172A] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#0F172A] transition-colors">Process</a>
            <a href="#solutions" className="hover:text-[#0F172A] transition-colors">Use Cases</a>
            <a href="#faq" className="hover:text-[#0F172A] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#0F172A] transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsTalkToUsOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
            >
              Start a Project
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200/80 bg-white px-4 py-5 space-y-3 mt-3"
            >
              <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#334155]">
                <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
                <a href="#solutions" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTalkToUsOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-medium text-center cursor-pointer"
              >
                Start a Project
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        {/* ANIMATED WATERFALL HERO SECTION */}
        <section className="relative min-h-[600px] sm:min-h-[670px] flex flex-col justify-between overflow-hidden text-white px-6 lg:px-12 py-12 sm:py-16">
          <WaterfallHeroBackdrop />

          {/* Upper Center Headline & CTA */}
          <div className="relative z-10 max-w-4xl mx-auto text-center pt-6 sm:pt-10">
            <h1 className="font-serif font-normal text-4xl sm:text-6xl md:text-[68px] tracking-[-0.02em] leading-[1.06] text-white drop-shadow-sm mb-5">
              Websites, Apps &amp; AI Agents <br />
              Built to Grow Your Business
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-7">
              Zeoraz designs and develops fast business websites, cross-platform mobile apps, and custom AI agents that automate workflows 24/7.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsTalkToUsOpen(true)}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#F1F5F9] text-[#0F172A] text-xs sm:text-sm font-medium transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-[#2563EB]" />
              </button>
              <a
                href="#services"
                className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium transition-all"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Lower 3-Column Metrics & Floating Status Strip */}
          <div className="relative z-10 max-w-5xl mx-auto w-full pt-12 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
              <div className="bg-[#0B1628]/45 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <span className="font-serif text-4xl sm:text-5xl text-white block leading-none mb-2">
                  100%
                </span>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Custom responsive websites engineered for speed and clarity
                </p>
              </div>
              <div className="bg-[#0B1628]/45 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <span className="font-serif text-4xl sm:text-5xl text-white block leading-none mb-2">
                  iOS &amp; Android
                </span>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Cross-platform mobile apps with clean UI and reliable backends
                </p>
              </div>
              <div className="bg-[#0B1628]/45 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <span className="font-serif text-4xl sm:text-5xl text-white block leading-none mb-2">
                  AI Agents
                </span>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  Custom autonomous agents wired to chat, CRM, WhatsApp &amp; email alerts
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/85">
              <span>Production-Ready Web, Mobile &amp; AI Delivery</span>
              <button
                type="button"
                onClick={() => setIsTalkToUsOpen(true)}
                className="text-xs text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Accepting New Projects
              </button>
            </div>
          </div>
        </section>

        {/* CORE SERVICES SECTION ("Powerful Builds That Work for You") */}
        <section id="services" className="scroll-mt-24 py-16 sm:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] leading-[1.08] mb-3">
                Powerful Builds That <br />
                Work for You
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                Custom websites, cross-platform mobile apps, and autonomous AI agents engineered from scratch for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {/* Feature Card 1: Website Building */}
              <div className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => handleSelectScopeAndScroll("Website Building")}
                  className="text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 border border-[#E2E8F0] shadow-xs">
                    <Image
                      src="/images/hero-glacial.jpg"
                      alt="Website building laptop showcase"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#081224]/25 flex items-center justify-center px-6 pt-5 pb-4">
                      {/* Sleek Laptop Mockup Displaying Website */}
                      <div className="w-full max-w-[270px] transition-transform duration-500 group-hover:-translate-y-1">
                        {/* Laptop Lid & Bezel */}
                        <div className="bg-[#0F172A] rounded-t-xl p-1.5 pt-2 border border-slate-600/60 shadow-2xl">
                          <div className="w-1 h-1 rounded-full bg-slate-500 mx-auto mb-1" />
                          {/* Screen Content: Live Website Preview */}
                          <div className="bg-white rounded-[5px] overflow-hidden aspect-[16/10] flex flex-col border border-slate-800/40">
                            {/* Browser Chrome */}
                            <div className="flex items-center justify-between px-2 py-1 bg-[#F8FAFC] border-b border-slate-200">
                              <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                              </div>
                              <div className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[7px] text-[#64748B] font-medium leading-none">
                                yourbrand.com
                              </div>
                              <div className="w-4" />
                            </div>

                            {/* Website Navbar */}
                            <div className="flex items-center justify-between px-2.5 py-1.5 bg-white">
                              <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-xs bg-[#2563EB]" />
                                <span className="text-[7px] font-bold text-[#0F172A] tracking-tight">Brand</span>
                              </div>
                              <div className="flex items-center gap-2 text-[6px] text-[#64748B]">
                                <span>Services</span>
                                <span>Work</span>
                                <span className="px-1.5 py-0.5 rounded-full bg-[#2563EB] text-white font-medium">
                                  Contact
                                </span>
                              </div>
                            </div>

                            {/* Website Hero Banner */}
                            <div className="mx-2 rounded-md bg-gradient-to-br from-[#0F172A] via-[#1D4ED8] to-[#2563EB] px-3 py-2.5 text-center text-white flex-1 flex flex-col justify-center">
                              <div className="text-[9px] font-serif leading-tight mb-1">
                                Modern Websites Built to Convert
                              </div>
                              <div className="text-[6px] text-blue-100 mb-1.5">
                                Fast responsive pages &amp; instant lead capture
                              </div>
                              <div className="mx-auto px-2 py-0.5 rounded-full bg-white text-[#0F172A] text-[6px] font-semibold">
                                Start Project →
                              </div>
                            </div>

                            {/* Website Mini Cards Strip */}
                            <div className="grid grid-cols-3 gap-1.5 px-2 py-1.5 bg-white">
                              {["Fast UI", "Mobile", "SEO"].map((item) => (
                                <div
                                  key={item}
                                  className="rounded bg-[#F8FAFC] border border-slate-200/80 py-1 text-center text-[6px] font-medium text-[#334155]"
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Laptop Aluminum Hinge & Base */}
                        <div className="relative h-2.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 rounded-b-lg -mx-3 shadow-lg flex justify-center">
                          <div className="w-10 h-1 bg-slate-500/50 rounded-b-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] mb-2 flex items-center justify-between">
                    <span>Website Building</span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Fast, responsive business websites, landing pages, and custom web portals wired cleanly to email and WhatsApp inquiries.
                  </p>
                </button>
              </div>

              {/* Feature Card 2: Mobile App Development */}
              <div className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => handleSelectScopeAndScroll("Mobile App Development")}
                  className="text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 border border-[#E2E8F0] shadow-xs">
                    <Image
                      src="/images/alpine-mist.jpg"
                      alt="Mobile app smartphone showcase"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#081224]/25 flex items-center justify-center py-4 px-6">
                      {/* Sleek Smartphone Mockup Displaying Mobile App */}
                      <div className="w-[122px] sm:w-[130px] bg-[#0F172A] rounded-[24px] p-1.5 border border-slate-500/50 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                        {/* Top Dynamic Island */}
                        <div className="w-10 h-2 bg-black rounded-full mx-auto mb-1" />
                        {/* App Screen */}
                        <div className="bg-white rounded-[18px] overflow-hidden flex flex-col justify-between h-[196px] sm:h-[212px]">
                          {/* App Header */}
                          <div className="bg-gradient-to-br from-[#0F172A] via-[#1D4ED8] to-[#2563EB] px-3 pt-3 pb-3.5 text-white">
                            <div className="flex items-center justify-between text-[7px] text-blue-100 mb-1.5">
                              <span>9:41</span>
                              <span>iOS · Android</span>
                            </div>
                            <div className="text-[10px] font-semibold leading-tight">
                              Client App
                            </div>
                            <div className="text-[7px] text-blue-100/90 mt-0.5">
                              Sync &amp; Bookings Live
                            </div>
                          </div>

                          {/* App Body Cards */}
                          <div className="p-2.5 space-y-1.5 bg-[#F8FAFC] flex-1">
                            <div className="bg-white rounded-lg p-2 border border-slate-200/80 flex items-center justify-between">
                              <div>
                                <span className="text-[7px] text-[#64748B] block">Active Session</span>
                                <span className="text-[9px] font-semibold text-[#0F172A]">Cloud Sync</span>
                              </div>
                              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-200/80 space-y-1">
                              <span className="text-[7px] text-[#64748B] block">Push Notifications</span>
                              <div className="h-1.5 w-full rounded-full bg-[#EFF6FF] overflow-hidden">
                                <div className="h-full w-4/5 rounded-full bg-[#2563EB]" />
                              </div>
                            </div>
                          </div>

                          {/* App Bottom Tab Bar */}
                          <div className="bg-white border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-[7px] font-medium text-[#64748B]">
                            <span className="text-[#2563EB] font-semibold">Home</span>
                            <span>Orders</span>
                            <span>Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] mb-2 flex items-center justify-between">
                    <span>Mobile App Development</span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Cross-platform iOS and Android apps with intuitive UI, user authentication, cloud databases, and reliable backend APIs.
                  </p>
                </button>
              </div>

              {/* Feature Card 3: AI Agent Building */}
              <div className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => handleSelectScopeAndScroll("AI Agent Building")}
                  className="text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 border border-[#E2E8F0] shadow-xs">
                    <Image
                      src="/images/horizon-sky.jpg"
                      alt="AI agent workflow console showcase"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#081224]/25 flex items-center justify-center p-5">
                      {/* Dark Glass AI Agent Console Showcase */}
                      <div className="w-full max-w-[270px] rounded-xl bg-[#0F172A]/95 backdrop-blur-md border border-slate-500/40 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                        {/* Console Top Bar */}
                        <div className="flex items-center justify-between px-3 py-2 bg-[#1E293B] border-b border-slate-700/70">
                          <div className="flex items-center gap-1.5">
                            <Bot className="w-3.5 h-3.5 text-[#60A5FA]" />
                            <span className="text-[10px] font-semibold text-white">Zeo AI Agent</span>
                          </div>
                          <span className="flex items-center gap-1 text-[9px] text-[#93C5FD] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                            24/7 Active
                          </span>
                        </div>

                        {/* Conversation & Tool Call Preview */}
                        <div className="p-3 space-y-2 text-[9px]">
                          <div className="flex justify-end">
                            <div className="bg-[#2563EB] text-white px-2.5 py-1.5 rounded-xl rounded-tr-xs max-w-[82%] leading-snug">
                              Book a call &amp; send pricing
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#1E293B] border border-slate-700/80 text-[8px] text-[#93C5FD]">
                            <Workflow className="w-3 h-3 shrink-0" />
                            <span>Tool: Check Calendar · Sync CRM</span>
                          </div>

                          <div className="flex justify-start">
                            <div className="bg-[#1E293B] text-slate-200 border border-slate-700/70 px-2.5 py-1.5 rounded-xl rounded-tl-xs max-w-[88%] leading-snug">
                              Booked for Thu 2 PM &amp; alerted team on WhatsApp.
                            </div>
                          </div>
                        </div>

                        {/* Connected Integrations Footer */}
                        <div className="px-3 py-2 bg-[#0B1322] border-t border-slate-800 flex items-center justify-between text-[8px] text-slate-400">
                          <span>Web &amp; Docs</span>
                          <span className="text-[#60A5FA]">→</span>
                          <span>AI Brain</span>
                          <span className="text-[#60A5FA]">→</span>
                          <span>CRM · Alerts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0F172A] mb-2 flex items-center justify-between">
                    <span>AI Agent Building</span>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Autonomous AI agents connected to your knowledge base, APIs, calendars, and WhatsApp to automate customer workflows 24/7.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HORIZON BENEFIT STRIP ("Why Choose Zeoraz Studio") */}
        <section className="relative py-20 sm:py-24 overflow-hidden">
          <Image
            src="/images/horizon-sky.jpg"
            alt="Misty alpine mountain horizon"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/35 to-white pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] leading-[1.08] mb-3">
              Why Businesses Choose <br />
              Zeoraz Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto mb-10">
              {benefitOptions[activeBenefitIndex].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center max-w-3xl mx-auto">
              {benefitOptions.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = idx === activeBenefitIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveBenefitIndex(idx)}
                    className={`rounded-2xl p-5 text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-white shadow-xl border border-[#CBD5E1] scale-[1.02]"
                        : "bg-white/75 hover:bg-white/95 border border-white/80 text-[#475569]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                        isActive ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#334155]"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-[#0F172A] block">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() =>
                  setActiveBenefitIndex((prev) => (prev - 1 + benefitOptions.length) % benefitOptions.length)
                }
                aria-label="Previous highlight"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveBenefitIndex((prev) => (prev + 1) % benefitOptions.length)}
                aria-label="Next highlight"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-slate-200 flex items-center justify-center text-[#0F172A] shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 3 SIMPLE STEPS SECTION */}
        <section id="process" className="scroll-mt-24 py-16 sm:py-24 px-6 lg:px-12 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] leading-[1.08] mb-10">
              Get Started in 3 <br />
              Simple Steps
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Accordion Steps */}
              <div className="lg:col-span-6 space-y-3">
                {processSteps.map((step) => {
                  const isOpen = activeStepNum === step.num;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setActiveStepNum(step.num)}
                      className={`w-full text-left rounded-2xl px-5 py-4 transition-all cursor-pointer border ${
                        isOpen
                          ? "bg-white border-[#CBD5E1] shadow-sm"
                          : "bg-[#EFF3F8] hover:bg-white border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[#0F172A]">
                          {step.num} · {step.title}
                        </span>
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#2563EB] shrink-0" />
                        ) : (
                          <Plus className="w-4 h-4 text-[#64748B] shrink-0" />
                        )}
                      </div>
                      {isOpen && (
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2.5 pr-4">
                          {step.desc}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Alpine Connected Architecture Visual */}
              <div className="lg:col-span-6">
                <div className="relative h-72 sm:h-80 rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md">
                  <Image
                    src="/images/alpine-mist.jpg"
                    alt="Connected web, mobile, and AI architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/10 flex flex-col items-center justify-center px-6 py-8">
                    <div className="w-full max-w-sm flex flex-col items-center">
                      {/* Floating Icon Nodes */}
                      <div className="w-full grid grid-cols-5 gap-2 relative z-10">
                        {[
                          { icon: Globe, label: "Web" },
                          { icon: Smartphone, label: "iOS" },
                          { icon: Layers, label: "API" },
                          { icon: Bot, label: "AI Chat" },
                          { icon: MessageSquare, label: "Alerts" },
                        ].map((node) => {
                          const NodeIcon = node.icon;
                          return (
                            <div key={node.label} className="flex flex-col items-center gap-1.5">
                              <span className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#0F172A]">
                                <NodeIcon className="w-4 h-4 text-[#2563EB]" />
                              </span>
                              <span className="text-[10px] font-medium text-[#0F172A] bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                                {node.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Curved Connector Lines */}
                      <svg
                        viewBox="0 0 360 64"
                        fill="none"
                        className="w-full h-14 -my-1 pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <path d="M 36 0 C 36 36, 180 28, 180 64" stroke="rgba(255,255,255,0.9)" strokeWidth="1.75" />
                        <path d="M 108 0 C 108 34, 180 30, 180 64" stroke="rgba(255,255,255,0.9)" strokeWidth="1.75" />
                        <path d="M 180 0 L 180 64" stroke="rgba(255,255,255,0.95)" strokeWidth="1.75" />
                        <path d="M 252 0 C 252 34, 180 30, 180 64" stroke="rgba(255,255,255,0.9)" strokeWidth="1.75" />
                        <path d="M 324 0 C 324 36, 180 28, 180 64" stroke="rgba(255,255,255,0.9)" strokeWidth="1.75" />
                      </svg>

                      {/* Floating Zeoraz Logo Node */}
                      <div className="relative z-10 flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#E2E8F0]">
                        <Image
                          src="/images/logo.png"
                          alt="Zeoraz studio mark"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain shrink-0"
                        />
                        <div className="pr-1">
                          <span className="text-xs font-semibold text-[#0F172A] block leading-tight">
                            Zeoraz Studio
                          </span>
                          <span className="text-[10px] text-[#475569] block leading-tight">
                            Web · Mobile · AI Agents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-COLUMN USE CASES SECTION ("Built for Every Business and Team") */}
        <section id="solutions" className="scroll-mt-24 py-16 sm:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] leading-[1.08] mb-3">
                Built for Every Business <br />
                and Product Idea
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Pick a starting point below—every build is tailored cleanly to your business goals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {useCases.map((item) => {
                const IconComp = item.icon;
                const isActive = activeUseCaseNum === item.num;
                return (
                  <button
                    key={item.num}
                    type="button"
                    onClick={() => {
                      setActiveUseCaseNum(item.num);
                      handleSelectScopeAndScroll(item.scopeKey);
                    }}
                    className={`group relative rounded-2xl p-6 text-left min-h-[265px] flex flex-col justify-between overflow-hidden transition-all cursor-pointer border text-white ${
                      isActive
                        ? "border-[#2563EB] ring-2 ring-[#2563EB]/30 shadow-xl"
                        : "border-slate-200/80 shadow-md hover:shadow-xl"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        item.num === "04" ? "object-right" : item.num === "01" ? "object-left" : "object-center"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081224]/90 via-[#0F172A]/50 to-[#0F172A]/30 transition-opacity group-hover:opacity-95" />

                    <span className="relative z-10 font-serif text-3xl text-white/90">
                      {item.num}
                    </span>

                    <div className="relative z-10 space-y-2 mt-6">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20 backdrop-blur-sm text-white">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      <p className="text-xs text-white/85 leading-relaxed">{item.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#93C5FD] group-hover:text-white pt-1 transition-colors">
                        Request this build <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ SECTION ("All You Need to Know") */}
        <section id="faq" className="scroll-mt-24 py-16 sm:py-20 px-6 lg:px-12 bg-[#F8FAFC] border-t border-slate-200/70">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] mb-3">
                All You Need to Know
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mb-6">
                Quick answers to common questions about our website, mobile app, and AI agent builds.
              </p>

              <div className="inline-flex flex-wrap items-center justify-center gap-2">
                {(["Websites", "Mobile Apps", "AI Agents"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveFaqCategory(cat);
                      const first = faqItems.find((f) => f.category === cat);
                      if (first) setOpenFaqQuestion(first.q);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeFaqCategory === cat
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#2563EB]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
              {filteredFaqs.map((item) => {
                const isOpen = openFaqQuestion === item.q;
                return (
                  <div key={item.q} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqQuestion(isOpen ? "" : item.q)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-sm font-medium text-[#0F172A]">{item.q}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#2563EB] shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#64748B] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2.5 pr-6">
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Contact Bar */}
            <div className="mt-10 rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#0F172A]">Have a project in mind?</h4>
                  <p className="text-xs text-[#64748B]">Tell us about your website or app idea.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTalkToUsOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* INLINE CONTACT / PROJECT INQUIRY FORM */}
        <section id="contact" className="scroll-mt-24 py-16 sm:py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif font-normal text-3xl sm:text-5xl tracking-[-0.02em] text-[#0F172A] mb-3">
                Start Your Project
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto">
                Looking for a website, mobile app, or custom AI agent? Send your details and we&apos;ll reply within 24 hours.
              </p>
            </div>

            {!formSubmitted ? (
              <form
                onSubmit={handleInquirySubmit}
                className="space-y-6 bg-[#F8FAFC] p-6 sm:p-10 rounded-3xl border border-[#E2E8F0] shadow-xs"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#334155] mb-3">
                    What would you like to build?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Website Building",
                      "Mobile App Development",
                      "AI Agent Building",
                      "Full Web + App + AI Package",
                    ].map((srv) => {
                      const active = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                            active
                              ? "bg-[#2563EB] text-white shadow-xs"
                              : "bg-white text-[#475569] hover:bg-[#EFF6FF] border border-[#E2E8F0]"
                          }`}
                        >
                          {active && <Check className="w-3.5 h-3.5 text-white" />}
                          <span>{srv}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#334155] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#334155] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#334155] mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your website or mobile app idea, key features, and target timeline..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E2E8F0] text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Project Inquiry"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="bg-[#F8FAFC] p-10 rounded-3xl border border-[#E2E8F0] text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl text-[#0F172A]">Inquiry Received</h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#0F172A]">{contactName}</strong>. We received your project details ({selectedServices.join(", ")}) and will reply to <strong className="text-[#0F172A]">{contactEmail}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactName("");
                    setContactEmail("");
                    setContactMessage("");
                  }}
                  className="px-6 py-2.5 rounded-full bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-medium transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ATMOSPHERIC MINIMAL FOOTER */}
      <footer className="relative pt-14 pb-10 px-6 lg:px-12 overflow-hidden border-t border-slate-200/80">
        <Image
          src="/images/horizon-sky.jpg"
          alt="Subtle horizon backdrop"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/70 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/logo.png"
                  alt="Zeoraz logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-serif text-2xl text-[#0F172A]">Zeoraz</span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] max-w-xs leading-relaxed">
                Websites, iOS &amp; Android mobile apps, and built-in AI chat solutions crafted for modern businesses.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <span className="text-xs font-semibold text-[#0F172A] block">Navigation</span>
              <div className="flex flex-col space-y-1.5 text-xs text-[#475569]">
                <a href="#services" className="hover:text-[#0F172A] transition-colors">Services</a>
                <a href="#process" className="hover:text-[#0F172A] transition-colors">Process</a>
                <a href="#solutions" className="hover:text-[#0F172A] transition-colors">Use Cases</a>
                <a href="#faq" className="hover:text-[#0F172A] transition-colors">FAQ</a>
              </div>
            </div>

            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-semibold text-[#0F172A] block">Start a Project</span>
              <p className="text-xs text-[#475569] leading-relaxed">
                Ready to build your website or mobile app? Let&apos;s map out the launch.
              </p>
              <button
                type="button"
                onClick={() => setIsTalkToUsOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#64748B]">
            <p>© {new Date().getFullYear()} Zeoraz. All rights reserved.</p>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </footer>

      <TalkToUsModal
        isOpen={isTalkToUsOpen}
        onClose={() => setIsTalkToUsOpen(false)}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0F172A] text-white shadow-2xl max-w-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#60A5FA]">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              Notice <Sparkles className="h-3 w-3 text-[#60A5FA]" />
            </h5>
            <p className="text-white/80 text-xs mt-0.5 leading-relaxed">{toastMessage}</p>
          </div>
        </div>
      )}

      <ChatbotWidget />
      <WhatsAppWidget />
    </div>
  );
};
