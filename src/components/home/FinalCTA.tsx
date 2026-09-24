import React from 'react';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="w-full bg-red-500 text-white font-sans">
      <div className="p-16 md:p-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12">Start<br/>Building.</h2>
        <Link href="/equipment" className="bg-black hover:bg-white hover:text-black text-white uppercase text-xs font-bold tracking-widest px-12 py-6 rounded-full transition-colors shadow-2xl">
          View Inventory •
        </Link>
      </div>
    </section>
  );
}