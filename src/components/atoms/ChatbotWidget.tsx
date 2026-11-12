"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot, Sparkles } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm Zeo from Zeoraz. Ask me about website building, mobile app development, or adding an AI assistant to your project.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = inputValue.trim();
    if (!userText || isTyping) return;

    const updatedMessages: Message[] = [...messages, { role: "user", text: userText }];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            data.reply ||
            "Thanks for your message! Click 'Book Audit' to walk through your workflow with our team.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Connection interrupted. You can also reach us directly via the Contact form or 'Book Audit'.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={`mb-4 w-[350px] overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#0F172A] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1E293B] border border-[#334155] text-white shrink-0">
              <Bot className="w-5 h-5 text-[#60A5FA]" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#60A5FA] border-2 border-[#0F172A]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-semibold text-white tracking-wide">Zeo Assistant</h3>
                <Sparkles className="w-3 h-3 text-[#60A5FA]" />
              </div>
              <p className="text-[11px] text-white/70 flex items-center gap-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60A5FA]"></span>
                </span>
                Web · Mobile · AI
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col h-[320px] overflow-y-auto p-4 gap-3 bg-[#F8FAFC] scrollbar-thin scrollbar-thumb-[#CBD5E1]">
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
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-white text-[#0F172A] border border-[#E2E8F0]"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5 text-[#2563EB]" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#2563EB] text-white rounded-tr-xs shadow-sm"
                    : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-tl-xs shadow-xs"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
              <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-xl mt-0.5 bg-white text-[#2563EB] border border-[#E2E8F0]">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-xs px-4 py-2.5 text-xs bg-white text-[#64748B] border border-[#E2E8F0]">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3.5 border-t border-[#E2E8F0] bg-white">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about websites, mobile apps, or AI..."
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-full pl-4 pr-12 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Toggle Floating Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full shadow-xl shadow-slate-950/25 hover:scale-105 border border-[#334155] transition-all duration-300 cursor-pointer"
          aria-label="Toggle Zeoraz AI Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white transition-transform duration-200" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full">
              <Bot className="w-6 h-6 text-[#EFF6FF]" />
              <span className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3B82F6] border-2 border-[#0F172A]"></span>
              </span>
            </div>
          )}
        </button>

        {!isOpen && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-[#0F172A] text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-xl whitespace-nowrap border border-[#334155] flex items-center gap-1.5">
              <span>Ask Zeo AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
