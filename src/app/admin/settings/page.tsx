"use client";

import React, { useState } from "react";
import { User, Store, Bell, Shield, Save, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account preferences, store details, and security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "profile" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <User size={18} /> Personal Profile
          </button>
          <button 
            onClick={() => setActiveTab("store")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "store" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Store size={18} /> Store Details
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "notifications" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "security" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <Shield size={18} /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <form onSubmit={handleSave} className="p-8">
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-4">Personal Information</h2>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">
                      RA
                    </div>
                    <div>
                      <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        Change Avatar
                      </button>
                      <p className="text-xs text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">First Name</label>
                      <input defaultValue="Rayan" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Last Name</label>
                      <input defaultValue="Anderson" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address</label>
                      <input defaultValue="rayan.anderson@zeoraz.com" type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Bio / Designation</label>
                      <textarea defaultValue="Store owner at Zeoraz." rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors resize-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Store Tab */}
            {activeTab === "store" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-6">Store Configuration</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Store Name</label>
                      <input defaultValue="Zeoraz" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Store Contact Email</label>
                      <input defaultValue="support@zeoraz.com" type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Currency</label>
                      <select defaultValue="USD" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors bg-white">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="LKR">LKR (Rs)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Timezone</label>
                      <select defaultValue="Asia/Colombo" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors bg-white">
                        <option value="UTC">UTC (Universal Coordinated Time)</option>
                        <option value="Asia/Colombo">Asia/Colombo (IST)</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div>
                        <div className="font-semibold text-slate-800">New Orders</div>
                        <div className="text-sm text-slate-500">Receive an email when a new order is placed.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div>
                        <div className="font-semibold text-slate-800">Seller Registrations</div>
                        <div className="text-sm text-slate-500">Get notified when a new seller applies to the marketplace.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div>
                        <div className="font-semibold text-slate-800">Marketing Updates</div>
                        <div className="text-sm text-slate-500">Receive weekly digests about platform performance.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-6">Security Settings</h2>
                  
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <h3 className="font-semibold text-amber-900 mb-1">Two-Factor Authentication (2FA)</h3>
                    <p className="text-sm text-amber-700 mb-4">Add an extra layer of security to your account by requiring a verification code upon login.</p>
                    <button type="button" className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
              {isSaved ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm animate-in fade-in">
                  <CheckCircle2 size={18} /> Settings saved successfully
                </div>
              ) : (
                <div /> // Spacer
              )}
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition-colors">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
