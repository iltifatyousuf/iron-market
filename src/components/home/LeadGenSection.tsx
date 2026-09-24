import React from 'react';
import Link from 'next/link';

export default function LeadGenSection() {
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-black/20 p-10 flex flex-col justify-center min-h-[400px]">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Sell<br/>Faster.</h2>
          <p className="text-xs uppercase font-bold tracking-widest opacity-60 mb-8 max-w-sm">Reach thousands of pre-qualified global buyers instantly. Turn your idle equipment into capital.</p>
        </div>
        <div className="col-span-1 p-10 flex flex-col justify-center items-center bg-black text-white min-h-[400px]">
           <Link href="/contact" className="w-48 h-48 rounded-full border border-white hover:bg-red-500 hover:border-red-500 transition-colors flex items-center justify-center text-center p-8 group">
             <span className="font-bold uppercase tracking-widest text-[10px] group-hover:scale-110 transition-transform">List<br/>Equipment<br/>&rarr;</span>
           </Link>
        </div>
      </div>
    </section>
  );
}