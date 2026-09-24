import React from 'react';
import Link from 'next/link';

export default function MachineryComparison() {
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      
      {/* Title Block */}
      <div className="grid grid-cols-1 w-full">
        <div className="col-span-1 border-b-[0.5px] border-black/20 p-10 flex flex-col md:flex-row md:items-end justify-between bg-black text-white relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ DATA HUB</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
               Compare before<br/>you buy.
             </h2>
          </div>
          <Link href="/compare" className="mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-red-500 transition">
            Launch Compare Tool
            <span className="w-5 h-5 bg-white text-black rounded-full inline-flex items-center justify-center">↗</span>
          </Link>
        </div>
      </div>

      {/* Grid Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Column 1: Labels */}
        <div className="hidden md:flex col-span-1 flex-col border-r-[0.5px] border-black/20 bg-white">
           <div className="h-48 border-b-[0.5px] border-black/20 p-6 flex items-end">
              <span className="uppercase text-[10px] font-bold tracking-widest opacity-40">SPECS</span>
           </div>
           {['Operating Weight', 'Engine Power', 'Bucket Capacity', 'Price'].map((label, idx) => (
             <div key={idx} className="h-16 border-b-[0.5px] border-black/20 px-6 flex items-center text-[10px] font-bold uppercase tracking-widest">
               {label}
             </div>
           ))}
        </div>

        {/* Column 2: Machine 1 */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-black/20 bg-white flex flex-col">
           <div className="h-48 border-b-[0.5px] border-black/20 p-6 flex flex-col justify-end bg-neutral-100">
              <h3 className="text-xl font-bold uppercase tracking-tight">CAT 320</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">2024 • EXCAVATOR</span>
           </div>
           {['22,200 KG', '121 KW', '1.19 M³', '$185,000'].map((val, idx) => (
             <div key={idx} className="h-16 border-b-[0.5px] border-black/20 px-6 flex items-center justify-between text-xs font-bold uppercase tracking-tight">
               <span className="md:hidden text-[10px] opacity-40">
                 {['Weight', 'Power', 'Capacity', 'Price'][idx]}
               </span>
               {val}
             </div>
           ))}
        </div>

        {/* Column 3: Machine 2 */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-black/20 bg-black text-white flex flex-col">
           <div className="h-48 border-b-[0.5px] border-white/20 p-6 flex flex-col justify-end relative">
              <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
              <h3 className="text-xl font-bold uppercase tracking-tight">KOMATSU PC210</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">2023 • EXCAVATOR</span>
           </div>
           {['21,500 KG', '123 KW', '1.08 M³', '$165,000'].map((val, idx) => (
             <div key={idx} className="h-16 border-b-[0.5px] border-white/20 px-6 flex items-center justify-between text-xs font-bold uppercase tracking-tight">
               <span className="md:hidden text-[10px] opacity-40">
                 {['Weight', 'Power', 'Capacity', 'Price'][idx]}
               </span>
               <span className={idx === 3 ? "text-red-500" : ""}>{val}</span>
             </div>
           ))}
        </div>

        {/* Column 4: Machine 3 */}
        <div className="col-span-1 border-b-[0.5px] border-black/20 bg-white flex flex-col">
           <div className="h-48 border-b-[0.5px] border-black/20 p-6 flex flex-col justify-end bg-neutral-100">
              <h3 className="text-xl font-bold uppercase tracking-tight">VOLVO EC220</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">2024 • EXCAVATOR</span>
           </div>
           {['22,100 KG', '129 KW', '1.21 M³', '$198,000'].map((val, idx) => (
             <div key={idx} className="h-16 border-b-[0.5px] border-black/20 px-6 flex items-center justify-between text-xs font-bold uppercase tracking-tight">
               <span className="md:hidden text-[10px] opacity-40">
                 {['Weight', 'Power', 'Capacity', 'Price'][idx]}
               </span>
               {val}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
