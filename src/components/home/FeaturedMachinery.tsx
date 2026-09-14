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
    <section className="py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold mb-2 block">Hand-Picked</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Equipment</h2>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Explore machines selected from our marketplace partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <div key={item.id} className="bg-transparent border border-neutral-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
              <div className="relative h-64 bg-neutral-800 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                  style={{ backgroundImage: `url(${item.images?.[0] || 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&q=80'})` }}
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">
                  FEATURED
                </div>
                <div className="absolute top-4 right-4 bg-neutral-900/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                  {item.condition}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1">{item.brand} {item.model}</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  {item.year} • {(item.hours || 0).toLocaleString()} hrs
                </p>

                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center text-sm text-neutral-500">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-neutral-500">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    {item.sellerName}
                    {item.sellerVerified && <span className="ml-1 text-green-500 text-xs">✓</span>}
                  </div>
                </div>

                <div className="text-2xl font-bold text-orange-500 mt-auto mb-6">
                  {formatPrice(parseFloat(item.price), item.currency || 'USD')}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link href={`/equipment/${item.slug}`} className="border border-neutral-700 text-white hover:bg-white/5 py-3 rounded-lg text-sm font-semibold transition-colors text-center">
                    View Details
                  </Link>
                  <Link href={`/equipment/${item.slug}`} className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-sm font-semibold transition-colors text-center">
                    View Offer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/equipment" className="inline-flex items-center text-white hover:text-orange-500 font-semibold transition-colors">
            View All Equipment <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
