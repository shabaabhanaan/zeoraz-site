"use client";

import React from "react";
import { Mail } from "lucide-react";

export const Footer = () => {
  const links = [
    {
      title: "Services",
      items: [
        { name: "Product Engineering", href: "#services" },
        { name: "AI & Machine Learning", href: "#services" },
        { name: "Cloud & DevOps", href: "#services" },
        { name: "Dedicated Teams", href: "#services" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "#about" },
        { name: "Customer Stories", href: "#stories" },
        { name: "Careers", href: "#careers" },
        { name: "Contact Us", href: "#contact" },
      ],
    },
    {
      title: "Solutions",
      items: [
        { name: "Enterprise AI", href: "#" },
        { name: "Cloud Modernization", href: "#" },
        { name: "Bank-Grade Security", href: "#" },
        { name: "Marketplace Templates", href: "/marketplace" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-16">
          {/* Logo & Brand statement */}
          <div className="col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Zeoraz Logo"
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  Zeoraz<span className="text-[#2563eb]">.</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                  Diversified Services · Global Consultancy
                </span>
              </div>
            </a>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              A lean, founder-focused engineering studio helping startups go from idea to shipped product — fast.
            </p>
            {/* Contact Email */}
            <a
              href="mailto:info.zeoraz@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors duration-200 group/email"
            >
              <Mail className="w-4 h-4 shrink-0" />
              info.zeoraz@gmail.com
            </a>
          </div>

          {/* Links Columns */}
          {links.map((col, index) => (
            <div key={index} className="col-span-1 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-[#2563eb] transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Zeoraz Software Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
