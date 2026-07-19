"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Engineering Precision",
    description: "We adhere to rigorous software architecture standards, clean code principles, and automated CI/CD practices across every engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Security",
    description: "Security and compliance are baked into our development lifecycle from day one, adhering to strict global enterprise security and data privacy standards.",
  },
  {
    icon: Zap,
    title: "Scalable Innovation",
    description: "Our dedicated engineering pods build resilient solutions engineered to scale seamlessly as user demand grows globally.",
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "We operate as an extension of your internal product team, aligning with your roadmap, timezone, and engineering culture.",
  },
];

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#e11d48] uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" /> About Zeoraz Software
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Empowering Global Enterprises With <br className="hidden sm:inline" />
            <span className="text-[#e11d48]">World-Class Engineering</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed"
          >
            Zeoraz Software is a global technology consulting and custom software engineering firm. We specialize in building mission-critical applications, AI systems, and cloud infrastructure for hyper-growth enterprises.
          </motion.p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-enterprise p-6 bg-white border border-slate-200/80 shadow-md shadow-slate-200/30 rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-[#e11d48] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
