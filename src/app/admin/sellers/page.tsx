"use client";

import React, { useState } from "react";
import { Download, Plus, MoreVertical, Filter, LayoutGrid, List, X, Edit, Trash2, Store, Mail, Briefcase, Percent } from "lucide-react";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState(INITIAL_SELLERS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSeller, setEditingSeller] = useState<any>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === sellers.length) setSelectedIds([]);
    else setSelectedIds(sellers.map(s => s.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the selected sellers?")) {
      setSellers(sellers.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  const handleEditClick = () => {
    if (selectedIds.length === 1) {
      const seller = sellers.find(s => s.id === selectedIds[0]);
      setEditingSeller(seller);
      setIsModalOpen(true);
    } else {
      alert("Please select exactly one seller to edit.");
    }
  };

  const handleAddClick = () => {
    setEditingSeller(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSeller = {
      id: editingSeller ? editingSeller.id : Date.now(),
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      category: formData.get("category") as string,
      commission: `${formData.get("commission") as string}%`,
      status: formData.get("status") as string,
      joinedDate: editingSeller ? editingSeller.joinedDate : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    if (editingSeller) {
      setSellers(sellers.map(s => s.id === editingSeller.id ? newSeller : s));
    } else {
      setSellers([newSeller, ...sellers]);
    }
    
    setIsModalOpen(false);
    setEditingSeller(null);
    setSelectedIds([]); // Clear selection after edit
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32 relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Sellers & Vendors</h1>
          <p className="text-slate-500 text-sm">Manage multi-vendor accounts, commission rates, and onboarding</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button onClick={handleAddClick} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition-colors">
            <Plus size={16} /> Add seller
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard title="TOTAL SELLERS" value={sellers.length.toString()} change="+3.2%" positive />
        <MetricCard title="ACTIVE SELLERS" value="48" change="+1.5%" positive />
        <MetricCard title="AVG COMMISSION" value="11.5%" change="0.0%" positive={true} />
        <MetricCard title="PENDING APPROVAL" value="4" change="-2" positive />
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search by business name" className="w-[280px] px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <button className="text-slate-900 border-b-2 border-slate-900 pb-1 font-semibold">All</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Active</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Onboarding</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Suspended</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 font-semibold border-b border-slate-200 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 w-12"><input type="checkbox" onChange={toggleSelectAll} checked={sellers.length > 0 && selectedIds.length === sellers.length} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></th>
                <th className="px-4 py-3">Business / Seller</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Commission Rate</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No sellers found. Click "Add seller" to onboard one.</td>
                </tr>
              )}
              {sellers.map(seller => (
                <tr key={seller.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.includes(seller.id)} onChange={() => toggleSelect(seller.id)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{seller.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Mail size={12}/> {seller.contact}</div>
                  </td>
                  <td className="px-4 py-4 flex items-center gap-2">
                    <Briefcase size={14} className="text-slate-400" /> {seller.category}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-700">
                    <span className="flex items-center gap-1"><Percent size={12} className="text-slate-400" /> {seller.commission}</span>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {seller.joinedDate}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={seller.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 ml-32 bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-4 z-50 animate-in slide-in-from-bottom-4">
          <div className="text-sm font-semibold text-slate-800 border-r border-slate-200 pr-4">{selectedIds.length} Selected</div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"><Download size={16}/> Export</button>
          <button onClick={handleEditClick} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"><Edit size={16}/> Edit Info</button>
          <button onClick={handleDelete} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors"><Trash2 size={16}/> Remove</button>
          <button onClick={() => setSelectedIds([])} className="ml-2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><X size={16}/></button>
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">{editingSeller ? "Edit Seller Account" : "Register New Seller"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Business / Store Name</label>
                  <input required name="name" defaultValue={editingSeller?.name} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Contact Email</label>
                  <input required type="email" name="contact" defaultValue={editingSeller?.contact} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Primary Category</label>
                  <select name="category" defaultValue={editingSeller?.category || "Tea & Beverages"} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                    <option value="Tea & Beverages">Tea & Beverages</option>
                    <option value="Exotic Spices">Exotic Spices</option>
                    <option value="Crafts & Decor">Crafts & Decor</option>
                    <option value="Apparel & Handlooms">Apparel & Handlooms</option>
                    <option value="Jewelry">Jewelry</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Commission Rate (%)</label>
                  <input required name="commission" type="number" step="0.1" defaultValue={editingSeller ? parseFloat(editingSeller.commission.replace('%', '')) : 12.0} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Account Status</label>
                <select name="status" defaultValue={editingSeller?.status || "Onboarding"} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                  <option value="Active">Active</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition-colors shadow-sm">
                  {editingSeller ? "Update Seller" : "Register Seller"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, change, positive }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Store size={14} className="text-slate-400"/> {title}</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={16}/></button>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
        <div className="flex justify-between items-end">
          <span className={`text-xs font-semibold ${positive ? 'text-emerald-500' : 'text-slate-500'}`}>{change}</span>
          <span className="text-xs text-slate-400 font-medium">Last 30 days</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Active": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Suspended": "bg-rose-50 text-rose-700 border-rose-200",
    "Onboarding": "bg-amber-50 text-amber-700 border-amber-200",
  };
  
  const colors: any = {
    "Active": "bg-emerald-500",
    "Suspended": "bg-rose-500",
    "Onboarding": "bg-amber-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`}></span>
      {status}
    </span>
  );
}

const INITIAL_SELLERS = [
  { id: 1, name: "Ceylon Heritage Exports", contact: "contact@ceylonheritage.lk", category: "Tea & Beverages", commission: "10%", status: "Active", joinedDate: "Jan 05, 2024" },
  { id: 2, name: "Galle Craftworks", contact: "sales@gallecrafts.com", category: "Crafts & Decor", commission: "12%", status: "Active", joinedDate: "Feb 12, 2024" },
  { id: 3, name: "Serendib Spice Co.", contact: "orders@serendibspice.lk", category: "Exotic Spices", commission: "15%", status: "Onboarding", joinedDate: "Mar 01, 2024" },
  { id: 4, name: "Loom & Thread Kandy", contact: "info@kandyloom.lk", category: "Apparel & Handlooms", commission: "12%", status: "Suspended", joinedDate: "Mar 18, 2024" },
];
