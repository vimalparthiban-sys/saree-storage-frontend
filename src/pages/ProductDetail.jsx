import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import SizeGuideModal from '../components/SizeGuideModal';
import ProductDemoSection from '../components/ProductDemoSection';
import NewsletterBanner from '../components/NewsletterBanner';
import { Star, ShieldCheck, Truck, RotateCcw, CheckCircle2, ChevronRight, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, setIsCheckoutOpen, setIsSizeGuideOpen } = useCart();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);

  const currentPack = product.packs[selectedPackIndex];
  const totalPrice = currentPack.price * quantity;
  const totalMrp = currentPack.mrp * quantity;
  const discountPercent = Math.round(((totalMrp - totalPrice) / totalMrp) * 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      packId: `${product.id}-${currentPack.qty}-${selectedSize}`,
      title: product.shortTitle || product.title,
      packName: `Pack of ${currentPack.qty}`,
      packQuantity: currentPack.qty,
      size: selectedSize,
      color: selectedColor,
      price: currentPack.price,
      originalPrice: currentPack.mrp,
      quantity: quantity
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full space-y-8 sm:space-y-12">
        
        {/* Breadcrumb (horizontally scrollable on small phones) */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link to="/" className="hover:text-slate-900 transition">Wardrobe Organizers</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">{product.shortTitle}</span>
        </nav>

        {/* Product Hero Grid (Left Gallery, Right Options) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left Column: Image Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 aspect-square shadow-2xs flex items-center justify-center p-2 sm:p-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain rounded-xl sm:rounded-2xl transition-all duration-300"
              />
              <span className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                -{discountPercent}% OFF
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition shrink-0 bg-white p-1 cursor-pointer ${
                    selectedImageIndex === idx ? 'border-amber-700 ring-2 ring-amber-700/20 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Pack Selector, Price, CTAs (6 Cols) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            
            {/* Title & Reviews */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                {product.brand}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1">({product.reviewCount} Reviews)</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  In stock & ready to ship
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2.5 sm:gap-3 pt-1 border-t border-slate-100 flex-wrap">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">Rs. {totalPrice.toLocaleString()}.00</span>
              <span className="text-sm sm:text-base text-slate-400 line-through">Rs. {totalMrp.toLocaleString()}.00</span>
              <span className="text-xs font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                -{discountPercent}% OFF
              </span>
            </div>

            {/* Pack Selector (Buttons: 1, 2, 4, 6) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">
                  Pack of: <strong className="text-amber-800">{currentPack.qty} Pieces</strong>
                </span>
                <span className="text-emerald-700 font-semibold">{currentPack.savings}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.packs.map((p, idx) => (
                  <button
                    key={p.qty}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`py-2 sm:py-2.5 rounded-xl text-xs font-extrabold border-2 transition cursor-pointer text-center ${
                      selectedPackIndex === idx
                        ? 'border-amber-800 bg-amber-50 text-amber-900 shadow-xs ring-1 ring-amber-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{p.label}</span>
                    {p.isBestSeller && (
                      <span className="block text-[8px] sm:text-[9px] text-amber-700 font-bold -mt-0.5">BEST</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size / Capacity Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Capacity / Size:</span>
                {product.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-amber-800 hover:underline font-semibold cursor-pointer"
                  >
                    📏 Size Guide
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                      selectedSize === s
                        ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern / Color Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                Colour: <strong className="text-slate-900">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs transition cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-amber-800 bg-amber-50 text-amber-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.hex }}></span>
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-800 block">Quantity:</span>
              <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-l-xl transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-r-xl transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Delivery Estimation Strip */}
            <div className="bg-amber-50/70 text-amber-950 p-3 rounded-xl border border-amber-200 text-xs flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Estimated delivery between <strong>October 26 and October 28</strong></span>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-3.5 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs active:scale-98"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-700 to-rose-700 hover:from-amber-800 hover:to-rose-800 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-amber-900/20 active:scale-98"
              >
                Buy it now
              </button>
            </div>

            {/* Trust Points (2-col grid on mobile) */}
            <div className="grid grid-cols-2 gap-2.5 text-[11px] sm:text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>1-Year Quality Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>7 Days Easy Return</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cash on Delivery</span>
              </div>
            </div>

          </div>

        </div>

        {/* Product Description & Key Features */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-200 shadow-xs space-y-4 sm:space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">Product Description & Features</h2>
          </div>

          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <p>{product.description}</p>
            
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm pt-2">Key Highlights:</h3>
            <ul className="space-y-2">
              {product.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic 3-Step Demo & Comparison for this specific product */}
        <ProductDemoSection product={product} />

        {/* Customer Reviews Section */}
        <div id="reviews-section" className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Customer Reviews ({product.reviewCount})
              </h2>
              <div className="flex items-center gap-2 text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-slate-800 text-xs ml-1">{product.rating} Out of 5 Stars</span>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
              ✓ Verified Buyer Reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((r, i) => (
              <div key={i} className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-[10px] sm:text-[11px]">{r.date}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                <div className="pt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-200/60">
                  <span className="font-bold text-slate-800">{r.name} • {r.city}</span>
                  <span className="text-emerald-700 font-semibold">✓ Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Newsletter Lead Generation Banner */}
      <NewsletterBanner />

      <Footer />
      
      {/* Drawers & Modals */}
      <SizeGuideModal />
    </div>
  );
};

export default ProductDetail;
