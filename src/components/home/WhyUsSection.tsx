import React from 'react';

export default function WhyUsSection() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className="col-span-1 md:col-span-3 border-b-[0.5px] border-white/20 p-10 bg-red-500 text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The IronMarket Advantage.</h2>
        </div>
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-6xl md:text-8xl font-black text-white mb-4">100<span className="text-red-500">%</span></div>
          <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Verified Sellers</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Every dealer is vetted for financial stability and operational history.</p>
        </div>
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 min-h-[300px] flex flex-col justify-center bg-white text-black">
          <div className="text-6xl md:text-8xl font-black text-black mb-4">24<span className="text-red-500">H</span></div>
          <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Escrow Protection</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Funds are secured until equipment is physically inspected upon delivery.</p>
        </div>
        <div className="col-span-1 p-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-6xl md:text-8xl font-black text-white mb-4">0<span className="text-red-500">¢</span></div>
          <h3 className="text-xl font-bold uppercase tracking-tight mb-2">No Hidden Fees</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Transparent pricing with absolute zero hidden transaction surcharges.</p>
        </div>
      </div>
    </section>
  );
}