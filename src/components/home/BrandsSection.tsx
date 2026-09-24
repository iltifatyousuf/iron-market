import React from 'react';
import Link from 'next/link';

export default function BrandsSection() {
  const brands = ['CATERPILLAR', 'KOMATSU', 'VOLVO', 'HITACHI', 'JOHN DEERE', 'JCB', 'LIEBHERR', 'DOOSAN'];
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="col-span-1 border-r-[0.5px] border-black/20 p-10 flex flex-col justify-end min-h-[300px]">
          <div className="font-bold uppercase text-[10px] tracking-widest opacity-60 text-red-500 mb-auto">/ BRAND DIRECTORY</div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">Shop by<br/>Brand.</h2>
        </div>
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4">
          {brands.map((brand, i) => (
            <div key={i} className="border-r-[0.5px] border-b-[0.5px] border-black/20 p-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer min-h-[150px]">
              <span className="font-black uppercase tracking-tighter text-xl text-center">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}