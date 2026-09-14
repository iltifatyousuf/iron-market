import React from 'react';
import Link from 'next/link';

export default function NewUsedSection() {
  return (
    <section className="py-0 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* NEW Equipment Side */}
        <div className="bg-neutral-900 relative p-12 lg:p-20 flex flex-col justify-center">
          <div className="w-12 h-1 bg-orange-500 mb-6"></div>
          <span className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-4 block">New</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">New Equipment</h2>
          <p className="text-lg text-neutral-400 mb-6 max-w-lg">
            Latest machines with modern technology, efficiency and manufacturer support.
          </p>
          <p className="text-sm text-neutral-500 mb-8 font-medium">3,400+ New Listings</p>
          <div>
            <Link 
              href="#" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg inline-flex items-center font-semibold transition-all duration-300 group"
            >
              Explore New Equipment 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* USED Equipment Side */}
        <div className="bg-neutral-800 relative p-12 lg:p-20 flex flex-col justify-center">
          {/* Subtle divider overlap for desktop */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none"></div>
          
          <div className="w-12 h-1 bg-neutral-600 mb-6"></div>
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-4 block">Used</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Used Equipment</h2>
          <p className="text-lg text-neutral-400 mb-6 max-w-lg">
            Find proven machines from dealers and equipment marketplaces worldwide.
          </p>
          <p className="text-sm text-neutral-500 mb-8 font-medium">21,600+ Used Listings</p>
          <div>
            <Link 
              href="#" 
              className="border border-neutral-700 hover:bg-white/5 text-white px-8 py-4 rounded-lg inline-flex items-center font-semibold transition-all duration-300 group"
            >
              Explore Used Equipment 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
