"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, ShoppingBag, Box, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "IT Services & Software Engineering",
    description: "Custom software architecture, AI solutions, and cloud infrastructure engineered to scale. We build next-gen web systems and mobile platforms.",
    tags: ["Custom Software", "Cloud / DevOps", "AI Integration", "API Solutions"],
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Brands & Infrastructure",
    description: "Managing a high-volume portfolio of e-commerce brands with optimized checkout pipelines, headless frontends, and automated supply chains.",
    tags: ["Direct to Consumer", "Headless Commerce", "Shopify / custom", "Logistics Automation"],
  },
  {
    icon: Box,
    title: "3D Printing & Prototyping",
    description: "On-demand additive manufacturing services. From functional high-resolution parts to scale models, delivered with industrial-grade precision.",
    tags: ["FDM / SLA printing", "Rapid Prototyping", "CAD Modelling", "Custom Enclosures"],
  },
];

interface ServicesGridProps {
  onTalkToUs: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onTalkToUs }) => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Our Core Divisions & <br className="hidden sm:inline" />
            <span className="text-[#2563eb]">Diversified Capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed"
          >
            Zeoraz operates across multiple verticals, combining software engineering with digital commerce and physical production capabilities.
          </motion.p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-[#2563eb]/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] flex items-center justify-center mb-6 shadow-sm transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#2563eb] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onTalkToUs}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                  >
                    Inquire Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
