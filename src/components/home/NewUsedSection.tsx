import React from 'react';
import Link from 'next/link';
export default function NewUsedSection() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[400px]">
        <Link href="/equipment?condition=new" className="col-span-1 border-r-[0.5px] border-white/20 p-12 flex flex-col justify-between hover:bg-white hover:text-black transition-colors group">
          <div className="font-bold uppercase text-[10px] tracking-widest text-red-500 mb-8">/ FACTORY FRESH</div>
          <div className="w-16 h-16 rounded-full border-[0.5px] border-current flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">01</div>
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mt-auto">New<br/>Equipment.</h2>
        </Link>
        <Link href="/equipment?condition=used" className="col-span-1 p-12 flex flex-col justify-between hover:bg-white hover:text-black transition-colors group">
          <div className="font-bold uppercase text-[10px] tracking-widest text-red-500 mb-8">/ FIELD TESTED</div>
          <div className="w-16 h-16 rounded-full border-[0.5px] border-current flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">02</div>
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mt-auto">Used<br/>Machinery.</h2>
        </Link>
      </div>
    </section>
  );
}