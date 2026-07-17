"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I'm Zeo, your AI assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    setInputValue("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev, 
        { role: "bot", text: "Thank you for your message! Our team will get back to you shortly, or you can explore our platform documentation." }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 w-[350px] overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-cyan-900/40 to-blue-900/40 px-4 py-3 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Zeo Support</h3>
              <p className="text-xs text-cyan-400 flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex flex-col h-[320px] overflow-y-auto p-4 gap-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-2 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div className={`flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full mt-1 ${
                msg.role === "user" ? "bg-blue-600/20 text-blue-400" : "bg-cyan-500/20 text-cyan-400"
              }`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.role === "user" 
                  ? "bg-blue-600/20 text-blue-100 border border-blue-500/20 rounded-tr-sm" 
                  : "bg-slate-800/50 text-slate-200 border border-slate-700/50 rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-slate-700/50 bg-[#030014]/50">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 group"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};
