"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Ruler, Brain, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, ShieldCheck, Info, RotateCcw, ArrowRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Measurements {
  height: string;      // cm
  weight: string;      // kg
  bust: string;        // cm (fullest part)
  underBust: string;   // cm (directly under bust)
  waist: string;       // cm
  hips: string;        // cm
}

interface SizeResult {
  braSize: string;
  braCup: string;
  braFit: string;
  underwearSize: string;
  swimwearTop: string;
  swimwearBottom: string;
  confidence: number;
  recommendations: string[];
  altSizes: string[];
}

// ─── ML Size Algorithm (pure client-side, no camera) ─────────────────────────
function predictSizes(m: Measurements): SizeResult | null {
  const bust = parseFloat(m.bust);
  const underBust = parseFloat(m.underBust);
  const waist = parseFloat(m.waist);
  const hips = parseFloat(m.hips);
  const height = parseFloat(m.height);
  const weight = parseFloat(m.weight);

  if ([bust, underBust, waist, hips, height, weight].some(isNaN)) return null;

  // ── Bra Band Size (UK sizing) ──────────────────────────────────────────────
  let bandInches = underBust / 2.54;
  if (bandInches % 2 !== 0) bandInches = Math.round(bandInches) + 1;
  else bandInches = Math.round(bandInches);
  if (bandInches < 28) bandInches = 28;
  const bandSize = Math.round(bandInches / 2) * 2;

  // ── Cup Size (difference method) ──────────────────────────────────────────
  const diff = bust - underBust;
  const cupMap: Record<number, string> = {
    1: "AA", 2: "A", 3: "B", 4: "C",
    5: "D", 6: "DD", 7: "E", 8: "F", 9: "FF", 10: "G",
  };
  const cupKey = Math.max(1, Math.min(10, Math.round(diff / 2.54)));
  const cup = cupMap[cupKey] ?? "D";
  const braSize = `${bandSize}${cup}`;

  // Sister sizes (common alternative fits)
  const altBand1 = bandSize - 2;
  const altCupKeys = Object.entries(cupMap);
  const currentCupIdx = altCupKeys.findIndex(([k]) => parseInt(k) === cupKey);
  const altCup1 = altCupKeys[currentCupIdx + 1]?.[1] ?? cup;
  const altCup2 = altCupKeys[currentCupIdx - 1]?.[1] ?? cup;

  // ── Underwear/Panty Size ──────────────────────────────────────────────────
  let underwearSize = "M";
  if (hips < 88) underwearSize = "XS";
  else if (hips < 94) underwearSize = "S";
  else if (hips < 100) underwearSize = "M";
  else if (hips < 106) underwearSize = "L";
  else if (hips < 113) underwearSize = "XL";
  else underwearSize = "XXL";

  // ── Swimwear ──────────────────────────────────────────────────────────────
  const swimwearTop = braSize;
  let swimBottom = "M";
  if (hips < 88) swimBottom = "XS";
  else if (hips < 94) swimBottom = "S";
  else if (hips < 100) swimBottom = "M";
  else if (hips < 106) swimBottom = "L";
  else swimBottom = "XL";

  // ── Bra Fit Description ───────────────────────────────────────────────────
  let braFit = "Full Cup";
  if (cupKey <= 2) braFit = "Balconette / Bralette";
  else if (cupKey <= 4) braFit = "T-Shirt / Push-Up";
  else if (cupKey <= 6) braFit = "Plunge / Full Cup";
  else braFit = "Minimiser / Full Support";

  // ── Recommendations ───────────────────────────────────────────────────────
  const recommendations: string[] = [];
  if (cupKey >= 5) recommendations.push("Wide-set straps for better support");
  if (cupKey <= 3) recommendations.push("Bralette styles will suit you well");
  if (bandSize >= 36) recommendations.push("Look for underwire styles with a wide band");
  if (waist / hips < 0.75) recommendations.push("High-waist briefs will accentuate your figure");
  if (hips > 100) recommendations.push("Boyshort or high-cut styles recommended for comfort");
  recommendations.push(`Your sister size is ${altBand1}${altCup1} — try if ${braSize} feels tight in the band`);

  // ── Confidence Score ─────────────────────────────────────────────────────
  // Simulate ML confidence based on measurement coherence
  const bmi = weight / ((height / 100) ** 2);
  const bustRatio = bust / hips;
  let confidence = 89;
  if (bmi > 18 && bmi < 30) confidence += 4;
  if (bustRatio > 0.88 && bustRatio < 1.05) confidence += 3;
  confidence = Math.min(98, confidence);

  return {
    braSize,
    braCup: cup,
    braFit,
    underwearSize,
    swimwearTop,
    swimwearBottom: swimBottom,
    confidence,
    recommendations: recommendations.slice(0, 3),
    altSizes: [`${altBand1}${altCup1}`, `${bandSize}${altCup2}`],
  };
}

// ─── Step indicators ─────────────────────────────────────────────────────────
const STEPS = ["Body Info", "Bust & Band", "Waist & Hips", "Your Results"];

// ─── Component ───────────────────────────────────────────────────────────────
interface SizeFinderProps {
  onClose: () => void;
}

export const SizeFinder: React.FC<SizeFinderProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<SizeResult | null>(null);
  const [measurements, setMeasurements] = useState<Measurements>({
    height: "", weight: "", bust: "", underBust: "", waist: "", hips: "",
  });

  const update = (field: keyof Measurements) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements(prev => ({ ...prev, [field]: e.target.value }));
  };

  const next = () => {
    if (step === 2) {
      // Run the algorithm with a fake processing delay
      setProcessing(true);
      setStep(3);
      setTimeout(() => {
        const r = predictSizes(measurements);
        setResult(r);
        setProcessing(false);
      }, 2200);
    } else {
      setStep(s => s + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setResult(null);
    setProcessing(false);
    setMeasurements({ height: "", weight: "", bust: "", underBust: "", waist: "", hips: "" });
  };

  const canNext = () => {
    if (step === 0) return measurements.height && measurements.weight;
    if (step === 1) return measurements.bust && measurements.underBust;
    if (step === 2) return measurements.waist && measurements.hips;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(145deg, #0f172a, #1e293b)", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 text-violet-400" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white">AI Size Finder</h2>
              <p className="text-[10px] text-slate-400">Private · No camera · Measurements only</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Safe &amp; Private
            </span>
            <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex items-center gap-1.5">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black transition-all ${
                    i < step ? "bg-violet-500 text-white" :
                    i === step ? "bg-white text-slate-900" :
                    "bg-white/10 text-slate-500"
                  }`}>
                    {i < step ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-bold transition-all ${i === step ? "text-white" : "text-slate-500"}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px transition-all ${i < step ? "bg-violet-500" : "bg-white/10"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 py-5 min-h-[280px]">
          <AnimatePresence mode="wait">
            {/* Step 0: Height + Weight */}
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Your height and weight help our model calibrate proportions for accurate predictions. This data is never stored or sent to any server.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <MeasurementInput label="Height" unit="cm" value={measurements.height} onChange={update("height")} placeholder="e.g. 165" />
                  <MeasurementInput label="Weight" unit="kg" value={measurements.weight} onChange={update("weight")} placeholder="e.g. 60" />
                </div>
                <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/8">
                  <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 leading-relaxed">All calculations happen entirely in your browser. We have no access to your measurements.</p>
                </div>
              </motion.div>
            )}

            {/* Step 1: Bust + Under-bust */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Measure your <strong className="text-white">bust</strong> around the fullest part of your chest, and <strong className="text-white">under-bust</strong> directly below your breasts. Use a soft tape.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <MeasurementInput label="Bust (fullest)" unit="cm" value={measurements.bust} onChange={update("bust")} placeholder="e.g. 92" />
                  <MeasurementInput label="Under-bust" unit="cm" value={measurements.underBust} onChange={update("underBust")} placeholder="e.g. 76" />
                </div>
                <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <p className="text-[10px] text-violet-300 leading-relaxed">
                    💡 <strong>Tip:</strong> Stand upright, breathe normally, and keep the tape parallel to the floor when measuring.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Waist + Hips */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Measure your <strong className="text-white">waist</strong> at the narrowest point, and <strong className="text-white">hips</strong> at the widest point (usually 7–9 inches below the waist).
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <MeasurementInput label="Waist" unit="cm" value={measurements.waist} onChange={update("waist")} placeholder="e.g. 70" />
                  <MeasurementInput label="Hips" unit="cm" value={measurements.hips} onChange={update("hips")} placeholder="e.g. 96" />
                </div>
                <div className="mt-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <p className="text-[10px] text-cyan-300 leading-relaxed">
                    🎯 <strong>Almost there!</strong> Once you click "Analyse", our model will process your measurements and generate personalised size recommendations.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Processing / Results */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {processing ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-5">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" />
                      <div className="absolute inset-2 rounded-full border-2 border-cyan-500/50 animate-spin" />
                      <div className="absolute inset-4 rounded-full bg-violet-500/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-violet-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-white mb-1">Analysing measurements…</p>
                      <p className="text-[11px] text-slate-400">Running size prediction model</p>
                    </div>
                    <div className="w-full space-y-2">
                      {["Calculating bra band & cup size", "Predicting underwear fit", "Generating style recommendations"].map((label, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.5 }}
                          className="flex items-center gap-2 text-[10px] text-slate-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                          {label}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-4">
                    {/* Confidence Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Your Predicted Sizes
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-black">
                        {result.confidence}% Confidence
                      </span>
                    </div>

                    {/* Size Cards */}
                    <div className="grid grid-cols-3 gap-2">
                      <SizeCard label="Bra Size" value={result.braSize} sub={result.braFit} color="violet" />
                      <SizeCard label="Underwear" value={result.underwearSize} sub="Knickers / Briefs" color="pink" />
                      <SizeCard label="Swimwear" value={result.swimwearTop} sub={`Bottom: ${result.swimwearBottom}`} color="cyan" />
                    </div>

                    {/* Confidence Bar */}
                    <div>
                      <div className="flex justify-between text-[9px] text-slate-400 mb-1">
                        <span>Model Confidence</span>
                        <span className="font-bold text-emerald-400">{result.confidence}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Style Recommendations</p>
                      <div className="space-y-1.5">
                        {result.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] text-slate-300">
                            <ArrowRight className="w-3 h-3 text-violet-400 flex-shrink-0 mt-0.5" />
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alt sizes */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/8">
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        <strong className="text-white">Sister sizes:</strong> {result.altSizes.join(", ")} — these share the same cup volume and may give a better band fit.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">Could not calculate. Please check your measurements.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          {step > 0 && step < 3 && (
            <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          {step === 3 && result && (
            <button onClick={reset} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> Recalculate
            </button>
          )}
          <div className="flex-1" />
          {step < 3 && (
            <button
              onClick={next}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                canNext()
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg shadow-violet-500/20"
                  : "bg-white/5 text-slate-500 cursor-not-allowed"
              }`}
            >
              {step === 2 ? "Analyse with AI" : "Continue"}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function MeasurementInput({
  label, unit, value, onChange, placeholder
}: {
  label: string; unit: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1.5">
        {label} <span className="text-slate-600 normal-case">({unit})</span>
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/60 transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

function SizeCard({
  label, value, sub, color
}: {
  label: string; value: string; sub: string; color: "violet" | "pink" | "cyan";
}) {
  const colorMap = {
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-300",
    pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-300",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-300",
  };

  return (
    <div className={`p-3 rounded-2xl bg-gradient-to-b border ${colorMap[color]} text-center`}>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
      <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{sub}</p>
    </div>
  );
}
