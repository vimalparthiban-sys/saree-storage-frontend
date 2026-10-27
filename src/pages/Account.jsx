import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
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
  Bell,
  Tv,
  ShieldCheck,
  Smartphone,
  LogOut,
  ChevronRight,
  ArrowLeft,
  Search,
  ShoppingBag,
  Plus,
  Check,
  Home as HomeIcon,
  CheckSquare,
  Square,
  Lock,
  Trash2,
  Edit2
} from 'lucide-react';

const Account = () => {
  const { user, logout } = useAuth();
  const { totalItemCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  // Active sub-page view: 'main' | 'edit-profile' | 'addresses' | 'notifications' | 'subscriptions' | 'privacy' | 'devices'
  const [activeView, setActiveView] = useState('main');
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // 1. Edit Profile State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Vimal',
    email: user?.email || 'vimal@appzys.com',
    phone: '98400 12345',
    gender: 'Male'
  });

  // 2. Saved Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Vimal',
      phone: '+91 98400 12345',
      addressLine: 'No 45, Anna Nagar 2nd Main Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600040',
      isDefault: true
    }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    name: '',
    phone: '',
    addressLine: '',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: ''
  });

  // 3. Notification Preferences State (Flipkart Style)
  const [activeNotifTab, setActiveNotifTab] = useState('Push');
  const [notifPreferences, setNotifPreferences] = useState({
    myOrders: true,
    reminders: true,
    recommendations: true,
    newOffers: true,
    community: false,
    feedback: true
  });

  // Load recently viewed products from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('appzys_recently_viewed') || '[]');
      if (stored.length > 0) {
        setRecentlyViewed(stored);
      } else {
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

  const toggleNotif = (key) => {
    setNotifPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    handleActionToast('Preference updated');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    handleActionToast('Profile details saved successfully!');
    setTimeout(() => setActiveView('main'), 800);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.name || !newAddressForm.addressLine || !newAddressForm.pincode) {
      handleActionToast('Please fill all required address fields');
      return;
    }
    const newEntry = {
      id: Date.now(),
      ...newAddressForm,
      isDefault: addresses.length === 0
    };
    setAddresses((prev) => [...prev, newEntry]);
    setIsAddingAddress(false);
    setNewAddressForm({
      name: '',
      phone: '',
      addressLine: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: ''
    });
    handleActionToast('New address saved!');
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    handleActionToast('Address removed');
  };

  const displayName = profileForm.name ? profileForm.name.split(' ')[0] : 'Vimal';

  // =========================================================================
  // SUB-VIEW 1: EDIT PROFILE FULL PAGE
  // =========================================================================
  if (activeView === 'edit-profile') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900">Edit Profile</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto p-4 sm:p-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#1c2d4a] text-white flex items-center justify-center font-black text-lg">
                {profileForm.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{profileForm.name}</h3>
                <p className="text-xs text-slate-500">Personal Information</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1c2d4a] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1c2d4a] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#1c2d4a] focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                <div className="flex items-center gap-3">
                  {['Male', 'Female'].map((g) => (
                    <label key={g} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={profileForm.gender === g}
                        onChange={() => setProfileForm({ ...profileForm, gender: g })}
                        className="accent-[#1c2d4a]"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1c2d4a] text-white font-bold text-xs shadow-md active:scale-98 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 2: SAVED ADDRESSES FULL PAGE (Matching Flipkart Image 4)
  // =========================================================================
  if (activeView === 'addresses') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900">Saved Addresses</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto p-4 space-y-4">
          {/* Add New Address Button (Blue Strip like Image 4) */}
          <button
            onClick={() => setIsAddingAddress(!isAddingAddress)}
            type="button"
            className="w-full p-3.5 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-between transition cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add New Address</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Add Address Form Modal / Box */}
          {isAddingAddress && (
            <form onSubmit={handleAddAddress} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md space-y-3 animate-in fade-in">
              <h3 className="font-bold text-xs text-slate-900 pb-1 border-b border-slate-100">Add Delivery Address</h3>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newAddressForm.name}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newAddressForm.phone}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="House No, Building & Street"
                  value={newAddressForm.addressLine}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, addressLine: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddressForm.city}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode (e.g. 600040)"
                  value={newAddressForm.pincode}
                  onChange={(e) => setNewAddressForm({ ...newAddressForm, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#1c2d4a] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-bold rounded-xl text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Address Cards List */}
          {addresses.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <HomeIcon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="text-xs font-semibold text-slate-600 bg-slate-100 py-1.5 px-4 rounded-xl inline-block">
                You do not have any saved address
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs font-semibold text-slate-800">Phone: {addr.phone}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="text-rose-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 3: NOTIFICATION PREFERENCES FULL PAGE (Matching Flipkart Image 3)
  // =========================================================================
  if (activeView === 'notifications') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        {/* Top Blue Header (Flipkart Image 3 Style) */}
        <header className="bg-[#1c2d4a] text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <h1 className="text-base font-bold text-white">Notification Preferences</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 rounded-full hover:bg-white/10 text-white"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Tab Row (Push | In-App | SMS | Email | WhatsApp) */}
        <div className="bg-white border-b border-slate-200 px-2 flex items-center justify-between overflow-x-auto no-scrollbar text-xs font-bold text-slate-600">
          {['Push', 'In-App', 'SMS', 'Email', 'WhatsApp'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveNotifTab(tab)}
              className={`py-3 px-3 shrink-0 cursor-pointer border-b-2 transition ${
                activeNotifTab === tab
                  ? 'border-[#1c2d4a] text-[#1c2d4a]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Info Strip */}
        <div className="p-4 bg-slate-100/70 border-b border-slate-200/80 text-xs text-slate-600">
          Get {activeNotifTab} notifications from APPZYS on your mobile
        </div>

        {/* Preferences Checklist Items (Matching Image 3) */}
        <main className="max-w-lg mx-auto bg-white divide-y divide-slate-100 border-b border-slate-200">
          {/* 1. My Orders */}
          <div
            onClick={() => toggleNotif('myOrders')}
            className="p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition"
          >
            <input
              type="checkbox"
              checked={notifPreferences.myOrders}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 accent-[#1c2d4a] rounded"
            />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">My Orders</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Latest updates on your delivery and tracking</p>
            </div>
          </div>

          {/* 2. Reminders */}
          <div
            onClick={() => toggleNotif('reminders')}
            className="p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition"
          >
            <input
              type="checkbox"
              checked={notifPreferences.reminders}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 accent-[#1c2d4a] rounded"
            />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Reminders</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Price drops, back-in-stock alerts, pack deals</p>
            </div>
          </div>

          {/* 3. Recommendations */}
          <div
            onClick={() => toggleNotif('recommendations')}
            className="p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition"
          >
            <input
              type="checkbox"
              checked={notifPreferences.recommendations}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 accent-[#1c2d4a] rounded"
            />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Recommendations by APPZYS</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Storage solutions and curated content based on interest</p>
            </div>
          </div>

          {/* 4. New Offers */}
          <div
            onClick={() => toggleNotif('newOffers')}
            className="p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition"
          >
            <input
              type="checkbox"
              checked={notifPreferences.newOffers}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 accent-[#1c2d4a] rounded"
            />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">New Offers</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Festive discounts, flash sales & promo coupons</p>
            </div>
          </div>

          {/* 5. Feedback and Review */}
          <div
            onClick={() => toggleNotif('feedback')}
            className="p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 transition"
          >
            <input
              type="checkbox"
              checked={notifPreferences.feedback}
              onChange={() => {}}
              className="mt-0.5 w-4 h-4 accent-[#1c2d4a] rounded"
            />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-slate-900">Feedback and Review</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Rating and reviews for your purchases</p>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 4: MANAGE DEVICES FULL PAGE (Matching Flipkart Image 5)
  // =========================================================================
  if (activeView === 'devices') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        {/* Top Blue Header (Flipkart Image 5 Style) */}
        <header className="bg-[#1c2d4a] text-white px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-white hover:bg-white/10 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <h1 className="text-base font-bold text-white">Manage Devices</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto p-4 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 px-1">This device</h2>

          {/* Device Card (Matching Image 5) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1c2d4a] flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">Mobile Device (Active Session)</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Last active: Just now • Web Browser</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Registered session • 256-Bit SSL Encrypted</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-2xs active:scale-98 transition"
            >
              Log out from all devices
            </button>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 5: PRIVACY CENTER FULL PAGE
  // =========================================================================
  if (activeView === 'privacy') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900">Privacy Center</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto p-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Your Data is 100% Safe</h3>
                <p className="text-xs text-slate-500">256-Bit SSL Bank-Grade Encryption</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              APPZYS is committed to protecting your privacy. We never sell your personal information or contact details to third parties.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => handleActionToast('Data export requested. Check your email.')}
                type="button"
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold text-xs text-left flex items-center justify-between hover:bg-slate-100 transition"
              >
                <span>Download My Account Data</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleActionToast('Privacy Policy verified active')}
                type="button"
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold text-xs text-left flex items-center justify-between hover:bg-slate-100 transition"
              >
                <span>Read APPZYS Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // SUB-VIEW 6: MY SUBSCRIPTIONS FULL PAGE
  // =========================================================================
  if (activeView === 'subscriptions') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 select-none">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('main')}
              className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-slate-900">My Subscriptions</h1>
          </div>
        </header>

        <main className="max-w-lg mx-auto p-4 space-y-4">
          <div className="bg-gradient-to-br from-[#1c2d4a] to-[#0f1b2d] text-white rounded-3xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                ACTIVE
              </span>
              <span className="text-xs text-slate-300">Lifetime Free</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white">APPZYS VIP Club Membership</h3>
            <ul className="text-xs text-slate-200 space-y-1.5 pt-1">
              <li>✓ Free Express Shipping on all orders</li>
              <li>✓ Flat 40% Festive discount on bundles</li>
              <li>✓ 1-Year stainless steel frame warranty</li>
            </ul>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    );
  }

  // =========================================================================
  // MAIN ACCOUNT VIEW (Clean, No "Change Language", All Buttons Work!)
  // =========================================================================
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

        {/* 2. SuperCoin / Privilege Card */}
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

        {/* 3. Top Action Buttons: Orders & Contact Us */}
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

        {/* 4. Recently Viewed Products (Horizontal Scroll Rail) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Recently Viewed Products
            </h2>
            <span className="text-[11px] font-semibold text-blue-800 flex items-center gap-1">
              Swipe →
            </span>
          </div>

          <div className="flex overflow-x-auto gap-3.5 pb-2 px-1 -mx-1 snap-x no-scrollbar overscroll-x-contain">
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

        {/* 5. Profile Settings Section (Full Page Navigation - Change Language Removed!) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Profile Settings
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {/* Edit Profile */}
            <button
              onClick={() => setActiveView('edit-profile')}
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
              onClick={() => setActiveView('addresses')}
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

            {/* Notification Settings */}
            <button
              onClick={() => setActiveView('notifications')}
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
              onClick={() => setActiveView('subscriptions')}
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
              onClick={() => setActiveView('privacy')}
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
              onClick={() => setActiveView('devices')}
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
              onClick={() => setActiveView('edit-profile')}
              type="button"
              className="w-full py-3.5 rounded-2xl bg-[#1c2d4a] hover:bg-[#13223f] text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-md"
            >
              <User className="w-4 h-4" />
              <span>Manage Profile & Details</span>
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
