"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  gradient?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  gradient = "from-violet-primary/20 to-transparent",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl glassmorphism-card p-8 flex flex-col justify-between min-h-[260px]",
        className
      )}
    >
      {/* Background glow gradient following hover */}
      <div
        className={cn(
          "absolute -inset-px bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10",
          gradient
        )}
      />

      <div>
        {/* Glowing Icon Wrapper */}
        <div className="inline-flex items-center justify-center rounded-2xl bg-slate-900/80 border border-slate-800 p-4 mb-6 text-violet-primary group-hover:text-cyan-primary group-hover:border-violet-primary/30 group-hover:glow-violet transition-all duration-300">
          <Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-6" />
        </div>

        {/* Card Title */}
        <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-slate-100 transition-colors">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Modern interactive subtle arrow indicator */}
      <div className="mt-6 flex items-center justify-end text-slate-500 group-hover:text-cyan-primary transition-colors text-xs font-semibold gap-1">
        <span>Learn More</span>
        <svg
          className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.div>
  );
};
