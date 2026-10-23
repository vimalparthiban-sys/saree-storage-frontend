import React from 'react';
import { Layers, ShieldCheck, Eye, Sparkles, Wind, Maximize2 } from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    {
      icon: <Layers className="w-6 h-6 text-[#1c2d4a]" />,
      title: '4mm Stainless Steel Frame',
      desc: 'Rigid built-in internal wire support prevents sagging and allows stacking up to 4 boxes.'
    },
    {
      icon: <Eye className="w-6 h-6 text-[#1c2d4a]" />,
      title: 'Double Access Zippers',
      desc: 'Load from top 180° opening or slide out sarees from the front window without unstacking.'
    },
    {
      icon: <Wind className="w-6 h-6 text-[#1c2d4a]" />,
      title: '600D Oxford Fabric',
      desc: 'Heavy-duty water-resistant and moth-proof fabric keeps precious silk zari shiny and dust-free.'
    },
    {
      icon: <Maximize2 className="w-6 h-6 text-[#1c2d4a]" />,
      title: 'Collapses Flat to 1-Inch',
      desc: 'When not in use, simply fold the steel frame down and store it in any drawer or under the bed.'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-blue-50/30 transition">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-bold text-sm text-slate-900">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
