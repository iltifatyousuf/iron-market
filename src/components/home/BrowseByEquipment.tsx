'use client';
import Link from 'next/link';
import { categories } from '@/data/categories';

export default function BrowseByEquipment() {
  return (
    <section className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold mb-2 block">Equipment Categories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Find Equipment for Every Job</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((category: any, idx: number) => (
            <Link key={idx} href={`/equipment?category=${category.slug}`}>
              <div className="relative overflow-hidden rounded-lg group cursor-pointer border border-neutral-800 bg-black/20 backdrop-blur-sm border-y border-white/5 p-6 h-full hover:border-orange-500/50 hover:scale-[1.02] transition-all duration-300 flex flex-col">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600')] bg-cover bg-center grayscale contrast-150 brightness-50 group-hover:brightness-75 transition-all duration-500 opacity-20"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-4xl">{category.icon || '🚜'}</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded font-medium">
                    {category.count || '0'} Listings
                  </span>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-neutral-400 mb-4">{category.description}</p>
                  <div className="text-orange-500 text-sm font-semibold flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore <span className="ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
