import React from 'react';
import Link from 'next/link';

export default function WhyUsSection() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="col-span-1 md:col-span-4 border-b-[0.5px] border-white/20 p-10 flex flex-col md:flex-row md:items-end justify-between bg-white text-black relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ WHYUS</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
               Why Us.
             </h2>
          </div>
          <Link href="#" className="mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-red-500 transition">
            Explore 
            <span className="w-5 h-5 bg-black text-white rounded-full inline-flex items-center justify-center">↗</span>
          </Link>
        </div>
        
        <div className="col-span-1 md:col-span-2 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-white/20 p-10 min-h-[300px] flex items-center justify-center bg-black text-white">
           <div className="w-64 h-64 border-[0.5px] border-dashed border-white/30 rounded-full flex items-center justify-center p-4">
              <div className="w-full h-full bg-white/5 rounded-full flex items-center justify-center text-xs uppercase tracking-widest opacity-50 text-center px-4">Content Block</div>
           </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 p-10 min-h-[300px] flex items-center justify-center bg-white text-black">
           <div className="w-full max-w-sm">
             <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Precision & Scale</h3>
             <p className="text-sm font-medium opacity-70 mb-8 uppercase tracking-widest leading-relaxed">We deliver unparalleled service for heavy machinery logistics, procurement, and deployment across the globe.</p>
             <button className="border border-black hover:bg-black hover:text-white uppercase text-[10px] font-bold tracking-widest px-8 py-4 rounded-full transition-colors w-full">
               Learn More
             </button>
           </div>
        </div>
      </div>
    </section>
  );
}
