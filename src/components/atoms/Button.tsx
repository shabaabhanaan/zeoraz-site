"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-primary/50 cursor-pointer",
          {
            // Primary Gradient Button (Violet to Cyan accent)
            "bg-gradient-to-r from-violet-primary to-cyan-primary text-white shadow-lg shadow-violet-primary/20 hover:shadow-cyan-primary/30 before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-violet-hover before:to-cyan-hover before:opacity-0 before:transition-opacity hover:before:opacity-100 before:-z-10 overflow-hidden":
              variant === "primary",
            // Secondary Glass Outline Button
            "glassmorphism text-slate-100 hover:text-white hover:bg-white/10 hover:border-slate-400":
              variant === "secondary",
            // Ghost Button
            "text-slate-400 hover:text-slate-100 hover:bg-slate-800/30":
              variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
