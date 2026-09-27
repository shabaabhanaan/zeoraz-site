"use client";

import React, { useState } from "react";
import { 
  Home, Tag, Star, Info, HelpCircle, Shield, 
  DollarSign, Mail, ChevronDown, ThumbsUp, MessageCircle, Link2
} from "lucide-react";

export default function SellerDashboard() {
  const [reviewsOpen, setReviewsOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8f9fc] border-r border-slate-100 flex flex-col shrink-0 min-h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            Z
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Zeoraz Seller</span>
          <div className="ml-auto w-5 h-5 border border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400">
            [ ]
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <NavItem icon={<Home size={18} />} label="Home" isActive />
          <NavItem icon={<Tag size={18} />} label="Top Products" />
          
          <div>
            <div 
              onClick={() => setReviewsOpen(!reviewsOpen)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Star size={18} />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <ChevronDown size={14} className={`transition-transform ${reviewsOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {reviewsOpen && (
              <div className="ml-9 mt-1 space-y-1 relative before:absolute before:left-[-12px] before:top-0 before:bottom-4 before:w-[1px] before:bg-slate-200">
                <div className="relative">
                  <div className="absolute left-[-12px] top-1/2 w-3 h-[1px] bg-slate-200"></div>
                  <NavItem icon={<DollarSign size={16} />} label="Payout Portal" isSubItem />
                </div>
                <div className="relative">
                  <div className="absolute left-[-12px] top-1/2 w-3 h-[1px] bg-slate-200"></div>
                  <NavItem icon={<Link2 size={16} />} label="Linked Accounts" isSubItem />
                </div>
              </div>
            )}
          </div>

          <NavItem icon={<Info size={18} />} label="About Zeoraz Sellers" />
          <NavItem icon={<HelpCircle size={18} />} label="FAQS" />
          <NavItem icon={<Shield size={18} />} label="Privacy Policy" />
          <NavItem icon={<DollarSign size={18} />} label="Monetization Disclosure" />
          <NavItem icon={<Mail size={18} />} label="Contact Us" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Hero Banner */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white p-10 shadow-lg">
            {/* Abstract background waves (CSS representation) */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-4xl font-bold mb-4">Welcome to Zeoraz Sellers</h1>
              <p className="text-slate-200 mb-8 text-lg leading-relaxed">
                Compare top marketplace metrics from across the platform in one place.
                Stay informed and join our growing community of premium vendors.
              </p>
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm">
                Learn more
              </button>
            </div>
          </div>

          {/* Hot Deals Section */}
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">Trending Items 🔥</h2>
              <p className="text-slate-500 text-sm mt-1">We've compiled our list of top performing product categories.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HotDealCard 
                title="Ceylon Tea" 
                percent="50%" 
                desc="Growth when stacking promotions.."
                icon="leaf"
                likes={12}
                comments={24}
              />
              <HotDealCard 
                title="Handloom Fabrics" 
                percent="10%" 
                desc="Growth when stacking promotions.."
                icon="box"
                likes={6}
                comments={10}
              />
              <HotDealCard 
                title="Traditional Masks" 
                percent="40%" 
                desc="Growth when stacking promotions.."
                icon="mask"
                likes={32}
                comments={12}
              />
            </div>
          </section>

          {/* Value By Store Table */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Marketplace Value By Category</h2>
              <p className="text-slate-500 text-sm">See the top expected value of using the right mix of promotions and inventory across 5000 listings.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 font-medium border-b border-slate-200 bg-white">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Total Value</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Bonus Rate</th>
                    <th className="px-6 py-4 font-semibold">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">T</div>
                      <span className="font-semibold text-slate-900">Tea & Spices</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">5.5% Growth</td>
                    <td className="px-6 py-4">Consumables</td>
                    <td className="px-6 py-4 text-slate-700">+1.4% margin</td>
                    <td className="px-6 py-4">Bulk Orders</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">C</div>
                      <span className="font-semibold text-slate-900">Crafts</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">8.2% Growth</td>
                    <td className="px-6 py-4">Decor</td>
                    <td className="px-6 py-4 text-slate-700">+2.1% margin</td>
                    <td className="px-6 py-4">Premium</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">A</div>
                      <span className="font-semibold text-slate-900">Apparel</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">4.1% Growth</td>
                    <td className="px-6 py-4">Fashion</td>
                    <td className="px-6 py-4 text-slate-700">+0.8% margin</td>
                    <td className="px-6 py-4">Standard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}

function NavItem({ icon, label, isActive = false, isSubItem = false }: { icon: React.ReactNode, label: string, isActive?: boolean, isSubItem?: boolean }) {
  return (
    <div 
      className={`flex items-center gap-3 px-3 rounded-lg cursor-pointer transition-colors ${
        isSubItem ? 'py-2 text-sm' : 'py-2.5 text-sm'
      } ${
        isActive 
          ? 'bg-slate-200/50 text-slate-900 font-medium' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <div className={`${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
        {icon}
      </div>
      <span className={isActive ? "font-semibold" : "font-medium"}>{label}</span>
    </div>
  );
}

function HotDealCard({ title, percent, desc, likes, comments }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-500 flex items-center justify-center">
            {/* Generic icon shape */}
            <div className="w-3 h-3 bg-indigo-500 rotate-45"></div>
          </div>
        </div>
        <div className="text-3xl font-bold text-slate-900 mb-2">{percent}</div>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
      <div className="px-6 py-3 border-t border-slate-100 flex items-center gap-4 bg-slate-50/50">
        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors">
          <ThumbsUp size={14} /> {likes}
        </button>
        <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors">
          <MessageCircle size={14} /> {comments}
        </button>
      </div>
    </div>
  );
}
