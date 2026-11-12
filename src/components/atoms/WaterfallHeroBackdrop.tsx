"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface WaterStreak {
  xFrac: number;
  yFrac: number;
  dxFrac: number;
  len: number;
  width: number;
  speed: number;
  alpha: number;
}

interface MistPuff {
  xFrac: number;
  yFrac: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
}

interface ShimmerMote {
  xFrac: number;
  yFrac: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
}

/**
 * Animated glacial waterfall canyon backdrop with real-time cascading streaks,
 * cool silver splash mist, and subtle camera motion matched to Zeoraz's steel-blue & silver palette.
 */
export const WaterfallHeroBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Align water cascade streaks with the twin glacial falls in hero-glacial.jpg
    const createStreak = (randomY: boolean): WaterStreak => {
      const leftFall = Math.random() < 0.56;
      if (leftFall) {
        const minY = 0.34;
        const maxY = 0.77;
        const y = randomY ? minY + Math.random() * (maxY - minY) : minY;
        const progress = (y - minY) / (maxY - minY);
        return {
          xFrac: 0.745 - progress * 0.065 + (Math.random() - 0.5) * 0.028,
          yFrac: y,
          dxFrac: -0.0009,
          len: 22 + Math.random() * 40,
          width: 1 + Math.random() * 2,
          speed: 0.0042 + Math.random() * 0.0048,
          alpha: 0.18 + Math.random() * 0.28,
        };
      }

      const minY = 0.45;
      const maxY = 0.87;
      const y = randomY ? minY + Math.random() * (maxY - minY) : minY;
      const progress = (y - minY) / (maxY - minY);
      return {
        xFrac: 0.88 - progress * 0.115 + (Math.random() - 0.5) * 0.028,
        yFrac: y,
        dxFrac: -0.0014,
        len: 20 + Math.random() * 36,
        width: 1 + Math.random() * 1.9,
        speed: 0.004 + Math.random() * 0.0045,
        alpha: 0.16 + Math.random() * 0.25,
      };
    };

    const createMist = (): MistPuff => ({
      xFrac: 0.56 + Math.random() * 0.26,
      yFrac: 0.66 + Math.random() * 0.22,
      radius: 42 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: -0.00024 - Math.random() * 0.00028,
      alpha: 0.05 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
    });

    const createMote = (): ShimmerMote => ({
      xFrac: Math.random(),
      yFrac: 0.18 + Math.random() * 0.75,
      r: 0.8 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: -0.00016 - Math.random() * 0.0002,
      alpha: 0.16 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
    });

    const streaks: WaterStreak[] = Array.from({ length: 90 }, () => createStreak(true));
    const mists: MistPuff[] = Array.from({ length: 18 }, createMist);
    const motes: ShimmerMote[] = Array.from({ length: 34 }, createMote);

    let width = 0;
    let height = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    if (prefersReduced) {
      return () => observer.disconnect();
    }

    let rafId = 0;
    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Cascading glacial water streaks
      ctx.lineCap = "round";
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        s.yFrac += s.speed;
        s.xFrac += s.dxFrac;
        if (s.yFrac > 0.87) {
          streaks[i] = createStreak(false);
          continue;
        }
        const x = s.xFrac * width;
        const y = s.yFrac * height;
        const x2 = x + s.dxFrac * width * 5;
        const y2 = y + s.len;
        const grad = ctx.createLinearGradient(x, y, x2, y2);
        grad.addColorStop(0, "rgba(224, 242, 254, 0)");
        grad.addColorStop(0.5, `rgba(241, 245, 249, ${s.alpha})`);
        grad.addColorStop(1, "rgba(224, 242, 254, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 2. Cool silver-blue canyon mist & splash spray
      for (let i = 0; i < mists.length; i++) {
        const m = mists[i];
        m.xFrac += m.vx + Math.sin(time * 0.4 + m.phase) * 0.00012;
        m.yFrac += m.vy;
        if (m.yFrac < 0.48 || m.xFrac < 0.42 || m.xFrac > 0.90) {
          m.xFrac = 0.58 + Math.random() * 0.22;
          m.yFrac = 0.74 + Math.random() * 0.12;
        }
        const cx = m.xFrac * width;
        const cy = m.yFrac * height;
        const pulseAlpha = m.alpha * (0.75 + 0.25 * Math.sin(time * 0.9 + m.phase));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, m.radius);
        g.addColorStop(0, `rgba(224, 242, 254, ${pulseAlpha})`);
        g.addColorStop(1, "rgba(224, 242, 254, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Subtle cool ice-blue spray particles
      for (let i = 0; i < motes.length; i++) {
        const p = motes[i];
        p.xFrac += p.vx;
        p.yFrac += p.vy;
        if (p.yFrac < 0.08) p.yFrac = 0.92;
        if (p.xFrac < 0) p.xFrac = 1;
        if (p.xFrac > 1) p.xFrac = 0;

        const twinkle = 0.5 + 0.5 * Math.sin(time * 2.1 + p.phase);
        ctx.fillStyle = `rgba(224, 242, 254, ${p.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(p.xFrac * width, p.yFrac * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        animate={{ scale: [1, 1.055, 1], y: [0, -6, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-glacial.jpg"
          alt="Glacial alpine canyon waterfalls backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Cool Slate-Navy Scrim for Crisp White Typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081224]/55 via-[#0B1930]/35 to-[#060F1D]/82" />
    </div>
  );
};
