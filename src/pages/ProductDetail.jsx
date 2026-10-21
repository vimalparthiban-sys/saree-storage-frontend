import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import SizeGuideModal from '../components/SizeGuideModal';
import { Star, ShieldCheck, Truck, RotateCcw, CheckCircle2, ChevronRight, Minus, Plus, Heart, Share2, Sparkles, Box } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCheckoutOpen, setIsSizeGuideOpen } = useCart();

  // Find product or fallback to the first one
  const product = products.find((p) => p.id === id) || products[0];

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1); // default Pack of 2 or 3
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/" className="hover:text-slate-900 transition">Wardrobe Organizers</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.shortTitle}</span>
        </nav>

        {/* Product Hero Grid (Left Gallery, Right Options) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Showcase Image */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 aspect-square shadow-sm flex items-center justify-center p-4">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain rounded-2xl transition-all duration-300 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                -{discountPercent}% OFF
              </span>
            </div>

            {/* Thumbnail Switcher */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 bg-white p-1 cursor-pointer ${
                    selectedImageIndex === idx ? 'border-amber-700 ring-2 ring-amber-700/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Pack Selector, Price, CTAs (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Reviews */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1">({product.reviewCount})</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  In stock & ready to ship
                </span>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1 border-t border-slate-100">
              <span className="text-3xl font-black text-slate-900">Rs. {totalPrice.toLocaleString()}.00</span>
              <span className="text-base text-slate-400 line-through">Rs. {totalMrp.toLocaleString()}.00</span>
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
              <div className="flex flex-wrap gap-2.5">
                {product.packs.map((p, idx) => (
                  <button
                    key={p.qty}
                    onClick={() => setSelectedPackIndex(idx)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold border-2 transition cursor-pointer min-w-16 text-center ${
                      selectedPackIndex === idx
                        ? 'border-amber-800 bg-amber-50 text-amber-900 shadow-sm ring-1 ring-amber-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{p.label}</span>
                    {p.isBestSeller && (
                      <span className="block text-[9px] text-amber-700 font-bold -mt-0.5">BESTSELLER</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Capacity / Size:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-amber-800 hover:underline font-semibold cursor-pointer"
                >
                  📏 View Size Guide
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
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
              <div className="flex items-center gap-2">
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
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }}></span>
                    <span>{c.name}</span>
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
            <div className="bg-sky-50 text-sky-950 p-3 rounded-xl border border-sky-200 text-xs flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-sky-700 shrink-0" />
              <span>Estimated delivery between <strong>October 26 and October 28</strong></span>
            </div>

            {/* Primary Action Buttons (Add to cart & Buy it now) */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-sm transition cursor-pointer shadow-xs active:scale-98"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-700 to-rose-700 hover:from-amber-800 hover:to-rose-800 text-white font-bold text-sm transition cursor-pointer shadow-md shadow-amber-900/20 active:scale-98"
              >
                Buy it now
              </button>
            </div>

            {/* Festive Coupon Strip (Homestrap style) */}
            <div className="bg-gradient-to-r from-amber-100/70 via-rose-50 to-amber-50 p-4 rounded-2xl border border-amber-300 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-amber-900 block">FESTIVE OFFER FOR YOU!</span>
                <span className="text-slate-600 text-[11px]">Get ₹200 OFF on orders above ₹1,999</span>
              </div>
              <span className="px-2.5 py-1 bg-amber-800 text-white font-mono font-bold rounded-lg text-[10px]">
                CODE: FESTIVE200
              </span>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1-Year Steel Frame Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>7 Days Easy Doorstep Return</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery Available</span>
              </div>
            </div>

          </div>

        </div>

        {/* Product Description & Key Features */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-serif font-bold text-slate-900">Product Description & Features</h2>
          </div>

          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <p>{product.description}</p>
            
            <h3 className="font-bold text-slate-900 text-sm pt-2">Key Highlights:</h3>
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

        {/* Customer Reviews Section (Specific to this Product) */}
        <div id="reviews-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">
                Customer Reviews ({product.reviewCount})
              </h2>
              <div className="flex items-center gap-2 text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-slate-800 text-xs ml-1">{product.rating} Out of 5 Stars</span>
              </div>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              ✓ 100% Verified Buyer Reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((r, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-[11px]">{r.date}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">"{r.comment}"</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                  <span className="font-bold text-slate-800">{r.name} • {r.city}</span>
                  <span className="text-emerald-700 font-semibold">✓ Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      
      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <SizeGuideModal />
    </div>
  );
};

export default ProductDetail;
