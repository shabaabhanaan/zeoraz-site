import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-violet-primary/30 bg-violet-primary/10 px-3 py-1 text-xs font-semibold text-violet-primary glow-violet backdrop-blur-md select-none animate-pulse",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-primary animate-ping" />
      {children}
    </span>
  );
};
