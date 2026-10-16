"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  Store,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  ShoppingBag,
  Palette,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl?: string;
  category?: string;
}

interface PublishBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "E-Commerce & Retail",
  "Software & SaaS",
  "Creative & Agency",
  "Fashion & Apparel",
  "Food & Beverage",
  "Professional Services",
  "Health & Wellness",
  "Digital Downloads",
];

const THEME_COLORS = [
  { name: "Zeoraz Dark", hex: "#1E1F22" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Emerald Mint", hex: "#10b981" },
  { name: "Warm Amber", hex: "#d97706" },
  { name: "Rose Velvet", hex: "#e11d48" },
  { name: "Cyan Modern", hex: "#0284c7" },
];

export const PublishBusinessModal: React.FC<PublishBusinessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Form Fields
  const [businessName, setBusinessName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [slugMessage, setSlugMessage] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [description, setDescription] = useState<string>("");

  const [themeColor, setThemeColor] = useState<string>(THEME_COLORS[0].hex);
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [bannerUrl, setBannerUrl] = useState<string>("");

  const [contactEmail, setContactEmail] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "prod-1",
      name: "Starter Package",
      price: "49.00",
      description: "Complete turnkey service or flagship product.",
      imageUrl: "",
    },
  ]);

  const [publishedData, setPublishedData] = useState<{
    subdomainUrl: string;
    directPath: string;
    slug: string;
  } | null>(null);

  const [slugEdited, setSlugEdited] = useState<boolean>(false);

  // Auto-generate slug from business name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBusinessName(val);
    if (step === 1 && !slugEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  // Check slug debounce
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setSlugStatus("idle");
      setSlugMessage("");
      return;
    }

    const timer = setTimeout(async () => {
      setSlugStatus("checking");
      try {
        const res = await fetch(`/api/business/check-slug?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();
        if (data.available) {
          setSlugStatus("available");
          setSlugMessage(`✓ ${data.subdomain} is available!`);
        } else {
          setSlugStatus("unavailable");
          setSlugMessage(data.error || "Subdomain unavailable");
        }
      } catch {
        setSlugStatus("idle");
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [slug]);

  const addProduct = () => {
    const newId = `prod-${Date.now()}`;
    setProducts([
      ...products,
      {
        id: newId,
        name: "",
        price: "",
        description: "",
        imageUrl: "",
      },
    ]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof ProductItem, value: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        businessName,
        slug,
        tagline,
        description,
        category,
        contactEmail,
        whatsappNumber,
        websiteUrl,
        themeColor,
        logoUrl,
        bannerUrl,
        currency,
        products: products.filter((p) => p.name.trim() !== ""),
      };

      const res = await fetch("/api/business/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to publish business.");
      }

      setPublishedData({
        subdomainUrl: data.subdomainUrl,
        directPath: data.directPath,
        slug: data.business.slug,
      });
      setStep(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error publishing business.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copyLiveLink = () => {
    if (!publishedData) return;
    const url = `${window.location.origin}${publishedData.directPath}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0e0f12]/70 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#FAF8F5] dark:bg-[#131417] border border-[#DDD6C8] dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] z-10 text-[#1E1F22] dark:text-[#FAF8F5]"
        >
          {/* Top Brand Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1E1F22] via-[#2563eb] to-[#3b82f6] dark:from-[#3b82f6] dark:via-[#60a5fa] dark:to-cyan-400" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-7 border-b border-[#E7E1D4] dark:border-white/10 bg-[#FAF8F5] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 flex items-center justify-center text-[#1E1F22] dark:text-[#FAF8F5] shadow-xs">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-[#1E1F22] dark:text-white uppercase tracking-tight">
                    Publish Your Sales Business
                  </h2>
                  <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAE4DA] dark:bg-blue-500/15 text-[#3E3C36] dark:text-blue-400 border border-[#DDD6C8] dark:border-blue-500/30 uppercase tracking-[0.14em]">
                    Live Subdomain
                  </span>
                </div>
                <p className="text-xs text-[#6F6B63] dark:text-slate-400 mt-0.5">
                  Step {step} of 4 &bull; Launch your digital storefront on Zeoraz
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-[#7C7871] hover:text-[#1E1F22] dark:text-slate-400 dark:hover:text-white hover:bg-[#EAE4DA] dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 h-1.5 bg-[#EAE4DA] dark:bg-white/5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-full transition-all duration-300 ${
                  step >= s
                    ? "bg-[#1E1F22] dark:bg-[#2563eb]"
                    : "bg-transparent"
                }`}
              />
            ))}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-[#FAF8F5] dark:bg-[#131417]">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Basic Info & Subdomain */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                    Business / Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={handleNameChange}
                    placeholder="e.g. Lumina Watches or Apex Atelier"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#1E1F22] dark:focus:ring-blue-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                    Choose Your Subdomain *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8F8A80] dark:text-slate-500">
                        <Globe className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => {
                          setSlugEdited(true);
                          setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                        }}
                        placeholder="your-brand"
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#1E1F22] dark:focus:ring-blue-500 transition-all text-sm font-mono"
                      />
                    </div>
                    <div className="px-4 py-3 rounded-xl bg-[#EAE4DA] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-blue-400 font-mono text-xs sm:text-sm font-bold select-none flex-shrink-0">
                      .zeoraz.com
                    </div>
                  </div>

                  {slugStatus !== "idle" && (
                    <div
                      className={`mt-2 text-xs flex items-center gap-1.5 ${
                        slugStatus === "available"
                          ? "text-emerald-700 dark:text-emerald-400 font-medium"
                          : slugStatus === "unavailable"
                          ? "text-rose-600 dark:text-rose-400 font-medium"
                          : "text-[#7C7871] dark:text-slate-400"
                      }`}
                    >
                      {slugStatus === "checking" && (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Checking subdomain availability...</span>
                        </>
                      )}
                      {slugStatus === "available" && (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{slugMessage}</span>
                        </>
                      )}
                      {slugStatus === "unavailable" && (
                        <>
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{slugMessage}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                      Business Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1b1f] border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-white dark:bg-[#1a1b1f] text-[#1E1F22] dark:text-white">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                      Tagline / Catchphrase
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Handcrafted Luxury &amp; Timeless Elegance"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                    About Your Business / Offerings *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your business offers, what sets you apart, and how clients can work with you..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: Branding & Theme */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#1E1F22] dark:text-blue-400" />
                    Storefront Accent Theme Color
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {THEME_COLORS.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setThemeColor(c.hex)}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                          themeColor === c.hex
                            ? "border-[#1E1F22] dark:border-white ring-2 ring-[#1E1F22] dark:ring-white bg-[#EAE4DA]/50 dark:bg-white/10 scale-105"
                            : "border-[#DDD6C8] dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#1E1F22]/40"
                        }`}
                      >
                        <div
                          className="w-7 h-7 rounded-full shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[11px] font-bold text-[#3E3C36] dark:text-slate-300">
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                    Brand Logo Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://your-domain.com/logo.png (or leave blank for auto badge)"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                    Header Banner Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional banner background)"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#EAE4DA]/50 dark:bg-white/[0.02] border border-[#DDD6C8] dark:border-white/10">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-3">
                    Storefront Live Preview Card
                  </div>
                  <div
                    className="p-5 rounded-xl border flex items-center gap-4 bg-white dark:bg-white/5 shadow-xs"
                    style={{ borderColor: `${themeColor}40` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-lg"
                      style={{ backgroundColor: themeColor }}
                    >
                      {businessName ? businessName.charAt(0).toUpperCase() : "Z"}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#1E1F22] dark:text-white text-base">
                        {businessName || "Your Business Name"}
                      </div>
                      <div className="text-xs text-[#6F6B63] dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Globe className="w-3.5 h-3.5 text-[#1E1F22] dark:text-blue-400" />
                        <span className="font-mono text-[#1E1F22] dark:text-blue-400 font-semibold">
                          {slug || "your-slug"}.zeoraz.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Sales Channels & Contacts */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#1E1F22] dark:text-blue-400" />
                    Official Sales & Inquiries Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="sales@yourbrand.com or info@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                  />
                  <p className="text-[11px] text-[#7C7871] dark:text-slate-500 mt-1.5">
                    Customer orders and quote requests will be delivered directly to this email address.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    WhatsApp Business Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+1 555 123 4567 or +91 9876543210"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-emerald-500 transition-all text-sm"
                  />
                  <p className="text-[11px] text-[#7C7871] dark:text-slate-500 mt-1.5">
                    Enables 1-click &ldquo;Order via WhatsApp&rdquo; buttons on your storefront product cards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                      Store Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1b1f] border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="CAD">CAD ($)</option>
                      <option value="AUD">AUD ($)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#55524B] dark:text-slate-400 mb-2">
                      External Website / Social (Optional)
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Products / Catalog */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#1E1F22] dark:text-white flex items-center gap-2 uppercase tracking-wide">
                      <ShoppingBag className="w-4 h-4 text-[#1E1F22] dark:text-blue-400" />
                      Add Products or Services ({products.length})
                    </h3>
                    <p className="text-xs text-[#6F6B63] dark:text-slate-400 mt-0.5">
                      Showcase items visitors can view and purchase or inquire about.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addProduct}
                    className="px-4 py-2 rounded-full bg-[#EAE4DA] hover:bg-[#DDD5C7] dark:bg-white/10 dark:hover:bg-white/15 text-[#1E1F22] dark:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#DDD6C8] dark:border-white/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {products.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-[#DDD6C8] dark:border-white/10 space-y-3 relative shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#55524B] dark:text-slate-400 uppercase tracking-wider">
                          #{idx + 1} Item
                        </span>
                        {products.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProduct(item.id)}
                            className="text-[#8F8A80] hover:text-rose-600 dark:hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateProduct(item.id, "name", e.target.value)}
                            placeholder="Product / Service Name"
                            className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 text-xs focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(e) => updateProduct(item.id, "price", e.target.value)}
                            placeholder={`Price (${currency})`}
                            className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 text-xs focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateProduct(item.id, "description", e.target.value)}
                          placeholder="Brief description / deliverables"
                          className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 text-xs focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500"
                        />
                        <input
                          type="url"
                          value={item.imageUrl || ""}
                          onChange={(e) => updateProduct(item.id, "imageUrl", e.target.value)}
                          placeholder="Image URL (optional)"
                          className="w-full px-3 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-white/5 border border-[#DDD6C8] dark:border-white/10 text-[#1E1F22] dark:text-white placeholder-[#9D988E] dark:placeholder-slate-500 text-xs focus:outline-none focus:border-[#1E1F22] dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS / LIVE */}
            {step === 5 && publishedData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#1E1F22] dark:text-white uppercase tracking-tight">
                    Congratulations! Your Store is Live 🎉
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F5B54] dark:text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                    Your sales business has been published with an active storefront subdomain.
                  </p>
                </div>

                {/* Live Link Card */}
                <div className="p-6 rounded-2xl bg-[#EAE4DA]/60 dark:bg-white/[0.03] border border-[#DDD6C8] dark:border-white/10 max-w-lg mx-auto space-y-4 shadow-sm">
                  <div className="text-[11px] font-bold text-[#55524B] dark:text-slate-400 uppercase tracking-[0.14em]">
                    Assigned Brand Subdomain
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-black/40 border border-[#DDD6C8] dark:border-white/10 font-mono text-[#1E1F22] dark:text-blue-400 text-sm font-semibold">
                    <span className="truncate">{publishedData.subdomainUrl}</span>
                    <button
                      onClick={copyLiveLink}
                      className="p-1.5 rounded-lg bg-[#EAE4DA] hover:bg-[#DDD5C7] dark:bg-white/10 dark:hover:bg-white/20 text-[#1E1F22] dark:text-white transition-colors flex items-center gap-1.5 text-xs font-sans font-bold cursor-pointer"
                      title="Copy URL"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <a
                      href={publishedData.directPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3 rounded-full bg-[#1E1F22] hover:bg-[#34363B] text-[#FAF8F5] dark:bg-[#2563eb] dark:hover:bg-blue-500 font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2 shadow-md transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Storefront
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          {step < 5 && (
            <div className="p-5 sm:p-6 border-t border-[#E7E1D4] dark:border-white/10 bg-[#FAF8F5] dark:bg-white/[0.01] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-full bg-[#EAE4DA] hover:bg-[#DDD5C7] dark:bg-white/5 dark:hover:bg-white/10 text-[#1E1F22] dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer border border-[#DDD6C8] dark:border-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {step < 4 ? (
                  <button
                    type="button"
                    disabled={
                      (step === 1 && (!businessName || slugStatus === "unavailable" || slug.length < 3 || !description)) ||
                      (step === 3 && !contactEmail)
                    }
                    onClick={() => setStep(step + 1)}
                    className="px-7 py-2.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] dark:bg-[#2563eb] dark:hover:bg-blue-500 disabled:opacity-35 disabled:cursor-not-allowed text-[#FAF8F5] dark:text-white font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={loading || !businessName || !slug || !contactEmail}
                    onClick={handleSubmit}
                    className="px-7 py-2.5 rounded-full bg-[#1E1F22] hover:bg-[#34363B] dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-35 disabled:cursor-not-allowed text-[#FAF8F5] dark:text-white font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Publishing Store...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Publish My Business</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
