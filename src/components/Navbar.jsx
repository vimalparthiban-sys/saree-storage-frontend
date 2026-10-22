import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Shield,
  User,
  LogOut,
  PackageCheck,
  Truck,
  Phone,
  Layers
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, openAuth, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [activeParentCategory, setActiveParentCategory] = useState('wardrobe');

  const dropdownRef = useRef(null);

  // Close desktop category flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoryOpen(false);
  }, [location.pathname, location.search]);

  const handleSelectProduct = (productSlug) => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/?category=${productSlug}`);
  };

  const handleGoHome = () => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 w-full">
        
        {/* Left: Brand Logo (Always shrink-0 and perfectly visible) */}
        <Link to="/" onClick={handleGoHome} className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition shrink-0">
            <span className="font-serif font-black text-base sm:text-xl">A</span>
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-serif font-bold text-base sm:text-xl text-slate-900 tracking-tight">
                APPZYS<span className="text-amber-700">®</span>
              </span>
              <span className="text-[8px] sm:text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-300">
                SMART STORAGE
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-slate-500 hidden sm:block -mt-1">
              Saree & Jewellery Organizers
            </p>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (Always visible on Laptops, Tablets & Desktops) */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-6 text-xs lg:text-sm font-semibold text-slate-700 relative">
          
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

          {/* Shop by Category Nested Flyout Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-xl border transition cursor-pointer text-xs lg:text-sm font-bold ${
                isCategoryOpen
                  ? 'border-amber-700 bg-amber-50 text-amber-900 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <span>Shop by Category</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Nested Flyout Menu */}
            {isCategoryOpen && (
              <div className="absolute left-0 top-full mt-2 flex bg-transparent shadow-2xl rounded-2xl z-50 animate-in fade-in">
                {/* Left Column (Categories List) */}
                <div className="w-56 bg-stone-50 rounded-l-2xl border border-r-0 border-slate-200 py-3 shadow-xs">
                  <div className="px-4 pb-2 border-b border-slate-200/60 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Categories
                  </div>
                  <div className="py-1">
                    <button
                      onMouseEnter={() => setActiveParentCategory('wardrobe')}
                      className={`w-full text-left px-4 py-2.5 text-xs transition flex items-center justify-between font-bold cursor-pointer ${
                        activeParentCategory === 'wardrobe'
                          ? 'bg-white text-blue-700 border-l-4 border-blue-600 shadow-2xs'
                          : 'text-slate-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="underline decoration-blue-500 underline-offset-4">Wardrobe Organizers</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Right Column (Sub-Products) */}
                <div className="w-60 bg-white rounded-r-2xl border border-slate-200 py-3 shadow-xs">
                  <div className="px-4 pb-2 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Products
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => handleSelectProduct('saree-organiser')}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-amber-50 hover:text-amber-900 transition flex items-center justify-between font-semibold cursor-pointer"
                    >
                      <span>🥻 Saree Organiser</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">60L</span>
                    </button>
                    <button
                      onClick={() => handleSelectProduct('jewel-organiser')}
                      className="w-full text-left px-4 py-2.5 text-xs hover:bg-rose-50 hover:text-rose-900 transition flex items-center justify-between font-semibold cursor-pointer"
                    >
                      <span>💍 Jewellery Organiser</span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">Velvet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Track Your Order Link */}
          <Link
            to="/track-order"
            className={`flex items-center gap-1 hover:text-amber-800 transition py-2 ${
              location.pathname === '/track-order' ? 'text-amber-800 font-bold' : ''
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-700" />
            <span>Track Your Order</span>
          </Link>

          {/* Contact Us Link */}
          <Link
            to="/contact"
            className={`flex items-center gap-1 hover:text-amber-800 transition py-2 ${
              location.pathname === '/contact' ? 'text-amber-800 font-bold' : ''
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact Us</span>
          </Link>

        </nav>

        {/* Right Actions: Auth + Admin + Cart + Mobile/Tablet Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Admin Link (Desktop only) */}
          {isAdmin ? (
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          ) : null}

          {/* Desktop User Auth */}
          {user ? (
            <div className="hidden sm:flex items-center gap-1.5">
              <Link
                to="/my-orders"
                className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-2 rounded-xl transition"
              >
                <PackageCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>My Orders</span>
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-1 p-1.5 rounded-xl hover:bg-slate-100 transition text-slate-700 text-xs font-semibold cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
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
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => openAuth('login', 'CUSTOMER')}
                className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            </div>
          )}

          {/* Cart Trigger Button (Always visible on mobile, laptop, and desktop) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 bg-slate-900 hover:bg-amber-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs transition shadow-xs cursor-pointer active:scale-95 shrink-0"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full min-w-4.5 sm:min-w-5 h-4.5 sm:h-5 flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle Button (Visible ONLY on mobile phones < md) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition cursor-pointer shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
          </button>

        </div>
      </div>

      {/* Slide-Down Navigation Drawer (For mobile phones < md) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          <div className="space-y-1">
            <Link
              to="/"
              onClick={handleGoHome}
              className={`block px-3 py-2.5 rounded-xl text-sm font-bold ${
                location.pathname === '/' && !location.search
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              🏠 Home (All Products)
            </Link>

            {/* Mobile Category Accordion */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 transition"
              >
                <span>📦 Shop by Category</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMobileCategoryOpen && (
                <div className="bg-white p-2 space-y-1 border-t border-slate-100">
                  <button
                    onClick={() => handleSelectProduct('saree-organiser')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-900 flex justify-between items-center"
                  >
                    <span>🥻 Saree Organiser (60L)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Steel Frame</span>
                  </button>

                  <button
                    onClick={() => handleSelectProduct('jewel-organiser')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-900 flex justify-between items-center"
                  >
                    <span>💍 Jewellery Organiser</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">Velvet Box</span>
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/track-order"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold ${
                location.pathname === '/track-order'
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-4 h-4 text-amber-700" />
              <span>Track Your Order</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold ${
                location.pathname === '/contact'
                  ? 'bg-amber-50 text-amber-900'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Phone className="w-4 h-4 text-slate-500" />
              <span>Contact Us</span>
            </Link>

            {/* Mobile Auth / Orders */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/my-orders"
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 bg-slate-50 rounded-xl"
                  >
                    <span className="flex items-center gap-2">
                      <PackageCheck className="w-4 h-4 text-amber-800" />
                      <span>My Orders</span>
                    </span>
                    <span className="text-slate-400">→</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-700 bg-rose-50 rounded-xl border border-rose-200"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Portal</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout ({user.name})</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => openAuth('login', 'CUSTOMER')}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs text-center cursor-pointer"
                  >
                    Customer Login
                  </button>
                  <button
                    onClick={() => openAuth('signup', 'CUSTOMER')}
                    className="w-full py-2.5 bg-amber-50 text-amber-900 border border-amber-200 font-bold rounded-xl text-xs text-center cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;
