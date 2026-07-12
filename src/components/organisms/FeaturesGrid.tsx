"use client";

import React from "react";
import { BentoCard } from "@/components/molecules/BentoCard";
import { Zap, Cpu, Layers, Lock, Scale, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesGrid = () => {
  const features = [
    {
      title: "Hyper-Scalable Infrastructure",
      description: "Automatically scale your operations globally across multi-region serverless nodes with sub-millisecond response latency.",
      icon: Scale,
      className: "md:col-span-2",
      gradient: "from-violet-primary/20 via-cyan-primary/5 to-transparent",
    },
    {
      title: "Autonomous Workflows",
      description: "Automate complex API routes, batch processes, and microservices with our visual orchestration layer.",
      icon: Cpu,
      className: "md:col-span-1",
      gradient: "from-violet-primary/20 to-transparent",
    },
    {
      title: "Next-Gen UI/UX Engine",
      description: "Build immersive client dashboards and responsive digital systems utilizing our atomic design elements.",
      icon: Layers,
      className: "md:col-span-1",
      gradient: "from-cyan-primary/20 to-transparent",
    },
    {
      title: "Military-Grade Security",
      description: "End-to-end data encryption, automated threat detection, and robust compliance auditing built directly into the core runtime.",
      icon: Lock,
      className: "md:col-span-2",
      gradient: "from-cyan-primary/20 via-violet-primary/5 to-transparent",
    },
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-slate-950/30">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
          >
            Engineered for Modern Teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            Say goodbye to slow builds, rigid architectures, and manual pipelines. Zeoraz provides 
            the building blocks for high-performance engineering.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <BentoCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.className}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
