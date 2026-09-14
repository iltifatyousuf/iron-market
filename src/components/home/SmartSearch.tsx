'use client';
import { useState } from 'react';

export default function SmartSearch() {
  const [query, setQuery] = useState('');
  
  const chips = [
    'Excavator under $150k',
    'Used wheel loader',
    '20-ton excavator',
    'Crane in UAE',
    'Bulldozer for mining'
  ];

  return (
    <section className="py-32 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold mb-4 block">
          AI-Powered
        </span>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Tell Us What You Need.
        </h2>
        
        <p className="text-lg text-neutral-400 mb-12">
          Describe your requirements in plain language. Our intelligent search helps match you with the right equipment.
        </p>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2 mb-8 transition-colors focus-within:border-orange-500/50">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="I need an excavator for a large construction project in Dubai..."
            className="w-full bg-transparent text-white text-lg p-4 focus:outline-none resize-none h-32"
          />
          <div className="flex justify-end p-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Find Matching Equipment
            </button>
          </div>
        </div>

        <div className="text-left">
          <p className="text-sm text-neutral-500 mb-4">Try these:</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(chip)}
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-2 rounded-full text-sm hover:border-orange-500 hover:text-white transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
        
        <p className="text-xs text-neutral-600">
          Coming soon: AI-powered equipment matching
        </p>
      </div>
    </section>
  );
}
