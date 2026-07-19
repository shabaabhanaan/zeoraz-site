"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, ArrowUpRight, Award, TrendingUp, ShieldCheck } from "lucide-react";

const stories = [
  {
    client: "Global FinTech Bank",
    title: "High-Throughput Core Banking API Modernization",
    description: "Re-engineered core processing infrastructure to handle over 10M daily transactions with sub-10ms latency.",
    metric: "+340%",
    metricLabel: "Transaction Capacity",
    industry: "Financial Services",
  },
  {
    client: "HealthTech SaaS Platform",
    title: "HIPAA & Secure AI Patient Analytics",
    description: "Built automated ML diagnosis pipelines and secure cloud infrastructure serving 500+ hospital networks.",
    metric: "99.99%",
    metricLabel: "Uptime SLA Achieved",
    industry: "Healthcare",
  },
  {
    client: "NextGen E-Commerce Giant",
    title: "Global Edge Microfrontends Architecture",
    description: "Deployed custom Next.js edge storefronts across 24 global regions, boosting conversion by 42%.",
    metric: "0.4s",
    metricLabel: "Page Load Speed",
    industry: "Retail & E-Commerce",
  },
];

export const CustomerStoriesSection: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#e11d48] uppercase tracking-wider mb-4">
              <Quote className="w-3.5 h-3.5" /> Proven Results
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Customer Success Stories <br className="hidden sm:inline" />
              <span className="text-[#e11d48]">Real Impact Delivered</span>
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            See how our enterprise engineering pods help global market leaders innovate faster and scale without risk.
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-enterprise p-8 bg-slate-50 border border-slate-200/80 shadow-md shadow-slate-200/30 rounded-3xl flex flex-col justify-between hover:bg-white transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold">
                    {story.industry}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#e11d48] transition-colors" />
                </div>

                <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#e11d48] mb-1">
                  {story.client}
                </h4>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#e11d48] transition-colors">
                  {story.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {story.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-900 block">{story.metric}</span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{story.metricLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
