"use client";

import React, { useState } from "react";
import { ExternalLink, ShoppingCart, Star, Layers } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: string;
  rating: number;
}

interface TemplateCardProps {
  template: Template;
  onUseTemplate: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-3xl bg-white border border-slate-200/80 p-5 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-[#e11d48]/40 transition-all duration-300 flex flex-col h-full justify-between">
      <div>
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border border-slate-100">
          {!imgError ? (
            <img
              src={template.imageUrl}
              alt={template.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900 to-[#1e1b4b]">
              <Layers className="w-8 h-8 text-[#e11d48] mb-2" />
              <span className="text-xs font-bold text-white tracking-tight">{template.title}</span>
              <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{template.category}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/95 backdrop-blur-md text-slate-900 shadow-md">
              {template.category}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#e11d48] transition-colors leading-snug">
            {template.title}
          </h3>
          <span className="text-xs font-black text-[#e11d48] bg-rose-50 border border-rose-100 px-3 py-1 rounded-full whitespace-nowrap ml-2">
            {template.price === "0" || template.price.toLowerCase() === "free" ? "Free" : `$${template.price}`}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 mb-5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-slate-700">{template.rating}</span>
          <span className="text-xs text-slate-400 font-medium ml-1">(4.9/5 verified)</span>
        </div>

        <div className="flex gap-3">
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => window.open('#', '_blank')}
          >
            Preview <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={onUseTemplate}
          >
            Use Architecture <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
