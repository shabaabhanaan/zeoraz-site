"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, RotateCcw, ZoomIn, ZoomOut, Eye, User, ShoppingCart,
  Layers, ChevronLeft, ChevronRight, Maximize2, Sun, Moon
} from "lucide-react";

// Product color options per category
const COLOR_OPTIONS: Record<string, { label: string; hex: string }[]> = {
  watches: [
    { label: "Silver", hex: "#C0C0C0" },
    { label: "Gold", hex: "#D4AF37" },
    { label: "Black", hex: "#1a1a1a" },
    { label: "Rose Gold", hex: "#B76E79" },
  ],
  shoes: [
    { label: "White", hex: "#F5F5F5" },
    { label: "Black", hex: "#1a1a1a" },
    { label: "Red", hex: "#DC2626" },
    { label: "Navy", hex: "#1E3A5F" },
  ],
  clothing: [
    { label: "Charcoal", hex: "#36454F" },
    { label: "Navy", hex: "#1E3A5F" },
    { label: "Olive", hex: "#556B2F" },
    { label: "Stone", hex: "#C2B280" },
  ],
};

const SIZE_OPTIONS: Record<string, string[]> = {
  watches: ["38mm", "40mm", "42mm", "44mm"],
  shoes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  clothing: ["XS", "S", "M", "L", "XL", "XXL"],
};

// 3D rotation animation using CSS transforms (pure CSS 3D - no Three.js dependency issues)
const CSS3DViewer = ({
  product,
  selectedColor,
  isDark,
}: {
  product: Product3DData;
  selectedColor: string;
  isDark: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotX = useRef(-15);
  const rotY = useRef(20);
  const rafRef = useRef<number>(0);
  const [rotation, setRotation] = useState({ x: -15, y: 20 });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    let frame = 0;
    const animate = () => {
      rotY.current += 0.4;
      setRotation({ x: rotX.current, y: rotY.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    setAutoRotate(false);
    cancelAnimationFrame(rafRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    rotY.current += dx * 0.5;
    rotX.current -= dy * 0.3;
    rotX.current = Math.max(-45, Math.min(45, rotX.current));
    setRotation({ x: rotX.current, y: rotY.current });
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setTimeout(() => setAutoRotate(true), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "900px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Environment lighting glow */}
      <div
        className="absolute w-72 h-72 rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ background: selectedColor }}
      />

      {/* 3D Object */}
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.05s linear",
          width: "180px",
          height: "180px",
          position: "relative",
        }}
      >
        {/* Main product image face */}
        {["front", "back", "left", "right", "top", "bottom"].map((face, i) => {
          const transforms: Record<string, string> = {
            front: "translateZ(90px)",
            back: "rotateY(180deg) translateZ(90px)",
            left: "rotateY(-90deg) translateZ(90px)",
            right: "rotateY(90deg) translateZ(90px)",
            top: "rotateX(90deg) translateZ(90px)",
            bottom: "rotateX(-90deg) translateZ(90px)",
          };

          const isMainFace = face === "front";

          return (
            <div
              key={face}
              style={{
                position: "absolute",
                width: "180px",
                height: "180px",
                transform: transforms[face],
                backfaceVisibility: "hidden",
                overflow: "hidden",
                borderRadius: "16px",
                border: `1px solid rgba(255,255,255,0.15)`,
              }}
            >
              {isMainFace ? (
                <div className="w-full h-full relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${selectedColor}22 0%, transparent 60%)`,
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, ${selectedColor}33, #0f172a)`
                      : `linear-gradient(135deg, ${selectedColor}22, #f1f5f9)`,
                    opacity: face === "back" ? 0.8 : 0.5,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Shadow plane */}
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "40px",
            top: "200px",
            left: "0px",
            transform: "rotateX(90deg) translateZ(-10px)",
            background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(8px)",
          }}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-slate-400 flex items-center gap-1.5 select-none pointer-events-none">
        <RotateCcw className="w-3 h-3" /> Drag to rotate
      </div>
    </div>
  );
};

// Virtual Try-On using mannequin overlay
const TryOnView = ({
  product,
  selectedColor,
  selectedSize,
}: {
  product: Product3DData;
  selectedColor: string;
  selectedSize: string;
}) => {
  const overlayPositions: Record<string, React.CSSProperties> = {
    watches: {
      position: "absolute",
      bottom: "26%",
      left: "22%",
      width: "18%",
      transform: "rotate(-12deg)",
    },
    shoes: {
      position: "absolute",
      bottom: "4%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "70%",
    },
    clothing: {
      position: "absolute",
      top: "16%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "68%",
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background environment */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{ background: "linear-gradient(to bottom, #e2e8f0, transparent)" }}
        />
      </div>

      {/* Floor line */}
      <div className="absolute bottom-[10%] left-[5%] right-[5%] h-px bg-slate-300/60" />
      <div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-32 h-4 rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)", filter: "blur(6px)" }}
      />

      {/* Mannequin SVG */}
      <div className="relative h-[85%] aspect-[1/2.1]">
        <svg
          viewBox="0 0 160 340"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <ellipse cx="80" cy="30" rx="22" ry="25" fill="#D1C4B0" stroke="#C4B49E" strokeWidth="1.5" />
          {/* Neck */}
          <rect x="71" y="52" width="18" height="15" rx="4" fill="#D1C4B0" />
          {/* Torso */}
          <path d="M45 67 Q35 75 33 130 L127 130 Q125 75 115 67 Q100 62 80 62 Q60 62 45 67Z" fill="#B8AAA0" stroke="#A89A90" strokeWidth="1" />
          {/* Left arm */}
          <path d="M34 75 Q15 90 12 155 Q18 158 26 155 Q32 100 45 88Z" fill="#C4B8AF" stroke="#B5A89F" strokeWidth="1" />
          {/* Right arm */}
          <path d="M126 75 Q145 90 148 155 Q142 158 134 155 Q128 100 115 88Z" fill="#C4B8AF" stroke="#B5A89F" strokeWidth="1" />
          {/* Left hand */}
          <ellipse cx="19" cy="160" rx="8" ry="10" fill="#D1C4B0" />
          {/* Right hand */}
          <ellipse cx="141" cy="160" rx="8" ry="10" fill="#D1C4B0" />
          {/* Hips/Pelvis */}
          <path d="M33 130 Q30 160 35 175 L125 175 Q130 160 127 130Z" fill="#A89A90" />
          {/* Left leg */}
          <path d="M35 172 Q30 220 32 275 L68 275 Q70 220 65 172Z" fill="#B8AAA0" stroke="#A89A90" strokeWidth="1" />
          {/* Right leg */}
          <path d="M95 172 Q90 220 92 275 L128 275 Q130 220 125 172Z" fill="#B8AAA0" stroke="#A89A90" strokeWidth="1" />
          {/* Left foot */}
          <ellipse cx="50" cy="282" rx="20" ry="9" fill="#C4B8AF" />
          {/* Right foot */}
          <ellipse cx="110" cy="282" rx="20" ry="9" fill="#C4B8AF" />
        </svg>

        {/* Product overlay on mannequin */}
        <div style={overlayPositions[product.category] || overlayPositions.clothing}>
          <div
            className="w-full h-full rounded-lg overflow-hidden shadow-2xl"
            style={{
              border: `2px solid ${selectedColor}66`,
              filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.3))",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{
                filter: `hue-rotate(0deg) saturate(1.1)`,
              }}
            />
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedColor}33 0%, transparent 60%)`,
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <User className="w-3 h-3" /> Virtual Try-On Preview · Size: {selectedSize}
        </span>
      </div>
    </div>
  );
};

interface Product3DData {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  seller: string;
  description: string;
}

interface Product3DViewerProps {
  product: Product3DData | null;
  onClose: () => void;
  onAddToCart: (productId: string) => void;
}

export const Product3DViewer: React.FC<Product3DViewerProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<"3d" | "tryon">("3d");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(1);
  const [isDark, setIsDark] = useState(true);

  if (!product) return null;

  const colors = COLOR_OPTIONS[product.category] ?? COLOR_OPTIONS.clothing;
  const sizes = SIZE_OPTIONS[product.category] ?? SIZE_OPTIONS.clothing;
  const selectedColor = colors[selectedColorIdx]?.hex ?? "#2563eb";
  const selectedSize = sizes[selectedSizeIdx] ?? sizes[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row"
          style={{
            background: isDark
              ? "linear-gradient(145deg, #0f172a, #1e293b)"
              : "linear-gradient(145deg, #f8fafc, #f1f5f9)",
            maxHeight: "90vh",
          }}
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
        >
          {/* Left Panel: 3D Viewer / Try-On */}
          <div
            className="relative flex-1 min-h-[360px] md:min-h-[520px] flex flex-col"
            style={{
              background: isDark
                ? "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)"
                : "radial-gradient(ellipse at center, #f8fafc 0%, #e2e8f0 100%)",
            }}
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 p-3 absolute top-3 left-3 z-10">
              <button
                onClick={() => setActiveTab("3d")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "3d"
                    ? "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3 h-3" /> 3D View
              </button>
              <button
                onClick={() => setActiveTab("tryon")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "tryon"
                    ? "bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3 h-3" /> Try On
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Viewer Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeTab === "3d" ? (
                  <motion.div
                    key="3d"
                    className="w-full h-full min-h-[360px] md:min-h-[500px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CSS3DViewer
                      product={product}
                      selectedColor={selectedColor}
                      isDark={isDark}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tryon"
                    className="w-full h-full min-h-[360px] md:min-h-[500px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TryOnView
                      product={product}
                      selectedColor={selectedColor}
                      selectedSize={selectedSize}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Product Info */}
          <div
            className={`w-full md:w-[300px] flex flex-col p-6 gap-4 overflow-y-auto ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className="text-[10px] font-black uppercase tracking-widest mb-1 block"
                  style={{ color: selectedColor }}
                >
                  {product.category}
                </span>
                <h2 className="text-lg font-black leading-tight">{product.name}</h2>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  {product.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded-full flex-shrink-0 transition-colors cursor-pointer ${
                  isDark ? "hover:bg-white/10 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-slate-500"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <div
              className="text-2xl font-black"
              style={{ color: selectedColor }}
            >
              ${product.price}
            </div>

            {/* Divider */}
            <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

            {/* Color Picker */}
            <div>
              <div className={`text-[10px] font-black uppercase tracking-widest mb-2.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Color — {colors[selectedColorIdx]?.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, idx) => (
                  <button
                    key={color.label}
                    onClick={() => setSelectedColorIdx(idx)}
                    title={color.label}
                    className="w-7 h-7 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
                    style={{
                      background: color.hex,
                      borderColor: idx === selectedColorIdx ? "white" : "transparent",
                      boxShadow: idx === selectedColorIdx ? `0 0 0 2px ${color.hex}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div>
              <div className={`text-[10px] font-black uppercase tracking-widest mb-2.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Size — {selectedSize}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, idx) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSizeIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      idx === selectedSizeIdx
                        ? "border-current text-current"
                        : isDark
                        ? "border-white/10 text-slate-400 hover:border-white/30"
                        : "border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                    style={idx === selectedSizeIdx ? { borderColor: selectedColor, color: selectedColor } : {}}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

            {/* View Hint */}
            <div className={`p-3 rounded-xl text-[10px] leading-relaxed ${isDark ? "bg-white/5 border border-white/10 text-slate-400" : "bg-slate-50 border border-slate-200 text-slate-500"}`}>
              <strong className={isDark ? "text-white" : "text-slate-700"}>💡 Tip:</strong> Switch to <strong>Try On</strong> mode to see this item on a virtual mannequin. Drag the 3D view to rotate the product from all angles.
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => {
                onAddToCart(product.id);
                onClose();
              }}
              className="w-full py-4 rounded-2xl text-white text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.02] hover:shadow-xl mt-auto"
              style={{
                background: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}cc)`,
                boxShadow: `0 8px 24px ${selectedColor}44`,
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart · {selectedSize} · {colors[selectedColorIdx]?.label}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
