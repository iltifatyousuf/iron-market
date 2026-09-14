'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'How does the marketplace work?',
    answer: 'IRONMARKET aggregates heavy equipment listings from dealers, manufacturers, auction houses, and marketplace partners worldwide. You can browse, compare, and connect with sellers directly through our platform.'
  },
  {
    question: 'Do you sell the equipment directly?',
    answer: 'No. IRONMARKET is a marketplace platform that connects buyers with sellers. We display listings from our network of dealers and partners. All transactions are handled between you and the seller.'
  },
  {
    question: 'Are the prices accurate?',
    answer: 'Prices are sourced directly from our marketplace partners and are updated regularly. However, prices may vary based on negotiation, shipping costs, and market conditions. Always confirm pricing directly with the seller.'
  },
  {
    question: 'Can I compare multiple machines?',
    answer: 'Yes. Our comparison tool allows you to select up to 3 machines and compare their specifications, pricing, and features side by side.'
  },
  {
    question: 'Can I find used machinery?',
    answer: 'Absolutely. The majority of our listings are high-quality used equipment from trusted dealers. You can filter by condition (New, Used, Certified Pre-Owned) in our search.'
  },
  {
    question: 'Which countries do you cover?',
    answer: 'We currently feature equipment from over 40 countries, including the United States, Canada, UK, Germany, UAE, Saudi Arabia, India, Australia, Japan, and South Africa, among others.'
  },
  {
    question: 'How do I contact a seller?',
    answer: 'Each listing has a "View Offer" or "Request Information" button that connects you directly with the seller or dealer through their website or our inquiry form.'
  },
  {
    question: 'How are listings updated?',
    answer: 'Our system regularly syncs with partner feeds and marketplace APIs to ensure listings are current. Machines that are sold or no longer available are automatically removed from the catalog.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold block mb-4">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-neutral-800">
                <button
                  onClick={() => toggleOpen(idx)}
                  className="w-full flex justify-between items-center py-6 text-left text-lg font-semibold text-white hover:text-orange-500 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-8">{faq.question}</span>
                  <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : 'text-neutral-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-neutral-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
