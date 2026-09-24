import React from 'react';

export default function GlobalMarketplace() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Map Block */}
        <div className="col-span-1 md:col-span-3 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 bg-black min-h-[400px] relative overflow-hidden flex items-center justify-center">
           <div className="font-bold uppercase text-[10px] tracking-widest absolute top-10 left-10 text-red-500 z-20">/ REACH</div>
           <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-no-repeat bg-center"></div>
           
           {/* Radar Ping */}
           <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full">
              <div className="w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
           </div>
           
           <h2 className="relative z-10 text-4xl md:text-6xl font-bold uppercase tracking-tighter text-center max-w-2xl">
             We ship<br/>anywhere on earth.
           </h2>
        </div>

        {/* Stats Column */}
        <div className="col-span-1 border-b-[0.5px] border-white/20 flex flex-col bg-white text-black">
           <div className="flex-1 border-b-[0.5px] border-black/20 p-10 flex flex-col justify-center">
             <div className="text-5xl font-bold uppercase tracking-tighter mb-2">120+</div>
             <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Ports Served</div>
           </div>
           <div className="flex-1 border-b-[0.5px] border-black/20 p-10 flex flex-col justify-center">
             <div className="text-5xl font-bold uppercase tracking-tighter mb-2">48<span className="text-red-500">H</span></div>
             <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Customs Clearance</div>
           </div>
           <div className="flex-1 p-10 flex flex-col justify-center">
             <div className="text-5xl font-bold uppercase tracking-tighter mb-2">0%</div>
             <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Logistics Hassle</div>
           </div>
        </div>

      </div>
    </section>
  );
}
