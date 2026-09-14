import React from 'react';
import Link from 'next/link';

export default function GlobalMarketplace() {
  const locations = [
    { name: 'United States', style: { top: '30%', left: '20%' } },
    { name: 'Canada', style: { top: '15%', left: '25%' } },
    { name: 'United Kingdom', style: { top: '25%', left: '45%' } },
    { name: 'Germany', style: { top: '28%', left: '50%' } },
    { name: 'UAE', style: { top: '45%', left: '60%' } },
    { name: 'Saudi Arabia', style: { top: '48%', left: '58%' } },
    { name: 'India', style: { top: '50%', left: '70%' } },
    { name: 'Australia', style: { top: '75%', left: '85%' } },
    { name: 'Japan', style: { top: '35%', left: '85%' } },
    { name: 'South Africa', style: { top: '80%', left: '52%' } },
  ];

  return (
    <section className="py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-bold mb-4">Global Reach</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Equipment From Around the World</h2>
        </div>

        {/* Abstract Map Area */}
        <div className="relative w-full h-96 bg-transparent border border-neutral-800 rounded-xl overflow-hidden mb-16">
          {/* Map dot grid simulation - purely decorative background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(#404040 2px, transparent 2px)',
            backgroundSize: '24px 24px'
          }}></div>
          
          {/* Location pins */}
          {locations.map((loc, i) => (
            <div key={i} className="absolute flex items-center gap-2 transform -translate-x-1/2 -translate-y-1/2 group" style={loc.style}>
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover:scale-150 transition-transform"></div>
              <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors bg-neutral-950/80 px-2 py-1 rounded">{loc.name}</span>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16 border-t border-b border-neutral-800 py-12">
          <div>
            <div className="text-4xl font-bold text-white mb-2">40+</div>
            <div className="text-neutral-500">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">1,200+</div>
            <div className="text-neutral-500">Sellers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">25,000+</div>
            <div className="text-neutral-500">Listings</div>
          </div>
        </div>

        <div className="text-center">
          <Link href="#" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg inline-flex items-center font-semibold transition-all duration-300 group">
            Explore Global Equipment 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
