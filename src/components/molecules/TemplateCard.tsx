"use client";

import React from "react";
import { ExternalLink, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/atoms/Button";

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
  return (
    <div className="group relative rounded-2xl glassmorphism p-1 transition-all duration-300 hover:glow-cyan flex flex-col h-full bg-slate-900/50">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-slate-950">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${template.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-semibold rounded-md bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/50">
            {template.category}
          </span>
        </div>
      </div>
      
      <div className="px-4 pb-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-primary transition-colors">
            {template.title}
          </h3>
          <span className="text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
            {template.price === "0" || template.price.toLowerCase() === "free" ? "Free" : `$${template.price}`}
          </span>
        </div>
        
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
          {template.description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-medium text-slate-300">{template.rating}</span>
        </div>

        <div className="flex gap-3 mt-auto">
          <Button 
            variant="secondary" 
            className="flex-1 py-2 px-3 flex items-center justify-center gap-2 text-xs"
            onClick={() => window.open('#', '_blank')}
          >
            Preview <ExternalLink className="w-3 h-3" />
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 py-2 px-3 flex items-center justify-center gap-2 text-xs"
            onClick={onUseTemplate}
          >
            Use <ShoppingCart className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
