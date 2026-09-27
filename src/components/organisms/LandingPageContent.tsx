"use client";

import React from "react";
import { ArrowRight, ShoppingBag, User, Search, Plus, Leaf, ShieldCheck, Recycle, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMG = "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000"; // Sri Lanka landscape/elephants
const BANNER_IMG = "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=2000"; // Tea plantation

const PRODUCTS = [
  { id: 1, name: "Premium Ceylon Tea", desc: "Hand-plucked leaves from the misty hills of Nuwara Eliya.", price: "$24.00", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=600", badge: "Export Quality" },
  { id: 2, name: "Organic Cinnamon Quills", desc: "Authentic true cinnamon native to Sri Lanka.", price: "$18.00", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600", badge: "Pure Spice" },
  { id: 3, name: "Traditional Raksha Mask", desc: "Hand-carved wooden mask for protection and prosperity.", price: "$45.00", img: "https://images.unsplash.com/photo-1517424263654-e6530a6c62e6?auto=format&fit=crop&q=80&w=600", badge: "Cultural Heritage" },
  { id: 4, name: "Batik Wrap Sarong", desc: "Vibrant, handcrafted fabric perfect for tropical weather.", price: "$32.00", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600", badge: "Handmade" },
];

const FLASH_DEALS = [
  { id: 101, name: "Wireless Earbuds PRO", price: "$9.99", oldPrice: "$49.99", discount: "-80%", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600", tag: "Welcome deal" },
  { id: 102, name: "Smart Watch Series 8", price: "$15.50", oldPrice: "$60.00", discount: "-74%", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600", tag: "Choice" },
  { id: 103, name: "Mini Drone 4K HD", price: "$22.00", oldPrice: "$88.00", discount: "-75%", img: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=600", tag: "Free shipping" },
  { id: 104, name: "LED Strip Lights", price: "$3.99", oldPrice: "$12.99", discount: "-69%", img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600", tag: "Choice" },
];

const MORE_TO_LOVE = [
  { id: 201, name: "Mechanical Keyboard", price: "$35.00", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600", tag: "Free shipping" },
  { id: 202, name: "Ergonomic Mouse", price: "$18.50", img: "https://images.unsplash.com/photo-1527864551497-113cd0897323?auto=format&fit=crop&q=80&w=600", tag: "Top brand" },
  { id: 203, name: "Portable SSD 1TB", price: "$49.99", img: "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?auto=format&fit=crop&q=80&w=600", tag: "Free shipping" },
  { id: 204, name: "USB-C Hub 7-in-1", price: "$12.99", img: "https://images.unsplash.com/photo-1556976694-82559ce057f9?auto=format&fit=crop&q=80&w=600", tag: "" },
  { id: 205, name: "Wireless Charger Pad", price: "$8.50", img: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&q=80&w=600", tag: "Choice" },
  { id: 206, name: "Noise Cancelling Headphones", price: "$45.00", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600", tag: "Free shipping" },
  { id: 207, name: "Gaming Controller", price: "$25.00", img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=600", tag: "Top brand" },
  { id: 208, name: "Action Camera 4K", price: "$38.00", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600", tag: "Free shipping" },
];

const CATEGORIES = [
  { name: "Ceylon Tea", img: "https://images.unsplash.com/photo-1595166012759-408c4a165b40?auto=format&fit=crop&q=80&w=600" },
  { name: "Exotic Spices", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600" },
  { name: "Handlooms", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600" },
  { name: "Crafts & Gems", img: "https://images.unsplash.com/photo-1611080760456-c73d9374092b?auto=format&fit=crop&q=80&w=600" },
];

export const LandingPageContent = () => {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#2c322b] font-sans selection:bg-[#2c322b] selection:text-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full p-4 md:p-6 lg:p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image 
              src={HERO_IMG} 
              alt="Hero interior" 
              fill 
              className="object-cover"
              priority
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Transparent Header overlaying Hero */}
          <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 text-white">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="#shop" className="hover:opacity-75 transition-opacity">Shop</Link>
              <Link href="#bestsellers" className="hover:opacity-75 transition-opacity">Bestsellers</Link>
              <Link href="#gallery" className="hover:opacity-75 transition-opacity">Gallery</Link>
              <Link href="#about" className="hover:opacity-75 transition-opacity">About</Link>
            </nav>
            
            {/* Brand Name */}
            <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif tracking-wide">
              Zeoraz
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 text-sm">
                <Search className="w-4 h-4 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search Product..." 
                  className="bg-transparent border-none outline-none placeholder:text-white/80 w-32"
                />
              </div>
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
                The Essence of<br />Sri Lanka
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-md opacity-100 leading-relaxed font-medium drop-shadow-sm">
                Authentic Ceylon tea, rare spices, and traditional crafts directly from the Pearl of the Indian Ocean to your home.
              </p>
              <Link href="/shop" className="inline-flex bg-[#fcfbf9] text-[#2c322b] px-8 py-3 rounded-full font-medium items-center gap-2 hover:bg-white transition-colors w-fit">
                Shop now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="absolute right-8 bottom-8 md:right-16 md:bottom-16 bg-black/30 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white max-w-[200px]">
              <p className="text-xs uppercase tracking-wider mb-2 opacity-90">Ayubowan</p>
              <p className="text-3xl font-serif mb-1">100%</p>
              <p className="text-xs opacity-90">Locally sourced and authentically Sri Lankan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Super Deals / Flash Deals Section (AliExpress Style) */}
      <section className="py-16 px-4 md:px-8 max-w-[1600px] mx-auto bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl my-10 mx-4 shadow-sm border border-red-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-extrabold text-red-600 tracking-tight flex items-center gap-2">
              SuperDeals <span className="text-xl">🔥</span>
            </h2>
            <div className="bg-red-600 text-white px-3 py-1 rounded-md font-mono text-sm shadow-inner flex items-center gap-1">
              <span>02</span>:<span>14</span>:<span>59</span>
              <span className="text-xs font-sans ml-1 uppercase opacity-90">Ends in</span>
            </div>
          </div>
          <Link href="#" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm">
            View all deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FLASH_DEALS.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl p-4 hover:shadow-lg transition-shadow border border-gray-100 cursor-pointer relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-3 py-1 rounded-bl-xl z-10">
                {deal.discount}
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
                <Image src={deal.img} alt={deal.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="space-y-1">
                {deal.tag && (
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm tracking-wider">
                    {deal.tag}
                  </span>
                )}
                <h3 className="font-medium text-sm text-gray-700 line-clamp-1">{deal.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-bold text-red-600">{deal.price}</span>
                  <span className="text-xs text-gray-400 line-through">{deal.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestselling Products Section */}
      <section id="bestsellers" className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-[#2c322b]/60 mb-2">Everyday Essentials</p>
            <h2 className="text-3xl font-serif italic">Bestselling Products</h2>
          </div>
          <Link href="#" className="text-sm font-medium border-b border-[#2c322b] pb-1 hover:opacity-70 transition-opacity flex items-center gap-1">
            More products <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-[#ecebe8] rounded-2xl overflow-hidden mb-4 p-6 flex items-center justify-center">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/60">
                  {product.badge}
                </div>
                
                {/* Hover arrow indicator */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Product Image placeholder */}
                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-105">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-[#2c322b]/60 mb-2 leading-tight max-w-[80%]">{product.desc}</p>
                  <p className="font-semibold">{product.price}</p>
                </div>
                <button className="bg-[#2c322b] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1a1e19] transition-colors flex items-center gap-1 shrink-0">
                  <Plus className="w-4 h-4" /> Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Width Banner */}
      <section className="px-4 md:px-8 max-w-[1600px] mx-auto py-10">
        <div className="relative h-[60vh] min-h-[400px] rounded-2xl overflow-hidden">
          <Image 
            src={BANNER_IMG} 
            alt="Interior lifestyle" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl text-white">
            <h2 className="text-3xl md:text-5xl font-serif leading-tight drop-shadow-lg">
              Experience the rich heritage of Ceylon, woven into every thread, carved into every mask, and steeped in every cup.
            </h2>
          </div>
        </div>
      </section>

      {/* Features Pill Section */}
      <section className="py-10 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#f0eee9] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="bg-white p-3 rounded-full text-[#4a5e4b]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl italic">Natural Finish</h3>
          </div>
          <div className="bg-[#ecebe8] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="bg-white p-3 rounded-full text-[#4a5e4b]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl italic">Premium Quality</h3>
          </div>
          <div className="bg-[#e8ecea] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="bg-white p-3 rounded-full text-[#4a5e4b]">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl italic">Sustainable Materials</h3>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="shop" className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-widest text-[#2c322b]/60 mb-2">Explore the island's finest</p>
          <h2 className="text-3xl font-serif italic">Authentic Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category, index) => (
            <div key={index} className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer">
              <Image 
                src={category.img} 
                alt={category.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                <h3 className="font-serif text-2xl italic mb-6">Explore<br />{category.name}</h3>
                <button className="bg-white text-[#2c322b] px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors flex items-center gap-2">
                  Shop <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More to Love Section (AliExpress Style Infinite Scroll Vibe) */}
      <section className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto bg-gray-50 rounded-t-[3rem] mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <span className="text-red-500">❤️</span> More to love
          </h2>
          <p className="text-gray-500 mt-2">Recommendations just for you</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {MORE_TO_LOVE.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer hover:-translate-y-1">
              <div className="relative aspect-square bg-gray-100">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
                {item.tag && (
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-end justify-between">
                  <span className="text-lg font-bold text-gray-900">{item.price}</span>
                  <span className="text-[10px] text-gray-400">10k+ sold</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium px-8 py-3 rounded-full transition-colors">
            Load more items
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-widest text-[#2c322b]/60 mb-2">Follow our journey</p>
          <h2 className="text-3xl font-serif italic">Community Gallery</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&q=80&w=600" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=600" alt="Gallery 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600" alt="Gallery 4" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="bg-[#f0eee9] rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-[#2c322b]/60 mb-4">Our Heritage</p>
            <h2 className="text-4xl font-serif italic mb-6">Born in the Tropics.</h2>
            <p className="text-[#2c322b]/80 leading-relaxed mb-8">
              At Zeoraz, we are dedicated to sharing the magic of Sri Lanka with the world. From the lush tea estates of the central highlands to the sun-kissed spice gardens of the south, we ethically source our products directly from local artisans and farmers to ensure you experience true authenticity.
            </p>
            <button className="self-start border-b border-[#2c322b] pb-1 font-medium hover:opacity-70 transition-opacity flex items-center gap-2">
              Learn more about our mission <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2 relative min-h-[400px]">
            <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000" alt="About us" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="bg-[#2c322b] text-[#fcfbf9] rounded-3xl overflow-hidden p-8 md:p-16 flex flex-col md:flex-row gap-12">
          
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-sm uppercase tracking-widest text-[#fcfbf9]/60 mb-4">Get in Touch</p>
            <h2 className="text-4xl font-serif italic mb-6">Let's start a conversation.</h2>
            <p className="text-[#fcfbf9]/80 leading-relaxed mb-10 max-w-md">
              Whether you have a question about our products, sustainability practices, or just want to say hello, our team is ready to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#fcfbf9]/20 flex items-center justify-center">
                  <MapPin size={20} className="text-[#fcfbf9]/80" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#fcfbf9]/60">Our Studio</h4>
                  <p>124 Design District, NY 10012</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#fcfbf9]/20 flex items-center justify-center">
                  <Mail size={20} className="text-[#fcfbf9]/80" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#fcfbf9]/60">Email Us</h4>
                  <p>hello@zeoraz.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-[#fcfbf9]/20 flex items-center justify-center">
                  <Phone size={20} className="text-[#fcfbf9]/80" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#fcfbf9]/60">Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-[#2c322b]">
              <h3 className="text-2xl font-serif mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                    <input type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#2c322b] transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#2c322b] transition-colors" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#2c322b] transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                  <textarea placeholder="How can we help you?" rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#2c322b] transition-colors resize-none"></textarea>
                </div>
                <button className="w-full bg-[#2c322b] text-white rounded-lg py-4 font-bold tracking-wide hover:bg-[#1a1e19] transition-colors flex items-center justify-center gap-2">
                  Submit Form <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </section>

      {/* Simple Footer to match template */}
      <footer className="py-12 border-t border-[#2c322b]/10 text-center">
        <p className="text-sm text-[#2c322b]/60">© {new Date().getFullYear()} Zeoraz. All rights reserved.</p>
      </footer>
    </div>
  );
};
