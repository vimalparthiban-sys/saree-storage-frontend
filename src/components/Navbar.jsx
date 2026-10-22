import React, { useState } from 'react';
import { ShoppingBag, User, Shield, LogOut, PackageCheck, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, isAdmin, logout, openAuth } = useAuth();
  const { totalItemCount, setIsCartOpen } = useCart();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectCategory = (catSlug) => {
    setIsCategoryOpen(false);
    navigate(`/?category=${catSlug}`);
  };

  const handleGoHome = () => {
    setIsCategoryOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Link to="/" onClick={handleGoHome} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition">
            <span className="font-serif font-black text-xl">A</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xl text-slate-900 tracking-tight">
                APPZYS<span className="text-amber-700">®</span>
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-300">
                SMART STORAGE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block -mt-1">Saree & Jewellery Organizers</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
          
          {/* Home Link */}
          <Link
            to="/"
            onClick={handleGoHome}
            className={`hover:text-amber-800 transition py-2 ${
              location.pathname === '/' && !location.search ? 'text-amber-800 font-bold' : ''
            }`}
          >
            Home
          </Link>

          {/* Shop By Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-700 hover:text-amber-800 bg-slate-50 transition cursor-pointer text-xs sm:text-sm font-bold"
            >
              <span>Shop By Category</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in">
                <div className="px-4 pb-2 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Wardrobe Organizers
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleSelectCategory('saree-organiser')}
                    className="w-full text-left px-4 py-2.5 text-xs hover:bg-amber-50 hover:text-amber-900 transition flex items-center justify-between font-semibold"
                  >
                    <span>🥻 Saree Organiser (60L)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Steel Frame</span>
                  </button>

                  <button
                    onClick={() => handleSelectCategory('jewel-organiser')}
                    className="w-full text-left px-4 py-2.5 text-xs hover:bg-rose-50 hover:text-rose-900 transition flex items-center justify-between font-semibold"
                  >
                    <span>💍 Jewellery Organiser</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">Velvet Travel</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Right Actions: Auth + Admin + Cart */}
        <div className="flex items-center gap-3">
          
          {/* Admin Link */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin Portal</span>
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
                  <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
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
                title="Store Owner / Staff Login"
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
