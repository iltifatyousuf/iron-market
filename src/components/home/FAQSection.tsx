'use client';
import React, { useState } from 'react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'Are the machines inspected?', a: 'Yes, every piece of equipment undergoes a rigorous 120-point inspection by certified mechanics before being listed on IRONMARKET.' },
    { q: 'Do you handle international shipping?', a: 'Absolutely. We partner with global freight forwarders to handle port-to-port and door-to-door logistics anywhere in the world.' },
    { q: 'How does escrow payment work?', a: 'Funds are held in a secure escrow account and are only released to the seller once you have received and accepted the equipment.' },
    { q: 'Can I finance my purchase?', a: 'Yes, we offer flexible financing options through our network of industrial lenders for qualified buyers.' }
  ];

  return (
    <section className="w-full bg-white text-black font-sans border-b-[0.5px] border-black/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] md:border-b-0 border-black/20 p-10 flex flex-col bg-white min-h-[400px]">
          <div className="font-bold uppercase text-[10px] tracking-widest opacity-60 text-red-500 mb-auto">/ SUPPORT</div>
          <h2 className="text-5xl lg:text-6xl font-bold uppercase leading-none tracking-tighter">
            F.A.Q.
          </h2>
        </div>

        <div className="col-span-1 md:col-span-3 flex flex-col bg-black text-white">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b-[0.5px] border-white/20 cursor-pointer"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <div className="p-8 flex justify-between items-center hover:bg-white/5 transition-colors">
                 <h3 className="text-lg font-bold uppercase tracking-tight">{faq.q}</h3>
                 <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                   {openIdx === idx ? '−' : '+'}
                 </div>
              </div>
              {openIdx === idx && (
                <div className="px-8 pb-8 text-[10px] uppercase font-bold tracking-widest opacity-60 leading-relaxed max-w-2xl">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
