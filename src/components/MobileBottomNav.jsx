import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Home as HomeIcon, Layers, Sparkles, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { totalItemCount, setIsCartOpen } = useCart();

  const currentCategory = searchParams.get('category');
  const isHome = location.pathname === '/' && !currentCategory;
  const isSaree = location.pathname === '/' && currentCategory === 'saree-organiser';
  const isJewel = location.pathname === '/' && currentCategory === 'jewel-organiser';
  const isTrack = location.pathname === '/track-order';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-2xl select-none"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      {/* 1. Home */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          isHome ? 'text-[#1c2d4a] font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <HomeIcon className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5">Home</span>
      </Link>

      {/* 2. Saree Box (60L) */}
      <Link
        to="/?category=saree-organiser"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          isSaree ? 'text-[#1c2d4a] font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <Layers className={`w-5 h-5 ${isSaree ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5">Saree Box</span>
      </Link>

      {/* 3. Jewellery Box */}
      <Link
        to="/?category=jewel-organiser"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          isJewel ? 'text-[#1c2d4a] font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <Sparkles className={`w-5 h-5 ${isJewel ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5">Jewel Box</span>
      </Link>

      {/* 4. Track Order */}
      <Link
        to="/track-order"
        className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
          isTrack ? 'text-[#1c2d4a] font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
        }`}
      >
        <Truck className={`w-5 h-5 ${isTrack ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-0.5">Track</span>
      </Link>

      {/* 5. Cart Button with Live Count Badge */}
      <button
        onClick={() => setIsCartOpen(true)}
        type="button"
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-700 hover:text-[#1c2d4a] transition cursor-pointer relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
          {totalItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
              {totalItemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-medium">Cart</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
