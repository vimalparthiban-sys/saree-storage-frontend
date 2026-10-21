import React from 'react';
import { ShoppingBag, User, Shield, LogOut, PackageCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, isAdmin, logout, openAuth } = useAuth();
  const { totalItemCount, setIsCartOpen, setIsSizeGuideOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition">
            <span className="font-serif font-black text-xl">S</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xl text-slate-900 tracking-tight">Saree<span className="text-amber-700">Vault</span></span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-300">2026 ED.</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block -mt-1">Steel Frame Wardrobe Organizers</p>
          </div>
        </Link>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#demo" className="hover:text-amber-700 transition">3-Step Demo</a>
          <a href="#packs" className="hover:text-amber-700 transition">Packs & Pricing</a>
          <button onClick={() => setIsSizeGuideOpen && setIsSizeGuideOpen(true)} className="hover:text-amber-700 transition cursor-pointer">
            Size Guide (66L vs 100L)
          </button>
          <a href="#comparison" className="hover:text-amber-700 transition">Steel vs Cloth</a>
          <a href="#reviews" className="hover:text-amber-700 transition">Reviews (4.9★)</a>
        </nav>

        {/* Right Actions: Auth + Admin + Cart */}
        <div className="flex items-center gap-3">
          
          {/* Admin Quick Switch / Link */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
          ) : null}

          {/* User Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/my-orders"
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
              >
                <PackageCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>My Orders</span>
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-slate-100 transition text-slate-700 text-xs font-semibold cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full pt-1 hidden group-hover:block w-48 shadow-lg rounded-2xl bg-white border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link to="/my-orders" className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
                    Track Orders
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link to="/admin" className="block px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold">
                      Manage Store (Admin)
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => openAuth('login', 'CUSTOMER')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
              <button
                onClick={() => openAuth('login', 'ADMIN')}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:border-slate-400 transition cursor-pointer"
              >
                <Shield className="w-3 h-3 text-amber-700" /> Admin
              </button>
            </div>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-slate-900 hover:bg-amber-800 text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition shadow-xs cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-1.5 py-0.2 rounded-full min-w-5 h-5 flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
