'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full bg-black text-white overflow-hidden font-sans border-t-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full relative">
        
        {/* Abstract Orbit Rings Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center z-0">
          <div className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] border-[0.5px] border-dashed border-white/10 rounded-full absolute -top-1/4 -right-1/4 animate-spin-slow"></div>
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[0.5px] border-dashed border-white/10 rounded-full absolute -bottom-1/4 -left-1/4 animate-spin-reverse-slow"></div>
        </div>

        {/* Row 1, Col 1: WHO WE ARE */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col justify-end min-h-[300px] relative z-10 bg-black">
          <h1 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter mb-8">
            Find<br />the right<br />machinery.
          </h1>
          <Link href="/equipment" className="mt-auto uppercase text-xs tracking-widest flex items-center gap-2 hover:text-orange-500 transition">
            Explore 
            <span className="w-5 h-5 bg-white text-black hover:bg-orange-500 hover:text-white transition-colors rounded-full inline-flex items-center justify-center font-bold">↗</span>
          </Link>
        </div>

        {/* Row 1, Col 2+3: HERO VIDEO PILL */}
        <div className="col-span-1 md:col-span-2 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col justify-center items-center relative z-10 bg-black">
          <div className="w-full h-full min-h-[200px] rounded-[100px] overflow-hidden relative group border-[0.5px] border-white/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572276597282-e3a5ecda391b?q=80&w=2070')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
               <button className="w-16 h-16 border border-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition group-hover:scale-110 backdrop-blur-sm bg-black/20">
                 <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
            <div className="absolute bottom-6 left-0 right-0 text-center uppercase tracking-widest text-xs font-bold text-white drop-shadow-md">
              Watch Promo
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-6">
             <h2 className="text-lg font-medium tracking-tight text-neutral-300">Heavy equipment door-to-door delivery.</h2>
             <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs opacity-50 cursor-not-allowed">&larr;</div>
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-xs hover:bg-white hover:text-black transition cursor-pointer">&rarr;</div>
             </div>
          </div>
        </div>

        {/* Row 1, Col 4: ELECTROCARS -> ELECTRIC MACHINES */}
        <div className="col-span-1 border-b-[0.5px] border-white/20 p-10 flex flex-col justify-center items-center relative z-10 bg-black text-center">
          <div className="w-48 h-48 rounded-full border-[0.5px] border-dashed border-white/30 p-2 mb-6 relative">
             <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800')] bg-cover bg-center mix-blend-luminosity hover:mix-blend-normal transition duration-500"></div>
             </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Zero Emission.</h3>
          <Link href="/equipment?category=electric" className="uppercase text-[10px] tracking-widest border-b border-white pb-1 hover:text-orange-500 hover:border-orange-500 transition text-neutral-400">
            Choose sustainability ↗
          </Link>
        </div>

        {/* Row 2, Col 1: WHITE BLOCK -> WHY CHOOSE US */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col bg-white text-black relative z-10 min-h-[350px]">
          <h1 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter mb-4 mt-auto">
            Why<br/>choose<br/>us?
          </h1>
          <Link href="/about" className="uppercase text-xs font-bold tracking-widest flex items-center gap-2 mt-8 hover:text-orange-500 transition">
            Read more 
            <span className="w-5 h-5 bg-black text-white rounded-full inline-flex items-center justify-center">&darr;</span>
          </Link>
        </div>

        {/* Row 2, Col 2: PIE CHART / STATS */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 bg-white text-black relative z-10 flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-full font-bold uppercase text-xs tracking-widest text-left absolute top-10 left-10">Diverse Inventory</div>
          
          <div className="relative w-48 h-48 border-[0.5px] border-dashed border-red-500 rounded-full mt-8 flex items-center justify-center">
            {/* Fake pie chart lines */}
            <div className="absolute w-full h-[1px] bg-red-500/50 rotate-45"></div>
            <div className="absolute w-[1px] h-full bg-red-500/50 rotate-12"></div>
            
            <div className="absolute top-4 left-4 text-xs font-bold text-red-500 text-center bg-white p-1">15%<br/><span className="text-[8px] text-neutral-400">CRANES</span></div>
            <div className="absolute bottom-8 left-2 text-xs font-bold text-red-500 text-center bg-white p-1">20%<br/><span className="text-[8px] text-neutral-400">EXCAVATORS</span></div>
            <div className="absolute right-4 top-1/2 text-xs font-bold text-red-500 text-center bg-white p-1">65%<br/><span className="text-[8px] text-neutral-400">EARTHMOVING</span></div>
          </div>
        </div>

        {/* Row 2, Col 3: BLURRED SAFETY BLOCK */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 relative z-10 overflow-hidden flex flex-col items-center justify-center min-h-[350px] bg-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888087817-299f187aebbf?q=80&w=800')] bg-cover bg-center blur-md opacity-40"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="relative z-20 border border-white/40 rounded-full px-4 py-1 mb-4 backdrop-blur-sm">
             <span className="uppercase text-[10px] tracking-widest text-white">Quality Inspected</span>
          </div>
          <h3 className="relative z-20 text-3xl font-bold text-center leading-tight text-white">
            Your trust is our<br/>top priority.
          </h3>
          <Link href="/insights" className="relative z-20 mt-6 uppercase text-[10px] tracking-widest flex items-center gap-4 text-white hover:text-orange-500 transition">
            READ MORE <span className="w-12 h-[1px] bg-current"></span>&rarr;
          </Link>
        </div>

        {/* Row 2, Col 4: MAP / CONTACT BLOCK */}
        <div className="col-span-1 border-b-[0.5px] border-white/20 p-10 bg-white text-black relative z-10 flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-full font-bold uppercase text-xs tracking-widest text-left absolute top-10 left-10">24/7 Availability</div>
          <div className="absolute inset-0 top-1/4 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-no-repeat bg-center"></div>
          
          <div className="relative z-20 mt-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Need equipment<br/>at any time?</h3>
            <button className="bg-red-500 hover:bg-red-600 text-white uppercase text-xs font-bold tracking-widest px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              Contact Us •
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
