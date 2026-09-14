'use client';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Machines', value: 25000, suffix: '+' },
    { label: 'Dealers', value: 1200, suffix: '+' },
    { label: 'Countries', value: 40, suffix: '+' },
    { label: 'Brands', value: 100, suffix: '+' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 bg-transparent overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 opacity-60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        <div className="inline-block border border-orange-500 rounded-full px-4 py-1.5 mb-8">
          <span className="text-xs font-semibold text-orange-500 tracking-wider uppercase">Global Heavy Equipment Marketplace</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          Find the Right Machinery.<br />Build Without Limits.
        </h1>
        
        <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-10">
          Discover heavy equipment from trusted dealers, manufacturers and marketplace partners around the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
            Explore Machinery
          </button>
          <button className="border border-white text-white hover:bg-white/5 px-8 py-4 rounded-lg transition-all duration-300">
            Find Equipment
          </button>
        </div>

        {/* Search Interface */}
        <div className="w-full max-w-5xl bg-neutral-900/90 border border-neutral-800 p-6 rounded-xl backdrop-blur-sm mb-16 text-left">
          <form action="/equipment" method="GET">
            <input 
              type="text" 
              name="search"
              placeholder="What equipment are you looking for? (e.g. CAT 320, Excavator)" 
              className="w-full bg-transparent border border-neutral-800 text-white px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-orange-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select name="category" className="bg-transparent border border-neutral-800 text-neutral-300 px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="">Equipment Type</option>
                <option value="Excavators">Excavators</option>
                <option value="Bulldozers">Bulldozers</option>
                <option value="Wheel Loaders">Wheel Loaders</option>
                <option value="Cranes">Cranes</option>
              </select>
              <select name="brand" className="bg-transparent border border-neutral-800 text-neutral-300 px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="">Brand</option>
                <option value="Caterpillar">Caterpillar</option>
                <option value="Komatsu">Komatsu</option>
                <option value="Volvo">Volvo</option>
                <option value="John Deere">John Deere</option>
              </select>
              <select name="location" className="bg-transparent border border-neutral-800 text-neutral-300 px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="">Location</option>
                <option value="Dubai, UAE">Dubai, UAE</option>
                <option value="Houston, USA">Houston, USA</option>
                <option value="London, UK">London, UK</option>
              </select>
              <select name="condition" className="bg-transparent border border-neutral-800 text-neutral-300 px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500">
                <option value="">Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
              Search Equipment
            </button>
          </form>
        </div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-neutral-800 pt-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">
                {inView ? stat.value.toLocaleString() : '0'}{stat.suffix}
              </div>
              <div className="text-neutral-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
