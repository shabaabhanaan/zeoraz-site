"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { TemplateCard, Template } from "@/components/molecules/TemplateCard";

const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Enterprise E-Commerce Ultra",
    description: "High-throughput e-commerce platform with sub-10ms cart sync and multi-currency checkout.",
    category: "E-Commerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    price: "49",
    rating: 4.9,
  },
  {
    id: "2",
    title: "SaaS Enterprise Starter Kit",
    description: "Production-ready Next.js SaaS architecture with auth, Stripe billing, and admin dashboard.",
    category: "SaaS",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    price: "99",
    rating: 5.0,
  },
  {
    id: "3",
    title: "Creative Tech Agency Portfolio",
    description: "Sleek enterprise agency architecture tailored for software engineering teams & tech leaders.",
    category: "Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    price: "Free",
    rating: 4.8,
  },
  {
    id: "4",
    title: "Enterprise AI & Web3 DApp",
    description: "High-performance dashboard for AI agents and decentralized analytics with web3 auth.",
    category: "Web3",
    imageUrl: "/images/web3-ai-dapp.png",
    price: "79",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Tech Blog & Knowledge Hub",
    description: "Content-focused engineering blog template optimized for Core Web Vitals and SEO rank.",
    category: "Blog",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    price: "29",
    rating: 4.6,
  },
  {
    id: "6",
    title: "FinTech Real-time Analytics",
    description: "Complex financial data visualization and real-time streaming dashboard layout.",
    category: "Dashboard",
    imageUrl: "/images/fintech-analytics.png",
    price: "149",
    rating: 4.9,
  },
];

const categories = ["All", "E-Commerce", "SaaS", "Portfolio", "Web3", "Blog", "Dashboard"];

interface TemplateGridProps {
  onUseTemplate: (template: Template) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({ onUseTemplate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter((template) => {
      const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="template-grid" className="py-12 max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
      {/* Controls: Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 mr-2 hidden md:block" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#e11d48] text-white shadow-md shadow-rose-500/30"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e11d48] text-xs font-medium shadow-sm transition-all duration-200"
            placeholder="Search architectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={template.id}
              >
                <TemplateCard template={template} onUseTemplate={() => onUseTemplate(template)} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200"
            >
              <Search className="w-12 h-12 mb-4 opacity-20 text-slate-400" />
              <p className="text-base font-semibold text-slate-700">No architectures found matching your search.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-[#e11d48] font-bold hover:underline text-xs"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
