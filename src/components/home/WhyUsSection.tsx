import React from 'react';

const features = [
  {
    icon: '📊',
    title: 'Thousands of Listings',
    description: 'Browse over 25,000 machines from dealers and marketplaces across the globe.'
  },
  {
    icon: '🌍',
    title: 'Global Equipment',
    description: 'Equipment sourced from 40+ countries, covering every major market.'
  },
  {
    icon: '📋',
    title: 'Detailed Specifications',
    description: 'Full technical data, operating hours, condition reports and pricing for every machine.'
  },
  {
    icon: '🔍',
    title: 'Smart Search',
    description: 'Intelligent search and filtering to find exactly the right machine for your project.'
  },
  {
    icon: '⚖️',
    title: 'Machine Comparison',
    description: 'Compare specifications, pricing, and features side by side across multiple machines.'
  },
  {
    icon: '✅',
    title: 'Trusted Sellers',
    description: 'Verified dealers, manufacturers, and marketplace partners you can rely on.'
  }
];

export default function WhyUsSection() {
  return (
    <section className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold block mb-4">WHY IRONMARKET</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Everything You Need to Find the Right Machine</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-black/20 backdrop-blur-sm border-y border-white/5 border border-neutral-800 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300 hover:bg-neutral-800/50 group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mt-4">{feature.title}</h3>
              <p className="text-neutral-400 mt-2 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
