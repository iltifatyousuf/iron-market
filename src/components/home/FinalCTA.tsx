import React from 'react';

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Background gradients and patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_60%)] z-0"></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Your Next Machine Is Out There.</h2>
        <p className="text-xl text-neutral-300 mt-6 max-w-2xl mx-auto leading-relaxed">
          Search thousands of heavy equipment listings from dealers and marketplace partners worldwide.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            Explore Machinery
          </a>
          <a href="#" className="w-full sm:w-auto border border-neutral-700 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
            Find My Equipment
          </a>
        </div>
      </div>
    </section>
  );
}
