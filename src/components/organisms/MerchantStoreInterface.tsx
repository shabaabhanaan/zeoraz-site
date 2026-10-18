"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  ChevronDown,
  Menu,
  X,
  Star,
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
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  ArrowLeft,
  Mail,
  Globe,
  SlidersHorizontal,
  Clock,
  Check,
} from "lucide-react";

export interface MerchantProduct {
  id: string;
  name: string;
  category?: string;
  price: string | number;
  originalPrice?: string | number;
  rating?: number;
  reviewsCount?: number;
  description: string;
  imageUrl?: string;
  badge?: string;
  stock?: number;
}

export interface MerchantBusinessData {
  id: string;
  slug: string;
  businessName: string;
  tagline?: string | null;
  description: string;
  category: string;
  subdomain: string;
  themeColor?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  contactEmail: string;
  whatsappNumber?: string | null;
  websiteUrl?: string | null;
  currency: string;
}

interface CartItem {
  product: MerchantProduct;
  quantity: number;
}

interface MerchantStoreInterfaceProps {
  business: MerchantBusinessData;
  initialProducts: MerchantProduct[];
}

export function MerchantStoreInterface({
  business,
  initialProducts,
}: MerchantStoreInterfaceProps) {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(business.currency || "USD");

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<MerchantProduct | null>(null);
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const themeColor = business.themeColor || "#1E1F22";

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Categories extraction
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialProducts]);

  // Currency symbols
  const currencySymbol = useMemo(() => {
    switch (selectedCurrency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "AUD":
        return "A$";
      default:
        return "$";
    }
  }, [selectedCurrency]);

  const parsePrice = (priceVal: string | number): number => {
    if (typeof priceVal === "number") return priceVal;
    const clean = priceVal.replace(/[^0-9.]/g, "");
    return parseFloat(clean) || 0;
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    }

    return result;
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  // Featured flagship product (first product or highest price)
  const heroProduct = useMemo(() => {
    return initialProducts[0] || null;
  }, [initialProducts]);

  // Cart operations
  const addToCart = (product: MerchantProduct, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    triggerToast(`Added "${product.name}" to your shopping bag!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        triggerToast("Removed from your wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast("Saved to your wishlist!");
        return [...prev, productId];
      }
    });
  };

  // Cart totals
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + parsePrice(item.product.price) * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return (cartSubtotal * discountPercent) / 100;
  }, [cartSubtotal, discountPercent]);

  const shippingCost = cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 35;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "LUMINA10" || promoCode.trim().toUpperCase() === "ZEORAZ10") {
      setDiscountPercent(10);
      setPromoError("");
      triggerToast("10% Atelier Discount Applied!");
    } else if (promoCode.trim().toUpperCase() === "VIP20") {
      setDiscountPercent(20);
      setPromoError("");
      triggerToast("20% VIP Collector Discount Applied!");
    } else {
      setPromoError("Invalid code. Try LUMINA10 for 10% off");
    }
  };

  // WhatsApp order text generation
  const buildWhatsAppOrderLink = (product?: MerchantProduct, customQty?: number) => {
    if (!business.whatsappNumber) return null;
    const cleanPhone = business.whatsappNumber.replace(/[^0-9]/g, "");

    let message = "";
    if (product) {
      const qty = customQty || 1;
      const unitPrice = parsePrice(product.price);
      message = `Hello ${business.businessName}!\n\nI would like to place an order from your official Zeoraz storefront (${business.subdomain}):\n\n- Product: ${product.name}\n- Quantity: ${qty}\n- Unit Price: ${currencySymbol}${unitPrice.toFixed(2)}\n- Total: ${currencySymbol}${(unitPrice * qty).toFixed(2)}\n\nPlease advise on availability and delivery timeline.`;
    } else {
      // Whole cart order
      const itemsList = cartItems
        .map(
          (item) =>
            `• ${item.product.name} (x${item.quantity}) - ${currencySymbol}${(
              parsePrice(item.product.price) * item.quantity
            ).toFixed(2)}`
        )
        .join("\n");

      message = `Hello ${business.businessName}!\n\nI am ordering the following items from your Zeoraz storefront:\n\n${itemsList}\n\n- Subtotal: ${currencySymbol}${cartSubtotal.toFixed(2)}${
        discountPercent > 0 ? `\n- Discount (${discountPercent}%): -${currencySymbol}${discountAmount.toFixed(2)}` : ""
      }\n- Shipping: ${shippingCost === 0 ? "FREE Insured Express" : `${currencySymbol}${shippingCost.toFixed(2)}`}\n- Grand Total: ${currencySymbol}${grandTotal.toFixed(2)}\n\nPlease confirm order receipt and next steps.`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1F22] font-sans transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0F2922] text-[#FAF8F5] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#275345] text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FFC72C]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP ANNOUNCEMENT / SERVICE BAR */}
      <div className="bg-[#141517] text-[#FAF8F5] text-[11px] font-medium py-2 px-4 sm:px-8 border-b border-[#2A2B2F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Verified Merchant
            </span>
            <span className="text-[#A8A49C] hidden md:inline">
              Official Storefront of {business.businessName} • 100% Genuine Certified
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#D5D0C6]">
            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>Direct WhatsApp: {business.whatsappNumber}</span>
              </a>
            )}

            <div className="flex items-center gap-1 border-l border-[#2E3035] pl-3">
              <span className="text-[#8E8B83]">Currency:</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
              >
                <option value="USD" className="bg-[#141517] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#141517] text-white">EUR (€)</option>
                <option value="GBP" className="bg-[#141517] text-white">GBP (£)</option>
                <option value="AUD" className="bg-[#141517] text-white">AUD (A$)</option>
              </select>
            </div>

            <Link
              href="/marketplace"
              className="text-[#E0DDD5] hover:text-white transition-colors border-l border-[#2E3035] pl-3 hidden sm:inline"
            >
              Zeoraz Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (MARKETPLACE STYLE) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#DDD6C8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Merchant Identity & Back Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="p-2 rounded-xl bg-[#EAE4DA] hover:bg-[#DDD5C7] text-[#1E1F22] transition-colors border border-[#DDD6C8]"
              title="Return to Zeoraz Marketplace"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link href={`/biz/${business.slug}`} className="flex items-center gap-3 group">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white shadow-sm text-base shrink-0 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: themeColor }}
              >
                {business.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={business.logoUrl}
                    alt={business.businessName}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  business.businessName.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#1E1F22] text-base tracking-tight group-hover:text-[#0F2922] transition-colors">
                    {business.businessName}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 text-[10px] font-bold uppercase">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <div className="text-[11px] text-[#7A766F] font-mono flex items-center gap-1.5">
                  <span>{business.subdomain}</span>
                  <span>&bull;</span>
                  <span>{business.category}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Search Bar with Category Dropdown */}
          <div className="hidden md:flex flex-1 max-w-lg items-center relative">
            <div className="flex w-full items-center bg-white rounded-full border border-[#D9D3C7] shadow-xs focus-within:border-[#0F2922] focus-within:ring-2 focus-within:ring-[#0F2922]/10 transition-all overflow-hidden pl-4 pr-1.5 py-1">
              <Search className="w-4 h-4 text-[#8A867D] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${business.businessName}'s catalogue...`}
                className="w-full bg-transparent text-xs text-[#1E1F22] placeholder:text-[#9A968D] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:text-[#1E1F22] text-[#8A867D] mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="h-5 w-px bg-[#EAE6DD] mx-1" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-[#57544C] py-1 px-2 focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Icons: Wishlist, Cart, WhatsApp */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button
              onClick={() => {
                if (wishlist.length === 0) {
                  triggerToast("Your wishlist is currently empty. Tap the heart on any item!");
                } else {
                  triggerToast(`You have ${wishlist.length} item(s) saved in your wishlist!`);
                }
              }}
              className="relative p-2.5 rounded-full bg-white hover:bg-[#EAE4DA] border border-[#DDD6C8] text-[#1E1F22] transition-colors cursor-pointer"
              title="Wishlist"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-[#57544C]"
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0F2922] hover:bg-[#183D32] text-white shadow-sm transition-all cursor-pointer group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FFC72C] group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full bg-[#FFB800] text-[#141517] font-black text-[9px]">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#A0B8AF] font-bold">Shopping Bag</span>
                <span className="text-xs font-extrabold text-white">
                  {currencySymbol}{cartSubtotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Contact / WhatsApp Direct Button */}
            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${business.businessName}! I am inquiring about your storefront products on Zeoraz.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Atelier</span>
              </a>
            )}
          </div>
        </div>

        {/* 3. CATEGORIES & QUICK ACTIONS SUBNAV (MARKETPLACE STYLE) */}
        <div className="border-t border-[#DDD6C8] bg-white px-4 sm:px-8 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Category Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="px-3.5 py-1.5 rounded-xl bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Menu className="w-3.5 h-3.5 text-[#FFC72C]" />
                <span>Catalogue Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A0B8AF]" />
              </button>

              {/* Mega Dropdown Menu */}
              <AnimatePresence>
                {isCategoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#DDD6C8] p-3 z-50 divide-y divide-[#F0EDE6]"
                  >
                    {categories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between group transition-colors ${
                          selectedCategory === cat
                            ? "bg-[#0F2922] text-white font-bold"
                            : "hover:bg-[#FAF8F5] text-[#3E3C36]"
                        }`}
                      >
                        <span>{cat}</span>
                        <ArrowRight
                          className={`w-3 h-3 ${
                            selectedCategory === cat
                              ? "text-[#FFC72C]"
                              : "text-[#A8A49C] group-hover:text-[#0F2922]"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Navigation Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#525049]">
              <a href="#featured-products" className="hover:text-[#0F2922] transition-colors">
                Timepiece Collection
              </a>
              <a
                href="#featured-products"
                onClick={() => setSelectedCategory("Skeleton Watches")}
                className="hover:text-[#0F2922] transition-colors flex items-center gap-1 text-[#E03A3A]"
              >
                <Flame className="w-3.5 h-3.5 fill-[#E03A3A]" />
                <span>Super Deals</span>
              </a>
              <a href="#brand-heritage" className="hover:text-[#0F2922] transition-colors">
                Atelier Heritage
              </a>
              <a href="#guarantee" className="hover:text-[#0F2922] transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Swiss Guarantee</span>
              </a>
              {business.websiteUrl && (
                <a
                  href={business.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0F2922] transition-colors flex items-center gap-1"
                >
                  <span>Official Site</span>
                  <ExternalLink className="w-3 h-3 text-[#8A867D]" />
                </a>
              )}
            </div>

            {/* 24/7 Helpline */}
            <div className="text-xs font-bold text-[#0F2922] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="hidden sm:inline">Concierge Desk:</span>
              <span className="font-mono text-xs">{business.whatsappNumber || "+1 (800) LUMINA-HOROLOGY"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. HERO BENTO PROMOTIONAL SHOWCASE (MARKETPLACE STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Big Featured Left Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#ECE7DC] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-sm border border-[#DDD6C8]">
            <div className="max-w-md z-10 space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2922] text-[#FFC72C] text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{business.category} • Official Premiere</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-[#141517] tracking-tight leading-[1.08] uppercase">
                {business.businessName}
              </h1>

              {business.tagline && (
                <p className="text-base text-[#46443E] font-serif italic">
                  &ldquo;{business.tagline}&rdquo;
                </p>
              )}

              <p className="text-xs text-[#636056] leading-relaxed line-clamp-3">
                {business.description}
              </p>

              {heroProduct && (
                <div className="pt-2 flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-2xl bg-white border border-[#D5CFC2] shadow-xs">
                    <span className="text-[10px] uppercase font-bold text-[#868278] block">Flagship Piece</span>
                    <span className="text-sm font-black text-[#0F2922]">
                      {currencySymbol}{parsePrice(heroProduct.price).toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-800 font-bold bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-3">
                {heroProduct && (
                  <button
                    onClick={() => addToCart(heroProduct, 1)}
                    className="px-6 py-3 rounded-full bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FFC72C]" />
                    <span>Add Flagship to Bag</span>
                  </button>
                )}

                {business.whatsappNumber && (
                  <a
                    href={buildWhatsAppOrderLink(heroProduct) || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Concierge</span>
                  </a>
                )}
              </div>
            </div>

            {/* Background / Hero Graphic */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-30 lg:opacity-90 pointer-events-none flex items-center justify-center p-6">
              {heroProduct?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroProduct.imageUrl}
                  alt={heroProduct.name}
                  className="max-h-[340px] object-contain drop-shadow-2xl rounded-2xl"
                />
              ) : business.bannerUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={business.bannerUrl}
                  alt={business.businessName}
                  className="h-full w-full object-cover rounded-2xl"
                />
              ) : null}
            </div>
          </div>

          {/* Right Stacked Bento Cards (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {/* Top Right Card: Bespoke Horology */}
            <div className="rounded-3xl bg-[#E2DBD0] p-6 relative overflow-hidden flex flex-col justify-between border border-[#DDD6C8] shadow-sm">
              <div className="space-y-2 z-10 max-w-[260px]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFB800] text-[#1E1F22] text-[10px] font-black uppercase tracking-wider">
                  Bespoke Service
                </span>
                <h3 className="text-lg font-black text-[#141517] leading-tight">
                  Custom Engravings &amp; Hand-Stitched Leather
                </h3>
                <p className="text-xs text-[#5E5B53]">
                  Personalize your caseback or select hand-curated Italian straps tailored to your wrist.
                </p>
                <div className="pt-2">
                  {business.whatsappNumber && (
                    <a
                      href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${business.businessName}, I would like to inquire about bespoke timepiece engraving and custom strap sizing.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0F2922] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inquire with Master Watchmaker</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="absolute -right-4 -bottom-6 w-32 h-32 rounded-full bg-[#0F2922]/10 blur-xl pointer-events-none" />
            </div>

            {/* Bottom Right Card: Authenticity & Warranty */}
            <div className="rounded-3xl bg-[#0F2922] text-white p-6 relative overflow-hidden flex flex-col justify-between border border-[#234A3E] shadow-sm">
              <div className="space-y-2 z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Swiss Certification
                </span>
                <h3 className="text-lg font-black text-white leading-tight">
                  5-Year International Movement Warranty
                </h3>
                <p className="text-xs text-[#A0B8AF]">
                  Every mechanical movement is individually calibrated and pressure-tested before shipment.
                </p>
                <div className="pt-2">
                  <a
                    href="#guarantee"
                    className="text-xs font-bold text-[#FFC72C] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Verification Standards</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#DDD6C8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#141517]">Verified Merchant</h4>
              <p className="text-[11px] text-[#7A776F]">Official Zeoraz Seller</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F2922]/10 text-[#0F2922] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#141517]">Free Insured Delivery</h4>
              <p className="text-[11px] text-[#7A776F]">On all orders over $500</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/15 text-[#9E7200] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#141517]">Swiss Calibration</h4>
              <p className="text-[11px] text-[#7A776F]">High-precision mechanical</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#141517]">Direct WhatsApp Chat</h4>
              <p className="text-[11px] text-[#7A776F]">Direct concierge access</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CATALOGUE & FILTERABLE PRODUCT GRID */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#DDD6C8]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7A766F] bg-[#EAE4DA] px-2.5 py-0.5 rounded-full border border-[#DDD6C8]">
                {business.businessName} Catalogue
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {filteredProducts.length} Items Available
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#141517] uppercase tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="w-6 h-6 text-[#0F2922]" />
              <span>Signature Timepieces &amp; Offerings</span>
            </h2>
          </div>

          {/* Category Tabs & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#0F2922] text-white shadow-xs"
                      : "bg-white hover:bg-[#EAE4DA] text-[#55524B] border border-[#DDD6C8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#DDD6C8] rounded-full px-3 py-1.5 shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#868278]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-[#1E1F22] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white border border-[#DDD6C8] max-w-md mx-auto space-y-3">
            <ShoppingBag className="w-10 h-10 text-[#8F8A80] mx-auto" />
            <h3 className="text-base font-bold text-[#1E1F22] uppercase">No matching products found</h3>
            <p className="text-xs text-[#6F6B63]">
              Try adjusting your search query or switching category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-full bg-[#0F2922] text-white text-xs font-bold mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const priceNum = parsePrice(product.price);
              const origPriceNum = product.originalPrice ? parsePrice(product.originalPrice) : null;
              const hasDiscount = origPriceNum && origPriceNum > priceNum;
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white border border-[#DDD6C8] hover:border-[#0F2922]/40 transition-all duration-300 hover:shadow-xl p-5 flex flex-col justify-between relative shadow-xs"
                >
                  <div>
                    {/* Image Container with Badges */}
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-[#EAE4DA] border border-[#DDD6C8] mb-4">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#959188] font-mono text-xs">
                          No Image Available
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {product.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#0F2922] text-[#FFC72C] text-[10px] font-black uppercase tracking-wider shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase shadow-xs">
                            Save {Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Top Right Wishlist & Quick View */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1E1F22] hover:bg-white shadow-sm transition-transform active:scale-90 cursor-pointer"
                          title="Save to Wishlist"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted ? "fill-red-500 text-red-500" : "text-[#57544C]"
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => {
                            setQuickViewProduct(product);
                            setQuickViewQty(1);
                          }}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1E1F22] hover:bg-white shadow-sm transition-transform active:scale-90 cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Quick View"
                        >
                          <Eye className="w-4 h-4 text-[#57544C]" />
                        </button>
                      </div>
                    </div>

                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-[#868278] uppercase tracking-wider">
                        {product.category || business.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#141517]">
                        <Star className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
                        <span>{product.rating || "4.9"}</span>
                        <span className="text-[#8A867D] font-normal">
                          ({product.reviewsCount || "120"})
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base font-extrabold text-[#141517] group-hover:text-[#0F2922] transition-colors leading-snug line-clamp-2 mb-2">
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-xs text-[#636056] line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-black text-[#0F2922]">
                        {currencySymbol}{priceNum.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-[#959188] line-through font-semibold">
                          {currencySymbol}{origPriceNum.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EAE6DD]">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#FFC72C]" />
                        <span>Add to Bag</span>
                      </button>

                      {business.whatsappNumber ? (
                        <a
                          href={buildWhatsAppOrderLink(product, 1) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer text-center"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            setQuickViewProduct(product);
                            setQuickViewQty(1);
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#EAE4DA] hover:bg-[#DDD5C7] text-[#1E1F22] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 7. ATELIER HERITAGE & GUARANTEE SECTION */}
      <section id="brand-heritage" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="rounded-3xl bg-[#0F2922] text-white p-8 md:p-14 relative overflow-hidden border border-[#275345] shadow-lg">
          <div className="max-w-3xl z-10 relative space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#FFC72C] text-[#0F2922] text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Atelier Heritage &amp; Caliber Standards</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Precision Horology Engineered for Generations
            </h2>

            <p className="text-sm text-[#B4CCC3] leading-relaxed">
              Every timepiece bearing the {business.businessName} hallmark is hand-assembled with high-grade sapphire crystals, titanium or 316L surgical steel, and mechanical calibers regulated to chronometer-grade tolerances.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1C4236]">
              <div>
                <span className="text-2xl font-black text-[#FFC72C] block">100%</span>
                <span className="text-xs text-[#A0B8AF]">Hand-inspected Swiss Calibers</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#FFC72C] block">5 Years</span>
                <span className="text-xs text-[#A0B8AF]">Comprehensive Atelier Warranty</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#FFC72C] block">Direct</span>
                <span className="text-xs text-[#A0B8AF]">Watchmaker Concierge Access</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${business.contactEmail}?subject=Atelier%20Inquiry%20regarding%20${encodeURIComponent(
                  business.businessName
                )}`}
                className="px-6 py-3 rounded-full bg-white text-[#0F2922] hover:bg-[#FAF8F5] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Master Watchmaker</span>
              </a>

              {business.websiteUrl && (
                <a
                  href={business.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#183D32] hover:bg-[#204E40] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#275345] transition-all cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Atelier Website</span>
                  <ExternalLink className="w-3 h-3 text-[#A0B8AF]" />
                </a>
              )}
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Clock className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* 8. SLIDE-OVER SHOPPING CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF8F5] shadow-2xl z-50 flex flex-col justify-between border-l border-[#DDD6C8]"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#DDD6C8] bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#0F2922]" />
                  <div>
                    <h3 className="text-base font-extrabold text-[#141517]">Your Shopping Bag</h3>
                    <p className="text-[11px] text-[#7A776F]">
                      {business.businessName} • {totalCartCount} {totalCartCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#EAE4DA] text-[#55524B] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Items List */}
              <div className="p-5 overflow-y-auto flex-1 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#9A968D] mx-auto" />
                    <h4 className="text-base font-bold text-[#141517]">Your bag is currently empty</h4>
                    <p className="text-xs text-[#7A776F] max-w-xs mx-auto">
                      Explore the collection and add timepieces to your order.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const price = parsePrice(item.product.price);
                    return (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-2xl bg-white border border-[#DDD6C8] flex gap-3.5 items-center justify-between shadow-xs"
                      >
                        {item.product.imageUrl && (
                          <div className="w-16 h-16 rounded-xl bg-[#EAE4DA] overflow-hidden shrink-0 border border-[#DDD6C8]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#141517] truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-extrabold text-[#0F2922]">
                            {currencySymbol}{price.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 rounded-md bg-[#EAE4DA] hover:bg-[#DDD5C7] flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 rounded-md bg-[#EAE4DA] hover:bg-[#DDD5C7] flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-16">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#9A968D] hover:text-red-600 transition-colors cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-[#141517]">
                            {currencySymbol}{(price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer & Checkout Actions */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-[#DDD6C8] bg-white space-y-3.5">
                  {/* Promo Code Form */}
                  <form onSubmit={applyPromoCode} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (e.g. LUMINA10)"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8] text-xs uppercase font-mono font-bold focus:outline-none focus:border-[#0F2922]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#0F2922] text-white text-xs font-bold cursor-pointer hover:bg-[#183D32]"
                    >
                      Apply
                    </button>
                  </form>
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-semibold">{promoError}</p>
                  )}

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#5E5B53] pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#141517]">
                        {currencySymbol}{cartSubtotal.toFixed(2)}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Insured Express Shipping</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                        ) : (
                          `${currencySymbol}${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-black text-[#141517] pt-2 border-t border-[#EAE6DD]">
                      <span>Total Amount</span>
                      <span className="text-base text-[#0F2922]">
                        {currencySymbol}{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Direct Order Button */}
                  {business.whatsappNumber && (
                    <a
                      href={buildWhatsAppOrderLink() || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order Entire Bag on WhatsApp</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      triggerToast("Order transmitted to merchant concierge. You will receive an email confirmation.");
                      setIsCartOpen(false);
                      setCartItems([]);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Proceed to Direct Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#FFC72C]" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 9. QUICK VIEW PRODUCT MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-[#DDD6C8] flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Product Visual */}
              <div className="md:w-1/2 bg-[#EAE4DA] relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#DDD6C8]">
                {quickViewProduct.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={quickViewProduct.imageUrl}
                    alt={quickViewProduct.name}
                    className="max-h-64 object-contain drop-shadow-xl rounded-2xl"
                  />
                ) : (
                  <ShoppingBag className="w-20 h-20 text-[#8E8B83]" />
                )}

                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-[#0F2922] text-[#FFC72C] text-[10px] font-black uppercase tracking-wider">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#868278] uppercase tracking-wider">
                      {quickViewProduct.category || business.category}
                    </span>
                    <button
                      onClick={() => setQuickViewProduct(null)}
                      className="p-1 rounded-full hover:bg-[#EAE4DA] text-[#636056] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-[#141517] mb-2 leading-tight">
                    {quickViewProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#141517]">
                      <Star className="w-3.5 h-3.5 text-[#FFB800] fill-[#FFB800]" />
                      <span>{quickViewProduct.rating || "4.9"}</span>
                    </div>
                    <span className="text-xs text-[#8E8B83]">&bull;</span>
                    <span className="text-xs text-emerald-800 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Verified Genuine
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-black text-[#0F2922]">
                      {currencySymbol}{parsePrice(quickViewProduct.price).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-[#636056] leading-relaxed mb-6">
                    {quickViewProduct.description}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold text-[#55524B]">Quantity:</span>
                    <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl px-2 py-1">
                      <button
                        onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                        className="w-6 h-6 rounded-md hover:bg-[#EAE4DA] flex items-center justify-center text-xs font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{quickViewQty}</span>
                      <button
                        onClick={() => setQuickViewQty(quickViewQty + 1)}
                        className="w-6 h-6 rounded-md hover:bg-[#EAE4DA] flex items-center justify-center text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#EAE6DD]">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewQty);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 rounded-full bg-[#0F2922] hover:bg-[#183D32] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FFC72C]" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {business.whatsappNumber && (
                    <a
                      href={buildWhatsAppOrderLink(quickViewProduct, quickViewQty) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Instant WhatsApp Order</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 10. MEGA FOOTER (MARKETPLACE STYLE) */}
      <footer className="border-t border-[#DDD6C8] bg-[#141517] text-[#FAF8F5] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Merchant Brand Column */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
                  style={{ backgroundColor: themeColor }}
                >
                  {business.businessName.charAt(0).toUpperCase()}
                </div>
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  {business.businessName}
                </span>
              </div>
              <p className="text-xs text-[#A8A49C] leading-relaxed">
                {business.description}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Zeoraz Storefront</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC72C] mb-4">
                Storefront Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-[#B4B0A7]">
                <li>
                  <a href="#featured-products" className="hover:text-white transition-colors">
                    All Timepieces
                  </a>
                </li>
                <li>
                  <a href="#brand-heritage" className="hover:text-white transition-colors">
                    Atelier Heritage
                  </a>
                </li>
                <li>
                  <a href="#guarantee" className="hover:text-white transition-colors">
                    Swiss Calibration &amp; Warranty
                  </a>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Zeoraz Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Merchant Concierge & Contacts */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC72C] mb-4">
                Merchant Concierge
              </h4>
              <ul className="space-y-2.5 text-xs text-[#B4B0A7]">
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#A8A49C]" />
                  <a href={`mailto:${business.contactEmail}`} className="hover:text-white transition-colors truncate">
                    {business.contactEmail}
                  </a>
                </li>
                {business.whatsappNumber && (
                  <li className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <a
                      href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      WhatsApp: {business.whatsappNumber}
                    </a>
                  </li>
                )}
                {business.websiteUrl && (
                  <li className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#A8A49C]" />
                    <a
                      href={business.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Official Website
                    </a>
                  </li>
                )}
                <li className="text-[11px] text-[#86837B]">
                  Subdomain: {business.subdomain}
                </li>
              </ul>
            </div>

            {/* Newsletter / Updates */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC72C]">
                Atelier Bulletins
              </h4>
              <p className="text-xs text-[#A8A49C]">
                Receive private notices on numbered timepieces and upcoming limited runs.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter collector email..."
                  className="w-full px-3 py-2 rounded-xl bg-[#222429] border border-[#33363D] text-xs text-white placeholder:text-[#7A776F] focus:outline-none focus:border-[#FFC72C]"
                />
                <button
                  onClick={() => triggerToast("Thank you for subscribing to atelier bulletins!")}
                  className="px-3 py-2 rounded-xl bg-[#FFB800] text-[#141517] text-xs font-bold hover:bg-[#FFC72C] transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#2A2B2F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A867D]">
            <p>
              &copy; {new Date().getFullYear()} {business.businessName}. Hosted and powered by{" "}
              <Link href="/" className="text-white font-bold hover:underline">
                Zeoraz Commerce
              </Link>
              .
            </p>
            <div className="flex items-center gap-4">
              <Link href="/publish" className="hover:text-white transition-colors">
                Publish a Store
              </Link>
              <span>&bull;</span>
              <Link href="/marketplace" className="hover:text-white transition-colors">
                Browse Megastore
              </Link>
              <span>&bull;</span>
              <Link href="/signin" className="hover:text-white transition-colors">
                Merchant Sign In
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
