import React from 'react';

export default function IndustrySection() {
  const industries = ['CONSTRUCTION', 'MINING', 'AGRICULTURE', 'FORESTRY', 'MATERIAL HANDLING'];
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full">
        {industries.map((ind, i) => (
          <div key={i} className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-black/20 p-10 min-h-[400px] flex flex-col justify-between hover:bg-red-500 hover:text-white transition-colors cursor-pointer group">
            <span className="font-mono text-xs opacity-50">0{i+1}</span>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter group-hover:tracking-widest transition-all md:-rotate-90 md:origin-bottom-left md:translate-x-full md:-translate-y-full md:mt-auto">{ind}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}