"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  LayoutDashboard, ShoppingBag, Compass, Star, 
  Settings, PieChart, TrendingUp, Phone, CreditCard,
  Search, MessageSquare, Bell, ChevronRight, ArrowRight,
  HelpCircle
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("My Orders");

  return (
    <div className="min-h-screen flex bg-[#f8f9fc] font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 min-h-screen py-6">
        <div className="px-8 flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            {/* Simple logo icon */}
            <div className="w-4 h-2 border-b-2 border-white rounded-full"></div>
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">Zeoraz.</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" isActive={activeTab === "Dashboard"} onClick={() => setActiveTab("Dashboard")} />
          <NavItem icon={<ShoppingBag size={18} />} label="My Orders" isActive={activeTab === "My Orders"} onClick={() => setActiveTab("My Orders")} />
          <NavItem icon={<Compass size={18} />} label="Explore" isActive={activeTab === "Explore"} onClick={() => setActiveTab("Explore")} />
          <NavItem icon={<Star size={18} />} label="Featured Products" isActive={activeTab === "Featured Products"} onClick={() => setActiveTab("Featured Products")} />
          
          <div className="pt-6 pb-2 px-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Settings</span>
          </div>
          
          <NavItem icon={<Settings size={18} />} label="Settings" isActive={activeTab === "Settings"} onClick={() => setActiveTab("Settings")} />
          <NavItem icon={<PieChart size={18} />} label="Charts" isActive={activeTab === "Charts"} onClick={() => setActiveTab("Charts")} />
          <NavItem icon={<TrendingUp size={18} />} label="Trends" isActive={activeTab === "Trends"} onClick={() => setActiveTab("Trends")} />
          <NavItem icon={<Phone size={18} />} label="Contact" isActive={activeTab === "Contact"} onClick={() => setActiveTab("Contact")} />
          <NavItem icon={<CreditCard size={18} />} label="Billing" isActive={activeTab === "Billing"} onClick={() => setActiveTab("Billing")} />
        </div>

        {/* Help Center Card */}
        <div className="px-6 mt-8">
          <div className="bg-gradient-to-b from-emerald-100 to-emerald-200/50 rounded-2xl p-5 text-center relative overflow-hidden shadow-sm">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 shadow-sm relative z-10">
              <HelpCircle size={20} className="fill-emerald-100" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 relative z-10">Help Center</h3>
            <p className="text-[11px] text-slate-600 mb-4 leading-relaxed relative z-10">
              Having trouble in Zeoraz.<br/>Please contact us for more questions.
            </p>
            <button className="w-full bg-white text-slate-800 text-xs font-bold py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative z-10">
              Go To Help Center
            </button>
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-8 lg:p-10 max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <header className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome to Zeoraz.</h1>
              <p className="text-slate-500 text-sm font-medium">Hello Shakir, welcome back!</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Dashboard" 
                  className="w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <div className="flex flex-col gap-0.5">
                    <div className="w-3 h-[1px] bg-current"></div>
                    <div className="w-2 h-[1px] bg-current"></div>
                    <div className="w-3 h-[1px] bg-current"></div>
                  </div>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100 shadow-sm text-slate-500 hover:text-slate-700 transition-colors relative">
                  <Bell size={18} />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="w-10 h-10 rounded-xl overflow-hidden relative shadow-sm border border-slate-100 ml-2">
                  <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" />
                </div>
              </div>
            </div>
          </header>

          {/* Top Row: Banner & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Large Banner */}
            <div className="lg:col-span-2 rounded-3xl overflow-hidden relative shadow-md group">
              <Image 
                src="https://images.unsplash.com/photo-1595166012759-408c4a165b40?auto=format&fit=crop&q=80&w=1200" 
                alt="Tea Leaves" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              
              <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-emerald-400 mb-3 max-w-sm leading-tight">
                  Discover and shop authentic products
                </h2>
                <p className="text-slate-300 text-sm max-w-sm mb-8 opacity-90">
                  The world's first and largest Sri Lankan heritage marketplace
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-white text-emerald-700 font-bold rounded-xl text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                    Explore More
                  </button>
                  <button className="px-6 py-2.5 bg-transparent border border-white/30 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-colors backdrop-blur-sm">
                    Top Sellers
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-3xl bg-[#d5f3bd] p-8 relative overflow-hidden shadow-sm flex flex-col justify-between">
              {/* Decorative Background Lines */}
              <svg className="absolute top-0 right-0 w-full h-full text-[#c2ed9c] opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 C50,100 100,50 100,100 L100,0 Z" fill="currentColor" />
              </svg>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">My Stats</h3>
                <div className="flex gap-8 mb-6">
                  <div>
                    <div className="text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wide">Today</div>
                    <div className="text-xl font-bold text-slate-900">4 Orders</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wide">This Month</div>
                    <div className="text-xl font-bold text-slate-900">17 Orders</div>
                  </div>
                </div>
              </div>

              <button className="relative z-10 flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-emerald-700 transition-colors mt-auto w-max group">
                Go to my orders <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              {/* Floating Element Image */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 z-10 pointer-events-none">
                <Image 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400" 
                  alt="Spices/Decor" 
                  fill 
                  className="object-contain drop-shadow-2xl mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Bottom Grid: Listings & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Recent Orders/Listings */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">My Recent Orders</h3>
                <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <ProductCard 
                  title="Ceylon BOPF Tea" 
                  img="https://images.unsplash.com/photo-1595166012759-408c4a165b40?auto=format&fit=crop&q=80&w=300"
                />
                <ProductCard 
                  title="Organic Cinnamon" 
                  img="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300"
                  highlight
                />
                <ProductCard 
                  title="Raksha Mask" 
                  img="https://images.unsplash.com/photo-1517424263654-e6530a6c62e6?auto=format&fit=crop&q=80&w=300"
                />
              </div>

              {/* Top/Featured Sellers Row */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <SellerWidget title="Top Sellers" count="1,542" />
                <SellerWidget title="Featured Sellers" count="2,156" />
              </div>
            </div>

            {/* Recent Activity Sidebar */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
                <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="space-y-6">
                  <ActivityItem name="Ageratum houstonianum" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=1" />
                  <ActivityItem name="Tagetes erecta" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=2" />
                  <ActivityItem name="Catharanthus roseus" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=3" />
                  <ActivityItem name="Sutera cordata" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=4" />
                  <ActivityItem name="American Marigold" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=5" />
                  <ActivityItem name="Scrophulariaceae" action="Ordered a new item" time="3 min ago" img="https://i.pravatar.cc/150?img=6" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

function NavItem({ icon, label, isActive = false, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all relative ${
        isActive 
          ? 'text-emerald-600' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
      }`}
    >
      {/* Active Indicator Line */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
      )}
      
      <div className={`transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
        {icon}
      </div>
      <span className={isActive ? "font-bold" : "font-semibold text-sm"}>{label}</span>
    </div>
  );
}

function ProductCard({ title, img, highlight = false }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center group cursor-pointer relative overflow-hidden">
      <div className="w-full h-32 relative mb-4 rounded-xl overflow-hidden bg-slate-50">
        <Image src={img} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h4 className="font-bold text-slate-800 text-sm text-center">{title}</h4>
      
      {/* Hover Arrow */}
      {highlight && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
          <ArrowRight size={12} />
        </div>
      )}
    </div>
  );
}

function SellerWidget({ title, count }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=11" alt="" fill/></div>
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=12" alt="" fill/></div>
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=13" alt="" fill/></div>
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"><Image src="https://i.pravatar.cc/100?img=14" alt="" fill/></div>
      </div>
      <div className="border-l border-slate-200 pl-4">
        <div className="text-sm font-bold text-slate-800">{count} items sold</div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>10 sellers</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>7 days</span>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ name, action, time, img }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 bg-slate-100">
        <Image src={img} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-slate-800 truncate">{name}</div>
        <div className="text-xs text-slate-500 font-medium">{action}</div>
      </div>
      <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{time}</div>
    </div>
  );
}
