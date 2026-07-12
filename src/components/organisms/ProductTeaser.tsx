"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Users, Zap, Shield, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export const ProductTeaser = () => {
  const [activeTab, setActiveTab] = useState<"analytics" | "automations" | "access">("analytics");

  const tabs = [
    { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
    { id: "automations", label: "Workflows", icon: Zap },
    { id: "access", label: "Access Controls", icon: Users },
  ];

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-violet-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
            >
              Interactive Product Control
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed"
            >
              Get a sneak peek at the upcoming Zeoraz console. Real-time metrics, node latency trackers, 
              and intuitive workflow models.
            </motion.p>
          </div>

          {/* Desktop Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm self-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-violet-primary to-cyan-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="relative rounded-3xl glassmorphism p-3 sm:p-6 shadow-2xl shadow-black/80 glow-cyan">
          <div className="relative min-h-[400px] rounded-2xl bg-slate-950/80 border border-slate-900 p-6 overflow-hidden">
            
            {/* Top header navigation inside mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-semibold text-slate-300">Live Workspace Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  AP-SOUTH-1
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  v1.4.9-patch3
                </span>
              </div>
            </div>

            {/* Simulated Contents with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Left Column Stats */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="glassmorphism-card p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Response Time</p>
                      <h4 className="text-3xl font-extrabold text-white">4.82ms</h4>
                      <p className="text-xs text-emerald-400 mt-2 font-medium">↓ 1.2% versus yesterday</p>
                    </div>
                    <div className="glassmorphism-card p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">API Requests</p>
                      <h4 className="text-3xl font-extrabold text-white">12.4M</h4>
                      <p className="text-xs text-emerald-400 mt-2 font-medium">↑ 18.4% this week</p>
                    </div>
                  </div>

                  {/* Visual Chart Mockup */}
                  <div className="md:col-span-2 glassmorphism-card p-6 rounded-2xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-base font-bold text-slate-200">Load Factor Profile</h4>
                      <span className="text-xs font-bold text-cyan-primary">Real-time</span>
                    </div>
                    {/* Simulated chart bars */}
                    <div className="flex items-end justify-between h-[150px] gap-2 pt-4">
                      {[35, 60, 45, 75, 90, 65, 80, 50, 70, 85, 95, 100, 80, 60].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.03 }}
                            className={`w-full rounded-t-sm ${
                              idx % 2 === 0 ? "bg-violet-primary/70" : "bg-cyan-primary/70"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-4 border-t border-slate-900 pt-4">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "automations" && (
                <motion.div
                  key="automations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg font-bold text-white mb-4">Pipeline Trigger Rules</h4>
                  {[
                    { label: "Compile Front-end Assets", status: "Successful", time: "2m ago", color: "bg-emerald-400" },
                    { label: "Sync Static Cache CDN", status: "Active", time: "Running", color: "bg-cyan-400" },
                    { label: "Post-deploy Health Audit", status: "Pending", time: "Next in queue", color: "bg-slate-500" },
                  ].map((pipe, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-violet-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-violet-primary" />
                        <span className="text-sm font-semibold text-slate-200">{pipe.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-500">{pipe.time}</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800">
                          <span className={`h-1.5 w-1.5 rounded-full ${pipe.color}`} />
                          {pipe.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "access" && (
                <motion.div
                  key="access"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <h4 className="text-base font-bold text-white mb-4">Role Definitions</h4>
                    <div className="space-y-3">
                      {["Administrator", "Developer API Key", "Read-Only Viewer"].map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800">
                          <span className="text-sm font-semibold text-slate-300">{role}</span>
                          <span className="text-xs font-semibold text-cyan-primary">Verified</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glassmorphism-card p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">IAM & Multi-factor Policies</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Authorize, rotate keys, and secure sensitive webhook integrations through biometric tokens.
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-2">
                      Configure Policies <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
