"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/20">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-primary/5 blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glassmorphism p-10 sm:p-16 rounded-3xl relative overflow-hidden glow-violet"
        >
          {/* Section Headers */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Join the Next Era of Web Dev
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Get exclusive early access to the Zeoraz ecosystem, release updates, and developer discounts. No spam, ever.
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
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-5 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30 transition-all duration-300"
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                  disabled={status === "loading"}
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
                </Button>
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
                <h4 className="text-lg font-bold text-slate-100">You're on the list!</h4>
                <p className="text-xs text-slate-400">We've saved your spot for early access releases.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
