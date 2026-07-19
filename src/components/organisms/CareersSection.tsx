"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowRight, Sparkles, HeartHandshake } from "lucide-react";

const positions = [
  {
    title: "Senior Full-Stack Engineer (React / Node.js)",
    location: "Global Remote / Delivery Hubs",
    type: "Full-Time",
    department: "Engineering",
  },
  {
    title: "Enterprise AI / MLOps Architect",
    location: "Global Remote",
    type: "Full-Time",
    department: "AI Research & Solutions",
  },
  {
    title: "Cloud DevOps & Security Engineer",
    location: "Global Remote / Colombo / London",
    type: "Full-Time",
    department: "Cloud Infrastructure",
  },
  {
    title: "Principal UI/UX Product Designer",
    location: "Global Remote",
    type: "Full-Time",
    department: "Design System",
  },
];

interface CareersSectionProps {
  onTalkToUs: () => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onTalkToUs }) => {
  return (
    <section id="careers" className="py-24 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#e11d48] uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5" /> Join Our Global Team
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
          >
            Build the Future of Enterprise Tech <br className="hidden sm:inline" />
            <span className="text-[#e11d48]">With Zeoraz Software</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed"
          >
            Work alongside world-class engineers solving high-impact enterprise challenges. Continuous learning, competitive rewards, and remote flexibility.
          </motion.p>
        </div>

        {/* Positions List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {positions.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="card-enterprise p-6 bg-white border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#e11d48]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#e11d48]">
                    {job.department}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-semibold">{job.type}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#e11d48] transition-colors">
                  {job.title}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                </p>
              </div>

              <button
                onClick={onTalkToUs}
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#e11d48] text-white text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
