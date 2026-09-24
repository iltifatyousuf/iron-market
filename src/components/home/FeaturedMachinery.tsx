import Link from 'next/link';
import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { formatPrice } from '@/lib/utils';

export default async function FeaturedMachinery() {
  // Fetch featured equipment directly from Neon
  const featured = await db.select()
    .from(equipment)
    .where(and(eq(equipment.featured, true), eq(equipment.status, 'ACTIVE')))
    .orderBy(desc(equipment.createdAt))
    .limit(6);

  if (featured.length === 0) return null;

  return (
    <section className="w-full bg-black text-white overflow-hidden font-sans border-b-[0.5px] border-white/20">
      
      {/* Title Block in the Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="col-span-1 md:col-span-4 border-b-[0.5px] border-white/20 p-10 flex flex-col md:flex-row md:items-end justify-between bg-black text-white relative z-10">
          <div>
             <div className="font-bold uppercase text-[10px] tracking-widest mb-6 opacity-60">/ FEATURED</div>
             <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
               Top tier<br/>inventory.
             </h2>
          </div>
          <Link href="/equipment" className="mt-8 md:mt-0 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 hover:text-orange-500 transition">
            View All 
            <span className="w-5 h-5 bg-white text-black rounded-full inline-flex items-center justify-center">↗</span>
          </Link>
        </div>

        {/* Machinery Grid Items */}
        {featured.map((item, idx) => {
          // Alternate styling for Bento look
          const isWhite = idx % 2 === 1;
          const bgClass = isWhite ? 'bg-white text-black' : 'bg-black text-white';
          const borderClass = isWhite ? 'border-neutral-200' : 'border-white/20';
          const accentClass = isWhite ? 'bg-black text-white' : 'bg-white text-black';
          
          return (
            <div key={item.id} className={`col-span-1 md:col-span-2 border-b-[0.5px] border-r-[0.5px] border-white/20 p-8 flex flex-col justify-between group ${bgClass}`}>
              
              <div className="flex justify-between items-start mb-8">
                 <div className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-full ${isWhite ? 'border-black' : 'border-white/40'}`}>
                   {item.condition}
                 </div>
                 <div className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-full ${isWhite ? 'border-black' : 'border-white/40'}`}>
                   {item.year} • {item.hours || 0}H
                 </div>
              </div>
              
              {/* Image masked in circle/pill */}
              <div className="flex-grow flex items-center justify-center py-10">
                 <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden relative group-hover:scale-105 transition-transform duration-700">
                    <div 
                      className="absolute inset-0 bg-cover bg-center mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                      style={{ backgroundImage: `url(${item.images?.[0] || 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&q=80'})` }}
                    />
                 </div>
              </div>

              <div className="mt-auto pt-6 border-t-[0.5px] border-inherit border-opacity-30 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{item.brand} {item.model}</h3>
                  <div className="text-sm opacity-60 mt-1 uppercase tracking-wider text-[10px]">{item.location}</div>
                  <div className={`text-xl font-bold mt-2 ${isWhite ? 'text-red-500' : 'text-red-500'}`}>
                    {formatPrice(parseFloat(item.price), item.currency || 'USD')}
                  </div>
                </div>
                
                <Link href={`/equipment/${item.slug}`} className={`w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110 ${accentClass}`}>
                  ↗
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
