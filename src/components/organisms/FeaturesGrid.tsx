"use client";

import React, { useState } from "react";
import { BentoCard } from "@/components/molecules/BentoCard";
import { Cpu, Layers, Lock, Scale, X, Check, Terminal, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureDetail {
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  className: string;
  gradient: string;
  specs: string[];
  codeTitle: string;
  codeSnippet: string;
}

export const FeaturesGrid = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureDetail | null>(null);

  const features: FeatureDetail[] = [
    {
      title: "Hyper-Scalable Infrastructure",
      description: "Automatically scale your operations globally across multi-region serverless nodes with sub-millisecond response latency.",
      longDescription: "Deploy workloads that dynamically auto-scale to zero or burst to handle millions of connections in milliseconds. Zeoraz utilizes a globally distributed V8 worker engine paired with an intelligent edge caching tier to keep execution latency under 5ms globally.",
      icon: Scale,
      className: "md:col-span-2",
      gradient: "from-violet-primary/20 via-cyan-primary/5 to-transparent",
      specs: [
        "Edge Compute Nodes in 35+ Global Regions",
        "Sub-10ms Cold Starts via V8 Isolate Pooling",
        "Automated Multi-Region Anycast Routing",
        "Dynamic Bandwidth Auto-throttling"
      ],
      codeTitle: "zeoraz.config.yaml",
      codeSnippet: `infrastructure:
  provider: zeoraz-edge
  regions:
    - ap-south-1
    - us-east-1
    - eu-west-1
  scaling:
    minWorkers: 0
    maxWorkers: 1000
    concurrencyPerWorker: 80
  routing:
    strategy: latency-optimized
    healthCheckInterval: 5s`
    },
    {
      title: "Autonomous Workflows",
      description: "Automate complex API routes, batch processes, and microservices with our visual orchestration layer.",
      longDescription: "Construct state machines and data integrations visually or through code. Zeoraz processes execution graphs natively via topological queues, handles state transitions automatically, and runs untrusted code blocks in high-performance sandboxes.",
      icon: Cpu,
      className: "md:col-span-1",
      gradient: "from-violet-primary/20 to-transparent",
      specs: [
        "Dynamic DAG Graph Parser",
        "Atomic Queue Orchestration via Redis",
        "Isolated Code Steps (sandbox-vm)",
        "Webhook Event Filters & Listeners"
      ],
      codeTitle: "workflow.ts",
      codeSnippet: `import { Workflow } from '@zeoraz/sdk';

export const userOnboarding = new Workflow({
  name: 'user-onboarding',
  trigger: 'webhooks/users/create',
  steps: [
    { id: 'validate', type: 'validator' },
    { id: 'ai-welcome', type: 'llm-prompt' },
    { id: 'notify', type: 'slack-message' }
  ]
});`
    },
    {
      title: "Next-Gen UI/UX Engine",
      description: "Build immersive client dashboards and responsive digital systems utilizing our atomic design elements.",
      longDescription: "A curated system of customizable React components designed for premium data display. Experience real-time data sync, glassmorphic rendering styles, dynamic layout builders, and interactive canvas components right out of the box.",
      icon: Layers,
      className: "md:col-span-1",
      gradient: "from-cyan-primary/20 to-transparent",
      specs: [
        "Vanilla CSS Design Tokens",
        "Next.js App Router Optimizations",
        "Framer Motion Micro-Interactions",
        "Custom Canvas and Chart Assemblies"
      ],
      codeTitle: "DashboardCard.tsx",
      codeSnippet: `import { Card, Metric, Badge } from '@zeoraz/ui';

export default function AnalyticsCard() {
  return (
    <Card variant="glassmorphism" hoverEffect="glow">
      <Metric value="4.82ms" label="Latency" />
      <Badge color="emerald">Live</Badge>
    </Card>
  );
}`
    },
    {
      title: "Military-Grade Security",
      description: "End-to-end data encryption, automated threat detection, and robust compliance auditing built directly into the core runtime.",
      longDescription: "Keep your application secure by default. Zeoraz isolates data tenants, performs automatic encryption key rotations, secures secret variables using Hardware Security Modules (HSM), and prints comprehensive tamper-proof audit trails for compliance.",
      icon: Lock,
      className: "md:col-span-2",
      gradient: "from-cyan-primary/20 via-violet-primary/5 to-transparent",
      specs: [
        "End-to-End Encryption (AES-256-GCM)",
        "Secrets Encryption via HSM Key Rings",
        "Tenant Data Isolation & IAM Rules",
        "ISO27001 & SOC2 Compliant Logs"
      ],
      codeTitle: "security-policy.json",
      codeSnippet: `{
  "policyName": "TenantIsolationPolicy",
  "restrictions": {
    "networkAccess": "restricted",
    "allowedOutbound": ["api.zeoraz.com"],
    "fileSystem": "sandboxed-read-only",
    "secretRotation": "every-30-days"
  }
}`
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
          {features.map((feature) => (
            <BentoCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              className={feature.className}
              gradient={feature.gradient}
              onClick={() => setActiveFeature(feature)}
            />
          ))}
        </div>
      </div>

      {/* Learn More Interactive Slider Drawer */}
      <AnimatePresence>
        {activeFeature && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl bg-slate-950/95 border-l border-slate-900 shadow-2xl p-8 sm:p-12 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-900 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-violet-primary">
                      <activeFeature.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-cyan-primary uppercase tracking-widest">
                      Feature Deep-Dive
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveFeature(null)}
                    className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900 transition-all duration-300 cursor-pointer"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  {activeFeature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {activeFeature.longDescription}
                </p>

                {/* Specifications Checklist */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
                    Technical Specifications
                  </h4>
                  <ul className="space-y-3">
                    {activeFeature.specs.map((spec, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-slate-400">
                        <span className="mt-0.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-violet-primary/20 text-violet-primary shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Preview Block */}
                <div className="rounded-xl bg-slate-950 border border-slate-900 overflow-hidden font-mono text-xs mb-8">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-900 bg-slate-900/30 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" />
                      <span>{activeFeature.codeTitle}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-violet-primary bg-violet-primary/10 px-2 py-0.5 rounded">
                      code
                    </span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-slate-400 leading-relaxed max-h-[220px]">
                    <code>{activeFeature.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-slate-900 flex items-center justify-between gap-4 mt-auto">
                <button
                  onClick={() => setActiveFeature(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-white transition-colors"
                >
                  Back to Features
                </button>
                <button
                  onClick={() => {
                    setActiveFeature(null);
                    const contactSection = document.getElementById("contact");
                    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-primary to-cyan-primary text-white text-xs font-bold tracking-wide py-3 px-6 hover:shadow-lg hover:shadow-violet-primary/20 cursor-pointer transition-all duration-300"
                >
                  Integrate This Module
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
