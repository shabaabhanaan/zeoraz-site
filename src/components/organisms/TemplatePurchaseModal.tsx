"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, CreditCard, Download, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Template } from "@/components/molecules/TemplateCard";

interface TemplatePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

export const TemplatePurchaseModal: React.FC<TemplatePurchaseModalProps> = ({
  isOpen,
  onClose,
  template,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<{
    orderId: string;
    licenseKey: string;
    downloadUrl: string;
  } | null>(null);

  if (!isOpen || !template) return null;

  const priceVal = template.price || "Free";
  const formattedPrice =
    priceVal === "0" || priceVal.toLowerCase() === "free"
      ? "Free"
      : priceVal.startsWith("$")
      ? priceVal
      : `$${priceVal}`;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address to receive your license code.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: template.id,
          templateTitle: template.title,
          price: formattedPrice,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process payment");
      }

      // If Stripe Checkout URL is returned, redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Otherwise handle instant sandbox order completion
      setPurchaseSuccess({
        orderId: data.orderId || `zr_ord_${Date.now()}`,
        licenseKey: data.licenseKey || "ZEORAZ-PRO-LICENSE",
        downloadUrl: data.downloadUrl || "#",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment execution failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPurchaseSuccess(null);
    setEmail("");
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg rounded-3xl glassmorphism p-6 sm:p-8 shadow-2xl glow-cyan border border-white/10 bg-slate-900/90 text-slate-100 z-10 overflow-hidden"
        >
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-primary via-cyan-primary to-emerald-400" />

          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!purchaseSuccess ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Premium Architecture License
                </span>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Checkout & Instant Download
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Complete your order to receive full repository access and lifetime updates.
                </p>
              </div>

              {/* Selected Template Card Summary */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
                <div
                  className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0 bg-slate-800 border border-slate-700"
                  style={{ backgroundImage: `url(${template.imageUrl})` }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{template.title}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{template.category} Template</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono font-semibold">
                      License: Commercial
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400">{formattedPrice}</span>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                  {error}
                </div>
              )}

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Customer Delivery Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-primary transition-colors"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    License key and download link will be dispatched to this email.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-bold shadow-lg glow-cyan"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Authorizing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Complete Order ({formattedPrice})
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            /* Purchase Success / Receipt View */
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-1">
                Payment Authorized!
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Your license for <strong className="text-white">{template.title}</strong> has been provisioned.
              </p>

              {/* Order Receipt Details */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3 mb-6 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="text-slate-200 font-bold">{purchaseSuccess.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-500">License Key:</span>
                  <span className="text-cyan-400 font-bold">{purchaseSuccess.licenseKey}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivered To:</span>
                  <span className="text-slate-200">{email}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={() => window.open("https://github.com/shabaabhanaan/zeoraz-site", "_blank")}
                  className="flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <Download className="w-4 h-4" /> Download Source Code
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="py-3 px-5 text-xs text-slate-300"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
