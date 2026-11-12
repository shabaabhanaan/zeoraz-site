"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Shield, Send, Building2, User, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";

interface TalkToUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TalkToUsModal: React.FC<TalkToUsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceNeeded: "Website Building",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSubmitted(false);
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const fieldClassName =
    "w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] text-base sm:text-sm focus:outline-none focus:bg-white focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="talk-to-us-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Start Your Project"
          className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="hidden sm:block fixed inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            className="relative w-full min-h-[100dvh] sm:min-h-0 sm:max-w-2xl rounded-none sm:rounded-3xl bg-white px-4 pt-5 pb-6 sm:p-8 shadow-none sm:shadow-2xl border-0 sm:border sm:border-[#E2E8F0] text-[#0F172A] z-10 sm:my-auto sm:max-h-[92vh] overflow-y-auto scrollbar-thin flex flex-col"
          >
            {/* Top Brand Accent */}
            <div className="fixed sm:absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#60A5FA] z-20" />

            <button
              type="button"
              onClick={handleClose}
              className="fixed sm:absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-white/90 sm:bg-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

          {!isSubmitted ? (
            <div className="flex-1 flex flex-col justify-between sm:block">
              <div className="mb-4 sm:mb-5 pr-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-xs font-medium text-[#1D4ED8] mb-2 border border-[#DBEAFE]">
                  <Shield className="w-3.5 h-3.5 text-[#2563EB]" /> Web · Mobile · AI Consultation
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#0F172A] tracking-tight leading-snug">
                  Start Your Project
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  Tell us about the website, mobile app, or AI agent you want to build. We&apos;ll reply with a clear plan within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5 flex-1 flex flex-col justify-between sm:block">
                <div className="space-y-2.5 sm:space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#2563EB]" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#2563EB]" /> Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@enterprise.com"
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#2563EB]" /> Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Lumina Apparel"
                        className={fieldClassName}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#2563EB]" /> Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={fieldClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5">
                      What Would You Like to Build?
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className={fieldClassName}
                    >
                      <option value="Website Building">Custom Website Building</option>
                      <option value="Mobile App Development">Mobile App Development (iOS &amp; Android)</option>
                      <option value="AI Agent Building">Custom AI Agent Building &amp; Automation</option>
                      <option value="Web + Mobile + AI Package">Full Package: Website + Mobile App + AI</option>
                      <option value="AI Chat & Lead Alerts">AI Website Chat &amp; Lead Alerts Add-On</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#475569] mb-1 sm:mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#2563EB]" /> Project Overview / Message
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your requirements or goal..."
                      className={`${fieldClassName} sm:min-h-[84px] resize-none`}
                    />
                  </div>
                </div>

                <div className="pt-3 sm:pt-2 pb-[env(safe-area-inset-bottom)]">
                  {submitError && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl px-4 py-2.5 mb-3">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-sm shadow-[#2563EB]/25 transition-all cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Project Inquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="my-auto text-center py-8 sm:py-6">
              <div className="w-14 h-14 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#2563EB]" />
              </div>
              <h3 className="font-serif text-3xl text-[#0F172A] mb-2">
                Thank You, {formData.name || "Partner"}!
              </h3>
              <p className="text-[#475569] text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Your inquiry has been received. Our team will reach out to <strong className="text-[#0F172A]">{formData.email}</strong> within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-7 py-2.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
