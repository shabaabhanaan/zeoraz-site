"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { TemplateCard, Template } from "@/components/molecules/TemplateCard";

const mockTemplates: Template[] = [
  {
    id: "1",
    title: "E-Commerce Ultra",
    description: "A high-performance e-commerce template with advanced cart and checkout flows.",
    category: "E-Commerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    price: "49",
    rating: 4.9,
  },
  {
    id: "2",
    title: "SaaS Starter Kit",
    description: "Everything you need to launch your SaaS, including billing and user dashboards.",
    category: "SaaS",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    price: "99",
    rating: 5.0,
  },
  {
    id: "3",
    title: "Agency Portfolio",
    description: "Sleek and modern portfolio template tailored for creative agencies.",
    category: "Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    price: "Free",
    rating: 4.8,
  },
  {
    id: "4",
    title: "Web3 DApp UI",
    description: "Dark-themed dashboard for decentralized applications with wallet connect UI.",
    category: "Web3",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&w=800&q=80",
    price: "79",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Minimal Blog",
    description: "A content-focused blog template optimized for reading experience and SEO.",
    category: "Blog",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    price: "29",
    rating: 4.6,
  },
  {
    id: "6",
    title: "Fintech Dashboard",
    description: "Complex data visualization layout for financial technology apps.",
    category: "Dashboard",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
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
    <section className="py-12 max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative">
      {/* Controls: Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500 mr-2 hidden md:block" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-cyan-primary text-slate-950 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                  : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-800 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-primary focus:border-cyan-primary sm:text-sm transition-all duration-200"
            placeholder="Search templates..."
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
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
              className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center justify-center"
            >
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg">No templates found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-cyan-primary hover:underline text-sm"
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
