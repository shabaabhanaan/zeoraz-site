"use client";
import React from "react";
import { Construction } from "lucide-react";

export default function AdminContentPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
        <Construction size={32} />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management</h1>
      <p className="text-slate-500 max-w-md">This section is currently under construction. Check back soon for updates.</p>
    </div>
  );
}
