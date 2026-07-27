"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

const SplitCircleContrastIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Outer Circle */}
    <circle cx="12" cy="12" r="9" />
    {/* Left Half Solid Fill */}
    <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
  </svg>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 select-none ${
        isDark
          ? "bg-slate-900/80 border-slate-700/60 text-white hover:text-blue-400 hover:border-blue-500/40"
          : "bg-white/90 border-slate-200 text-slate-900 hover:text-blue-600 hover:border-blue-300 shadow-sm hover:shadow"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -180, scale: 0.7, opacity: 0 }}
          animate={{ rotate: isDark ? 180 : 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 180, scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <SplitCircleContrastIcon className="h-5 w-5" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
