"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, Plus, MoreVertical, Filter, LayoutGrid, List, X, Edit, Trash2, Box } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) setSelectedIds([]);
    else setSelectedIds(products.map(p => p.id));
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the selected products?")) {
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  const handleEditClick = () => {
    if (selectedIds.length === 1) {
      const product = products.find(p => p.id === selectedIds[0]);
      setEditingProduct(product);
      setIsModalOpen(true);
    } else {
      alert("Please select exactly one product to edit.");
    }
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      sku: formData.get("sku") as string,
      date: editingProduct ? editingProduct.date : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      price: `$${formData.get("price")}.00`,
      sellPrice: `$${formData.get("sellPrice")}.00`,
      stock: formData.get("stock") as string,
      status: formData.get("status") as string,
      img: editingProduct ? editingProduct.img : "https://images.unsplash.com/photo-1595166012759-408c4a165b40?auto=format&fit=crop&q=80&w=150",
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts([newProduct, ...products]);
    }
    
    setIsModalOpen(false);
    setEditingProduct(null);
    setSelectedIds([]); // Clear selection after edit
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32 relative">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Products</h1>
          <p className="text-slate-500 text-sm">Manage inventory, pricing and availability across your store</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm shadow-sm hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export
          </button>
          <button onClick={handleAddClick} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg text-sm shadow-sm hover:bg-indigo-700 transition-colors">
            <Plus size={16} /> Add product
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard title="TOTAL PRODUCTS" value={products.length.toString()} change="+4.2%" positive />
        <MetricCard title="TOTAL REVENUE" value="$84,320" change="+12.5%" positive />
        <MetricCard title="TOTAL ORDERS" value="142" change="-1.4%" positive={false} />
        <MetricCard title="CUSTOMERS" value="3,240" change="+2.1%" positive />
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Search by product name or ID" className="w-[280px] px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors" />
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors">
              <Filter size={14} /> Filter
            </button>
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button className="p-1 rounded bg-white shadow-sm text-slate-700"><List size={14} /></button>
              <button className="p-1 rounded text-slate-500 hover:text-slate-700 transition-colors"><LayoutGrid size={14} /></button>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <button className="text-slate-900 border-b-2 border-slate-900 pb-1 font-semibold">All</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Active</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Drafts</button>
            <button className="hover:text-slate-800 pb-1 transition-colors">Archived</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-500 font-semibold border-b border-slate-200 bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 w-12"><input type="checkbox" onChange={toggleSelectAll} checked={products.length > 0 && selectedIds.length === products.length} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">ID & Create Date</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No products found. Click "Add product" to create one.</td>
                </tr>
              )}
              {products.map(product => (
                <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggleSelect(product.id)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" /></td>
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 shrink-0">
                       <Image src={product.img} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{product.category}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-700">{product.sku}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{product.date}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-900">{product.price}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Sell Price {product.sellPrice}</div>
                  </td>
                  <td className="px-4 py-4">{product.stock}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={product.status} />
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
              <h2 className="text-lg font-bold text-slate-800">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Product Name</label>
                  <input required name="name" defaultValue={editingProduct?.name} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Category</label>
                  <input required name="category" defaultValue={editingProduct?.category} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">SKU / ID</label>
                  <input required name="sku" defaultValue={editingProduct?.sku || `#SL${Math.floor(Math.random() * 10000)}`} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Stock Quantity</label>
                  <input required name="stock" type="number" defaultValue={editingProduct ? parseInt(editingProduct.stock.replace(/,/g, '')) : 0} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Regular Price ($)</label>
                  <input required name="price" type="number" step="0.01" defaultValue={editingProduct ? parseFloat(editingProduct.price.replace('$', '')) : ''} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600">Sale Price ($)</label>
                  <input required name="sellPrice" type="number" step="0.01" defaultValue={editingProduct ? parseFloat(editingProduct.sellPrice.replace('$', '')) : ''} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Status</label>
                <select name="status" defaultValue={editingProduct?.status || "Published"} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                  <option value="out Stock">Out of Stock</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition-colors shadow-sm">
                  {editingProduct ? "Save Changes" : "Create Product"}
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
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Box size={14} className="text-slate-400"/> {title}</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={16}/></button>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
        <div className="flex justify-between items-end">
          <span className={`text-xs font-semibold ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>{change}</span>
          <span className="text-xs text-slate-400 font-medium">Last 7 days</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Published": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Inactive": "bg-rose-50 text-rose-700 border-rose-200",
    "out Stock": "bg-amber-50 text-amber-700 border-amber-200",
    "Draft": "bg-slate-50 text-slate-600 border-slate-200"
  };
  
  const colors: any = {
    "Published": "bg-emerald-500",
    "Inactive": "bg-rose-500",
    "out Stock": "bg-amber-500",
    "Draft": "bg-slate-400"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`}></span>
      {status}
    </span>
  );
}

const INITIAL_PRODUCTS = [
  { id: 1, name: "Premium Ceylon Tea - BOPF", category: "Tea & Beverages", sku: "#SLTEA001", date: "Jan 12, 2024", price: "$24.00", sellPrice: "$24.00", stock: "1,240", status: "Published", img: "https://images.unsplash.com/photo-1595166012759-408c4a165b40?auto=format&fit=crop&q=80&w=150" },
  { id: 2, name: "Organic Cinnamon Quills (100g)", category: "Exotic Spices", sku: "#SLSPC045", date: "Jan 15, 2024", price: "$18.00", sellPrice: "$18.00", stock: "850", status: "Published", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150" },
  { id: 3, name: "Traditional Raksha Mask", category: "Crafts & Decor", sku: "#SLCRA092", date: "Feb 03, 2024", price: "$45.00", sellPrice: "$45.00", stock: "12", status: "Published", img: "https://images.unsplash.com/photo-1517424263654-e6530a6c62e6?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "Batik Wrap Sarong (Blue/Gold)", category: "Apparel & Handlooms", sku: "#SLAPP112", date: "Feb 10, 2024", price: "$32.00", sellPrice: "$28.00", stock: "0", status: "out Stock", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=150" },
  { id: 5, name: "Pure King Coconut Oil", category: "Wellness", sku: "#SLWEL033", date: "Mar 05, 2024", price: "$22.00", sellPrice: "$22.00", stock: "430", status: "Published", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=150" },
  { id: 6, name: "Handwoven Dumbara Mat", category: "Crafts & Decor", sku: "#SLCRA105", date: "Mar 18, 2024", price: "$55.00", sellPrice: "$55.00", stock: "28", status: "Draft", img: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=150" },
  { id: 7, name: "Ceylon Cardamom Pods", category: "Exotic Spices", sku: "#SLSPC050", date: "Apr 02, 2024", price: "$16.00", sellPrice: "$16.00", stock: "0", status: "Inactive", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150" },
  { id: 8, name: "Blue Sapphire Pendant (Silver)", category: "Jewelry", sku: "#SLGEM001", date: "Apr 15, 2024", price: "$350.00", sellPrice: "$350.00", stock: "5", status: "Draft", img: "https://images.unsplash.com/photo-1611080760456-c73d9374092b?auto=format&fit=crop&q=80&w=150" },
];
