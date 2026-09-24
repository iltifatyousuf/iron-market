'use client';
import Link from 'next/link';
import { categories } from '@/data/categories';

export default function BrowseByEquipment() {
  return (
    <section className="w-full bg-black text-white overflow-hidden font-sans border-b-[0.5px] border-white/20">
      
      {/* Title Block */}
      <div className="grid grid-cols-1 w-full">
        <div className="col-span-1 border-b-[0.5px] border-white/20 p-10 flex flex-col md:flex-row md:items-end justify-between bg-white text-black relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60">/ CATEGORIES</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
               Find equipment<br/>for every job.
             </h2>
          </div>
          <Link href="/equipment" className="mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-red-500 transition">
            Browse Catalog 
            <span className="w-5 h-5 bg-black text-white rounded-full inline-flex items-center justify-center">&darr;</span>
          </Link>
        </div>
      </div>

      {/* Grid Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
          {categories?.map((category: any, idx: number) => {
            // Chessboard alternating pattern
            const isWhite = (idx % 2 === 0 && Math.floor(idx / 4) % 2 === 1) || (idx % 2 === 1 && Math.floor(idx / 4) % 2 === 0);
            const bgClass = isWhite ? 'bg-white text-black' : 'bg-black text-white';
            const hoverAccent = isWhite ? 'hover:bg-red-500 hover:text-white' : 'hover:bg-red-500 hover:text-white';
            const arrowClass = isWhite ? 'bg-black text-white' : 'bg-white text-black';

            return (
              <Link key={idx} href={`/equipment?category=${category.slug}`} className={`col-span-1 border-b-[0.5px] border-r-[0.5px] border-white/20 p-8 flex flex-col min-h-[250px] group transition-colors duration-500 ${bgClass} ${hoverAccent}`}>
                <div className="flex justify-between items-start mb-auto relative z-10">
                  <span className={`w-12 h-12 rounded-full border-[0.5px] flex items-center justify-center text-xl ${isWhite ? 'border-black/20' : 'border-white/20'}`}>
                    {category.icon || '🚜'}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">
                    {category.count || '0'}
                  </span>
                </div>
                
                <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{category.name}</h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-4 transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-red-500 ${arrowClass}`}>
                    ↗
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </section>
  );
}
