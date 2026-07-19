"use client";

import React, { useState } from "react";
import { ExternalLink, Layers, ArrowRight } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price?: string;
  rating: number;
}

interface TemplateCardProps {
  template: Template;
  onSelectTemplate: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelectTemplate }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative rounded-3xl bg-white border border-slate-200/80 p-5 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-[#2563eb]/40 transition-all duration-300 flex flex-col h-full justify-between">
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
              <Layers className="w-8 h-8 text-[#2563eb] mb-2" />
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
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors leading-snug">
            {template.title}
          </h3>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2">
            Free Blueprint
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>

      <div>
        <div className="flex gap-3 mt-4">
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => window.open('#', '_blank')}
          >
            Preview <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={onSelectTemplate}
          >
            Request Build <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
