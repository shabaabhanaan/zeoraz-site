"use client";

import React, { useState } from "react";
import { 
  Search, Bell, Moon, Sun, ChevronDown, 
  LayoutGrid, Tag, Download, ShoppingCart, 
  Settings, MessageSquare, Link as LinkIcon, 
  UploadCloud, Plus, Save
} from "lucide-react";
import Image from "next/image";

export default function SellerDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Branding");

  // Colors based on the provided UI
  const bgMain = "#f6f5f3";
  const bgSidebar = "#ffffff";
  const bgSurface = "#f2efe9";
  const primaryBrand = "#656a50";
  const primaryBrandHover = "#525740";

  return (
    <div className="min-h-screen flex font-sans text-gray-800" style={{ backgroundColor: bgMain }}>
      
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col border-r border-gray-100 shrink-0">
        <div className="p-6 flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: primaryBrand }}>
            Z
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">Zeoraz</span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          {/* Dashboard Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Dashboard</h3>
            <nav className="space-y-1">
              <NavItem icon={<LayoutGrid size={18} />} label="Find Products" isActive={activeTab === "Find Products"} onClick={() => setActiveTab("Find Products")} />
              <NavItem icon={<Tag size={18} />} label="Branding" isActive={activeTab === "Branding"} onClick={() => setActiveTab("Branding")} />
              <NavItem icon={<Download size={18} />} label="Import List" isActive={activeTab === "Import List"} onClick={() => setActiveTab("Import List")} />
            </nav>
          </div>

          <hr className="border-gray-100" />

          {/* Orders Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Orders</h3>
            <nav className="space-y-1">
              <NavItem icon={<ShoppingCart size={18} />} label="Shopify Orders" />
              <NavItem icon={<Settings size={18} />} label="Settings" />
              <NavItem icon={<Bell size={18} />} label="Notifications" />
              <NavItem icon={<LinkIcon size={18} />} label="Connect Store" />
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-[#f6f5f3] px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold">{activeTab}</h1>
          
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#656a50]/20"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors">
                <Bell size={18} className="text-gray-600" />
              </button>

              {/* Theme Toggle */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setIsDarkMode(!isDarkMode)}>
                <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-[#656a50]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">Light</span>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 ml-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border-2 border-white shadow-sm">
                  <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Profile" fill className="object-cover" />
                </div>
                <div className="hidden sm:block text-sm">
                  <p className="font-semibold leading-tight">Diet Lam <ChevronDown size={14} className="inline text-gray-400" /></p>
                  <p className="text-gray-400 text-xs">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
                <Tag size={20} style={{ color: primaryBrand }} />
              </div>
              <h2 className="text-xl font-bold">Add New Product</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-2.5 rounded-full bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Save size={16} /> Save Draft
              </button>
              <button className="px-6 py-2.5 rounded-full text-white text-sm font-medium flex items-center gap-2 transition-colors" style={{ backgroundColor: primaryBrand }}>
                <Plus size={16} /> Add Product
              </button>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Form (Spans 2 columns) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Branding Block */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: bgSurface }}>
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-1">Your Brand</h3>
                  <p className="text-sm text-gray-500">Preview your brande product.</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Brand name</label>
                    <input type="text" placeholder="Brand name" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Font Family</label>
                    <div className="relative">
                      <input type="text" placeholder="Typing" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Distributor City</label>
                    <input type="text" placeholder="Typing" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Destructor Zip</label>
                    <input type="text" placeholder="Typing" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                </div>

                {/* Upload Area */}
                <div className="space-y-2 mb-8">
                  <label className="text-sm font-semibold text-gray-700">Distributor City</label>
                  <div className="w-full h-40 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <UploadCloud size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Upload your logo, or <span className="underline font-medium text-gray-700">browse</span>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="flex-1 py-3.5 rounded-full bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className="flex-1 py-3.5 rounded-full text-white font-semibold transition-colors" style={{ backgroundColor: primaryBrand }}>
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Second Block (Duplicate styling to match image) */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: bgSurface }}>
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-1">Your Brand</h3>
                  <p className="text-sm text-gray-500">Preview your brande product.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Brand name</label>
                    <input type="text" placeholder="Brand name" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Distributor City</label>
                    <input type="text" placeholder="Typing" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Destructor Zip</label>
                    <input type="text" placeholder="Typing" className="w-full px-4 py-3 rounded-xl border-none outline-none text-sm placeholder:text-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>
              
            </div>

            {/* Right Column - Image Preview */}
            <div className="rounded-3xl p-6 flex flex-col" style={{ backgroundColor: bgSurface }}>
              <h3 className="font-bold text-lg mb-4">Your Brand</h3>
              
              <div className="flex-1 bg-[#dedcd5] rounded-2xl overflow-hidden relative mb-4 flex items-center justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" 
                  alt="Product Preview" 
                  fill
                  className="object-cover mix-blend-multiply opacity-90"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#dedcd5] border-2 border-white overflow-hidden relative cursor-pointer">
                  <Image src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200" alt="Thumb 1" fill className="object-cover mix-blend-multiply" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#dedcd5] overflow-hidden relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=200" alt="Thumb 2" fill className="object-cover mix-blend-multiply" />
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#dedcd5] overflow-hidden relative cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80&w=200" alt="Thumb 3" fill className="object-cover mix-blend-multiply" />
                </div>
                <div className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <Plus size={20} className="text-gray-500" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

function NavItem({ icon, label, isActive = false, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
        isActive 
          ? 'bg-[#656a50] text-white' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
      }`}
    >
      <div className={`${isActive ? 'opacity-100' : 'opacity-70'}`}>
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}
