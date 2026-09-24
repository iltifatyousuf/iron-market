import React from 'react';
import Link from 'next/link';
export default function IndustrySection() {
  const industries = ['Construction', 'Mining', 'Agriculture', 'Forestry'];
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="col-span-1 md:col-span-4 border-b-[0.5px] border-black/20 p-10 flex flex-col md:flex-row md:items-end justify-between relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ SECTORS</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">Shop by Industry.</h2>
          </div>
        </div>
        {industries.map((ind, i) => (
          <Link href={'/equipment?industry=' + ind.toLowerCase()} key={i} className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-black/20 p-10 min-h-[300px] flex flex-col justify-between hover:bg-black hover:text-white transition-colors group">
            <span className="font-bold text-xs opacity-50 uppercase tracking-widest">0{i+1}</span>
            <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform">{ind}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}