import React from 'react';
import Link from 'next/link';

export default function InsightsSection() {
  const articles = [
    { tag: 'Market Report', title: 'Q3 Construction Equipment Demand Surges in the Middle East', date: 'SEP 2025' },
    { tag: 'Guide', title: 'How to Inspect a Used Excavator Undercarriage', date: 'AUG 2025' },
    { tag: 'News', title: 'Caterpillar Announces Next-Gen Electric Loaders', date: 'JUL 2025' },
  ];

  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Title Block */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col justify-between bg-black text-white relative z-10 min-h-[400px]">
          <div className="font-bold uppercase text-[10px] tracking-widest opacity-60 text-red-500">/ NEWS</div>
          <h2 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter mt-auto">
            Market<br/>Insights.
          </h2>
        </div>

        {/* Article Blocks */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 w-full">
          {articles.map((article, idx) => (
            <Link key={idx} href="#" className={`col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col min-h-[400px] group transition-colors ${idx % 2 === 0 ? 'bg-white text-black hover:bg-black hover:text-white hover:border-white' : 'bg-black text-white hover:bg-white hover:text-black hover:border-black'}`}>
              <div className="flex justify-between items-center mb-8">
                 <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-full ${idx % 2 === 0 ? 'border-black group-hover:border-white' : 'border-white/40 group-hover:border-black'}`}>
                   {article.tag}
                 </span>
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">{article.date}</span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 mt-auto">{article.title}</h3>
              <div className="w-8 h-8 rounded-full border flex items-center justify-center mt-6 transition-transform group-hover:scale-110">
                ↗
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
