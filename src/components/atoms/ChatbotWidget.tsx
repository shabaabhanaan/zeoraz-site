"use client";

import React, { useState } from "react";
import { X, Send, User } from "lucide-react";

const FaceWithHeadsetIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7 text-white" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Person's Head / Face */}
    <circle cx="12" cy="11" r="4" />
    {/* Shoulders */}
    <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
    {/* Headset Arch */}
    <path d="M4 11a8 8 0 0 1 16 0" />
    {/* Left Earcup */}
    <rect x="2" y="9" width="3" height="5" rx="1.5" fill="currentColor" />
    {/* Right Earcup */}
    <rect x="19" y="9" width="3" height="5" rx="1.5" fill="currentColor" />
    {/* Microphone Arm extending to mouth */}
    <path d="M19 12l-4 3.5h-2" />
  </svg>
);

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm Zeo, your dedicated support consultant. How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    setInputValue("");
    
    // Simulate support response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "Thank you for reaching out! A representative will connect with you shortly, or you can request a callback via our 'Talk to Us' form." }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-[350px] overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0a0a0f]/95 dark:bg-[#0a0a0f]/95 light:bg-white backdrop-blur-xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-inner">
              <FaceWithHeadsetIcon className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Zeo Support Agent</h3>
              <p className="text-[11px] text-blue-100 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Active Support
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 cursor-pointer"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col h-[320px] overflow-y-auto p-4 gap-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-2 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full mt-1 ${
                msg.role === "user" ? "bg-blue-600/20 text-blue-500" : "bg-blue-600 text-white shadow-sm"
              }`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <FaceWithHeadsetIcon className="h-4 w-4 text-white" />}
              </div>
              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-tr-sm shadow-sm" 
                  : "bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-100 dark:text-slate-100 light:text-slate-800 border border-slate-700/50 light:border-slate-200 rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-[#030014]/50 dark:bg-[#030014]/50 light:bg-slate-50">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a support question..."
              className="w-full bg-slate-900/60 dark:bg-slate-900/60 light:bg-white border border-slate-700/50 light:border-slate-300 rounded-full pl-4 pr-12 py-2.5 text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Toggle Floating Button (Person Face with Headset Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 group cursor-pointer"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <FaceWithHeadsetIcon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-blue-600"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};
