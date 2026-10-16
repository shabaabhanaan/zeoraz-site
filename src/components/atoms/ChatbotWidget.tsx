"use client";

import React, { useState } from "react";
import { X, Send, User, Bot, Sparkles, Headphones } from "lucide-react";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm Zeo, your Zeoraz commerce assistant. How can I assist with your storefront, merchant setup, or orders today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thank you for reaching out! Our commerce & brand advisory team has received your note. You can also book a direct strategy call using our 'Talk to Us' button (for engineering R&D, visit Zeoraz Labs)."
        }
      ]);
    }, 900);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`mb-4 w-[350px] overflow-hidden rounded-3xl border border-[#DFD8CB] bg-[#FAF8F5] shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#1E1F22] px-5 py-4 text-[#FAF8F5]">
          <div className="flex items-center gap-3">
            {/* Front-view avatar icon */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2D2F33] border border-[#3E4147] text-[#FAF8F5] shrink-0">
              <Headphones className="w-5 h-5 text-[#E5DFD5]" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#1E1F22]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white tracking-wide">Zeo Assistant</h3>
                <Sparkles className="w-3 h-3 text-[#D4CDC2]" />
              </div>
              <p className="text-[11px] text-[#A8A49C] flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Online & Ready
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#9E9B93] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col h-[320px] overflow-y-auto p-4 gap-3 bg-[#F4F0E8] scrollbar-thin scrollbar-thumb-[#D8D2C5]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-xl mt-0.5 text-xs font-bold ${
                  msg.role === "user"
                    ? "bg-[#1E1F22] text-white shadow-sm"
                    : "bg-[#E3DDD1] text-[#1E1F22] border border-[#D5CDC0]"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5 text-[#1E1F22]" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#1E1F22] text-[#FAF8F5] rounded-tr-xs shadow-sm"
                    : "bg-[#FAF8F5] text-[#2D2E30] border border-[#DDD5C7] rounded-tl-xs shadow-xs"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3.5 border-t border-[#DFD8CC] bg-[#FAF8F5]">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask our studio a question..."
              className="w-full bg-[#F4F0E8] border border-[#DDD5C7] rounded-full pl-4 pr-12 py-2.5 text-xs sm:text-sm text-[#1E1F22] placeholder-[#9E9A91] focus:outline-none focus:ring-1 focus:ring-[#1E1F22] focus:bg-[#FFFFFF] transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-[#1E1F22] text-white hover:bg-[#34363B] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Toggle Floating Button (Front-View Modern Icon) */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-[#1E1F22] hover:bg-[#2D2F33] text-[#FAF8F5] rounded-full shadow-xl shadow-black/20 hover:scale-105 border border-[#3E4147] transition-all duration-300 cursor-pointer"
          aria-label="Toggle Zeoraz Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white transition-transform duration-200" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Front-View Sleek Support/Assistant Icon */}
              <div className="flex items-center justify-center">
                <Headphones className="w-6 h-6 text-[#FAF8F5]" />
              </div>
              {/* Online indicator */}
              <span className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#1E1F22]"></span>
              </span>
            </div>
          )}
        </button>

        {/* Hover Tooltip */}
        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-[#1E1F22] text-[#FAF8F5] text-xs font-semibold py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap border border-[#3E4147] flex items-center gap-1.5">
              <span>Chat with Zeo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
