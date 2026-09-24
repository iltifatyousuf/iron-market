import React from 'react';
import Link from 'next/link';
export default function LeadGenSection() {
  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-black/20 p-12 flex flex-col justify-center min-h-[400px]">
          <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60 text-red-500">/ FOR SELLERS</div>
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Sell your<br/>equipment.</h2>
          <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-10 max-w-sm leading-relaxed">Reach thousands of pre-qualified global buyers instantly. Turn your idle equipment into working capital.</p>
          <Link href="/contact" className="inline-block border border-black hover:bg-black hover:text-white uppercase text-[10px] font-bold tracking-widest px-8 py-4 rounded-full transition-colors w-max">
            List Equipment
          </Link>
        </div>
        <div className="col-span-1 p-12 flex flex-col justify-center bg-neutral-100 min-h-[400px]">
           <div className="w-full max-w-sm mx-auto">
             <div className="border-[0.5px] border-black/20 p-6 mb-4 bg-white">
                <div className="text-[10px] uppercase font-bold tracking-widest mb-2 text-red-500">Step 1</div>
                <div className="font-bold uppercase tracking-tight text-sm">Create a Dealer Account</div>
             </div>
             <div className="border-[0.5px] border-black/20 p-6 mb-4 bg-white">
                <div className="text-[10px] uppercase font-bold tracking-widest mb-2 text-red-500">Step 2</div>
                <div className="font-bold uppercase tracking-tight text-sm">Upload Inventory Details</div>
             </div>
             <div className="border-[0.5px] border-black/20 p-6 bg-white">
                <div className="text-[10px] uppercase font-bold tracking-widest mb-2 text-red-500">Step 3</div>
                <div className="font-bold uppercase tracking-tight text-sm">Connect with Global Buyers</div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}