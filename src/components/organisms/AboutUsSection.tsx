"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, Globe, Cpu, ShoppingBag, Box } from "lucide-react";

const divisions = [
  {
    icon: Cpu,
    title: "IT & Software Engineering",
    description: "Custom app development, automation, and tech integration services serving startups and fast-growing organizations.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Brands",
    description: "Creating, scaling, and operating optimized digital brands using headless platforms and automated logistics workflows.",
  },
  {
    icon: Box,
    title: "3D Printing & Fabrication",
    description: "Providing on-demand prototyping and small-batch production components using advanced additive fabrication equipment.",
  },
  {
    icon: Target,
    title: "Diversified Excellence",
    description: "Combining technological engineering depth with operations, commerce, and hardware manufacturing experience.",
  },
];

export const AboutUsSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2563eb] uppercase tracking-wider mb-4">
            <Globe className="w-3.5 h-3.5" /> About Zeoraz
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            A Multi-Vertical Solutions & <br className="hidden sm:inline" />
            <span className="text-[#2563eb]">Global Consultancy Firm</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed"
          >
            Zeoraz operates as a modern diversified corporation. We engineer bespoke technology infrastructure, deploy and run direct-to-consumer e-commerce portals, and provide additive 3D fabrication services to bridge physical design with digital systems.
          </motion.p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((item, index) => {
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
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563eb] flex items-center justify-center mb-5">
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
