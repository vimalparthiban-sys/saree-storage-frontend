import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 3 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
              <p className="text-xs text-slate-400 mt-0.5">Delivered safely across all Indian pin codes</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">1-Year Frame Warranty</h4>
              <p className="text-xs text-slate-400 mt-0.5">Built with rust-proof stainless steel rods</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7 Days Replacement</h4>
              <p className="text-xs text-slate-400 mt-0.5">No-questions-asked doorstep exchange</p>
            </div>
          </div>
        </div>

        {/* Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-serif font-black">
                S
              </div>
              <span className="font-serif font-bold text-xl text-white">Saree<span className="text-amber-500">Vault</span></span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              India's premier wardrobe transformation brand. We engineer heavy-duty steel frame living boxes that protect your precious Kanjivaram, Banarasi, and festive sarees from wrinkles, dust, and moisture.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-500" /> WhatsApp Support: +91 98400 12345</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-500" /> Support: care@sareevault.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#demo" className="hover:text-amber-400 transition">3-Step Frame Setup</a></li>
              <li><a href="#packs" className="hover:text-amber-400 transition">Pack of 2 & 4 Offers</a></li>
              <li><a href="#comparison" className="hover:text-amber-400 transition">Steel vs Cloth Bag</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition">Customer Reviews</a></li>
              <li><Link to="/my-orders" className="hover:text-amber-400 transition">Track My Order</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Saree Care & Portal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>✓ Moisture-Proof 600D Oxford Care</li>
              <li>✓ How to Fold Kanjivaram Zari</li>
              <li>✓ Stack up to 4 boxes safely</li>
              <li className="pt-2">
                <Link to="/admin" className="text-amber-400 hover:underline font-semibold flex items-center gap-1">
                  🔒 Admin Store Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SareeStore / Saree Vault Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Wardrobes
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
