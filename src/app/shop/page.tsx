"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, Heart, ShoppingCart, ChevronDown, 
  X, Star, MapPin, ArrowLeft
} from "lucide-react";

export default function ShopPage() {
  const [activeFilters, setActiveFilters] = useState([
    "Women", "Black", "L", "Price : $25.00 - $125.00"
  ]);

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filterToRemove));
  };

  const DUMMY_PRODUCTS = Array(9).fill({
    name: "Classy Light Coat",
    category: "Coats",
    price: "$165.00",
    oldPrice: "$220.00",
    rating: "4.9",
    discount: "15% OFF",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400"
  });

  const RECENT_PRODUCTS = Array(3).fill({
    name: "Striped Up-down Shirt",
    price: "$50.00",
    oldPrice: "$60.00",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=150"
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center px-12 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-2xl font-serif font-bold tracking-tight">SilkStitch</div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-amber-800">Home</Link>
          <Link href="/shop" className="text-amber-900 flex items-center gap-1">Shop <ChevronDown size={14}/></Link>
          <Link href="/about" className="hover:text-amber-800">About Us</Link>
          <Link href="#" className="hover:text-amber-800">Blog</Link>
          <Link href="#" className="hover:text-amber-800">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Search size={20} className="cursor-pointer" />
          <Heart size={20} className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
          </div>
          <Link href="/login" className="bg-[#3e1e04] text-white px-6 py-2 rounded-full text-sm font-medium ml-2 hover:bg-[#2b1502] transition-colors">Login</Link>
        </div>
      </header>

      {/* Page Title Banner */}
      <div className="bg-[#f8f8f8] py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">All Product</h1>
        <p className="text-sm text-gray-500 font-medium">
          Home / About / Shop / <span className="text-gray-900">Details</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Sidebar (Filters) */}
        <aside className="w-full lg:w-64 shrink-0">
          <h2 className="text-lg font-bold mb-6">Filter Options</h2>

          {/* Category */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-gray-900">Category</h3>
            <div className="space-y-3 text-sm text-gray-600">
              {['Men', 'Women', 'T-Shirts', 'Handbags', 'Watches', 'Hat', 'Shoes'].map((cat, i) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-amber-900 focus:ring-amber-900" defaultChecked={i === 2} />
                  <span className={i === 2 ? "font-bold text-gray-900" : ""}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-gray-900">Price</h3>
            <p className="text-sm text-gray-500 mb-2">$25.00 - $125.00</p>
            <div className="relative w-full h-1 bg-gray-200 rounded-full mt-4">
              <div className="absolute top-0 left-[20%] right-[30%] h-full bg-[#3e1e04] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-4 h-4 bg-[#3e1e04] rounded-full shadow cursor-pointer"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-[#3e1e04] rounded-full shadow cursor-pointer"></div>
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-gray-900">Color</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 cursor-pointer"><div className="w-5 h-5 rounded-full border-2 border-red-800 bg-[#8b5a2b]"></div> Brown</div>
              <div className="flex items-center gap-2 cursor-pointer"><div className="w-5 h-5 rounded-full border border-gray-300 bg-white"></div> White</div>
              <div className="flex items-center gap-2 cursor-pointer"><div className="w-5 h-5 rounded-full border-2 border-green-800 bg-green-900"></div> Green</div>
              <div className="flex items-center gap-2 cursor-pointer"><div className="w-5 h-5 rounded-full border border-gray-300 bg-blue-500"></div> Blue</div>
              <div className="flex items-center gap-2 cursor-pointer"><div className="w-5 h-5 rounded-full border-2 border-[#3e1e04] bg-black"></div> Black</div>
              <div className="flex items-center gap-2 cursor-pointer font-bold"><div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">+</div> More</div>
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <h3 className="font-bold mb-4 text-gray-900">Size</h3>
            <div className="grid grid-cols-3 gap-3 text-sm text-gray-600">
              {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size, i) => (
                <label key={size} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#3e1e04]" defaultChecked={i === 2} />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Track Order Map Placeholder */}
          <div>
            <h3 className="font-bold mb-4 text-gray-900">Track you order</h3>
            <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="flex items-center gap-4 relative z-10">
                 <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                 <div className="h-0.5 w-16 bg-blue-500 border-dashed border-t-2 border-white"></div>
                 <MapPin className="text-red-500" size={20} />
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <div className="flex-1">
          
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="font-bold text-gray-900">Showing 1-9 of results</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold">Sort By:</span>
              <div className="border border-gray-200 rounded px-3 py-1.5 flex items-center gap-8 cursor-pointer">
                Newest <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
              <span className="font-medium text-gray-500">Active Filter:</span>
              {activeFilters.map(filter => (
                <div key={filter} className="bg-[#3e1e04] text-white px-3 py-1.5 rounded-full flex items-center gap-2 transition-all">
                  {filter} <X size={12} className="cursor-pointer hover:text-gray-300" onClick={() => removeFilter(filter)} />
                </div>
              ))}
              <button className="text-gray-900 font-bold underline ml-2 hover:text-[#3e1e04]" onClick={() => setActiveFilters([])}>Clean All</button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {DUMMY_PRODUCTS.map((prod, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-[#f0f0f0] rounded-xl overflow-hidden mb-4">
                  <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-[#ebf8f2] text-[#27a561] font-bold text-[10px] px-2 py-1 rounded shadow-sm">
                    {prod.discount}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs text-gray-500">{prod.category}</p>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                    <Star size={12} className="fill-[#f5a623] text-[#f5a623]" /> {prod.rating}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{prod.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-900">{prod.price}</span>
                  <span className="text-gray-400 line-through text-xs">{prod.oldPrice}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-16">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#3e1e04] text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 font-medium">3</button>
            <span className="text-gray-400 tracking-widest">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 font-medium">10</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">&gt;</button>
          </div>

        </div>
      </div>

      {/* Bottom Lists Section (Recent Optimization) */}
      <div className="bg-[#fafafa] py-16 mt-12 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="text-2xl font-bold mb-10 text-center">Our Recants Optimization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1 */}
            <div>
              <h3 className="font-bold text-lg mb-6">Featured Products</h3>
              <div className="space-y-6">
                {RECENT_PRODUCTS.map((prod, i) => (
                  <div key={i} className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-20 h-24 bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
                      <Image src={prod.img} alt="Product" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors">{prod.name}</h4>
                      <div className="flex gap-1 my-1">
                        {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-[#f5a623] text-[#f5a623]" />)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 line-through text-xs">{prod.oldPrice}</span>
                        <span className="font-bold text-red-500">{prod.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-bold text-lg mb-6">Sale Products</h3>
              <div className="space-y-6">
                {RECENT_PRODUCTS.map((prod, i) => (
                  <div key={i} className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-20 h-24 bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
                      <Image src={prod.img} alt="Product" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors">{prod.name}</h4>
                      <div className="flex gap-1 my-1">
                        {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-[#f5a623] text-[#f5a623]" />)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 line-through text-xs">{prod.oldPrice}</span>
                        <span className="font-bold text-red-500">{prod.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-bold text-lg mb-6">Top Rated Products</h3>
              <div className="space-y-6">
                {RECENT_PRODUCTS.map((prod, i) => (
                  <div key={i} className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-20 h-24 bg-gray-200 rounded-lg relative overflow-hidden shrink-0">
                      <Image src={prod.img} alt="Product" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors">{prod.name}</h4>
                      <div className="flex gap-1 my-1">
                        {[...Array(5)].map((_, j) => <Star key={j} size={10} className="fill-[#f5a623] text-[#f5a623]" />)}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 line-through text-xs">{prod.oldPrice}</span>
                        <span className="font-bold text-red-500">{prod.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#3e1e04] text-[#d4c5b9] pt-12 pb-8">
        <div className="max-w-[1400px] mx-auto px-8">
          
          {/* Trust badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#5a3617] mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#5a3617] rounded-full"><ShoppingCart size={24} className="text-white" /></div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Money Guarantee</h4>
                <p className="text-xs">Within 30 days for an exchange</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#5a3617] rounded-full"><MapPin size={24} className="text-white" /></div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Online Support</h4>
                <p className="text-xs">24 hours a day, 7 days a week</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 border border-[#5a3617] rounded-full"><Search size={24} className="text-white" /></div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Flexible Payment</h4>
                <p className="text-xs">Pay with multiple credit cards</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-6">Category</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white">Rings</Link></li>
                <li><Link href="#" className="hover:text-white">Necklaces</Link></li>
                <li><Link href="#" className="hover:text-white">Earrings</Link></li>
                <li><Link href="#" className="hover:text-white">Bracelet</Link></li>
                <li><Link href="#" className="hover:text-white">Diamond</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company Service</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Delivery Information</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6">Subscribe to Our Newsletter</h4>
              <p className="text-sm mb-4 max-w-sm">Enter your email below to be the first to know about new collections.</p>
              <div className="flex border-b border-[#5a3617] pb-2 max-w-sm">
                <input type="email" placeholder="Your Email" className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-[#8b735e]" />
                <button className="text-white hover:text-gray-300">→</button>
              </div>
            </div>
          </div>

          <div className="text-center text-xs pt-8 border-t border-[#5a3617] flex justify-between items-center">
            <p>©2026 Zeoraz. All Rights are reserved</p>
            <div className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-[#5a3617] inline-block"></span>
              <span className="w-6 h-6 rounded-full bg-[#5a3617] inline-block"></span>
              <span className="w-6 h-6 rounded-full bg-[#5a3617] inline-block"></span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
