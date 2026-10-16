"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Phone,
  Trash2,
  Plus,
  Minus,
  ExternalLink,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  Share2,
  Zap,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Smartphone,
  LogOut,
  Store,
  TrendingUp,
  PackageCheck,
  Bell,
  Settings,
  Layers,
} from "lucide-react";
import { ProductItem } from "./MegaStoreInterface";

// 1. Weekly Deals Products
const WEEKLY_DEALS: ProductItem[] = [
  {
    id: "deal-1",
    name: "Wilson Ultra Power XL 112 Smart Band",
    category: "Sports & Gadgets",
    price: 1899.0,
    originalPrice: 1994.05,
    rating: 4.9,
    reviewsCount: 120,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    seller: "Motion View",
    badge: "Sale",
    discountPercent: 15,
  },
  {
    id: "deal-2",
    name: "Horizon Pro Max Ceramic Titanium Phone",
    category: "Electronics",
    price: 1099.0,
    originalPrice: 1299.0,
    rating: 5.0,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    seller: "Zeoraz Verified Store",
    badge: "Hot",
    discountPercent: 20,
  },
  {
    id: "deal-3",
    name: "AeroSprint Retro Speed High-Top Sneakers",
    category: "Men's Clothing",
    price: 189.0,
    originalPrice: 245.0,
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    seller: "Aura Lifestyle",
    badge: "Sale",
    discountPercent: 25,
  },
  {
    id: "deal-4",
    name: "Studio Retina Display Ultrabook M3",
    category: "Electronics",
    price: 1450.0,
    originalPrice: 1699.0,
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    seller: "Apple Certified Merchant",
    badge: "Hot",
    discountPercent: 14,
  },
  {
    id: "deal-5",
    name: "Lumina Monolith Swiss Horology Watch",
    category: "Jewelry & Accessories",
    price: 1250.0,
    originalPrice: 1500.0,
    rating: 5.0,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    seller: "Lumina Atelier",
    badge: "Sale",
    discountPercent: 17,
  },
];

// 2. Category circular bubbles
const CATEGORY_CIRCLES = [
  { name: "Smartwatches", count: "120+ Items", icon: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80" },
  { name: "Audio & Sound", count: "85+ Items", icon: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" },
  { name: "Designer Living", count: "210+ Items", icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=200&q=80" },
  { name: "Footwear", count: "340+ Items", icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80" },
  { name: "Leather Bags", count: "95+ Items", icon: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=200&q=80" },
  { name: "Cosmetics", count: "140+ Items", icon: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80" },
  { name: "Smart Home", count: "60+ Items", icon: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=200&q=80" },
];

// 3. Popular Products Grid
const POPULAR_PRODUCTS: ProductItem[] = [
  {
    id: "pop-1",
    name: "Aura Acoustics Ambient 360 Speaker",
    category: "Audio",
    price: 199.0,
    originalPrice: 249.0,
    rating: 4.8,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    seller: "Aura Sound Lab",
    badge: "Sale",
  },
  {
    id: "pop-2",
    name: "Minimalist Aero Weatherproof Umbrella",
    category: "Accessories",
    price: 49.0,
    originalPrice: 65.0,
    rating: 4.7,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    seller: "Urban Goods",
  },
  {
    id: "pop-3",
    name: "Horizon Neo Smartphone 256GB Dual SIM",
    category: "Electronics",
    price: 899.0,
    originalPrice: 999.0,
    rating: 4.9,
    reviewsCount: 194,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    seller: "OnePlus Store",
    badge: "Hot",
  },
  {
    id: "pop-4",
    name: "Botanical Skincare Essence & Mineral Palette",
    category: "Beauty & Health",
    price: 89.0,
    originalPrice: 110.0,
    rating: 5.0,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    seller: "Artisan Beauty",
  },
  {
    id: "pop-5",
    name: "Handcrafted Scandinavian Oak Lounge Chair",
    category: "Furniture",
    price: 420.0,
    originalPrice: 510.0,
    rating: 4.9,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
    seller: "Nordic Living Atelier",
    badge: "Sale",
  },
  {
    id: "pop-6",
    name: "Spatial Audio Wireless Noise-Cancelling Cans",
    category: "Audio",
    price: 320.0,
    originalPrice: 380.0,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    seller: "Audio Craft Lab",
    badge: "Hot",
  },
  {
    id: "pop-7",
    name: "Italian Full-Grain Weekender Leather Duffle",
    category: "Leather Goods",
    price: 385.0,
    originalPrice: 450.0,
    rating: 5.0,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    seller: "Aero Goods Atelier",
  },
  {
    id: "pop-8",
    name: "Pastel Air Circulator Desktop Fan",
    category: "Home & Living",
    price: 34.0,
    originalPrice: 48.0,
    rating: 4.6,
    reviewsCount: 118,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    seller: "Felly Living",
    badge: "Sale",
  },
];

interface LoggedInHomeProps {
  onSignOut?: () => void;
}

export const LoggedInHome: React.FC<LoggedInHomeProps> = ({ onSignOut }) => {
  // Merchant details
  const [merchantName] = useState("Lumina Atelier");
  const [subdomain] = useState("lumina-atelier.zeoraz.com");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dealsCategory, setDealsCategory] = useState("All");

  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: WEEKLY_DEALS[0], quantity: 1 },
    { product: POPULAR_PRODUCTS[0], quantity: 2 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(["deal-2", "pop-5"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Countdown Timer (03:14:49:40)
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 14,
    minutes: 49,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setToastMessage(`Added "${product.name.slice(0, 24)}..." to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const filteredDeals = useMemo(() => {
    if (dealsCategory === "All") return WEEKLY_DEALS;
    return WEEKLY_DEALS.filter((d) => d.category.toLowerCase().includes(dealsCategory.toLowerCase()));
  }, [dealsCategory]);

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#1E1F22] font-sans antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* 1. AUTHENTICATED MERCHANT COMMAND STRIP */}
      <div className="bg-[#0F2922] text-[#D8E6DF] py-2.5 px-4 sm:px-8 border-b border-[#183D32] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Left Merchant Status */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Merchant Portal:</span>
              <span className="text-[#FFC72C] font-semibold">{merchantName}</span>
              <span className="hidden sm:inline text-[#8EB8A9]">({subdomain})</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#183E34] text-[10px] font-bold text-[#A8D8C8] border border-[#235345]">
              Verified Store
            </span>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden lg:flex items-center gap-4 text-[#B4D6C9]">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#FFC72C]" />
                <strong className="text-white">$12,450</strong> Sales
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <PackageCheck className="w-3.5 h-3.5 text-[#FFC72C]" />
                <strong className="text-white">28</strong> Orders
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-[#10B981]" />
                <strong className="text-white">14</strong> Inquiries
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <Link
                href="/biz/lumina-atelier"
                className="px-3 py-1 rounded-full bg-[#183E34] hover:bg-[#235345] text-white font-semibold transition-colors flex items-center gap-1"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3 h-3 text-[#FFC72C]" />
              </Link>
              <Link
                href="/publish"
                className="px-3 py-1 rounded-full bg-[#FFB800] hover:bg-[#EAA800] text-[#0F2922] font-bold transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Product</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN E-COMMERCE HEADER */}
      <header className="bg-[#FAF9F5] border-b border-[#E8E4DA] shadow-sm z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
          {/* Sidebar Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-[#1E1F22] hover:bg-[#EAE5D8] transition-colors cursor-pointer flex items-center gap-1.5 group border border-transparent hover:border-[#DDD7C9]"
              title="Open Navigation & Merchant Sidebar"
              aria-label="Open Sidebar"
            >
              <Menu className="w-5 h-5 text-[#0F2922] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold text-[#44423C]">Menu</span>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-[#0F2922] text-[#FFC72C] flex items-center justify-center font-black text-lg shadow-sm">
              Z
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#141517] uppercase flex items-center gap-1">
                ZEORAZ<span className="text-[#0F2922] font-serif font-bold italic lowercase text-lg">mart</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#7C7971] -mt-1 font-semibold">
                Commerce &amp; Retail
              </span>
            </div>
          </Link>
        </div>

          {/* Omni Search */}
          <div className="hidden lg:flex flex-1 max-w-2xl items-center relative">
            <div className="w-full flex items-center rounded-full bg-white border border-[#D9D3C7] focus-within:border-[#0F2922] focus-within:ring-2 focus-within:ring-[#0F2922]/10 transition-all overflow-hidden pl-4 pr-1.5 py-1">
              <input
                type="text"
                placeholder="Search across 50,000+ luxury watches, apparel, furniture & electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-[#1E1F22] placeholder:text-[#9A968D] outline-none"
              />
              <button className="px-5 py-2 rounded-full bg-[#FFB800] hover:bg-[#EAA800] text-[#1E1F22] text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => alert(`You have ${wishlist.length} saved items.`)}
              className="relative p-2 text-[#46443E] hover:text-[#0F2922] transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E03A3A] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-[#EFECE4] transition-colors cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#0F2922]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#0F2922] text-[#FFC72C] text-[10px] font-bold flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#7A776F] font-semibold">Your Cart</span>
                <span className="text-xs font-bold text-[#141517]">${cartTotal.toFixed(2)}</span>
              </div>
            </button>

            {/* Logged-In User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE5D8] hover:bg-[#E0D9C8] transition-colors text-xs font-bold text-[#1E1F22] cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F2922] text-white flex items-center justify-center text-[11px] font-black">
                  L
                </div>
                <span className="hidden sm:inline">Lumina Atelier</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5C5950]" />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E4DFD3] p-2 z-50 divide-y divide-[#F0EDE6]"
                  >
                    <div className="px-3 py-2">
                      <span className="text-xs font-bold text-[#1E1F22] block">Lumina Atelier</span>
                      <span className="text-[10px] text-[#7A776F] block truncate">concierge@lumina-atelier.com</span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/biz/lumina-atelier"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF8F5] text-xs font-medium text-[#3E3C36] flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Store className="w-3.5 h-3.5 text-[#0F2922]" />
                          <span>My Storefront</span>
                        </span>
                        <ExternalLink className="w-3 h-3 text-[#A8A49C]" />
                      </Link>

                      <Link
                        href="/publish"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#FAF8F5] text-xs font-medium text-[#3E3C36] flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#0F2922]" />
                        <span>Manage / Add Items</span>
                      </Link>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onSignOut) onSignOut();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-xs font-bold text-red-700 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3. CATEGORIES & NAV BAR */}
        <div className="border-t border-[#EAE6DD] bg-white px-4 sm:px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="px-4 py-2 rounded-xl bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm"
              >
                <Menu className="w-4 h-4 text-[#FFC72C]" />
                <span>Browse Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A0B8AF]" />
              </button>

              <AnimatePresence>
                {isCategoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#E8E4DA] p-3 z-50 divide-y divide-[#F0EDE6]"
                  >
                    {[
                      "Luxury Timepieces & Watches",
                      "Designer Living & Furniture",
                      "Fine Leather Goods & Duffles",
                      "Smart Electronics & Audio",
                      "Apparel & Men's Fashion",
                      "Haute Cosmetics & Fragrance",
                    ].map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setIsCategoryMenuOpen(false)}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAF8F5] text-xs font-medium text-[#3E3C36] flex items-center justify-between group transition-colors"
                      >
                        <span>{cat}</span>
                        <ArrowRight className="w-3 h-3 text-[#A8A49C] group-hover:text-[#0F2922] transition-colors" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#525049]">
              <a href="#hero-deals" className="hover:text-[#0F2922] transition-colors">Shop</a>
              <a href="#weekly-deals" className="hover:text-[#0F2922] transition-colors flex items-center gap-1 text-[#E03A3A]">
                <Flame className="w-3.5 h-3.5 fill-[#E03A3A]" />
                <span>Super Deals</span>
              </a>
              <a href="#categories" className="hover:text-[#0F2922] transition-colors">Find Store</a>
              <a href="#popular-products" className="hover:text-[#0F2922] transition-colors">What&apos;s New</a>
              <a href="#brand-spotlight" className="hover:text-[#0F2922] transition-colors flex items-center gap-1.5">
                <span>Special Offer</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FFB800] text-[#1E1F22] font-black uppercase">
                  Hot
                </span>
              </a>
              <Link href="/biz/lumina-atelier" className="hover:text-[#0F2922] transition-colors">Verified Merchant</Link>
            </div>

            <div className="text-xs font-bold text-[#0F2922] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="hidden sm:inline">24/7 Concierge:</span>
              <span className="font-mono text-xs">+1 (800) 492-9367</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. HERO BENTO PROMOTIONAL GRID */}
      <section id="hero-deals" className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Big Featured Left Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#ECE7DC] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-sm border border-[#DDD6C8]">
            <div className="max-w-md z-10 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7468] bg-[#DDD6C8] px-3 py-1 rounded-full">
                Women&apos;s &amp; Living Collection
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E1F22] leading-[1.08] tracking-tight">
                Best Furniture Collection
              </h2>
              <p className="text-sm text-[#5C584F] leading-relaxed">
                Dining, living, &amp; desk areas serve their purposes in total harmony of style and architectural elegance.
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById("popular-products");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-4 px-6 py-3 rounded-full bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end pointer-events-none opacity-90 lg:opacity-100">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                alt="Minimalist Living Armchair"
                width={800}
                height={800}
                className="w-full h-full object-cover object-center mix-blend-multiply rounded-r-3xl"
              />
            </div>
          </div>

          {/* Bento Right Column */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="rounded-3xl bg-[#F4EFEB] p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-[#E5DFD4]">
              <div className="max-w-[200px] z-10">
                <span className="text-[10px] font-black uppercase text-[#E03A3A] tracking-wider">Super Sale 50%</span>
                <h3 className="text-xl font-black text-[#1E1F22] mt-1 leading-tight">
                  Stylish Looks For Any Season
                </h3>
                <a
                  href="#popular-products"
                  className="mt-3 inline-block text-xs font-bold text-[#0F2922] underline underline-offset-4 hover:text-[#FFB800] transition-colors"
                >
                  Shop Now →
                </a>
              </div>
              <div className="absolute right-2 bottom-0 top-0 w-36 pointer-events-none">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
                  alt="Stylish Season Looks"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top mix-blend-multiply"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-[#E8EFEA] p-6 relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-[#D5E2D9]">
              <div className="max-w-[200px] z-10">
                <span className="text-[10px] font-black uppercase text-[#0F2922] tracking-wider">Mid Summer 30% Off</span>
                <h3 className="text-xl font-black text-[#1E1F22] mt-1 leading-tight">
                  Trendsetting Streetwear &amp; Timepieces
                </h3>
                <a
                  href="#weekly-deals"
                  className="mt-3 inline-block text-xs font-bold text-[#0F2922] underline underline-offset-4 hover:text-[#FFB800] transition-colors"
                >
                  Explore Deals →
                </a>
              </div>
              <div className="absolute right-2 bottom-0 top-0 w-36 pointer-events-none">
                <Image
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80"
                  alt="Summer Streetwear"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover object-top mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WEEKLY BEST DEALS (DARK FOREST GREEN SECTION - MATCHING USER SCREENSHOT) */}
      <section id="weekly-deals" className="bg-[#0B251E] text-white py-12 sm:py-16 my-8 px-4 sm:px-8 border-y border-[#143B30]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#184539]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFC72C]">Flash Deals</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
                <span>Weekly Best Deals</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E03A3A] text-white text-xs font-bold animate-pulse">
                  Live
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 bg-[#13382D] border border-[#205445] px-4 py-2.5 rounded-2xl shadow-inner">
              <span className="text-xs text-[#A1C7BA] font-medium mr-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span>Limited time only!</span>
              </span>
              <div className="flex items-center gap-1 font-mono font-black text-sm">
                <span className="px-2 py-1 rounded bg-[#E03A3A] text-white">
                  {String(countdown.days).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded bg-[#E03A3A] text-white">
                  {String(countdown.hours).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded bg-[#E03A3A] text-white">
                  {String(countdown.minutes).padStart(2, "0")}
                </span>
                <span>:</span>
                <span className="px-2 py-1 rounded bg-[#E03A3A] text-white">
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              "All",
              "Sports & Gadgets",
              "Electronics",
              "Men's Clothing",
              "Jewelry & Accessories",
              "Beauty & Health",
              "Home & Living",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setDealsCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  dealsCategory === cat
                    ? "bg-[#FFB800] text-[#0B251E] shadow-md"
                    : "bg-[#143B30] text-[#B8D4CA] hover:bg-[#1D4E41] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredDeals.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 text-[#1E1F22] shadow-lg flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 relative border border-[#EAE4D9]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#E03A3A] text-white text-[10px] font-black uppercase">
                    {item.discountPercent ? `Save ${item.discountPercent}%` : item.badge}
                  </span>
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="p-1 text-[#98958D] hover:text-[#E03A3A] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlist.includes(item.id) ? "fill-[#E03A3A] text-[#E03A3A]" : ""}`}
                    />
                  </button>
                </div>

                <div className="w-full aspect-square relative rounded-xl overflow-hidden bg-[#F6F5F2] mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-semibold text-[#8C8880] uppercase tracking-wider block">
                    {item.seller}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2 leading-snug group-hover:text-[#0B251E] transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#FFB800]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FFB800]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7A776F] font-semibold">({item.reviewsCount})</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-[#F0EDE6]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-[#141517]">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-[#9E9B93] line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-2 rounded-xl bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POPULAR PRODUCTS & SLIDE-OVER CART */}
      <section id="popular-products" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7871]">Curated Catalogue</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1F22] tracking-tight">Popular Products</h3>
          </div>
          <div className="text-xs text-[#6E6B63] font-medium">
            Authenticated inventory with real-time multi-currency checkout.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {POPULAR_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl p-4 border border-[#EAE5DC] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A877E] bg-[#F4F1EA] px-2 py-0.5 rounded">
                    {prod.category}
                  </span>
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-1 text-[#98958D] hover:text-[#E03A3A] transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlist.includes(prod.id) ? "fill-[#E03A3A] text-[#E03A3A]" : ""}`}
                    />
                  </button>
                </div>

                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#F8F7F4] mb-3">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <span className="text-[10px] font-semibold text-[#8E8B83] uppercase block">{prod.seller}</span>
                <h4 className="text-sm font-bold text-[#1E1F22] line-clamp-2 mt-1 leading-snug group-hover:text-[#0F2922] transition-colors">
                  {prod.name}
                </h4>

                <div className="flex items-center gap-1.5 text-xs text-[#FFB800] mt-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FFB800]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#7A776F] font-semibold">({prod.reviewsCount})</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F0EDE6] mt-4 flex items-center justify-between gap-3">
                <div>
                  <span className="text-base font-black text-[#141517]">${prod.price.toFixed(2)}</span>
                  {prod.originalPrice && (
                    <span className="block text-[11px] text-[#9E9B93] line-through">
                      ${prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="px-3.5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SLIDE-OVER CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between"
              >
                <div className="p-6 border-b border-[#E8E4DA] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#0F2922]" />
                    <h3 className="text-lg font-black text-[#1E1F22]">
                      Your Cart ({totalCartCount})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-[#7C7971] hover:text-[#1E1F22] rounded-full hover:bg-[#EFECE4] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EAE5DC]"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4F1EA] flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-[#8E8B83]">
                            {item.product.seller}
                          </span>
                          <h4 className="text-xs font-bold text-[#1E1F22] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-black text-[#0F2922]">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 border border-[#DDD7CC] rounded-lg px-2 py-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="text-[#6A665E] hover:text-black"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="text-[#6A665E] hover:text-black"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, -item.quantity)}
                            className="text-[#9E9A90] hover:text-[#E03A3A] transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-[#E8E4DA] bg-white space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6E6B62] font-semibold">Subtotal</span>
                    <span className="text-xl font-black text-[#141517]">${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      const orderSummary = cartItems
                        .map((i) => `${i.quantity}x ${i.product.name} ($${i.product.price})`)
                        .join(", ");
                      const url = `https://wa.me/15552345678?text=${encodeURIComponent(
                        `Hello Zeoraz Mart, I would like to place an order for: ${orderSummary}. Total: $${cartTotal.toFixed(2)}`
                      )}`;
                      window.open(url, "_blank");
                    }}
                    className="w-full py-3.5 rounded-full bg-[#1FAF38] hover:bg-[#18942F] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>1-Click WhatsApp Direct Order</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. RESPONSIVE SIDEBAR DRAWER (COLLAPSIBLE / SLIDE-IN) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-xs sm:max-w-sm bg-[#FAF8F5] text-[#1E1F22] shadow-2xl flex flex-col justify-between border-r border-[#E5DFD4] overflow-hidden"
              >
                {/* Sidebar Header */}
                <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#F2EDE2]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0F2922] text-[#FFC72C] flex items-center justify-center font-black text-sm shadow-sm">
                      Z
                    </div>
                    <div>
                      <span className="text-base font-black tracking-tight text-[#141517] uppercase flex items-center gap-1">
                        ZEORAZ<span className="text-[#0F2922] font-serif font-bold italic lowercase text-base">mart</span>
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#7A766D] font-bold block -mt-1">
                        Navigation &amp; Merchant Hub
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-[#6A665D] hover:text-[#1E1F22] hover:bg-[#E2DDD0] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sidebar Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {/* Merchant Account Card */}
                  <div className="p-4 rounded-2xl bg-[#0F2922] text-white space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8D8CC]">
                          Merchant Active
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#184236] text-[9px] font-bold text-[#FFC72C] border border-[#235647]">
                        Verified Store
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-white">{merchantName}</h4>
                      <Link
                        href="/biz/lumina-atelier"
                        onClick={() => setIsSidebarOpen(false)}
                        className="text-[11px] text-[#A8C7BB] hover:text-[#FFC72C] transition-colors flex items-center gap-1 mt-0.5"
                      >
                        <span>{subdomain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1C473A] text-center">
                      <div className="bg-[#15382E] p-1.5 rounded-lg">
                        <span className="text-[9px] text-[#8EB8A9] block">Revenue</span>
                        <span className="text-xs font-black text-white">$12.4k</span>
                      </div>
                      <div className="bg-[#15382E] p-1.5 rounded-lg">
                        <span className="text-[9px] text-[#8EB8A9] block">Orders</span>
                        <span className="text-xs font-black text-white">28</span>
                      </div>
                      <div className="bg-[#15382E] p-1.5 rounded-lg">
                        <span className="text-[9px] text-[#8EB8A9] block">Inquiries</span>
                        <span className="text-xs font-black text-white">14</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href="/biz/lumina-atelier"
                        onClick={() => setIsSidebarOpen(false)}
                        className="py-1.5 rounded-xl bg-[#1C473A] hover:bg-[#255C4B] text-[11px] font-bold text-center text-white transition-colors block"
                      >
                        Live Storefront
                      </Link>
                      <Link
                        href="/publish"
                        onClick={() => setIsSidebarOpen(false)}
                        className="py-1.5 rounded-xl bg-[#FFB800] hover:bg-[#EAA800] text-[11px] font-black text-center text-[#0F2922] transition-colors block"
                      >
                        + Add Product
                      </Link>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C887E] block px-2 mb-1">
                      Store Navigation
                    </span>
                    <a
                      href="#hero-deals"
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#2A2824] hover:bg-[#EFEAE0] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Store className="w-4 h-4 text-[#0F2922]" />
                        <span>All Products &amp; Living</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A8A49C]" />
                    </a>

                    <a
                      href="#weekly-deals"
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#E03A3A] hover:bg-[#FBE8E8] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Flame className="w-4 h-4 fill-[#E03A3A]" />
                        <span>Weekly Best Deals (Live)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E03A3A] text-white font-bold">
                        Sale
                      </span>
                    </a>

                    <a
                      href="#categories"
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#2A2824] hover:bg-[#EFEAE0] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-[#0F2922]" />
                        <span>Featured Categories</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A8A49C]" />
                    </a>

                    <a
                      href="#popular-products"
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#2A2824] hover:bg-[#EFEAE0] transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Star className="w-4 h-4 text-[#FFB800]" />
                        <span>Popular Products</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#A8A49C]" />
                    </a>
                  </div>

                  {/* Categories Tree */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C887E] block px-2 mb-1">
                      Browse by Category
                    </span>
                    {[
                      { name: "Luxury Timepieces & Horology", count: "120+ Items", tag: "Hot" },
                      { name: "Designer Living & Furniture", count: "210+ Items" },
                      { name: "Italian Leather Goods & Duffles", count: "95+ Items" },
                      { name: "Spatial Audio & Wearables", count: "85+ Items" },
                      { name: "Haute Cosmetics & Fragrance", count: "140+ Items" },
                      { name: "Men's Apparel & Footwear", count: "340+ Items" },
                      { name: "Smart Home & Desktop Cooling", count: "60+ Items" },
                    ].map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsSidebarOpen(false);
                          const el = document.getElementById("popular-products");
                          el?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#46433C] hover:bg-[#EFEAE0] hover:text-[#0F2922] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-2">{c.name}</span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {c.tag && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FFB800] text-[#0F2922] font-black uppercase">
                              {c.tag}
                            </span>
                          )}
                          <span className="text-[10px] text-[#9A968D] font-mono">{c.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#E8E2D5] bg-[#F2EDE2] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#635F56] px-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#0F2922]" />
                      <span>Concierge:</span>
                    </span>
                    <span className="font-mono font-bold text-[#0F2922]">+1 (800) 492-9367</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsSidebarOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    className="w-full py-2.5 rounded-xl border border-[#DDD6C7] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-bold text-[#4B4840] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Merchant Hub</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
