import React from 'react';

const steps = [
  { num: '01', title: 'Search', desc: 'Find machinery based on category, brand, location, price and specifications.' },
  { num: '02', title: 'Compare', desc: 'Review specifications and compare multiple machines side by side.' },
  { num: '03', title: 'Connect', desc: 'Visit the dealer or affiliate offer, or submit an inquiry directly.' },
  { num: '04', title: 'Get to Work', desc: 'Connect with the seller and move your project forward.' },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-bold mb-4">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Heavy Equipment. Made Simple.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px border-t border-dashed border-neutral-700 z-0"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-8 relative">
                <span className="text-6xl font-black text-orange-500/20 group-hover:text-orange-500/40 transition-colors">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-neutral-400 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
