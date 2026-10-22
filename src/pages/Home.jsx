import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import FeatureHighlights from '../components/FeatureHighlights';
import InstallationDemo from '../components/InstallationDemo';
import WhySteelFrame from '../components/WhySteelFrame';
import NewsletterBanner from '../components/NewsletterBanner';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { Search, SlidersHorizontal, Star, Sparkles, ArrowRight, Check } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(true);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = selectedColor === 'ALL' || p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
    const matchesStock = !inStockOnly || p.inStock;
    return matchesSearch && matchesColor && matchesStock;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <AnnouncementBar />
      <Navbar />

      {/* 1. Homestrap Style Search Banner */}
      <div className="bg-white border-b border-slate-200 py-6 px-4">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you searching for? (e.g. Steel Frame, Saree Box, Blouse Pocket)"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-700 focus:outline-hidden text-xs sm:text-sm shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        
        {/* 2. Collection Header & Filter/Sort Strip (Screenshot 1) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Saree Storage & Wardrobe Organizers
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {filteredProducts.length} items • Engineered for Silk & Daily Wear Protection
              </p>
            </div>

            {/* In-Stock Toggle & Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-amber-700 accent-amber-800"
                />
                <span>In stock only</span>
              </label>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl cursor-pointer focus:outline-hidden"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-high">Most Relevant</option>
                <option value="price-high">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-high">Alphabetical A-Z</option>
                <option value="price-high">Alphabetical Z-A</option>
              </select>
            </div>
          </div>

          {/* Quick Color Filters
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium">Quick Filter:</span>
            <button
              onClick={() => setSelectedColor('ALL')}
              className={`px-3 py-1.5 rounded-full border cursor-pointer font-semibold transition ${
                selectedColor === 'ALL' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              All Models
            </button>
            <button
              onClick={() => setSelectedColor('Navy')}
              className={`px-3 py-1.5 rounded-full border cursor-pointer font-semibold transition ${
                selectedColor === 'Navy' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Navy Blue Polka
            </button>
            <button
              onClick={() => setSelectedColor('Maroon')}
              className={`px-3 py-1.5 rounded-full border cursor-pointer font-semibold transition ${
                selectedColor === 'Maroon' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Royal Maroon
            </button>
            <button
              onClick={() => setSelectedColor('Pink')}
              className={`px-3 py-1.5 rounded-full border cursor-pointer font-semibold transition ${
                selectedColor === 'Pink' ? 'bg-amber-800 text-white border-amber-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Pastel Pink
            </button>
          </div> */}
        </div>

        {/* 3. Product Catalog Grid (Clicking takes user to Product Detail Page) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Clickable Image Area */}
              <Link to={`/product/${p.id}`} className="block space-y-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center p-3">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-all duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    -{p.discountPercent}% OFF
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                    {p.packs.length} Pack Sizes
                  </span>
                </div>

                {/* Title & Rating */}
                <div className="space-y-1.5">
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
                    <span className="text-slate-500 text-[11px] font-medium">({p.reviewCount})</span>
                  </div>
                </div>

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
                  <span>Choose option / View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Feature Highlights */}
        <FeatureHighlights />

        {/* 5. 3-Second Easy Installation Demo */}
        <InstallationDemo />

        {/* 6. Honest Comparison Table */}
        <WhySteelFrame />

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
