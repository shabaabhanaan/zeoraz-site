"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ArrowRight, 
  Shield, 
  Cpu, 
  Code2, 
  Database, 
  Terminal, 
  Check, 
  Copy, 
  Mail, 
  Building2, 
  AlertCircle, 
  Loader2, 
  Lock, 
  KeyRound, 
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchConsole: (orgName: string) => void;
  initialMode?: "register" | "login";
}

type AuthMode = "register" | "login" | "forgot_request" | "forgot_verify" | "forgot_reset";

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  onLaunchConsole,
  initialMode = "register"
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Registration States
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [selectedStack, setSelectedStack] = useState<string[]>([]);
  const [provisionedApiKey, setProvisionedApiKey] = useState("");

  // Sign In States
  const [password, setPassword] = useState("");

  // Forgot Password / OTP / Reset States
  const [otpEmail, setOtpEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Common UI states
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validation States
  const [emailTouched, setEmailTouched] = useState(false);
  const [orgTouched, setOrgTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Synchronize initial mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep(1);
      setApiError("");
      setSuccessMessage("");
    }
  }, [isOpen, initialMode]);

  // Handle OTP Resend Timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isOtpEmailValid = emailRegex.test(otpEmail);
  const isOrgValid = orgName.trim().length >= 3;
  const isPasswordValid = password.length >= 6;
  const isNewPasswordValid = newPassword.length >= 8;
  const isConfirmPasswordValid = newPassword === confirmPassword;

  const canContinueRegister = isEmailValid && isOrgValid;
  const canSubmitLogin = isEmailValid && isPasswordValid;
  const canSubmitReset = isNewPasswordValid && isConfirmPasswordValid;

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
    setMode("register");
    setEmail("");
    setPassword("");
    setOrgName("");
    setOtpEmail("");
    setOtpDigits(Array(6).fill(""));
    setNewPassword("");
    setConfirmPassword("");
    setResetToken("");
    setEmailTouched(false);
    setOrgTouched(false);
    setPasswordTouched(false);
    setNewPasswordTouched(false);
    setConfirmPasswordTouched(false);
    setSelectedStack([]);
    setProvisionedApiKey("");
    setApiError("");
    setSuccessMessage("");
    onClose();
  };

  // API Call: Register Account
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

  // API Call: Login Account
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }
      onLaunchConsole(data.workspaceName || "Console");
      handleReset();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // API Call: Request OTP Code
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/auth/forgot-password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch verification code.");
      }
      setSuccessMessage(data.message || "OTP Sent!");
      setResendTimer(60); // 60s cooldown
      setTimeout(() => {
        setMode("forgot_verify");
        setApiError("");
        setSuccessMessage("");
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Could not complete request.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Box Navigation Helpers
  const handleOtpDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanValue;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (cleanValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (newDigits.every(d => d !== "")) {
      handleVerifyOtp(newDigits.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // API Call: Verify OTP Code
  const handleVerifyOtp = async (code: string) => {
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/auth/forgot-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, code }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }
      setResetToken(data.resetToken);
      setSuccessMessage("Code verified! Redirecting to password reset...");
      setTimeout(() => {
        setMode("forgot_reset");
        setApiError("");
        setSuccessMessage("");
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed.";
      setApiError(errorMessage);
      setOtpDigits(Array(6).fill(""));
      otpInputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // API Call: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitReset) return;
    setIsLoading(true);
    setApiError("");
    try {
      const response = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Password reset failed.");
      }
      setSuccessMessage("Password reset successful! Redirecting to Sign In...");
      setTimeout(() => {
        setEmail(otpEmail);
        setMode("login");
        setApiError("");
        setSuccessMessage("");
        setNewPassword("");
        setConfirmPassword("");
        setResetToken("");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reset password.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLaunch = () => {
    onLaunchConsole(orgName || "Enterprise Workspace");
    handleReset();
  };

  // Stagger animation helpers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.03 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 350, damping: 26 } },
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.45 }}
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

              {/* Step indicator for Register */}
              {mode === "register" && (
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
              )}

              {/* Form Content */}
              <AnimatePresence mode="wait">
                
                {/* 1. REGISTER FLOW */}
                {mode === "register" && step === 1 && (
                  <motion.div
                    key="reg1"
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
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            {email && (
                              isEmailValid ? (
                                <Check className="h-4 w-4 text-emerald-400" />
                              ) : (
                                emailTouched && <AlertCircle className="h-4 w-4 text-rose-400" />
                              )
                            )}
                          </div>
                        </div>
                        {emailTouched && !isEmailValid && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Please enter a valid email address.
                          </p>
                        )}
                      </motion.div>

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
                          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            {orgName && (
                              isOrgValid ? (
                                <Check className="h-4 w-4 text-emerald-400" />
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

                    <motion.div variants={childVariants} className="space-y-4">
                      <Button
                        onClick={() => canContinueRegister && setStep(2)}
                        disabled={!canContinueRegister}
                        className="w-full flex items-center justify-center gap-2 py-3.5 font-bold"
                      >
                        Continue <ArrowRight className="h-4 w-4" />
                      </Button>
                      
                      <div className="text-center">
                        <span className="text-xs text-slate-500">Already have an account? </span>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-xs font-bold text-violet-primary hover:text-white transition-colors cursor-pointer"
                        >
                          Sign In
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {mode === "register" && step === 2 && (
                  <motion.div
                    key="reg2"
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
                        <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants} className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-slate-500 hover:text-white transition-colors cursor-pointer"
                        disabled={isLoading}
                      >
                        Back
                      </button>
                      <Button
                        onClick={handleCreateApiKey}
                        disabled={selectedStack.length === 0 || isLoading}
                        className="flex items-center justify-center gap-2 px-8 font-bold"
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

                {mode === "register" && step === 3 && (
                  <motion.div
                    key="reg3"
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
                      <Button onClick={handleLaunch} className="w-full font-bold">
                        Launch Console
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* 2. SIGN IN STATE */}
                {mode === "login" && (
                  <motion.form
                    key="loginForm"
                    onSubmit={handleLogin}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <Lock className="h-6 w-6 text-violet-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Secure Sign In</h3>
                    </motion.div>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Enter your email and account password to access your orchestrator console.
                    </motion.p>

                    <div className="space-y-5 mb-6">
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
                            className="w-full bg-slate-950/85 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30 transition-all duration-300"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={childVariants}>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpEmail(email);
                              setMode("forgot_request");
                              setApiError("");
                            }}
                            className="text-xs font-semibold text-cyan-primary hover:text-white transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <KeyRound className="h-4 w-4" />
                          </div>
                          <input
                            type="password"
                            required
                            value={password}
                            onBlur={() => setPasswordTouched(true)}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-slate-950/85 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30 transition-all duration-300"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {apiError && (
                      <motion.p variants={childVariants} className="text-[11px] text-rose-400 mb-4 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants} className="space-y-4">
                      <Button
                        type="submit"
                        disabled={!canSubmitLogin || isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 font-bold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Authenticating...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign In</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center">
                        <span className="text-xs text-slate-500">Don&apos;t have an account? </span>
                        <button
                          type="button"
                          onClick={() => setMode("register")}
                          className="text-xs font-bold text-violet-primary hover:text-white transition-colors cursor-pointer"
                        >
                          Create Workspace
                        </button>
                      </div>
                    </motion.div>
                  </motion.form>
                )}

                {/* 3. FORGOT PASSWORD REQUEST OTP */}
                {mode === "forgot_request" && (
                  <motion.form
                    key="forgotRequest"
                    onSubmit={handleRequestOtp}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <KeyRound className="h-6 w-6 text-violet-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Forgot Password</h3>
                    </motion.div>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Enter your account email. We will send a secure 6-digit OTP verification code to reset your password.
                    </motion.p>

                    <div className="space-y-5 mb-6">
                      <motion.div variants={childVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Account Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={otpEmail}
                            onChange={(e) => setOtpEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full bg-slate-950/85 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-violet-primary focus:ring-1 focus:ring-violet-primary/30 transition-all duration-300"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {apiError && (
                      <motion.p variants={childVariants} className="text-[11px] text-rose-400 mb-4 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    {successMessage && (
                      <motion.p variants={childVariants} className="text-[11px] text-emerald-400 mb-4 flex items-center gap-1.5">
                        <Check className="h-4 w-4 shrink-0 animate-pulse" /> {successMessage}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants} className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-xs font-semibold text-slate-500 hover:text-white transition-colors cursor-pointer"
                        disabled={isLoading}
                      >
                        Back to Login
                      </button>
                      <Button
                        type="submit"
                        disabled={!isOtpEmailValid || isLoading}
                        className="flex items-center justify-center gap-2 px-8 font-bold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Requesting...</span>
                          </>
                        ) : (
                          <>
                            <span>Send OTP</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

                {/* 4. VERIFY OTP CODE */}
                {mode === "forgot_verify" && (
                  <motion.div
                    key="forgotVerify"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <Mail className="h-6 w-6 text-cyan-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Enter Security Code</h3>
                    </motion.div>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      We dispatched a 6-digit OTP code to <strong className="text-white">{otpEmail}</strong>. Type the verification code below:
                    </motion.p>

                    {/* 6 Digit Input Boxes */}
                    <motion.div variants={childVariants} className="flex justify-between gap-2.5 mb-8">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          ref={(el) => { otpInputRefs.current[idx] = el; }}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          className="w-12 h-14 bg-slate-950/90 border border-slate-800 text-center font-mono text-2xl font-bold text-white rounded-xl focus:outline-none focus:border-cyan-primary focus:ring-1 focus:ring-cyan-primary/30 transition-all duration-200"
                        />
                      ))}
                    </motion.div>

                    {apiError && (
                      <motion.p variants={childVariants} className="text-[11px] text-rose-400 mb-4 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    {successMessage && (
                      <motion.p variants={childVariants} className="text-[11px] text-emerald-400 mb-4 flex items-center gap-1.5">
                        <Check className="h-4 w-4 shrink-0 animate-pulse" /> {successMessage}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants} className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setMode("forgot_request")}
                        className="text-xs font-semibold text-slate-500 hover:text-white transition-colors cursor-pointer"
                        disabled={isLoading}
                      >
                        Change Email
                      </button>

                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={resendTimer > 0 || isLoading}
                        className={`text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          resendTimer > 0 ? "text-slate-600" : "text-cyan-primary hover:text-white"
                        }`}
                      >
                        <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {/* 5. PASSWORD RESET FORM */}
                {mode === "forgot_reset" && (
                  <motion.form
                    key="forgotReset"
                    onSubmit={handleResetPassword}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div variants={childVariants} className="flex items-center gap-2 mb-4">
                      <KeyRound className="h-6 w-6 text-violet-primary" />
                      <h3 className="text-xl font-bold text-white tracking-tight">Create New Password</h3>
                    </motion.div>
                    
                    <motion.p variants={childVariants} className="text-slate-400 text-sm mb-6 leading-relaxed">
                      Enter a new strong, secure password for your account. Minimum 8 characters.
                    </motion.p>

                    <div className="space-y-5 mb-6">
                      <motion.div variants={childVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Lock className="h-4 w-4" />
                          </div>
                          <input
                            type="password"
                            required
                            value={newPassword}
                            onBlur={() => setNewPasswordTouched(true)}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min 8 characters"
                            className={`w-full bg-slate-950/85 border rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all duration-300 ${
                              newPasswordTouched
                                ? isNewPasswordValid
                                  ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-1"
                                  : "border-rose-500/50 focus:border-rose-500 focus:ring-1"
                                : "border-slate-800 focus:border-violet-primary focus:ring-1"
                            }`}
                          />
                        </div>
                        {newPasswordTouched && !isNewPasswordValid && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Password must be at least 8 characters.
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={childVariants}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                            <Lock className="h-4 w-4" />
                          </div>
                          <input
                            type="password"
                            required
                            value={confirmPassword}
                            onBlur={() => setConfirmPasswordTouched(true)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className={`w-full bg-slate-950/85 border rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all duration-300 ${
                              confirmPasswordTouched
                                ? isConfirmPasswordValid
                                  ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-1"
                                  : "border-rose-500/50 focus:border-rose-500 focus:ring-1"
                                : "border-slate-800 focus:border-violet-primary focus:ring-1"
                            }`}
                          />
                        </div>
                        {confirmPasswordTouched && !isConfirmPasswordValid && (
                          <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Passwords do not match.
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {apiError && (
                      <motion.p variants={childVariants} className="text-[11px] text-rose-400 mb-4 flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {apiError}
                      </motion.p>
                    )}

                    {successMessage && (
                      <motion.p variants={childVariants} className="text-[11px] text-emerald-400 mb-4 flex items-center gap-1.5">
                        <Check className="h-4 w-4 shrink-0 animate-pulse" /> {successMessage}
                      </motion.p>
                    )}

                    <motion.div variants={childVariants}>
                      <Button
                        type="submit"
                        disabled={!canSubmitReset || isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 font-bold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <span>Update Password</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
