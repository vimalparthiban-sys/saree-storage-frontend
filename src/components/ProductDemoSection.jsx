import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Check, X, Play, Pause, Lock, ShieldCheck } from 'lucide-react';

const ProductDemoSection = ({ product }) => {
  if (!product || !product.demo) return null;

  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { demo, comparison } = product;
  const isJewel = product?.id === 'jewellery-organiser' || product?.categorySlug === 'jewel-organiser';

  // Auto-cycle through the 3 steps smoothly every 4 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4200);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  return (
    <div className="space-y-16">
      
      {/* 1. Dedicated 3-Step Demo for this Product */}
      <section className="py-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1c2d4a] text-xs font-bold border border-blue-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#1c2d4a]" />
            <span>{demo.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            {demo.headline}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {demo.subtitle}
          </p>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {demo.steps.map((s) => (
            <button
              key={s.step}
              onClick={() => {
                setActiveStep(s.step);
                setIsAutoPlay(false);
              }}
              className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                activeStep === s.step
                  ? 'bg-blue-50/80 border-[#1c2d4a] shadow-md ring-2 ring-[#1c2d4a]/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                  activeStep === s.step ? 'bg-[#1c2d4a] text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}>
                  0{s.step}
                </span>
                <span className="text-[10px] font-bold text-[#1c2d4a] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {s.badge}
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{s.title}</h3>
              <p className="text-[11px] text-slate-500">{s.subtitle}</p>

              {/* Active Step Bottom Accent */}
              {activeStep === s.step && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1c2d4a]" />
              )}
            </button>
          ))}
        </div>

        {/* Step Content Box with Grand Animated Visualizer */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#0e1b2e] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#1c2d4a] text-white font-black text-xs px-2.5 py-1 rounded-lg border border-blue-400/30">
                STEP {activeStep} OF 3
              </span>
              <button
                type="button"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-[11px] text-blue-200 hover:text-white px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 flex items-center gap-1.5 transition cursor-pointer"
                title={isAutoPlay ? 'Pause auto demo' : 'Play auto demo'}
              >
                {isAutoPlay ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Auto-cycle ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Auto-cycle PAUSED</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {demo.steps[activeStep - 1].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {demo.steps[activeStep - 1].desc}
            </p>

            {/* Smart Advantage Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{demo.steps[activeStep - 1].badge}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-sky-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>{demo.steps[activeStep - 1].subtitle}</span>
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveStep((prev) => (prev % 3) + 1);
                }}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-lg active:scale-95"
              >
                <span>{activeStep === 3 ? 'Restart Demo' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Real Cropped Video Player */}
          <div className="lg:col-span-6 relative bg-slate-950 rounded-2xl p-1.5 sm:p-2 border border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center aspect-[18/13] max-w-lg mx-auto w-full select-none group">
            
            {/* The Real Video Clip corresponding to the active step */}
            <video
              key={`${product?.id}-${activeStep}`}
              src={
                isJewel
                  ? activeStep === 1
                    ? '/videos/jewel_step1.mp4'
                    : activeStep === 2
                    ? '/videos/jewel_step2.mp4'
                    : '/videos/jewel_step3.mp4'
                  : activeStep === 1
                  ? '/videos/step1_popup.mp4'
                  : activeStep === 2
                  ? '/videos/step2_pack.mp4'
                  : '/videos/step3_pull.mp4'
              }
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />

            {/* Dynamic Step Header Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/85 text-white border border-sky-400/40 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>
                {isJewel
                  ? activeStep === 1
                    ? 'Top Lid: 5 Tangle-Free Necklace Hooks'
                    : activeStep === 2
                    ? 'Middle Flap: Stud Earrings & Ring Rolls'
                    : 'Bottom Base: Bangles & Removable Dividers'
                  : activeStep === 1
                  ? 'Pop-Up: Steel Rods Clicking'
                  : activeStep === 2
                  ? 'Top Pack: Bulk Clothes & Sarees'
                  : 'Stack & Pull: Front Window Slide-Out'}
              </span>
            </div>

            {/* Bottom Bar: Action Pill & Live Tag */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none">
              <div className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-semibold text-slate-200 border border-white/10">
                {isJewel
                  ? activeStep === 1
                    ? '100% tangle-free gold chains'
                    : activeStep === 2
                    ? '10+ pairs & velvet ring grooves'
                    : 'Snap-lock compact travel case'
                  : activeStep === 1
                  ? 'Takes 3 seconds'
                  : activeStep === 2
                  ? 'Pack up to 18 sarees'
                  : 'Zero unstacking needed'}
              </div>
              <div className="bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>REAL DEMO</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Dedicated Comparison for this Product */}
      {comparison && (
        <section className="py-6">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {comparison.headline}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              {comparison.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <div className="min-w-[550px]">
                <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-xs sm:text-sm font-bold items-center">
                  <div className="col-span-4 text-slate-300 uppercase tracking-wider text-[11px]">Key Feature</div>
                  <div className="col-span-4 text-blue-300 font-extrabold">{comparison.colWinner}</div>
                  <div className="col-span-4 text-slate-400">{comparison.colLoser}</div>
                </div>

                <div className="divide-y divide-slate-200">
                  {comparison.rows.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-3 sm:p-4 text-xs sm:text-sm items-center hover:bg-slate-50 transition">
                      <div className="col-span-4 font-bold text-slate-900 pr-2">{row.feature}</div>
                      <div className="col-span-4 text-slate-800 font-medium flex items-start gap-2 pr-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-emerald-950 font-semibold text-xs sm:text-sm">{row.winner}</span>
                      </div>
                      <div className="col-span-4 text-slate-500 flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm">{row.loser}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDemoSection;