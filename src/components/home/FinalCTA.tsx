import React from 'react';
import Link from 'next/link';
export default function FinalCTA() {
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="p-16 md:p-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-10">Start<br/>Building.</h2>
        <Link href="/equipment" className="bg-red-500 hover:bg-white hover:text-black text-white uppercase text-[10px] font-bold tracking-widest px-10 py-5 rounded-full transition-colors">
          Browse Inventory •
        </Link>
      </div>
    </section>
  );
}