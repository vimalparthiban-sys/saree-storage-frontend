import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import FeatureHighlights from '../components/FeatureHighlights';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { Search, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  // Filter products
  let filteredProducts = products.filter((p) => {
    const matchesCategory = !activeCategory || p.categorySlug === activeCategory;
    const matchesSearch = !searchQuery || 
                          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = !inStockOnly || p.inStock;
    return matchesCategory && matchesSearch && matchesStock;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy === 'title-az') {
    filteredProducts.sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />

      {/* 1. Hero Banner: Rounded Rectangle aligned with APPZYS Logo grid (equal gap on 4 sides) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-1 w-full">
        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md">
          <img
            src="/images/appzys-hero-banner.jpg"
            alt="APPZYS Smart Storage Solutions - Saree & Jewellery Organisers"
            className="w-full h-auto object-cover block select-none"
            loading="eager"
            fetchPriority="high"
          />

          {/* Interactive Clickable Hotspots mapped directly to the buttons & products in the banner */}
          <div className="absolute inset-0 pointer-events-none">
            {/* 1. "Shop Saree Organiser" CTA Button */}
            <Link
              to="/?category=saree-organiser"
              className="pointer-events-auto absolute left-[3.5%] top-[48%] w-[14.5%] h-[8%] rounded-full cursor-pointer hover:opacity-80 transition"
              title="Shop Saree Organiser (60L)"
              aria-label="Shop Saree Organiser"
            />
            {/* 2. "Shop Jewellery Organiser" CTA Button */}
            <Link
              to="/?category=jewel-organiser"
              className="pointer-events-auto absolute left-[18.5%] top-[48%] w-[15.5%] h-[8%] rounded-full cursor-pointer hover:opacity-80 transition"
              title="Shop Jewellery Organiser (Velvet)"
              aria-label="Shop Jewellery Organiser"
            />
            {/* 3. Saree Organiser Box */}
            <Link
              to="/?category=saree-organiser"
              className="pointer-events-auto absolute left-[34%] top-[30%] w-[33%] h-[48%] cursor-pointer"
              title="Shop Saree Organiser"
              aria-label="Saree Organiser Box"
            />
            {/* 4. Jewellery Organiser Box */}
            <Link
              to="/?category=jewel-organiser"
              className="pointer-events-auto absolute left-[67%] top-[25%] w-[31%] h-[53%] cursor-pointer"
              title="Shop Jewellery Organiser"
              aria-label="Jewellery Organiser Box"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-8 sm:space-y-12">
        
        {/* 2. Responsive Header & Filter / Sort Strip */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900">
                  {activeCategory === 'saree-organiser'
                    ? '🥻 Saree Organiser (60L)'
                    : activeCategory === 'jewel-organiser'
                    ? '💍 Jewellery Organiser'
                    : 'All Smart Storage Solutions'}
                </h1>
                <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} Products
                </span>
                {searchQuery && (
                  <span className="text-[10px] sm:text-xs bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    Matching "{searchQuery}"
                    <button
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('search');
                        setSearchParams(newParams);
                      }}
                      className="text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {activeCategory && (
                  <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    Filtered
                    <button
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('category');
                        setSearchParams(newParams);
                      }}
                      className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                APPZYS® Smart Storage Solutions • High Durability & Space Saving
              </p>
            </div>

            {/* In-Stock Toggle & Sort By dropdown on the Right (Flex wrap on mobile) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-amber-700 accent-amber-800"
                />
                <span>In stock</span>
              </label>

              {/* Working Sort By dropdown */}
              <div className="flex items-center gap-1.5 bg-white px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold text-slate-800 bg-transparent cursor-pointer focus:outline-hidden"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title-az">Alphabetical: A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Responsive Product Catalog Grid (Minimalist & Modern, matching Reference 2) */}
        <div className={`grid grid-cols-1 ${filteredProducts.length === 1 ? 'max-w-xl mx-auto' : 'sm:grid-cols-2 max-w-4xl mx-auto'} gap-5 sm:gap-8`}>
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              {/* Full-width Product Image Container */}
              <div className="relative aspect-4/3 sm:aspect-square w-full bg-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Rating Badge (Top Right, matching Reference 2) */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 text-xs font-bold text-slate-800 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{p.rating}</span>
                </div>
              </div>

              {/* Bottom Info Section (Clean & Symmetrical: Category + Title & Rate) */}
              <div className="bg-slate-50/70 p-4 sm:p-5 border-t border-slate-100 flex flex-col justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {p.brand}
                </span>

                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#1c2d4a] transition line-clamp-2">
                    {p.cardTitle || p.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 shrink-0 text-right whitespace-nowrap">
                    From ₹ {p.basePrice}.00
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 4. Brand Feature Highlights */}
        <FeatureHighlights />

      </main>

      {/* Newsletter Lead Generation Banner */}
      <NewsletterBanner />

      <Footer />

      {/* Drawers & Modals */}
      <SizeGuideModal />
    </div>
  );
};

export default Home;
