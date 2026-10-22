import React from 'react';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-700 via-rose-800 to-amber-800 text-white text-[11px] sm:text-xs py-2 px-3 sm:px-6 shadow-xs overflow-hidden w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center">
        <div className="flex items-center gap-1.5 shrink min-w-0 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
          <span className="font-semibold tracking-wide truncate">FESTIVE CLOSET MAKEOVER SALE</span>
          <span className="hidden md:inline text-amber-200 truncate">| Flat 40% OFF on Steel Frame Organizers</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-amber-100 font-medium">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">Free Shipping Across India</span>
            <span className="sm:hidden">Free Shipping</span>
          </span>
          <span className="hidden lg:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" /> COD Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
