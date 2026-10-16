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
  previewUrl?: string;
}

interface TemplateCardProps {
  template: Template;
  onSelectTemplate: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelectTemplate }) => {
  const [imgError, setImgError] = useState(false);

  const handlePreview = () => {
    if (template.previewUrl) {
      window.open(template.previewUrl, "_blank");
    } else {
      window.open("#", "_blank");
    }
  };

  return (
    <div className="group relative rounded-3xl bg-[#FAF8F5] border border-[#DFD8CC] p-5 shadow-sm hover:shadow-xl hover:border-[#1E1F22]/30 transition-all duration-300 flex flex-col h-full justify-between">
      <div>
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-[#1E1F22] border border-[#E3DCD0]">
          {!imgError ? (
            <img
              src={template.imageUrl}
              alt={template.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#1E1F22]">
              <Layers className="w-8 h-8 text-[#FAF8F5] mb-2" />
              <span className="text-xs font-bold text-white tracking-tight">{template.title}</span>
              <span className="text-[10px] text-[#A8A49C] mt-1 uppercase tracking-widest">{template.category}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#FAF8F5]/95 backdrop-blur-md text-[#1E1F22] shadow-sm uppercase tracking-wider text-[11px]">
              {template.category}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-[#1E1F22] group-hover:text-black transition-colors leading-snug">
            {template.title}
          </h3>
          <span className="text-[11px] font-bold text-[#3B3A36] bg-[#EFEAE1] border border-[#DDD6C8] px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2">
            Free Blueprint
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#5D5A53] mb-4 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>

      <div>
        <div className="flex gap-2.5 mt-4 pt-3 border-t border-[#ECE5D9]">
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-[#EFEAE1] hover:bg-[#E2DDD2] text-[#1E1F22] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={handlePreview}
          >
            Preview <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button 
            className="flex-1 py-2.5 px-3 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={onSelectTemplate}
          >
            Request Build <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
