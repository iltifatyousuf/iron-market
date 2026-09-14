import React from 'react';
import Link from 'next/link';

const industries = [
  { name: 'Construction', icon: '🏗️', description: 'Excavators, loaders, and cranes for building projects' },
  { name: 'Mining', icon: '⛏️', description: 'Heavy-duty equipment for extraction and processing' },
  { name: 'Road & Infrastructure', icon: '🛣️', description: 'Graders, compactors, and pavers for road building' },
  { name: 'Agriculture', icon: '🚜', description: 'Tractors, loaders, and attachments for farming' },
  { name: 'Oil & Gas', icon: '🛢️', description: 'Specialized equipment for energy sector operations' },
  { name: 'Forestry', icon: '🌲', description: 'Harvesters, forwarders, and logging equipment' },
  { name: 'Material Handling', icon: '📦', description: 'Forklifts, telehandlers, and warehouse equipment' },
  { name: 'Demolition', icon: '💥', description: 'Breakers, crushers, and demolition excavators' },
];

export default function IndustrySection() {
  return (
    <section className="py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-bold mb-4">Industries</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Built for Your Industry</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <div key={i} className="bg-transparent border border-neutral-800 rounded-lg p-8 hover:border-orange-500/50 transition-all duration-300 group cursor-pointer flex flex-col h-full">
              <div className="text-4xl mb-6">{ind.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{ind.name}</h3>
              <p className="text-sm text-neutral-400 flex-grow mb-6">{ind.description}</p>
              <Link href="#" className="text-sm text-orange-500 font-medium inline-flex items-center">
                View Equipment <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
