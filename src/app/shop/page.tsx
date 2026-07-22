"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Product3DViewer } from "@/components/organisms/Product3DViewer";
import { SizeFinder } from "@/components/organisms/SizeFinder";
import { 
  ShoppingBag, Search, Check, ShoppingCart, 
  Trash2, X, Plus, Minus, CreditCard, Sparkles, Filter, Store, Layers, Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Products covering Clothing, Watches, Shoes, and Wearable Gear
const MOCK_PRODUCTS = [
  {
    id: "prod-1",
    name: "Zeoraz Chronograph Alpha",
    category: "watches",
    price: 249,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    seller: "Zeoraz Design",
    description: "Premium tactical chronograph with sapphire glass and custom watchface casing.",
    inStock: true,
  },
  {
    id: "prod-2",
    name: "AeroStep Light Knit Runners",
    category: "shoes",
    price: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    seller: "Apex Wear",
    description: "Ultra-breathable athletic shoe designed with zero-drag memory foam soles.",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Tech-Shell Modular Windbreaker",
    category: "clothing",
    price: 180,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    seller: "Apex Wear",
    description: "Waterproof outer shell with smart zip-off sleeves and thermal lining.",
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Zeoraz Vanguard automatic",
    category: "watches",
    price: 499,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=600&q=80",
    seller: "Zeoraz Design",
    description: "Premium mechanical timepiece featuring custom skeleton backing & premium black leather strap.",
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Flex-Fit Combat Cargo Pant",
    category: "clothing",
    price: 95,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    seller: "Apex Wear",
    description: "Tear-resistant cotton ripstop with integrated gear loops and double reinforced knees.",
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Terra-Trek Waterproof Hiking Boots",
    category: "shoes",
    price: 165,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
    seller: "Apex Wear",
    description: "Heavy-duty outdoor boot featuring Vibram grip soles and full ankle locks.",
    inStock: true,
  },
];

interface CartItem {
  productId: string;
  quantity: number;
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"none" | "paying" | "success">("none");
  const [viewing3D, setViewing3D] = useState<typeof MOCK_PRODUCTS[0] | null>(null);
  const [isSizeFinderOpen, setIsSizeFinderOpen] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Cart helper selectors
  const cartDetails = useMemo(() => {
    return cart.map(item => {
      const product = MOCK_PRODUCTS.find(p => p.id === item.productId)!;
      return {
        ...product,
        quantity: item.quantity,
        total: product.price * item.quantity,
      };
    });
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cartDetails.reduce((sum, item) => sum + item.total, 0);
  }, [cartDetails]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Cart operations
  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const triggerCheckout = () => {
    setCheckoutStep("paying");
    setTimeout(() => {
      setCheckoutStep("success");
      setCart([]);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans select-none antialiased">
      <Navbar onTalkToUs={() => {}} />

      {/* Main Page Container */}
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header Banner */}
          <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden p-8 sm:p-12 mb-12 shadow-xl border border-slate-900 flex flex-col justify-between min-h-[220px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-bold text-blue-400 border border-blue-500/20 mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Zeoraz Unified Marketplace
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Curated Storefront
              </h1>
              <p className="text-slate-400 text-sm max-w-xl">
                Explore custom apparel, high-performance shoes, precision timepieces, and physical gear produced under the Zeoraz ecosystem.
              </p>
            </div>
            
            {/* Float cart status */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="absolute right-8 bottom-8 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg flex items-center gap-2.5 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cartItemsCount})</span>
            </button>
          </div>

          {/* Filtering and Search Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {["all", "clothing", "watches", "shoes"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* AI Size Finder Button */}
              <button
                onClick={() => setIsSizeFinderOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-black shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all cursor-pointer flex-shrink-0"
              >
                <Brain className="w-3.5 h-3.5" /> AI Size Finder
              </button>

              {/* Search Input */}
              <div className="relative w-full md:max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products or brands..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(prod => (
                <motion.div
                  key={prod.id}
                  layout
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Photo area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img 
                      src={prod.image} 
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-slate-700 shadow-sm flex items-center gap-1">
                      <Store className="w-3 h-3 text-blue-600" /> {prod.seller}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{prod.category}</span>
                      <span className="text-sm font-black text-slate-900">${prod.price}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => setViewing3D(prod)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg shadow-violet-500/20"
                    >
                      <Layers className="w-3.5 h-3.5" /> View in 3D &amp; Try On
                    </button>
                    <button
                      onClick={() => addToCart(prod.id)}
                      className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-blue-600 text-white text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm shadow-slate-950/5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-200 rounded-3xl p-8 max-w-lg mx-auto">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-black text-slate-900 mb-1">No products found</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                No matches for your current category or search criteria. Try a different search query or choose "All Categories".
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-black text-slate-900">Your Basket</h3>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600">
                      {cartItemsCount} items
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                {cartDetails.length > 0 ? (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {cartDetails.map(item => (
                      <div 
                        key={item.id}
                        className="flex gap-4 p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white transition-all"
                      >
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-950 truncate mb-0.5">{item.name}</h4>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mb-2">
                            <Store className="w-2.5 h-2.5" /> {item.seller}
                          </span>
                          <div className="flex items-center justify-between">
                            {/* Qty Controls */}
                            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-0.5 text-slate-500 hover:bg-slate-100 rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-0.5 text-slate-500 hover:bg-slate-100 rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            {/* Price / Delete */}
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-black text-slate-900">${item.total}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-xs">Your shopping basket is currently empty.</p>
                  </div>
                )}
              </div>

              {/* Footer / Summary */}
              {cartDetails.length > 0 && (
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-slate-500">Order Subtotal</span>
                    <span className="text-lg font-black text-slate-900">${cartTotal}</span>
                  </div>

                  {checkoutStep !== "paying" ? (
                    <button
                      onClick={triggerCheckout}
                      className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all duration-200 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" /> Proceed to Express Checkout
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 rounded-2xl bg-slate-100 text-slate-400 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Processing Transaction...
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {checkoutStep === "success" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl border border-slate-200 text-center z-10"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Inquiry/Order Submitted!</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Your order query has been logged. Zeoraz and its logistics operators will dispatch the invoice/shipping details within 12 hours.
              </p>
              <button
                onClick={() => setCheckoutStep("none")}
                className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-black cursor-pointer transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3D Product Viewer Modal */}
      {viewing3D && (
        <Product3DViewer
          product={viewing3D}
          onClose={() => setViewing3D(null)}
          onAddToCart={(id) => {
            addToCart(id);
            setViewing3D(null);
          }}
        />
      )}
    </div>
  );
}
