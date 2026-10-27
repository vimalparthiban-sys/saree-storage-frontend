import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import {
  Package,
  Heart,
  Headphones,
  User,
  MapPin,
  Languages,
  Bell,
  Tv,
  ShieldCheck,
  Smartphone,
  LogOut,
  ChevronRight,
  Sparkles,
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';

const Account = () => {
  const { user, logout, openAuth } = useAuth();
  const navigate = useNavigate();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Load recently viewed products from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('appzys_recently_viewed') || '[]');
      if (stored.length > 0) {
        setRecentlyViewed(stored);
      } else {
        // Fallback default to our 2 flagship products
        setRecentlyViewed(
          products.map((p) => ({
            id: p.id,
            title: p.cardTitle || p.title,
            shortTitle: p.shortTitle || p.title,
            image: p.images?.[0] || '/placeholder.jpg',
            price: p.basePrice,
            mrp: p.mrp,
            brand: p.brand
          }))
        );
      }
    } catch {
      setRecentlyViewed([]);
    }
  }, []);

  const handleActionToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    handleActionToast('Logged out successfully');
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Vimal';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 pb-24 md:pb-12">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 w-full space-y-6">
        
        {/* 1. Header Row (Hey, Vimal + Help Button) */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Hey, {displayName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.email || 'Welcome to your APPZYS account'}
            </p>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white text-xs font-bold text-slate-800 shadow-2xs transition"
          >
            <Headphones className="w-3.5 h-3.5 text-slate-700" />
            <span>Help</span>
          </Link>
        </div>

        {/* 2. SuperCoin / Privilege Card (Flipkart App Style) */}
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-purple-50/60 rounded-2xl border border-blue-100/80 p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Your SuperCoin balance
            </span>
            <div className="flex items-center gap-1 bg-amber-100/90 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-full text-xs font-black">
              <span>⚡</span>
              <span>0</span>
            </div>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              Extra SuperCoins and 40% OFF with <span className="font-bold text-[#1c2d4a]">APPZYS Club</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* 3. Top Action Buttons: Orders & Wishlist/Contact (2-Col Rounded Tiles) */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/my-orders"
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1c2d4a] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Package className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block">Orders</span>
              <span className="text-[10px] text-slate-400">Track & Manage</span>
            </div>
          </Link>

          <Link
            to="/contact"
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Heart className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block">Contact Us</span>
              <span className="text-[10px] text-slate-400">24/7 Support</span>
            </div>
          </Link>
        </div>

        {/* 4. Recently Viewed Products (Horizontal Touch-Swipe Rail) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Recently Viewed Products
            </h2>
            <span className="text-[11px] font-semibold text-blue-800 flex items-center gap-1">
              Swipe →
            </span>
          </div>

          <div className="flex overflow-x-auto gap-3.5 pb-2 px-1 -mx-1 snap-x snap-mandatory no-scrollbar touch-pan-x">
            {recentlyViewed.map((item, idx) => (
              <Link
                key={idx}
                to={`/product/${item.id}`}
                className="w-40 sm:w-44 shrink-0 snap-start bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-2 p-2 flex items-center justify-center border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition duration-200"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#1c2d4a]">
                    {item.shortTitle || item.title}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xs font-black text-slate-900">₹ {item.price}</span>
                    {item.mrp && (
                      <span className="text-[10px] text-slate-400 line-through">₹ {item.mrp}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Profile Settings Section (Flipkart App List Style) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Profile Settings
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {/* Edit Profile */}
            <button
              onClick={() => openAuth('login', 'CUSTOMER')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Edit profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Saved Addresses */}
            <button
              onClick={() => handleActionToast('Saved delivery addresses active during checkout')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Saved addresses</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Change Language */}
            <button
              onClick={() => handleActionToast('Language: English (India)')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <Languages className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Change language</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">English</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>

            {/* Notification Settings */}
            <button
              onClick={() => handleActionToast('Order & Delivery notifications enabled')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Notification settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* My Subscriptions */}
            <button
              onClick={() => handleActionToast('No active subscriptions')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <Tv className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">My subscriptions</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 6. Privacy & Security Section */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Privacy & Security
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {/* Privacy Center */}
            <button
              onClick={() => handleActionToast('256-Bit SSL Encrypted & Protected')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Privacy center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Manage Devices */}
            <button
              onClick={() => handleActionToast('Current session is active on this device')}
              type="button"
              className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1c2d4a] flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">Manage devices</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">1 active device</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          </div>
        </div>

        {/* 7. Working Logout Button */}
        <div className="pt-2">
          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="w-full py-3.5 rounded-2xl border-2 border-rose-200 hover:border-rose-400 bg-rose-50/60 hover:bg-rose-100/70 text-rose-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out ({user.name})</span>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login', 'CUSTOMER')}
              type="button"
              className="w-full py-3.5 rounded-2xl bg-[#1c2d4a] hover:bg-[#13223f] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Log In to Your Account</span>
            </button>
          )}
        </div>

      </main>

      <Footer />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c2d4a] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default Account;
