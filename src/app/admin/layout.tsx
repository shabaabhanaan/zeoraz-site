"use client";

import React from "react";
import Link from "next/link";
import { 
  Home, ShoppingCart, Package, Users, FileText, 
  DollarSign, BarChart2, Megaphone, Tag, Store, 
  Monitor, ShoppingBag, Settings, ChevronDown, Bell, Search
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 font-bold text-lg text-slate-900 gap-2 shrink-0">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">Z</div>
          Zeoraz
          <ChevronDown size={14} className="ml-auto text-slate-400" />
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-8">
          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Main</p>
            <nav className="space-y-0.5">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Home size={16} /> Home</Link>
              <Link href="/admin/orders" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3"><ShoppingCart size={16} /> Orders</div>
                <span className="w-5 h-5 bg-rose-500 text-white text-[10px] rounded-full flex items-center justify-center">1</span>
              </Link>
              <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-50/50 rounded-lg"><Package size={16} /> Products</Link>
              <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Users size={16} /> Customers</Link>
              <Link href="/admin/sellers" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Store size={16} /> Sellers</Link>
              <Link href="/admin/content" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><FileText size={16} /> Content</Link>
              <Link href="/admin/finances" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><DollarSign size={16} /> Finances</Link>
              <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><BarChart2 size={16} /> Analytics</Link>
              <Link href="/admin/marketing" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3"><Megaphone size={16} /> Marketing</div>
                <ChevronDown size={14} className="text-slate-400" />
              </Link>
              <Link href="/admin/discounts" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Tag size={16} /> Discounts</Link>
            </nav>
          </div>

          <div>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sales Channels</p>
            <nav className="space-y-0.5">
              <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Store size={16} /> Online Store</Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Monitor size={16} /> Point of Sale</Link>
              <Link href="/shop" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><ShoppingBag size={16} /> Shop</Link>
            </nav>
          </div>
        </div>

        <div className="p-3 border-t border-slate-100">
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg"><Settings size={16} /> Settings</Link>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600"><Bell size={18} /></button>
            
            <div className="relative">
              <button 
                onClick={() => document.getElementById('profile-dropdown')?.classList.toggle('hidden')}
                className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">RA</div>
                <div className="text-sm text-left">
                  <p className="font-semibold text-slate-800 leading-none">Rayan Anderson</p>
                  <p className="text-slate-500 text-xs mt-1">Store owner</p>
                </div>
              </button>

              <div id="profile-dropdown" className="hidden absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
                <Link href="/admin/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile Settings</Link>
                <div className="border-t border-slate-100 my-1"></div>
                <Link href="/" className="block w-full text-left px-4 py-2 text-sm text-rose-600 font-medium hover:bg-rose-50">Sign Out</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
