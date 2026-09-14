'use client';

import React, { useState, useEffect } from 'react';

export default function AIAdvisor() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Based on your requirements, I found 8 potentially suitable excavators. Here are the top matches:";
  
  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(intervalId);
      }
    }, 30);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold block mb-4">AI-POWERED</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Your AI Equipment Advisor</h2>
        <p className="text-lg text-neutral-400 max-w-3xl mx-auto">Describe your project. Our intelligent equipment assistant helps you identify the machinery that fits your requirements.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-transparent border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-black/20 backdrop-blur-sm border-y border-white/5 border-b border-neutral-800 p-4 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-white">IRONMARKET AI Advisor</span>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-6">
            <div className="bg-orange-500 text-white rounded-2xl rounded-br-sm p-4 max-w-[80%] ml-auto shadow-sm">
              I need a 20-ton excavator for a road construction project in Saudi Arabia. Budget is around $180,000.
            </div>

            <div className="bg-neutral-800 text-neutral-200 rounded-2xl rounded-bl-sm p-4 max-w-[80%] shadow-sm min-h-[3rem]">
              {typedText}
            </div>

            <div className="space-y-3">
              {/* Card 1 */}
              <div className="bg-black/20 backdrop-blur-sm border-y border-white/5 border border-neutral-700 rounded-lg p-4 flex gap-4 items-center">
                <div className="w-16 h-16 bg-neutral-700 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&q=80')" }}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Caterpillar 320 GC</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-medium">96% Match</span>
                  </div>
                  <div className="text-xs text-neutral-400 mb-2">2024 • 1,240 hrs • Dubai, UAE</div>
                  <div className="text-sm font-bold text-orange-500">$185,000</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-black/20 backdrop-blur-sm border-y border-white/5 border border-neutral-700 rounded-lg p-4 flex gap-4 items-center">
                <div className="w-16 h-16 bg-neutral-700 rounded-lg flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621922688758-2a2c9fc39e21?w=800&q=80')" }}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">SANY SY215C</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-medium">91% Match</span>
                  </div>
                  <div className="text-xs text-neutral-400 mb-2">2024 • 320 hrs • Shanghai, China</div>
                  <div className="text-sm font-bold text-orange-500">$128,000</div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 text-neutral-200 rounded-2xl rounded-bl-sm p-4 max-w-[80%] shadow-sm">
              Would you like me to filter by specific brands or show only machines in the Middle East region?
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-neutral-800 p-4 flex gap-4 bg-transparent">
            <input 
              type="text" 
              placeholder="Ask about equipment..." 
              className="bg-black/20 backdrop-blur-sm border-y border-white/5 border border-neutral-700 rounded-xl px-4 py-3 flex-1 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
              disabled
            />
            <button className="bg-orange-500 hover:bg-orange-600 rounded-xl p-3 text-white transition-colors flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
        <p className="text-center text-sm text-neutral-500 mt-6">Coming Soon — AI Equipment Matching</p>
      </div>
    </section>
  );
}
