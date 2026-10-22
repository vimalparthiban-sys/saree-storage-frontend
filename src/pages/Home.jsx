import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import FeatureHighlights from '../components/FeatureHighlights';
import ProductDemoSection from '../components/ProductDemoSection';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { Search, Star, ArrowRight, Sparkles, Filter } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category'); // 'saree-organiser', 'jewel-organiser', or null
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(true);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = !activeCategory || p.categorySlug === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCategory && matchesSearch && matchesStock;
  });

  const selectedProductForDemo = activeCategory
    ? products.find((p) => p.categorySlug === activeCategory)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <AnnouncementBar />
      <Navbar />

      {/* 1. Search Bar */}
      <div className="bg-white border-b border-slate-200 py-5 px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you searching for? (e.g. Saree Organiser, Jewellery Box)"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-700 focus:outline-hidden text-xs sm:text-sm shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        
        {/* 2. Collection Header & Category Select Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {activeCategory === 'saree-organiser'
                    ? '🥻 Saree Organiser (60L)'
                    : activeCategory === 'jewel-organiser'
                    ? '💍 Jewellery Organiser'
                    : 'All Smart Storage Solutions'}
                </h1>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} Items
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {activeCategory
                  ? 'Showing product with complete 3-step installation demo & comparison below.'
                  : 'APPZYS® Organise • Protect • Save Space'}
              </p>
            </div>

            {/* In-Stock Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-amber-700 accent-amber-800"
                />
                <span>In stock only</span>
              </label>
            </div>
          </div>

          {/* Category Switch Tabs (Home vs Saree vs Jewel) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium">Quick Select:</span>
            
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-full border cursor-pointer font-bold transition ${
                !activeCategory
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              All Products ({products.length})
            </button>

            <button
              onClick={() => setSearchParams({ category: 'saree-organiser' })}
              className={`px-4 py-2 rounded-full border cursor-pointer font-bold transition flex items-center gap-1.5 ${
                activeCategory === 'saree-organiser'
                  ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>🥻 Saree Organiser (60L)</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-extrabold">Steel Frame</span>
            </button>

            <button
              onClick={() => setSearchParams({ category: 'jewel-organiser' })}
              className={`px-4 py-2 rounded-full border cursor-pointer font-bold transition flex items-center gap-1.5 ${
                activeCategory === 'jewel-organiser'
                  ? 'bg-rose-800 text-white border-rose-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>💍 Jewellery Organiser</span>
              <span className="text-[10px] bg-rose-100 text-rose-900 px-1.5 py-0.2 rounded font-extrabold">Velvet Box</span>
            </button>
          </div>
        </div>

        {/* 3. Product Catalog Grid (Clicking takes user to Product Detail Page) */}
        <div className={`grid grid-cols-1 ${filteredProducts.length === 1 ? 'max-w-xl mx-auto' : 'sm:grid-cols-2 max-w-4xl mx-auto'} gap-8`}>
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Clickable Image Area */}
              <Link to={`/product/${p.id}`} className="block space-y-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center p-3 border border-slate-100">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-all duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    -{p.discountPercent}% OFF
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    {p.packs.length} Pack Sizes
                  </span>
                </div>

                {/* Title & Brand */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {p.brand}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-amber-800 transition line-clamp-2">
                    {p.title}
                  </h3>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-500 text-[11px] font-medium">({p.reviewCount} Reviews)</span>
                  </div>
                </div>

                {/* Specs */}
                <p className="text-[11px] text-slate-500 line-clamp-1">{p.specs}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
                  <span className="text-xl font-black text-slate-900">Rs. {p.basePrice}.00</span>
                  <span className="text-xs text-slate-400 line-through">Rs. {p.mrp}.00</span>
                </div>
              </Link>

              {/* Choose Option CTA Button */}
              <div className="pt-4">
                <Link
                  to={`/product/${p.id}`}
                  className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
                >
                  <span>Choose Option / View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 4. DYNAMIC SECTION: If a specific product category is selected, show its 3-Step Demo & Comparison */}
        {selectedProductForDemo ? (
          <ProductDemoSection product={selectedProductForDemo} />
        ) : (
          /* When on General Home (All products), DO NOT show the 3-step demo or comparison, show clean brand features */
          <FeatureHighlights />
        )}

      </main>

      {/* Newsletter Lead Generation Banner */}
      <NewsletterBanner />

      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <SizeGuideModal />
    </div>
  );
};

export default Home;
