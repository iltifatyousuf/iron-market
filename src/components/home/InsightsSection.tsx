import React from 'react';

const articles = [
  {
    title: 'How Much Does an Excavator Cost in 2025?',
    category: 'Buying Guide',
    readTime: '8 min read',
    excerpt: 'Explore the latest pricing trends, factors affecting costs, and tips for finding the best deals on new and used excavators.',
    image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&q=80'
  },
  {
    title: 'New vs Used Heavy Equipment: Which Is Better?',
    category: 'Analysis',
    readTime: '6 min read',
    excerpt: 'An in-depth analysis of the pros and cons of buying new versus used heavy equipment for your construction projects.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
  },
  {
    title: 'Top Excavator Brands for Construction',
    category: 'Industry',
    readTime: '10 min read',
    excerpt: 'Discover the leading excavator manufacturers and compare their reliability, performance, and total cost of ownership.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'
  },
  {
    title: 'How to Choose the Right Wheel Loader',
    category: 'Buying Guide',
    readTime: '7 min read',
    excerpt: 'A comprehensive guide to selecting the optimal wheel loader based on bucket capacity, engine power, and application requirements.',
    image: 'https://images.unsplash.com/photo-1621922688758-2a2c9fc39e21?w=800&q=80'
  },
  {
    title: 'Heavy Equipment Buying Guide for First-Time Buyers',
    category: 'Guide',
    readTime: '12 min read',
    excerpt: 'Everything you need to know before making your first heavy machinery purchase, from financing to inspections.',
    image: 'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=800&q=80'
  }
];

export default function InsightsSection() {
  return (
    <section className="py-32 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold block mb-4">INSIGHTS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Heavy Equipment Insights</h2>
          </div>
          <a href="#" className="text-orange-500 hover:text-orange-400 font-medium transition-colors hidden md:block">
            View All Insights &rarr;
          </a>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-8 lg:pb-0 snap-x">
          {articles.slice(0, 3).map((article, idx) => (
            <div key={idx} className="bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden group hover:border-orange-500/50 transition-colors min-w-[300px] md:min-w-[400px] lg:min-w-0 snap-center shrink-0 flex flex-col">
              <div 
                className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-700 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${article.image}')` }}
              ></div>
              <div className="p-6 relative bg-neutral-950 z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-orange-500 uppercase font-bold tracking-wider">{article.category}</span>
                  <span className="text-xs text-neutral-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors leading-snug">{article.title}</h3>
                <p className="text-sm text-neutral-400 mt-3 line-clamp-2 flex-1">{article.excerpt}</p>
                <div className="mt-6 flex items-center text-sm font-semibold text-orange-500 group-hover:text-orange-400 transition-colors">
                  Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-block text-orange-500 hover:text-orange-400 font-medium transition-colors">
            View All Insights &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
