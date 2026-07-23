"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/50 select-none ${
        isDark
          ? "bg-slate-900/80 border-slate-700/60 text-amber-300 hover:text-amber-200 hover:border-amber-400/40 hover:glow-violet"
          : "bg-white/90 border-slate-200 text-violet-600 hover:text-violet-700 hover:border-violet-300 shadow-sm hover:shadow"
      } ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-5 w-5 stroke-[2.2]" />
          ) : (
            <Moon className="h-5 w-5 stroke-[2.2]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
