"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Clock, CheckCircle2, Lock, Award } from "lucide-react";

export const EnterpriseTrustGrid: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Security & Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-enterprise p-8 flex flex-col justify-between bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 rounded-3xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563eb] flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                Bank-Grade Security & Compliance
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Your data and systems are protected by rigorous, enterprise-grade security practices. We adhere to global data privacy standards and conduct regular security audits to safeguard every project.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#2563eb]" /> End-to-End Encrypted & Audited
            </div>
          </motion.div>

          {/* Card 2: Seamless Scalability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-enterprise p-8 flex flex-col justify-between bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 rounded-3xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563eb] flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                Seamless Scalability
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Start with a single specialist or build a dedicated team. Our flexible engineering model ensures you can scale quickly and confidently as your business grows without quality degradation.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Flexible On-Demand Pods
            </div>
          </motion.div>

          {/* Card 3: 24/7 Operations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-enterprise p-8 flex flex-col justify-between bg-white border border-slate-200/80 shadow-lg shadow-slate-200/40 rounded-3xl"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#2563eb] flex items-center justify-center mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                24/7 Managed Operations
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Round-the-clock enterprise infrastructure monitoring, proactive incident response, and strict SLA guarantees for mission-critical cloud applications worldwide.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-sky-600" /> 99.99% Uptime Guarantee
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
