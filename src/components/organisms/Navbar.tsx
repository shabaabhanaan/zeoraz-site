"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Code2, Cpu, Cloud, Users, Globe, ShieldCheck, Target, Award, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onTalkToUs?: () => void;
  onGetStarted?: (mode?: "register" | "login") => void;
}

const servicesDropdown = [
  {
    title: "Product & Software Engineering",
    desc: "Custom web, mobile & SaaS applications built for high performance.",
    href: "#services",
    icon: Code2,
  },
  {
    title: "Enterprise AI & Machine Learning",
    desc: "Custom LLMs, automated workflow intelligence & predictive analytics.",
    href: "#services",
    icon: Cpu,
  },
  {
    title: "Cloud & DevOps Infrastructure",
    desc: "AWS, Azure & GCP microservices, CI/CD & 24/7 monitoring.",
    href: "#services",
    icon: Cloud,
  },
  {
    title: "Dedicated Engineering Pods",
    desc: "On-demand high-performing engineering teams tailored to your stack.",
    href: "#services",
    icon: Users,
  },
];

const aboutDropdown = [
  {
    title: "Our Mission & Engineering Principles",
    desc: "Uncompromising security, engineering precision & client partnership.",
    href: "#about",
    icon: Globe,
  },
  {
    title: "Enterprise Security & Data Privacy",
    desc: "Rigorous global security standards, encryption and automated security audits.",
    href: "#about",
    icon: ShieldCheck,
  },
  {
    title: "Customer Success Stories",
    desc: "Real-world case studies with proven ROI for global market leaders.",
    href: "#stories",
    icon: Target,
  },
  {
    title: "Global Delivery Operations",
    desc: "24/7 engineering hubs operating across Asia, Europe & Americas.",
    href: "#about",
    icon: Award,
  },
];

export const Navbar: React.FC<NavbarProps> = ({ onTalkToUs, onGetStarted }) => {
  const handleCTA = () => {
    if (onTalkToUs) onTalkToUs();
    else if (onGetStarted) onGetStarted("register");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "about" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-md shadow-slate-200/60 border-b border-slate-100" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#e11d48] flex items-center justify-center text-white shadow-md shadow-rose-500/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-tighter">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                Zeoraz<span className="text-[#e11d48]">.</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                Software
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Interactive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-8 relative">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#services"
                className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors py-2 flex items-center gap-1 cursor-pointer"
              >
                Services <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180 text-[#e11d48]" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full -left-4 w-[540px] pt-3 z-50"
                  >
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/60 grid grid-cols-2 gap-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e11d48] to-rose-400" />
                      {servicesDropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/item p-3.5 rounded-2xl hover:bg-slate-50 transition-colors flex items-start gap-3 border border-transparent hover:border-slate-100"
                          >
                            <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-[#e11d48] group-hover/item:bg-[#e11d48] group-hover/item:text-white transition-colors flex-shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 group-hover/item:text-[#e11d48] transition-colors leading-tight">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-normal line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("about")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href="#about"
                className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors py-2 flex items-center gap-1 cursor-pointer"
              >
                About Us <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180 text-[#e11d48]" : ""}`} />
              </a>

              <AnimatePresence>
                {activeDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full -left-4 w-[540px] pt-3 z-50"
                  >
                    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/60 grid grid-cols-2 gap-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e11d48] to-rose-400" />
                      {aboutDropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group/item p-3.5 rounded-2xl hover:bg-slate-50 transition-colors flex items-start gap-3 border border-transparent hover:border-slate-100"
                          >
                            <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-[#e11d48] group-hover/item:bg-[#e11d48] group-hover/item:text-white transition-colors flex-shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900 group-hover/item:text-[#e11d48] transition-colors leading-tight">
                                {item.title}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-1 leading-normal line-clamp-2">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Links */}
            <a href="#stories" className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors">
              Customer Stories
            </a>
            <a href="#careers" className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors">
              Careers
            </a>
            <a href="#resources" className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors">
              Resources
            </a>
            <a href="/marketplace" className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors">
              Marketplace
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={handleCTA}
              className="px-6 py-2.5 rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-bold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              Talk to Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#e11d48] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-6 shadow-xl max-h-[85vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              <a href="#services" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                Services
              </a>
              <a href="#about" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                About Us
              </a>
              <a href="#stories" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                Customer Stories
              </a>
              <a href="#careers" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                Careers
              </a>
              <a href="#resources" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                Resources
              </a>
              <a href="/marketplace" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100">
                Marketplace
              </a>
            </nav>

            <button
              onClick={() => {
                setIsOpen(false);
                handleCTA();
              }}
              className="w-full py-3.5 rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-bold text-center shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              Talk to Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
