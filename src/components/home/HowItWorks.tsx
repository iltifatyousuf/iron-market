import React from 'react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Find', desc: 'Search our massive global inventory of verified heavy machinery.' },
    { num: '02', title: 'Inspect', desc: 'Review detailed inspection reports, photos, and maintenance logs.' },
    { num: '03', title: 'Secure', desc: 'Negotiate and securely fund the transaction through our escrow partners.' },
    { num: '04', title: 'Deliver', desc: 'We handle global shipping, customs, and door-to-door delivery.' }
  ];

  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Title Block */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col justify-between bg-black text-white relative z-10 min-h-[400px]">
          <div className="font-bold uppercase text-[10px] tracking-widest opacity-60 text-red-500">/ PROCESS</div>
          <h2 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter mt-auto">
            How it<br/>works.
          </h2>
        </div>

        {/* Steps */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-4 w-full">
          {steps.map((step, idx) => (
            <div key={idx} className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col bg-white text-black min-h-[400px] hover:bg-red-500 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full border border-black group-hover:border-white flex items-center justify-center text-xs font-bold mb-8">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 mt-auto">{step.title}</h3>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
