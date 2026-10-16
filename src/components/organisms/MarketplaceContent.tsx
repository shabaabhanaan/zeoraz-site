"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Store,
  MapPin,
  Search,
  Filter,
  ShoppingBag,
  ExternalLink,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  CreditCard,
  Sparkles,
  Layers,
  Watch,
  Shirt,
  Cpu,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { TalkToUsModal } from "@/components/organisms/TalkToUsModal";
import { PublishBusinessModal } from "@/components/organisms/PublishBusinessModal";
import { TemplatePurchaseModal } from "@/components/organisms/TemplatePurchaseModal";
import { WhatsAppWidget } from "@/components/atoms/WhatsAppWidget";
import { ChatbotWidget } from "@/components/atoms/ChatbotWidget";
import { Template } from "@/components/molecules/TemplateCard";

export interface MarketplaceItem {
  id: string;
  name: string;
  type: "digital" | "physical";
  category: "Digital Blueprints" | "Luxury Watches" | "Haute Fragrances" | "Apparel & Footwear" | "Leather Goods & Decor";
  price: number | string;
  rating: number;
  image: string;
  seller: string;
  description: string;
  previewUrl?: string;
  badge?: string;
}

const ALL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // 1. Digital Blueprints
  {
    id: "item-blueprint-1",
    name: "Zeoraz Digital Agency (Grey & Beige Minimalist)",
    type: "digital",
    category: "Digital Blueprints",
    price: "Free",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    seller: "Zeoraz Studio",
    description: "Editorial minimalist digital agency architecture with warm greige & beige tones, portfolio gallery, and consultation booking.",
    previewUrl: "/templates/digital-agency",
    badge: "Featured Blueprint",
  },
  {
    id: "item-blueprint-2",
    name: "Enterprise E-Commerce Ultra",
    type: "digital",
    category: "Digital Blueprints",
    price: 149,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    seller: "Zeoraz Software",
    description: "High-throughput e-commerce platform with sub-10ms cart sync, headless Stripe checkout, and multi-currency support.",
    badge: "Best Seller",
  },
  {
    id: "item-blueprint-3",
    name: "SaaS Enterprise Starter Kit",
    type: "digital",
    category: "Digital Blueprints",
    price: 199,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    seller: "Zeoraz Software",
    description: "Production-ready Next.js SaaS architecture with auth, database models, team workspaces, and billing portal.",
  },
  {
    id: "item-blueprint-4",
    name: "Enterprise AI & Web3 DApp",
    type: "digital",
    category: "Digital Blueprints",
    price: 179,
    rating: 4.8,
    image: "/images/web3-ai-dapp.png",
    seller: "Zeoraz Labs",
    description: "High-performance streaming dashboard for autonomous AI agents and decentralized analytics with web3 auth.",
  },

  // 2. Luxury Watches
  {
    id: "item-watch-1",
    name: "Zeoraz Chronograph Alpha",
    type: "physical",
    category: "Luxury Watches",
    price: 249,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    seller: "Zeoraz Horology",
    description: "Tactical minimalist chronograph with sapphire crystal glass, aerospace aluminum casing, and Italian leather band.",
    badge: "Crafted in Tokyo",
  },
  {
    id: "item-watch-2",
    name: "Zeoraz Vanguard Automatic",
    type: "physical",
    category: "Luxury Watches",
    price: 499,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80",
    seller: "Zeoraz Horology",
    description: "Swiss-movement mechanical timepiece featuring skeletonized dial, 42-hour power reserve, and DLC matte black finish.",
  },

  // 3. Haute Fragrances
  {
    id: "item-perfume-1",
    name: "Oud Imperial Elixir Eau de Parfum",
    type: "physical",
    category: "Haute Fragrances",
    price: 210,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    seller: "Royal Oud Atelier",
    description: "Rare aged Cambodian oud infused with amber resin, smoked cedarwood, and wild Damask rose absolute.",
    badge: "Pure Extrait",
  },
  {
    id: "item-perfume-2",
    name: "Velvet Rose & Smoked Vanilla",
    type: "physical",
    category: "Haute Fragrances",
    price: 175,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    seller: "Royal Oud Atelier",
    description: "Warm oriental gourmand bouquet with top notes of French rose petals, bergamot spice, and Madagascar smoked bourbon vanilla.",
  },
  {
    id: "item-perfume-3",
    name: "Aura Noir Intense Nectar",
    type: "physical",
    category: "Haute Fragrances",
    price: 195,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    seller: "Royal Oud Atelier",
    description: "Nocturnal olfactory composition blending cardamom, dark patchouli, incense smoke, and velvety black musk.",
  },

  // 4. Apparel & Footwear
  {
    id: "item-apparel-1",
    name: "Tech-Shell Modular Windbreaker",
    type: "physical",
    category: "Apparel & Footwear",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    seller: "Apex Atelier",
    description: "Waterproof 3-layer breathable outer membrane with magnetic zip-off sleeves, taped seams, and internal harness system.",
  },
  {
    id: "item-apparel-2",
    name: "AeroStep Light Knit Runners",
    type: "physical",
    category: "Apparel & Footwear",
    price: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    seller: "Apex Atelier",
    description: "Seamless engineered jacquard knit upper with dual-density nitrogen infused cushioning for zero-drag sprints.",
  },
  {
    id: "item-apparel-3",
    name: "Terra-Trek Waterproof All-Terrain Boots",
    type: "physical",
    category: "Apparel & Footwear",
    price: 165,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80",
    seller: "Apex Atelier",
    description: "Heavy-duty technical mountaineering boot with Vibram lugged soles, reinforced rubber toe cap, and Gore-Tex lining.",
  },

  // 5. Leather Goods & Decor
  {
    id: "item-leather-1",
    name: "Tuscan Vegetable-Tanned Leather Weekender",
    type: "physical",
    category: "Leather Goods & Decor",
    price: 385,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    seller: "Maison Cuir",
    description: "Handcrafted full-grain Italian leather travel duffle with solid brass hardware, tailored interior compartments, and detachable shoulder strap.",
    badge: "Handmade Atelier",
  },
  {
    id: "item-leather-2",
    name: "Brushed Champagne Brass & Marble Vessel",
    type: "physical",
    category: "Leather Goods & Decor",
    price: 140,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    seller: "Atelier Forme",
    description: "Minimalist sculptural interior accent turned from solid Carrara marble with brushed champagne brass detail.",
  },
];

const CATEGORIES = [
  "All Items",
  "Digital Blueprints",
  "Luxury Watches",
  "Haute Fragrances",
  "Apparel & Footwear",
  "Leather Goods & Decor",
];

interface CartItem {
  item: MarketplaceItem;
  quantity: number;
}

export const MarketplaceContent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Modals
  const [isTalkToUsOpen, setIsTalkToUsOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Template | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart operations
  const addToCart = (item: MarketplaceItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
  };

  const totalCartCount = useMemo(
    () => cart.reduce((acc, c) => acc + c.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((acc, c) => {
        const p = typeof c.item.price === "number" ? c.item.price : 0;
        return acc + p * c.quantity;
      }, 0),
    [cart]
  );

  // Filtered items
  const filteredItems = useMemo(() => {
    return ALL_MARKETPLACE_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "All Items" || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectBlueprint = (item: MarketplaceItem) => {
    setSelectedBlueprint({
      id: item.id,
      title: item.name,
      description: item.description,
      category: item.category,
      imageUrl: item.image,
      price: typeof item.price === "number" ? `$${item.price}` : item.price,
      rating: item.rating,
      previewUrl: item.previewUrl,
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F3F0EA] text-[#1E1F22] font-sans transition-colors duration-300 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-[#FAF8F5]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#E6E1D7] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Zeoraz Brand Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#1E1F22] uppercase">
              ZEORAZ<span className="text-[#8E8B83] font-serif italic text-lg ml-1">Studio</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E1F22]" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#5A5852]">
            <Link href="/#works" className="hover:text-[#1E1F22] transition-colors">Works</Link>
            <Link href="/marketplace" className="text-[#1E1F22] font-bold transition-colors flex items-center gap-1.5 border-b-2 border-[#1E1F22] pb-0.5">
              <span>Marketplace</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#EAE4D9] text-[#4A4741] font-bold">New</span>
            </Link>
            <Link href="/#about" className="hover:text-[#1E1F22] transition-colors">About</Link>
          </div>

          {/* Action CTAs & Cart Button */}
          <div className="flex items-center gap-3">
            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#EAE4D9] hover:bg-[#DDD5C7] text-[#1E1F22] transition-all cursor-pointer flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#1E1F22] text-[#FAF8F5] text-[10px] font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="hidden sm:flex px-4 py-2 rounded-full border border-[#DDD6C8] hover:bg-[#EBE5DA] text-[#4F4C45] text-xs font-bold tracking-wide transition-all items-center gap-1.5 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Publish Store</span>
            </button>
            <button
              onClick={() => setIsTalkToUsOpen(true)}
              className="hidden sm:flex px-5 py-2.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold tracking-wide transition-all shadow-sm items-center gap-1.5 cursor-pointer"
            >
              <span>Talk to Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1E1F22] hover:bg-[#EBE6DC] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E6E1D7] bg-[#F7F4EE] px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wide text-[#3E3D39]">
                <Link href="/#works" onClick={() => setMobileMenuOpen(false)}>Works</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="font-bold text-[#1E1F22]">
                  Marketplace
                </Link>
                <Link href="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              </div>
              <div className="pt-3 border-t border-[#E4DFD5] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsPublishModalOpen(true);
                  }}
                  className="w-full py-2.5 rounded-full border border-[#DDD6C8] text-xs font-bold text-center block"
                >
                  Publish Store
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTalkToUsOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-[#1E1F22] text-[#FAF8F5] text-xs font-bold text-center block tracking-wide"
                >
                  Talk to Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3] border-b border-[#DDD6C8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE4D9] border border-[#DDD6C9] text-xs font-bold uppercase tracking-[0.16em] text-[#4A4741] shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#1E1F22] animate-pulse" />
            Zeoraz Unified Marketplace — All Categories
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1E1F22] tracking-[-0.03em] uppercase leading-[0.98]">
              CURATED MARKETPLACE <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#66625B]">for every flagship item</span> <br />
              &amp; DIGITAL BLUEPRINTS
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-[#55524B] leading-relaxed mb-10 font-normal"
          >
            Discover verified website architectures, haute parfumerie, luxury timepieces, technical apparel, and precision 3D physical products engineered and curated by Zeoraz Studio.
          </motion.p>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-bold text-[#706C64] uppercase tracking-[0.16em]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1E1F22]" /> 100% Verified Quality
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#1E1F22]" /> Instant Digital &amp; Fast Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#1E1F22]" /> Direct Studio Warranty
            </span>
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Grid */}
      <main className="flex-1 py-12 max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 relative">
        {/* Controls: Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start w-full lg:w-auto">
            <Filter className="w-4 h-4 text-[#7C7871] mr-1 hidden lg:block" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1E1F22] text-[#FAF8F5] shadow-sm"
                    : "bg-[#FAF8F5] text-[#524F47] hover:bg-[#EAE4D9] border border-[#DDD5C7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#8C8880]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 border border-[#DDD5C7] rounded-full bg-[#FAF8F5] text-[#1E1F22] placeholder-[#9E9A91] focus:outline-none focus:ring-2 focus:ring-[#1E1F22] text-xs font-medium shadow-xs transition-all duration-200"
              placeholder="Search every item, perfume, watch, blueprint..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Item Counter Info */}
        <div className="flex justify-between items-center text-xs font-mono text-[#837F77] mb-8 pb-3 border-b border-[#DFD8CC]">
          <span>CATALOG / {selectedCategory.toUpperCase()}</span>
          <span>{filteredItems.length} ITEMS AVAILABLE</span>
        </div>

        {/* Products & Blueprints Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const formattedPrice =
                  typeof item.price === "number"
                    ? `$${item.price}`
                    : item.price;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    key={item.id}
                    className="group rounded-3xl bg-[#FAF8F5] border border-[#DFD8CC] p-5 shadow-sm hover:shadow-xl hover:border-[#1E1F22]/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-5 bg-[#1E1F22] border border-[#E3DCD0]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141517]/50 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                          <span className="px-3 py-1 text-[11px] font-bold rounded-full bg-[#FAF8F5]/95 backdrop-blur-md text-[#1E1F22] shadow-sm uppercase tracking-wider">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#1E1F22] text-white shadow-xs uppercase tracking-widest">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Header + Price */}
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div>
                          <span className="text-[11px] font-mono text-[#8C8880] block mb-0.5 uppercase">
                            {item.seller}
                          </span>
                          <h3 className="text-lg font-bold text-[#1E1F22] group-hover:text-black transition-colors leading-snug">
                            {item.name}
                          </h3>
                        </div>
                        <span className="text-base font-black text-[#1E1F22] whitespace-nowrap bg-[#EFEAE1] border border-[#DDD6C8] px-2.5 py-1 rounded-xl">
                          {formattedPrice}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5D5A53] mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-[#ECE5D9]">
                      {item.type === "digital" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (item.previewUrl) {
                                window.open(item.previewUrl, "_blank");
                              } else {
                                handleSelectBlueprint(item);
                              }
                            }}
                            className="flex-1 py-2.5 px-3 rounded-full bg-[#EFEAE1] hover:bg-[#E2DDD2] text-[#1E1F22] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Preview</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSelectBlueprint(item)}
                            className="flex-1 py-2.5 px-3 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Deploy</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            className="flex-1 py-2.5 px-4 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart ({formattedPrice})</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-[#78746C] flex flex-col items-center justify-center bg-[#FAF8F5] rounded-3xl border border-[#DFD8CC]">
                <Search className="w-12 h-12 mb-4 opacity-20 text-[#78746C]" />
                <p className="text-base font-semibold text-[#1E1F22]">
                  No items found matching &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Items");
                  }}
                  className="mt-4 text-[#1E1F22] font-bold hover:underline text-xs uppercase tracking-wider"
                >
                  Reset catalog filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Slide-Over Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="w-screen max-w-md bg-[#FAF8F5] text-[#1E1F22] border-l border-[#DFD8CC] shadow-2xl flex flex-col justify-between"
              >
                {/* Cart Header */}
                <div className="p-6 border-b border-[#E6E1D7] flex items-center justify-between bg-[#F4F0E8]">
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#1E1F22]" />
                    <h3 className="text-base font-black uppercase tracking-tight text-[#1E1F22]">
                      Your Studio Bag ({totalCartCount})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-[#7C7870] hover:text-[#1E1F22] rounded-lg hover:bg-black/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length > 0 ? (
                    cart.map(({ item, quantity }) => {
                      const itemPrice =
                        typeof item.price === "number" ? item.price : 0;
                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#DDD5C7]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#D5CDC0] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono text-[#8C8880] uppercase block">
                              {item.category}
                            </span>
                            <h4 className="text-xs font-bold text-[#1E1F22] truncate">
                              {item.name}
                            </h4>
                            <span className="text-xs font-black text-[#1E1F22] block mt-0.5">
                              ${itemPrice * quantity}
                            </span>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center border border-[#DDD5C7] rounded-lg bg-white">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1 hover:bg-[#EAE4D9] rounded-l-md transition-colors"
                                >
                                  <Minus className="w-3 h-3 text-[#1E1F22]" />
                                </button>
                                <span className="px-2 text-xs font-bold font-mono">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1 hover:bg-[#EAE4D9] rounded-r-md transition-colors"
                                >
                                  <Plus className="w-3 h-3 text-[#1E1F22]" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-[#A8A49C] hover:text-red-600 transition-colors flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-20 text-center text-[#8C8880]">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#8C8880]" />
                      <p className="text-sm font-semibold text-[#1E1F22]">
                        Your studio bag is currently empty.
                      </p>
                      <p className="text-xs text-[#706C64] mt-1">
                        Select perfumes, watches, blueprints, or hardware to checkout.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cart Footer / Checkout */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-[#E6E1D7] bg-[#F4F0E8] space-y-4">
                    <div className="space-y-1.5 text-xs text-[#5D5952]">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-[#1E1F22]">${cartSubtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Studio Shipping</span>
                        <span className="text-emerald-700 font-bold">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-[#1E1F22] pt-2 border-t border-[#DDD5C7]">
                        <span>Estimated Total</span>
                        <span>${cartSubtotal}</span>
                      </div>
                    </div>

                    {!checkoutComplete ? (
                      <button
                        onClick={() => setCheckoutComplete(true)}
                        className="w-full py-3.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Proceed to Studio Checkout (${cartSubtotal})</span>
                      </button>
                    ) : (
                      <div className="p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-300 text-center space-y-2">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-800 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Order Prepared for Dispatch</span>
                        </div>
                        <p className="text-[11px] text-emerald-700">
                          Thank you! Our studio team will fulfill your order shortly.
                        </p>
                        <button
                          onClick={() => {
                            setCart([]);
                            setCheckoutComplete(false);
                            setIsCartOpen(false);
                          }}
                          className="mt-1 text-xs font-bold text-emerald-900 underline"
                        >
                          Close Bag
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#141517] text-[#D8D4CC] pt-16 pb-12 px-6 lg:px-12 border-t border-[#26282C]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#2C2E33]">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-[-0.04em] text-white uppercase">
                  ZEORAZ<span className="text-[#99968F] font-serif italic text-xl ml-1">Studio</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-xs sm:text-sm text-[#9A968F] max-w-sm leading-relaxed">
                Curating physical luxury items, hardware, and digital software architectures. Built with precision and zero bloat.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-[#8A867E]">
                <MapPin className="w-3.5 h-3.5 text-[#C4C0B6]" />
                <span>Manhattan • Zurich • Ginza Tokyo</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">Marketplace Index</span>
              <div className="flex flex-col space-y-2 text-xs text-[#9E9B93]">
                {CATEGORIES.slice(1).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className="text-left hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white block">Architecture Specs</span>
              <div className="p-4 rounded-2xl bg-[#1D1E22] border border-[#2D3035] text-xs text-[#B5B2AA] space-y-2">
                <div className="flex justify-between">
                  <span>Catalog Engine:</span>
                  <span className="text-white font-mono">Multi-Vertical E-Commerce</span>
                </div>
                <div className="flex justify-between">
                  <span>Categories:</span>
                  <span className="text-white font-mono">Digital &amp; Physical Goods</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfillment:</span>
                  <span className="text-white font-mono">Direct Studio Dispatch</span>
                </div>
              </div>
              <button
                onClick={() => setIsTalkToUsOpen(true)}
                className="w-full py-3 rounded-full bg-[#E8E4DC] hover:bg-white text-[#141517] text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer"
              >
                Inquire for Bulk Orders
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7B7770]">
            <p>© {new Date().getFullYear()} Zeoraz Technologies. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <a href="#" className="hover:text-white transition-colors">Back to Top ↑</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <TalkToUsModal
        isOpen={isTalkToUsOpen}
        onClose={() => setIsTalkToUsOpen(false)}
      />

      {/* Publish Storefront Modal */}
      <PublishBusinessModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      {/* Template Purchase / Deploy Modal */}
      <TemplatePurchaseModal
        isOpen={Boolean(selectedBlueprint)}
        onClose={() => setSelectedBlueprint(null)}
        template={selectedBlueprint}
      />

      {/* Floating Chatbot & WhatsApp */}
      <ChatbotWidget />
      <WhatsAppWidget />
    </div>
  );
};
