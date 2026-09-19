'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import Link from 'next/link';

function formatPrice(price: string | number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(price));
}

function EquipmentCard({ item }: { item: any }) {
  return (
    <Link
      href={`/equipment/${item.slug}`}
      className="block bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all group"
    >
      <div className="relative h-36 bg-neutral-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${item.images?.[0] || 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=400&q=60'})`,
          }}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded-full">
          {item.condition}
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold text-white truncate">
          {item.brand} {item.model}
        </p>
        <p className="text-xs text-neutral-500 mt-0.5">
          {item.year} · {item.hours ? `${Number(item.hours).toLocaleString()} hrs` : 'N/A'} · {item.location}
        </p>
        <p className="text-sm font-bold text-orange-500 mt-1.5">
          {formatPrice(item.price)}
        </p>
      </div>
    </Link>
  );
}

function parseEquipmentResults(text: string) {
  const match = text.match(/===EQUIPMENT_RESULTS===\s*([\s\S]*?)\s*===END_RESULTS===/);
  if (!match) return { text, equipment: [] };

  try {
    const equipment = JSON.parse(match[1]);
    const cleanText = text
      .replace(/===EQUIPMENT_RESULTS===[\s\S]*?===END_RESULTS===/, '')
      .trim();
    return { text: cleanText, equipment };
  } catch {
    return { text, equipment: [] };
  }
}

function MessageContent({ content }: { content: string }) {
  const { text, equipment } = parseEquipmentResults(content);

  return (
    <div>
      <div className="whitespace-pre-wrap text-sm leading-relaxed">{text}</div>
      {equipment.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-3">
          {equipment.map((item: any, i: number) => (
            <EquipmentCard key={item.id || i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

const SUGGESTED_PROMPTS = [
  "Find me an excavator under $200,000",
  "I need a crane for a construction project",
  "Show me used Caterpillar bulldozers",
  "What's the best loader for mining?",
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } =
    useChat({
      api: '/api/ai/chat',
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
    // Small delay to let state update, then submit
    setTimeout(() => {
      const form = document.getElementById('ai-chat-form') as HTMLFormElement;
      form?.requestSubmit();
    }, 50);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
          isOpen
            ? 'bg-neutral-800 hover:bg-neutral-700 rotate-0'
            : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20"></span>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[90] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.1)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#0d0d0d]">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Equipment Advisor</p>
                <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                  Online · Powered by AI
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-700/20 flex items-center justify-center mb-4 border border-orange-500/20">
                  <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">AI Equipment Advisor</h3>
                <p className="text-xs text-neutral-500 mb-6 max-w-[280px]">
                  Tell me what kind of machinery you need. I'll search our database and recommend the best matches.
                </p>
                <div className="w-full space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(prompt)}
                      className="w-full text-left text-xs bg-[#111] hover:bg-[#1a1a1a] border border-white/5 hover:border-orange-500/30 rounded-lg px-3 py-2.5 text-neutral-400 hover:text-white transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-[#151515] text-neutral-300 border border-white/5 rounded-bl-md'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <MessageContent content={message.content} />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#151515] border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            id="ai-chat-form"
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/5 bg-[#0d0d0d]"
          >
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="Describe what you need..."
                disabled={isLoading}
                className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-600 text-white p-3 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
