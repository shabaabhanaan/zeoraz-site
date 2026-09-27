"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Leaf, Globe, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#2c322b] font-sans">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-8 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <div className="text-2xl font-serif font-bold tracking-tight text-white drop-shadow-md">Zeoraz</div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-white drop-shadow-md">
          <Link href="/shop" className="hover:opacity-80 transition-opacity">Shop</Link>
          <Link href="/about" className="opacity-70">About Us</Link>
          <Link href="/#contact" className="hover:opacity-80 transition-opacity">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=2000" 
          alt="Sri Lankan Landscape" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-sm uppercase tracking-widest mb-4 font-medium opacity-90 drop-shadow">Our Journey</p>
          <h1 className="text-5xl md:text-7xl font-serif drop-shadow-lg leading-tight">Rooted in <br/> Sri Lanka</h1>
        </div>
      </div>

      {/* Content Section 1 */}
      <section className="py-24 px-4 md:px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-serif italic mb-6">A heritage of craftsmanship.</h2>
            <p className="text-[#2c322b]/80 leading-relaxed mb-6 text-lg">
              Born amidst the lush landscapes and rich cultural tapestry of Sri Lanka, Zeoraz was founded with a singular mission: to bring the authentic essence of the island to the global stage. 
            </p>
            <p className="text-[#2c322b]/80 leading-relaxed text-lg">
              From the misty tea estates of Nuwara Eliya to the vibrant artisanal villages of the south, every product we curate is a testament to generations of skill, sustainable practices, and profound respect for nature.
            </p>
          </div>
          <div className="md:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=800" 
              alt="Tea Plucking in Sri Lanka" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-[#f0eee9] px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif">Our Values</h2>
            <p className="mt-4 text-[#2c322b]/70 max-w-2xl mx-auto">The principles that guide everything we do, from sourcing materials to delivering them to your doorstep.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[#2c322b]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2c322b]">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Sourcing</h3>
              <p className="text-[#2c322b]/70 text-sm leading-relaxed">We work directly with local farmers and artisans, ensuring fair trade practices and environmentally conscious harvesting.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[#2c322b]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2c322b]">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Cultural Authenticity</h3>
              <p className="text-[#2c322b]/70 text-sm leading-relaxed">Every item reflects the true heritage of Sri Lanka, preserving traditional techniques passed down through generations.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[#2c322b]/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#2c322b]">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-[#2c322b]/70 text-sm leading-relaxed">A portion of every purchase goes back into supporting rural education and infrastructure in Sri Lankan villages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 text-center">
        <p className="text-sm text-[#2c322b]/60">© {new Date().getFullYear()} Zeoraz. All rights reserved.</p>
      </footer>

    </div>
  );
}
