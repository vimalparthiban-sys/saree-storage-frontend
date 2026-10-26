import React, { useState, useEffect } from 'react';
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
import { Star, ShieldCheck, Truck, RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, Minus, Plus, X, Maximize2 } from 'lucide-react';

const getRelativeDateString = (timestampOrDateStr) => {
  if (!timestampOrDateStr) return 'Just now';
  if (typeof timestampOrDateStr === 'string' && (timestampOrDateStr.includes('ago') || timestampOrDateStr.includes('now'))) {
    return timestampOrDateStr;
  }
  const timestamp = typeof timestampOrDateStr === 'number' 
    ? timestampOrDateStr 
    : new Date(timestampOrDateStr).getTime();
  
  if (isNaN(timestamp)) return String(timestampOrDateStr);

  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 week ago';
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return '1 month ago';
  return `${diffMonths} months ago`;
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, setIsCheckoutOpen, setIsSizeGuideOpen } = useCart();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);

  // Reviews State & LocalStorage Persistence
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(`reviews_${product.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...(product.reviews || [])];
        }
      }
    } catch (err) {
      console.error('Error loading reviews from localStorage:', err);
    }
    return product.reviews || [];
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`reviews_${product.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList([...parsed, ...(product.reviews || [])]);
          return;
        }
      }
    } catch (err) {
      console.error('Error loading reviews from localStorage:', err);
    }
    setReviewsList(product.reviews || []);
  }, [product.id]);

  const userSubmittedCount = Math.max(0, reviewsList.length - (product.reviews?.length || 0));
  const totalReviewCount = (product.reviewCount || 97) + userSubmittedCount;

  // Review Modal Form State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStep, setReviewStep] = useState(1); // 1 = Rating Selection, 2 = Content & Title
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewToast, setReviewToast] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newRev = {
      name: reviewerName.trim() || 'Verified Customer',
      city: reviewerCity.trim() || 'Tamil Nadu',
      rating: reviewRating || 5,
      timestamp: Date.now(),
      date: 'Just now',
      title: reviewTitle.trim() || 'Superb quality and highly recommended!',
      comment: reviewComment.trim(),
      verified: true
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);

    try {
      const existingSaved = JSON.parse(localStorage.getItem(`reviews_${product.id}`) || '[]');
      localStorage.setItem(`reviews_${product.id}`, JSON.stringify([newRev, ...existingSaved]));
    } catch (err) {
      console.error('Error saving review to localStorage:', err);
    }

    setIsReviewModalOpen(false);
    setReviewStep(1);
    setReviewRating(0);
    setReviewHoverRating(0);
    setReviewComment('');
    setReviewTitle('');
    setReviewerName('');
    setReviewerCity('');

    setReviewToast('✓ Review submitted successfully! Thank you for sharing your experience.');
    setTimeout(() => setReviewToast(''), 4500);

    const reviewsEl = document.getElementById('reviews-section');
    if (reviewsEl) {
      reviewsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const currentPack = product.packs[selectedPackIndex];
  const totalPrice = currentPack.price * quantity;
  const totalMrp = currentPack.mrp * quantity;
  const discountPercent = Math.round(((totalMrp - totalPrice) / totalMrp) * 100);

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : prev));
  };

  // Keyboard navigation & body scroll lock for Lightbox Modal
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, product.images.length]);

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
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
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 aspect-square shadow-2xs flex items-center justify-center p-2 sm:p-4 cursor-zoom-in group select-none"
              title="Click to view full screen"
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-102"
              />
              <span className="absolute top-3 left-3 bg-[#1c2d4a] text-white font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                -{discountPercent}% OFF
              </span>
              
              {/* Expand Hint Pill */}
              <div className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-[#1c2d4a] text-white text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1.5 transition shadow-sm opacity-90 group-hover:opacity-100">
                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Full screen</span>
              </div>
            </div>

            {/* Thumbnail Switcher (Selected Blue Border) */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition shrink-0 bg-white p-1 cursor-pointer ${
                    selectedImageIndex === idx ? 'border-[#1c2d4a] ring-2 ring-[#1c2d4a]/20 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  aria-label={`Select product image ${idx + 1}`}
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1c2d4a] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 inline-block">
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
                  <span className="text-xs font-bold text-slate-800 ml-1">({totalReviewCount} Reviews)</span>
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
              <span className="text-xs font-extrabold bg-blue-100 text-[#1c2d4a] px-2 py-0.5 rounded-md">
                -{discountPercent}% OFF
              </span>
            </div>

            {/* Pack Selector (Buttons: 1, 2, 4, 6) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">
                  Pack of: <strong className="text-[#1c2d4a]">{currentPack.qty} Pieces</strong>
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
                        ? 'border-[#1c2d4a] bg-blue-50/50 text-[#1c2d4a] shadow-xs ring-1 ring-[#1c2d4a]'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{p.label}</span>
                    {p.isBestSeller && (
                      <span className="block text-[8px] sm:text-[9px] text-[#1c2d4a] font-bold -mt-0.5">BEST</span>
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
                    className="text-[#1c2d4a] hover:underline font-semibold cursor-pointer"
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
                        ? 'border-[#1c2d4a] bg-blue-50/50 text-[#1c2d4a] font-bold'
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
                        ? 'border-[#1c2d4a] bg-blue-50/50 text-[#1c2d4a] font-bold'
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
            <div className="bg-blue-50/70 text-[#1c2d4a] p-3 rounded-xl border border-blue-100 text-xs flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-[#1c2d4a] shrink-0" />
              <span>Estimated delivery between <strong>October 26 and October 28</strong></span>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 sm:py-3.5 rounded-xl border-2 border-[#1c2d4a] hover:bg-[#1c2d4a] hover:text-white text-[#1c2d4a] font-bold text-xs sm:text-sm transition cursor-pointer shadow-xs active:scale-98"
              >
                Add to cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#1c2d4a] hover:bg-[#15233a] text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-[#1c2d4a]/20 active:scale-98"
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                  Customer Reviews ({totalReviewCount})
                </h2>
                <div className="flex items-center gap-2 text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-slate-800 text-xs ml-1">{product.rating} Out of 5 Stars</span>
                </div>
              </div>

              {/* Verified Buyer Reviews Badge placed right next to Customer Reviews & Rating */}
              <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 self-center">
                ✓ Verified Buyer Reviews
              </span>
            </div>

            {/* "Write a review" Button centered vertically on the right */}
            <div className="self-center w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setReviewStep(1);
                  setReviewRating(0);
                  setReviewHoverRating(0);
                  setReviewComment('');
                  setReviewTitle('');
                  setReviewerName('');
                  setReviewerCity('');
                  setIsReviewModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2 bg-[#1c2d4a] hover:bg-[#15233b] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Write a review</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewsList.map((r, i) => (
              <div key={i} className="p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(r.rating || 5)].map((_, s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-[10px] sm:text-[11px] font-medium">
                    {getRelativeDateString(r.timestamp || r.date)}
                  </span>
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

      {/* Fullscreen Product Image Modal (Flipkart Style) */}
      {isLightboxOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in duration-150 select-none"
        >
          {/* Top-Left Close (✕) Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition cursor-pointer"
            aria-label="Close full image view"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
          </button>

          {/* Backward / Previous Arrow Button */}
          {selectedImageIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md hover:shadow-lg rounded-md p-2.5 sm:p-3 text-slate-700 hover:text-slate-950 transition cursor-pointer"
              aria-label="Previous Image"
              title="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Center Stage: Fullscreen Clean Image */}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-10">
            <img
              src={product.images[selectedImageIndex]}
              alt={`${product.title} - view ${selectedImageIndex + 1}`}
              className="max-w-[88vw] max-h-[82vh] sm:max-h-[86vh] w-auto h-auto object-contain select-none"
            />
          </div>

          {/* Forward / Next Arrow Button */}
          {selectedImageIndex < product.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-md hover:shadow-lg rounded-md p-2.5 sm:p-3 text-slate-700 hover:text-slate-950 transition cursor-pointer"
              aria-label="Next Image"
              title="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Bottom: Dots Indicator ONLY (No thumbnails) */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  selectedImageIndex === idx 
                    ? 'w-5 sm:w-6 h-1.5 sm:h-2 bg-slate-700' 
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Interactive Modal */}
      {isReviewModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
        >
          {/* Modal Card - overflow-hidden protects rounded corners from scrollbar clipping */}
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl relative border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Close Button pinned inside bubble */}
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition cursor-pointer z-30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Inner Scrollable Container - scroll slider is neatly indented inside the bubble */}
            <div className="overflow-y-auto p-5 sm:p-7 pr-4 sm:pr-6 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full">
              {/* Step 1: Rating Selection */}
              {reviewStep === 1 && (
                <div className="flex flex-col items-center text-center pt-1 pb-2">
                  <h2 className="text-lg sm:text-2xl font-serif font-bold text-slate-900">
                    How would you rate this product?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    We would love it if you would share a bit about your experience.
                  </p>

                  {/* Product Image */}
                  <div className="my-4 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-50 border border-slate-200/80 p-2.5 flex items-center justify-center shadow-2xs">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 max-w-md leading-snug px-2">
                    {product.title}
                  </h3>

                  {/* 5 Interactive Yellow Stars */}
                  <div className="mt-5 flex flex-col items-center gap-1.5 w-full">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((starNum) => {
                        const isFilled = (reviewHoverRating || reviewRating) >= starNum;
                        return (
                          <button
                            key={starNum}
                            type="button"
                            onMouseEnter={() => setReviewHoverRating(starNum)}
                            onMouseLeave={() => setReviewHoverRating(0)}
                            onClick={() => {
                              setReviewRating(starNum);
                              setTimeout(() => setReviewStep(2), 220);
                            }}
                            className="p-1 sm:p-2 cursor-pointer transition-transform hover:scale-120 active:scale-95"
                            aria-label={`${starNum} stars`}
                          >
                            <Star
                              className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                                isFilled
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-transparent text-amber-400 stroke-amber-400 stroke-[1.5]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between w-56 sm:w-64 text-[11px] sm:text-xs font-semibold text-slate-500 px-2 pt-1">
                      <span>Poor</span>
                      <span>Great</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Review Content & Title Form */}
              {reviewStep === 2 && (
                <form onSubmit={handleSubmitReview} className="space-y-3.5 pt-0.5">
                  {/* Product Title & Selected Stars */}
                  <div className="text-center space-y-1.5 pb-2 border-b border-slate-100">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 max-w-md mx-auto leading-snug">
                      {product.title}
                    </h3>

                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starNum) => (
                          <button
                            key={starNum}
                            type="button"
                            onClick={() => setReviewRating(starNum)}
                            className="p-0.5 cursor-pointer hover:scale-110 transition"
                          >
                            <Star
                              className={`w-6 h-6 sm:w-7 sm:h-7 ${
                                reviewRating >= starNum
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-transparent text-amber-400 stroke-amber-400 stroke-[1.5]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between w-40 text-[10px] font-semibold text-slate-400">
                        <span>Poor</span>
                        <span>Great</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Review content (Required)
                    </label>
                    <textarea
                      rows={2.5}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Start writing here..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#1c2d4a] focus:ring-1 focus:ring-[#1c2d4a] text-xs sm:text-sm bg-slate-50/50 resize-none"
                      required
                    />
                  </div>

                  {/* Review Title */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Give your review a title"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#1c2d4a] focus:ring-1 focus:ring-[#1c2d4a] text-xs sm:text-sm bg-slate-50/50"
                    />
                  </div>

                  {/* Name & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#1c2d4a] focus:ring-1 focus:ring-[#1c2d4a] text-xs sm:text-sm bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                        City / State
                      </label>
                      <input
                        type="text"
                        value={reviewerCity}
                        onChange={(e) => setReviewerCity(e.target.value)}
                        placeholder="e.g. Chennai, Tamil Nadu"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#1c2d4a] focus:ring-1 focus:ring-[#1c2d4a] text-xs sm:text-sm bg-slate-50/50"
                      />
                    </div>
                  </div>

                  {/* Privacy and Policy note */}
                  <p className="text-[10px] sm:text-[11px] text-slate-400 text-center leading-relaxed pt-0.5">
                    We'll only contact you about your review if necessary. By submitting your review, you agree to our{' '}
                    <span className="underline cursor-pointer">terms and conditions</span> and{' '}
                    <span className="underline cursor-pointer">privacy policy</span>.
                  </p>

                  {/* Action Navigation: Back on Left, Send on Right */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setReviewStep(1)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
                    >
                      <span>← Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={!reviewComment.trim()}
                      className="px-8 py-2.5 bg-[#1c2d4a] hover:bg-[#15233b] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer active:scale-95"
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification for Review Submission */}
      {reviewToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c2d4a] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{reviewToast}</span>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;