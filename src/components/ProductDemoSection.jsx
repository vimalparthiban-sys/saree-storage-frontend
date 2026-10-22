import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Check, X } from 'lucide-react';

const ProductDemoSection = ({ product }) => {
  if (!product || !product.demo) return null;

  const [activeStep, setActiveStep] = useState(1);
  const { demo, comparison } = product;

  return (
    <div className="space-y-16">
      
      {/* 1. Dedicated 3-Step Demo for this Product */}
      <section className="py-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
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
              onClick={() => setActiveStep(s.step)}
              className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                activeStep === s.step
                  ? 'bg-amber-50/70 border-amber-700 shadow-md ring-2 ring-amber-700/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                  activeStep === s.step ? 'bg-amber-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}>
                  0{s.step}
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {s.badge}
                </span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{s.title}</h3>
              <p className="text-[11px] text-slate-500">{s.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Step Content Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg">
              STEP {activeStep} OF 3
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {demo.steps[activeStep - 1].title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {demo.steps[activeStep - 1].desc}
            </p>
            <button
              onClick={() => setActiveStep((prev) => (prev % 3) + 1)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <span>{activeStep === 3 ? 'Restart Demo' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-950/70 rounded-2xl p-6 border border-slate-700/80 text-center space-y-3">
            <div className="text-5xl">{demo.steps[activeStep - 1].icon}</div>
            <div className="font-bold text-sm text-amber-300">{demo.steps[activeStep - 1].badge}</div>
            <p className="text-xs text-slate-400">{demo.steps[activeStep - 1].subtitle}</p>
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

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 sm:p-5 text-xs sm:text-sm font-bold items-center">
              <div className="col-span-4 text-slate-300 uppercase tracking-wider text-[11px]">Key Feature</div>
              <div className="col-span-4 text-amber-400 font-extrabold">{comparison.colWinner}</div>
              <div className="col-span-4 text-slate-400">{comparison.colLoser}</div>
            </div>

            <div className="divide-y divide-slate-200">
              {comparison.rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 text-xs sm:text-sm items-center hover:bg-slate-50 transition">
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
        </section>
      )}

    </div>
  );
};

export default ProductDemoSection;
