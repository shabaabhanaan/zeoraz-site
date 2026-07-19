"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Code, ShieldCheck, ArrowUpRight } from "lucide-react";

const resources = [
  {
    icon: FileText,
    category: "Whitepaper",
    title: "Enterprise AI Adoption & Security Playbook 2026",
    description: "Architectural guidelines for deploying secure LLM agents in regulated environments.",
    link: "#",
  },
  {
    icon: Code,
    category: "Engineering Guide",
    title: "Building Microfrontends for Global Edge Performance",
    description: "How to reduce bundle sizes and achieve sub-100ms LCP across distributed regions.",
    link: "#",
  },
  {
    icon: ShieldCheck,
    category: "Compliance Standard",
    title: "Enterprise Security Audit Checklist for SaaS",
    description: "Complete checklist for achieving SOC2 compliance and European data privacy standards.",
    link: "#",
  },
];

export const ResourcesSection: React.FC = () => {
  return (
    <section id="resources" className="py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2563eb] uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" /> Technical Insights
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Engineering Resources & <br className="hidden sm:inline" />
              <span className="text-[#2563eb]">Knowledge Hub</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Explore whitepapers, architecture playbooks, and security guides written by our senior software engineering leads.
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-enterprise p-8 bg-slate-50 border border-slate-200/80 rounded-3xl flex flex-col justify-between hover:bg-white transition-all duration-300 group cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold">
                      {item.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#2563eb] transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#2563eb] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center text-xs font-extrabold uppercase tracking-wider text-[#2563eb]">
                  Read Guide &rarr;
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
