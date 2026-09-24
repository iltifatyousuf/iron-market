import React from 'react';
import Link from 'next/link';

export default function NewUsedSection() {
  return (
    <section className="w-full font-sans border-b-[0.5px] border-white/20 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[500px]">
        <Link href="/equipment?condition=new" className="col-span-1 border-r-[0.5px] border-white/20 p-10 flex flex-col justify-between group relative overflow-hidden bg-white text-black hover:text-white transition-colors">
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <div className="relative z-10 font-bold uppercase text-[10px] tracking-widest text-red-500">/ CONDITION</div>
          <h2 className="relative z-10 text-6xl md:text-8xl font-black uppercase tracking-tighter mt-auto">NEW<br/>MACHINES</h2>
          <div className="relative z-10 mt-8 w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform">↗</div>
        </Link>
        <Link href="/equipment?condition=used" className="col-span-1 p-10 flex flex-col justify-between group relative overflow-hidden bg-black text-white hover:text-black transition-colors">
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <div className="relative z-10 font-bold uppercase text-[10px] tracking-widest text-red-500">/ CONDITION</div>
          <h2 className="relative z-10 text-6xl md:text-8xl font-black uppercase tracking-tighter mt-auto">USED<br/>MACHINES</h2>
          <div className="relative z-10 mt-8 w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:rotate-45 transition-transform">↗</div>
        </Link>
      </div>
    </section>
  );
}