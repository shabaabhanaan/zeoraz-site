"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to subscribe");
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-100 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 sm:p-16 rounded-3xl relative overflow-hidden text-white shadow-2xl border border-slate-700/60"
          style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
        >
          {/* Section Headers */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Join the Next Era of Web Dev
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-4 leading-relaxed font-medium">
            Get exclusive early access to the Zeoraz ecosystem, release updates, and developer discounts. No spam, ever.
          </p>
          <p className="text-slate-400 text-xs mb-8">
            Or reach us directly at{" "}
            <a
              href="mailto:info.zeoraz@gmail.com"
              className="text-blue-400 font-bold hover:underline"
            >
              info.zeoraz@gmail.com
            </a>
          </p>

          {/* Form / Success Switch */}
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email"
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/50 transition-all duration-300"
                    disabled={status === "loading"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-3 text-emerald-400"
              >
                <CheckCircle2 className="h-12 w-12" />
                <h4 className="text-lg font-bold text-white">You&apos;re on the list!</h4>
                <p className="text-xs text-slate-300">We&apos;ve saved your spot for early access releases.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
