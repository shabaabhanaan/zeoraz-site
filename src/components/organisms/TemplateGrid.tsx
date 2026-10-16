"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { TemplateCard, Template } from "@/components/molecules/TemplateCard";

const mockTemplates: Template[] = [
  {
    id: "digital-agency",
    title: "Zeoraz Digital Agency (Grey & Beige Minimalist)",
    description: "Editorial minimalist agency architecture with warm greige & beige tones, portfolio gallery, team showcase, and consultation booking.",
    category: "Agency",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    previewUrl: "/templates/digital-agency",
  },
  {
    id: "1",
    title: "Enterprise E-Commerce Ultra",
    description: "High-throughput e-commerce platform with sub-10ms cart sync and multi-currency checkout.",
    category: "E-Commerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    previewUrl: "/marketplace",
  },
  {
    id: "2",
    title: "SaaS Enterprise Starter Kit",
    description: "Production-ready Next.js SaaS architecture with auth, database models, and admin dashboard.",
    category: "SaaS",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
  },
  {
    id: "3",
    title: "Boutique Creative Agency & Retail Portfolio",
    description: "Sleek enterprise architecture tailored for modern brands & creative commerce leaders.",
    category: "Portfolio",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
  },
  {
    id: "4",
    title: "Luxury Commerce & Direct Sales Storefront",
    description: "High-performance digital storefront architecture with multi-currency cart and checkout.",
    category: "E-Commerce",
    imageUrl: "/images/web3-ai-dapp.png",
    rating: 4.7,
  },
  {
    id: "5",
    title: "Brand Editorial & Publishing Hub",
    description: "Content-focused editorial brand template optimized for product storytelling and customer conversion.",
    category: "Blog",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
  },
  {
    id: "6",
    title: "FinTech Real-time Analytics",
    description: "Complex financial data visualization and real-time streaming dashboard layout.",
    category: "Dashboard",
    imageUrl: "/images/fintech-analytics.png",
    rating: 4.9,
  },
];

const categories = ["All", "Agency", "E-Commerce", "SaaS", "Portfolio", "Web3", "Blog", "Dashboard"];

interface TemplateGridProps {
  onSelectTemplate: (template: Template) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({ onSelectTemplate }) => {
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
          <Filter className="w-4 h-4 text-[#7C7871] mr-2 hidden md:block" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? "bg-[#1E1F22] text-[#FAF8F5] shadow-sm"
                  : "bg-[#FAF8F5] text-[#524F47] hover:bg-[#EBE5DA] border border-[#DDD5C7]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#8C8880]" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 border border-[#DDD5C7] rounded-full bg-[#FAF8F5] text-[#1E1F22] placeholder-[#9E9A91] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] text-xs font-medium shadow-xs transition-all duration-200"
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
                <TemplateCard template={template} onSelectTemplate={() => onSelectTemplate(template)} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center text-[#78746C] flex flex-col items-center justify-center bg-[#FAF8F5] rounded-3xl border border-[#DFD8CC]"
            >
              <Search className="w-12 h-12 mb-4 opacity-20 text-[#78746C]" />
              <p className="text-base font-semibold text-[#1E1F22]">No architectures found matching your search.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-[#1E1F22] font-bold hover:underline text-xs uppercase tracking-wider"
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
