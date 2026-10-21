import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin, openAuth } = useAuth();
  const { orders, updateOrderStatus } = useCart();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'inventory'
  const [futureProductActive, setFutureProductActive] = useState(false);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Authentication Required</h2>
            <p className="text-xs text-slate-600">Only authorized store managers can view orders and update stock.</p>
            <button
              onClick={() => openAuth('login', 'ADMIN')}
              className="w-full bg-rose-700 hover:bg-rose-800 text-white font-bold py-3 rounded-xl text-xs transition shadow-md cursor-pointer"
            >
              Log In as Store Admin (Quick Test)
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'PROCESSING').length;
  const shippedOrders = orders.filter((o) => o.status === 'SHIPPED' || o.status === 'DELIVERED').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">Store Admin Portal</h1>
                <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <p className="text-xs text-slate-500">Managing Saree Vault Orders, Stock & Products</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'orders' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Customer Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'inventory' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Product Catalog & Future Bag
            </button>
          </div>
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><DollarSign className="w-6 h-6" /></div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Gross Revenue</span>
              <div className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString()}</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><Clock className="w-6 h-6" /></div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Pending Dispatch</span>
              <div className="text-2xl font-black text-slate-900">{pendingOrders} Orders</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center"><CheckCircle className="w-6 h-6" /></div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Fulfilled & Shipped</span>
              <div className="text-2xl font-black text-slate-900">{shippedOrders} Orders</div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Items / Pack</th>
                    <th className="py-3 px-4">Amount & Payment</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        {ord.id}
                        <div className="text-[10px] font-sans text-slate-400 font-normal">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-900">{ord.customerName}</div>
                        <div className="text-slate-500 text-[11px]">{ord.phone}</div>
                        <div className="text-slate-400 text-[10px] max-w-xs truncate">{ord.address}</div>
                      </td>
                      <td className="py-4 px-4">
                        {ord.items && ord.items.map((it, idx) => (
                          <div key={idx} className="font-medium text-slate-800">
                            {it.title || 'Steel Frame Saree Box'}
                            <div className="text-[10px] text-amber-800 font-semibold">{it.packName} • {it.color}</div>
                          </div>
                        ))}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-black text-slate-900 text-sm">₹{ord.totalAmount}</div>
                        <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded mt-0.5 ${
                          ord.paymentMethod === 'COD' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {ord.paymentMethod} • {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="text-xs font-bold rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-hidden bg-slate-50"
                        >
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Future Bag #2 Tab */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-amber-300 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Product 2: Travel-Friendly Saree Sleeve with Blouse Pocket
                </h3>
                <p className="text-xs text-slate-500">Upcoming Second Bag Line</p>
              </div>
              <button
                onClick={() => setFutureProductActive(!futureProductActive)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  futureProductActive ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {futureProductActive ? '✓ Published to Store' : '+ Publish to Store'}
              </button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;