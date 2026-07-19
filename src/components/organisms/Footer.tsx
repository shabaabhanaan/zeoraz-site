"use client";

import React from "react";
import { Shield } from "lucide-react";

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
    <footer className="border-t border-slate-200 bg-white text-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 mb-16">
          {/* Logo & Brand statement */}
          <div className="col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-xl bg-[#2563eb] flex items-center justify-center text-white font-black text-lg shadow-sm">
                Z
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Zeoraz<span className="text-[#2563eb]">.</span>
              </span>
            </a>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
              Global enterprise software engineering & tech consulting partner. Delivering mission-critical custom applications, AI solutions, and cloud infrastructure.
            </p>
            {/* Certifications badges */}
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">SOC2 Ready</span>
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">GDPR Compliant</span>
            </div>
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
