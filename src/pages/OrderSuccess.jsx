import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Phone, Home as HomeIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { orders } = useCart();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              ORDER SUCCESSFULLY PLACED
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-2">
              Thank You For Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Order ID: <strong className="text-slate-900 font-mono">{currentOrder ? currentOrder.id : orderId}</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Estimated Delivery: 2–4 Business Days
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-1">
                <div className="w-4 h-4 rounded-full bg-emerald-600 mx-auto"></div>
                <div className="font-bold text-slate-900">Confirmed</div>
                <div className="text-[10px] text-slate-400">Today</div>
              </div>
              <div className="space-y-1">
                <div className="w-4 h-4 rounded-full bg-amber-500 mx-auto"></div>
                <div className="font-bold text-slate-900">Packed & Dispatched</div>
                <div className="text-[10px] text-slate-400">Within 24 Hrs</div>
              </div>
              <div className="space-y-1">
                <div className="w-4 h-4 rounded-full bg-slate-300 mx-auto"></div>
                <div className="font-bold text-slate-500">Doorstep Delivery</div>
                <div className="text-[10px] text-slate-400">Express Courier</div>
              </div>
            </div>
          </div>

          {currentOrder && (
            <div className="text-left border-t border-slate-100 pt-5 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-bold text-slate-900">{currentOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-bold text-slate-900">{currentOrder.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-bold text-slate-900 text-right max-w-xs">{currentOrder.address}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-amber-800">
                  {currentOrder.paymentMethod === 'COD' ? 'Cash on Delivery (Pay ₹' + currentOrder.totalAmount + ')' : 'Paid Online (UPI / Card)'}
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm font-black text-slate-900">
                <span>Total Amount:</span>
                <span>₹{currentOrder.totalAmount}</span>
              </div>
            </div>
          )}

          <div className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl border border-emerald-200 text-xs flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-4 h-4 text-emerald-700" /> WhatsApp updates will be sent to your mobile.
            </span>
            <span className="font-bold text-emerald-800">Support 24/7</span>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
