import React from 'react';
import { Truck, ShieldCheck, Sparkles } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-amber-700 via-rose-800 to-amber-800 text-white text-xs py-2 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center">
        <div className="flex items-center gap-1.5 mx-auto md:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-semibold tracking-wide">FESTIVE CLOSET MAKEOVER SALE</span>
          <span className="hidden sm:inline text-amber-200">| Flat 40% OFF on Steel Frame Organizers</span>
        </div>
        <div className="flex items-center gap-4 mx-auto md:mx-0 text-amber-100 font-medium">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-300" /> Free Shipping Across India
          </span>
          <span className="hidden lg:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Cash on Delivery (COD) Available
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
