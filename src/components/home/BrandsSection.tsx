import React from 'react';
import Link from 'next/link';
import { brands } from '@/data/brands';

export default function BrandsSection() {
  return (
    <section className="py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-bold mb-4">Brands</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Explore by Brand</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands?.map((brand, i) => (
            <Link key={i} href={`/brands/${brand.slug || '#'}`} className="block group">
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-neutral-300 tracking-wider mb-2">{brand.logo}</h3>
                  <p className="text-sm text-neutral-500 mb-6">{brand.name}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-neutral-400">{brand.listingCount} listings</span>
                  <span className="text-sm text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium flex items-center">
                    Explore Brand <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
