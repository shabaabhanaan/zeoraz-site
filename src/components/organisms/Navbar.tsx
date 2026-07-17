"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onGetStarted: (mode?: "register" | "login") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
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
    { name: "Products", href: "/#products" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glassmorphism py-4 shadow-lg shadow-black/10" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-primary to-cyan-primary p-[1px] group-hover:glow-violet transition-all duration-300">
              <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyan-primary group-hover:text-violet-primary transition-colors" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Zeoraz
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onGetStarted("login")}
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors mr-2 cursor-pointer"
            >
              Sign In
            </button>
            <Button variant="primary" className="flex items-center gap-2" onClick={() => onGetStarted("register")}>
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
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
            className="fixed inset-x-0 top-[72px] z-40 md:hidden glassmorphism border-t-0 p-6 flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800/50"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onGetStarted("login");
                }}
                className="text-center text-sm font-semibold text-slate-300 hover:text-white transition-colors py-2 cursor-pointer"
              >
                Sign In
              </button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsOpen(false);
                  onGetStarted("register");
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
