"use client";

import React, { useState } from "react";
import { Download, Plus, MoreVertical, Filter, LayoutGrid, List, X, Edit, Trash2, Users, Mail, MapPin } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) setSelectedIds([]);
    else setSelectedIds(customers.map(c => c.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the selected customers?")) {
      setCustomers(customers.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  const handleEditClick = () => {
    if (selectedIds.length === 1) {
      const customer = customers.find(c => c.id === selectedIds[0]);
      setEditingCustomer(customer);
      setIsModalOpen(true);
    } else {
      alert("Please select exactly one customer to edit.");
    }
  };

  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCustomer = {
      id: editingCustomer ? editingCustomer.id : Date.now(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      orders: editingCustomer ? editingCustomer.orders : parseInt((formData.get("orders") as string) || "0"),
      spent: editingCustomer ? editingCustomer.spent : `$${formData.get("spent") || "0"}.00`,
      status: formData.get("status") as string,
      date: editingCustomer ? editingCustomer.date : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? newCustomer : c));
    } else {
      setCustomers([newCustomer, ...customers]);
    }
    
    setIsModalOpen(false);
    setEditingCustomer(null);
    setSelectedIds([]); // Clear selection after edit
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32 relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Customers</h1>
          <p className="text-slate-500 text-sm">Manage your client base, view order history and update contact info</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button onClick={handleAddClick} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition-colors">
            <Plus size={16} /> Add customer
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard title="TOTAL CUSTOMERS" value={customers.length.toString()} change="+12.4%" positive />
        <MetricCard title="ACTIVE (30 DAYS)" value="420" change="+5.1%" positive />
        <MetricCard title="AVERAGE SPEND" value="$184.50" change="+2.3%" positive />
        <MetricCard title="REFUND RATE" value="1.2%" change="-0.4%" positive />
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search by name or email" className="w-[280px] px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <button className="text-slate-900 border-b-2 border-slate-900 pb-1 font-semibold">All</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">New</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Returning</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Inactive</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 font-semibold border-b border-slate-200 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 w-12"><input type="checkbox" onChange={toggleSelectAll} checked={customers.length > 0 && selectedIds.length === customers.length} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No customers found. Click "Add customer" to create one.</td>
                </tr>
              )}
              {customers.map(customer => (
                <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.includes(customer.id)} onChange={() => toggleSelect(customer.id)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{customer.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Mail size={12}/> {customer.email}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-slate-700 flex items-center gap-1"><MapPin size={14} className="text-slate-400"/> {customer.location}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {customer.orders}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {customer.spent}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={customer.status} />
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
          <button onClick={handleDelete} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors"><Trash2 size={16}/> Delete</button>
          <button onClick={() => setSelectedIds([])} className="ml-2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><X size={16}/></button>
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">{editingCustomer ? "Edit Customer" : "Add New Customer"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Full Name</label>
                  <input required name="name" defaultValue={editingCustomer?.name} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Email Address</label>
                  <input required type="email" name="email" defaultValue={editingCustomer?.email} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Location (City, Country)</label>
                <input required name="location" defaultValue={editingCustomer?.location} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
              </div>

              {!editingCustomer && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Initial Orders</label>
                    <input name="orders" type="number" defaultValue="0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Initial Spent ($)</label>
                    <input name="spent" type="number" step="0.01" defaultValue="0" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Status</label>
                <select name="status" defaultValue={editingCustomer?.status || "Active"} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="New">New</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition-colors shadow-sm">
                  {editingCustomer ? "Save Changes" : "Create Customer"}
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
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Users size={14} className="text-slate-400"/> {title}</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={16}/></button>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
        <div className="flex justify-between items-end">
          <span className={`text-xs font-semibold ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>{change}</span>
          <span className="text-xs text-slate-400 font-medium">Last 30 days</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Active": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Inactive": "bg-slate-50 text-slate-600 border-slate-200",
    "New": "bg-indigo-50 text-indigo-700 border-indigo-200",
  };
  
  const colors: any = {
    "Active": "bg-emerald-500",
    "Inactive": "bg-slate-400",
    "New": "bg-indigo-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`}></span>
      {status}
    </span>
  );
}

const INITIAL_CUSTOMERS = [
  { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", location: "London, UK", orders: 12, spent: "$1,240.00", status: "Active", date: "Jan 12, 2024" },
  { id: 2, name: "Michael Chen", email: "m.chen99@example.com", location: "Toronto, CA", orders: 3, spent: "$345.50", status: "Active", date: "Feb 05, 2024" },
  { id: 3, name: "Emma Watson", email: "emma.w@example.com", location: "Sydney, AU", orders: 1, spent: "$89.99", status: "New", date: "Mar 10, 2024" },
  { id: 4, name: "David Miller", email: "david.m.design@example.com", location: "New York, US", orders: 0, spent: "$0.00", status: "Inactive", date: "Mar 15, 2024" },
  { id: 5, name: "Sophie Taylor", email: "staylor2@example.com", location: "Berlin, DE", orders: 7, spent: "$890.25", status: "Active", date: "Apr 01, 2024" },
];
