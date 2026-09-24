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
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Left Side: Title */}
        <div className="col-span-1 md:col-span-2 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 flex flex-col justify-end bg-white text-black min-h-[400px]">
          <div className="font-bold uppercase text-[10px] tracking-widest mb-auto opacity-60 text-red-500">/ AI-POWERED</div>
          <h2 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter">
            Tell us<br/>what you<br/>need.
          </h2>
        </div>

        {/* Right Side: Search Box */}
        <div className="col-span-1 md:col-span-2 p-10 flex flex-col justify-center bg-black text-white min-h-[400px] relative">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[0.5px] border-dashed border-white/40 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[ping_10s_ease-in-out_infinite]"></div>
          </div>

          <div className="relative z-10">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="I NEED AN EXCAVATOR FOR A LARGE CONSTRUCTION PROJECT IN DUBAI..."
              className="w-full bg-transparent text-white text-xl font-bold uppercase tracking-tight p-4 border-[0.5px] border-white/20 focus:outline-none focus:border-red-500 resize-none h-40 mb-4 transition-colors"
            />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {chips.slice(0, 3).map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(chip)}
                    className="border-[0.5px] border-white/20 text-white/60 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest hover:border-red-500 hover:text-white transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <button className="bg-red-500 hover:bg-white hover:text-black text-white uppercase text-[10px] font-bold tracking-widest px-8 py-4 rounded-full transition-colors whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                Find Match •
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
