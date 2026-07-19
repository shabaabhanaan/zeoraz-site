"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onTalkToUs?: () => void;
  onGetStarted?: (mode?: "register" | "login") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTalkToUs, onGetStarted }) => {
  const handleCTA = () => {
    if (onTalkToUs) onTalkToUs();
    else if (onGetStarted) onGetStarted("register");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: "Services", href: "#services", hasDropdown: true },
    { name: "About Us", href: "#about", hasDropdown: true },
    { name: "Customer Stories", href: "#stories" },
    { name: "Careers", href: "#careers" },
    { name: "Resources", href: "#resources" },
    { name: "Marketplace", href: "/marketplace" },
  ];

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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-[#e11d48] transition-colors duration-200 flex items-center gap-1"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </a>
            ))}
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
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden bg-white border-b border-slate-200 p-6 flex flex-col gap-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-[#e11d48] transition-colors py-2 border-b border-slate-100 flex items-center justify-between"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
                </a>
              ))}
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
