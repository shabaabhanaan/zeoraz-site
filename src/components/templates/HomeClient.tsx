"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LandingPageContent } from "@/components/organisms/LandingPageContent";
import { LoggedInHome } from "@/components/organisms/LoggedInHome";
import { UserCheck, Globe, ArrowRight } from "lucide-react";

export function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const urlLoggedIn = searchParams?.get("logged_in") === "true";
    const localLoggedIn = typeof window !== "undefined" && localStorage.getItem("zeoraz_logged_in") === "true";

    if (urlLoggedIn || localLoggedIn) {
      setIsLoggedIn(true);
    }
    setIsLoaded(true);
  }, [searchParams]);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("zeoraz_logged_in");
      localStorage.removeItem("zeoraz_role");
    }
    setIsLoggedIn(false);
    router.replace("/");
  };

  const handleToggleView = () => {
    const nextState = !isLoggedIn;
    setIsLoggedIn(nextState);
    if (typeof window !== "undefined") {
      if (nextState) {
        localStorage.setItem("zeoraz_logged_in", "true");
      } else {
        localStorage.removeItem("zeoraz_logged_in");
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F6F4EF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#0F2922] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoggedIn ? (
        <LoggedInHome onSignOut={handleSignOut} />
      ) : (
        <LandingPageContent />
      )}

      {/* Floating State Switcher for User & Testing */}
      <div className="fixed bottom-5 left-5 z-50">
        <div className="bg-[#141517] text-white px-3.5 py-2 rounded-2xl shadow-2xl border border-[#2E3035] flex items-center gap-3 text-xs backdrop-blur-md opacity-90 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isLoggedIn ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
            <span className="text-[11px] font-semibold text-[#BDB9AF]">
              {isLoggedIn ? "Logged in (Merchant)" : "Visitor Landing"}
            </span>
          </div>

          <button
            onClick={handleToggleView}
            className="px-2.5 py-1 rounded-xl bg-[#282A2E] hover:bg-[#383B40] text-[10px] font-bold text-[#FFC72C] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{isLoggedIn ? "Switch to Visitor View" : "Switch to Logged-in View"}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
