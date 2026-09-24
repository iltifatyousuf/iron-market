import React from 'react';
import Link from 'next/link';
export default function BrandsSection() {
  const brands = ['CATERPILLAR', 'KOMATSU', 'VOLVO', 'HITACHI', 'JOHN DEERE', 'JCB', 'LIEBHERR', 'DOOSAN'];
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="col-span-1 md:col-span-4 border-b-[0.5px] border-black/20 p-10 flex flex-col md:flex-row md:items-end justify-between relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ DIRECTORY</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">Shop by Brand.</h2>
          </div>
          <Link href="/brands" className="mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-red-500 transition">
            View All Brands <span className="w-5 h-5 bg-black text-white rounded-full inline-flex items-center justify-center">↗</span>
          </Link>
        </div>
        {brands.map((brand, i) => (
          <Link href={'/equipment?brand=' + brand.toLowerCase()} key={i} className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-black/20 p-10 flex items-center justify-center min-h-[150px] hover:bg-black hover:text-white transition-colors group">
            <span className="font-bold uppercase tracking-widest text-lg group-hover:scale-110 transition-transform">{brand}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}