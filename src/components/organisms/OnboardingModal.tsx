"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Shield, Cpu, Code2, Database, Terminal, Check, Copy, Mail, Building2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchConsole: (orgName: string) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, onLaunchConsole }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // API Call States
  const [provisionedApiKey, setProvisionedApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Validation States
  const [emailTouched, setEmailTouched] = useState(false);
  const [orgTouched, setOrgTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isOrgValid = orgName.trim().length >= 3;
  const canContinue = isEmailValid && isOrgValid;

  const stacks = [
    { id: "node", name: "Node.js", icon: Code2 },
    { id: "python", name: "Python", icon: Cpu },
    { id: "go", name: "Go Lang", icon: Database },
    { id: "rust", name: "Rust", icon: Terminal },
  ];

  const toggleStack = (id: string) => {
    if (selectedStack.includes(id)) {
      setSelectedStack(selectedStack.filter((s) => s !== id));
    } else {
      setSelectedStack([...selectedStack, id]);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(provisionedApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setEmail("");
    setOrgName("");
    setEmailTouched(false);
    setOrgTouched(false);
    setSelectedStack([]);
    setProvisionedApiKey("");
    setApiError("");
    onClose();
  };

  const handleCreateApiKey = async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orgName, runtimes: selectedStack }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize workspace.");
      }
      setProvisionedApiKey(data.apiKey);
      setStep(3);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLaunch = () => {
    onLaunchConsole(orgName);
    handleReset();
  };

  // Stagger animation helpers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl glassmorphism p-8 sm:p-10 shadow-2xl glow-violet"
            >
              {/* Close Button */}
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Step indicator */}
              <div className="flex items-center gap-1 mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === s ? "w-8 bg-cyan-primary" : "w-2 bg-slate-800"
                    }`}
                  />
                ))}
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <Shield className="h-6 w-6 text-violet-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Create Workspace</h3>
                    </motion.div>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Initialize your secure developer workspace. Provide your contact and organization credentials.
                    </motion.p>

                    <div className="space-y-5 mb-8">
                      {/* Work Email Field */}
                      <motion.div variants={childVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Work Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={email}
                            onBlur={() => setEmailTouched(true)}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className={`w-full bg-slate-950/85 border rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all duration-300 ${
                              emailTouched
                                ? isEmailValid
                                  ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                                  : "border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                                : "border-slate-800 focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30"
                            }`}
                          />
                          {/* Validation Indicator */}
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            {email && (
                              isEmailValid ? (
                                <Check className="h-4 w-4 text-emerald-400 animate-pulse" />
                              ) : (
                                emailTouched && <AlertCircle className="h-4 w-4 text-rose-400" />
                              )
                            )}
                          </div>
                        </div>
                        {emailTouched && !isEmailValid && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Please enter a valid professional email address.
                          </p>
                        )}
                      </motion.div>

                      {/* Organization Name Field */}
                      <motion.div variants={childVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Organization Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Building2 className="h-4 w-4" />
                          </div>
                          <input
                            type="text"
                            required
                            value={orgName}
                            onBlur={() => setOrgTouched(true)}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder="Acme Corp"
                            className={`w-full bg-slate-950/85 border rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all duration-300 ${
                              orgTouched
                                ? isOrgValid
                                  ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
                                  : "border-rose-500/50 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                                : "border-slate-800 focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30"
                            }`}
                          />
                          {/* Validation Indicator */}
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            {orgName && (
                              isOrgValid ? (
                                <Check className="h-4 w-4 text-emerald-400 animate-pulse" />
                              ) : (
                                orgTouched && <AlertCircle className="h-4 w-4 text-rose-400" />
                              )
                            )}
                          </div>
                        </div>
                        {orgTouched && !isOrgValid && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Organization name must be at least 3 characters.
                          </p>
                        )}
                      </motion.div>
                    </div>

                    <motion.div variants={childVariants}>
                      <Button
                        onClick={() => canContinue && setStep(2)}
                        disabled={!canContinue}
                        className="w-full flex items-center justify-center gap-2 py-3.5"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <Cpu className="h-6 w-6 text-cyan-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Select Runtimes</h3>
                    </motion.div>
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Choose which language runtimes you will deploy on the Zeoraz serverless edge engine.
                    </motion.p>

                    <motion.div variants={childVariants} className="grid grid-cols-2 gap-4 mb-8">
                      {stacks.map((stack) => {
                        const Icon = stack.icon;
                        const isSelected = selectedStack.includes(stack.id);
                        return (
                          <div
                            key={stack.id}
                            onClick={() => toggleStack(stack.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                              isSelected
                                ? "bg-violet-primary/10 border-violet-primary/50 text-white"
                                : "bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <Icon className={`h-5 w-5 ${isSelected ? "text-cyan-primary" : "text-slate-500"}`} />
                            <span className="text-sm font-semibold">{stack.name}</span>
                          </div>
                        );
                      })}
                    </motion.div>

                    {apiError && (
                      <motion.p variants={childVariants} className="text-[11px] text-rose-400 mb-4 flex items-center gap-1.5">
                        <AlertCircle className="h-4.5 w-4.5 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants} className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-slate-500 hover:text-white transition-colors"
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <Button
                        onClick={handleCreateApiKey}
                        disabled={selectedStack.length === 0 || isLoading}
                        className="flex items-center justify-center gap-2 px-8"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <span>Create API Key</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-center"
                  >
                    <motion.div variants={childVariants} className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 animate-bounce">
                      <Check className="h-7 w-7" />
                    </motion.div>
                    
                    <motion.h3 variants={childVariants} className="text-2xl font-extrabold text-white mb-2 tracking-tight">Workspace Ready!</motion.h3>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                      Your credentials have been provisioned. Use this live API key to connect to the Zeoraz orchestrator.
                    </motion.p>

                    {/* Mock API Key Box */}
                    <motion.div variants={childVariants} className="flex items-center justify-between bg-slate-950 border border-slate-900 rounded-xl p-4 mb-8 font-mono text-xs text-left">
                      <span className="text-cyan-primary overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                        {provisionedApiKey}
                      </span>
                      <button
                        onClick={handleCopyKey}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Copy API Key"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </motion.div>

                    <motion.div variants={childVariants}>
                      <Button onClick={handleLaunch} className="w-full">
                        Launch Console
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
