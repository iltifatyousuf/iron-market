import React from 'react';
export default function WhyUsSection() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className="col-span-1 md:col-span-3 border-b-[0.5px] border-white/20 p-10 bg-white text-black">
          <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ ADVANTAGE</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">The IronMarket Standard.</h2>
        </div>
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-5xl font-bold mb-6">100%</div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Verified Sellers</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Every dealer is thoroughly vetted for financial stability and operational history before joining.</p>
        </div>
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-5xl font-bold mb-6">24H</div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Escrow Protection</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">Your funds are securely held until the equipment is physically inspected upon delivery.</p>
        </div>
        <div className="col-span-1 p-10 min-h-[300px] flex flex-col justify-center">
          <div className="text-5xl font-bold mb-6">0¢</div>
          <h3 className="text-lg font-bold uppercase tracking-tight mb-4">No Hidden Fees</h3>
          <p className="text-[10px] uppercase tracking-widest opacity-60 leading-relaxed">We provide absolute transparent pricing with zero hidden transaction surcharges or buyer premiums.</p>
        </div>
      </div>
    </section>
  );
}