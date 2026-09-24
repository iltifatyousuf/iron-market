'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// Custom Markdown components
const MessageContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert max-w-none text-sm
      prose-p:leading-relaxed prose-p:mb-4 
      prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-current prose-strong:font-bold
      prose-ul:list-disc prose-ul:ml-4 prose-ul:mb-4
      prose-ol:list-decimal prose-ol:ml-4 prose-ol:mb-4
      prose-li:mb-1
      prose-headings:text-current prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-widest
      prose-h3:text-sm prose-h3:mt-4 prose-h3:mb-2
      prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs"
    >
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => {
            const isInternal = props.href?.startsWith('/') || props.href?.includes('ironmarket');
            if (isInternal) {
              return <Link href={props.href!} className="text-red-500 hover:underline">{props.children}</Link>;
            }
            return <a target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline" {...props} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const SUGGESTED_PROMPTS = [
  "I need a 20-ton excavator under $150k",
  "What's the difference between CAT 320 and Komatsu PC210?",
  "Looking for used bulldozers in Dubai",
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/ai/chat',
    initialMessages: [],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSuggestion = (prompt: string) => {
    append({
      role: 'user',
      content: prompt,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 border-[0.5px] border-black/20 flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-black text-white rounded-full hover:bg-red-500'
            : 'bg-red-500 text-white rounded-none hover:bg-white hover:text-black hover:border-black'
        }`}
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="font-bold uppercase tracking-widest text-[10px]">A.I.</span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[90] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white text-black border-[0.5px] border-black/20 flex flex-col overflow-hidden rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)] font-sans">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b-[0.5px] border-black/20 bg-black text-white">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase font-bold tracking-widest">A.I. ADVISOR SYSTEM</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">
              <span className="font-bold text-[10px] tracking-widest uppercase">CLOSE X</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-100">
            {messages.length === 0 && (
              <div className="flex flex-col h-full justify-center">
                <div className="font-bold uppercase text-[10px] tracking-widest opacity-60 text-red-500 mb-2">/ INIT</div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">How can we<br/>assist you?</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-8 max-w-[280px] leading-relaxed">
                  Query our database for machinery, specs, or market insights.
                </p>
                <div className="w-full space-y-2">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(prompt)}
                      className="w-full text-left text-[10px] uppercase font-bold tracking-widest bg-white border-[0.5px] border-black/20 hover:border-red-500 hover:text-red-500 px-4 py-3 transition-colors"
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
                  className={`max-w-[85%] px-4 py-3 border-[0.5px] ${
                    message.role === 'user'
                      ? 'bg-black text-white border-black/20'
                      : 'bg-white text-black border-black/20'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="text-black prose-invert-none prose-a:text-red-500 prose-headings:text-black">
                      <MessageContent content={message.content} />
                    </div>
                  ) : (
                    <p className="text-xs font-bold tracking-widest uppercase leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-[0.5px] border-black/20 px-4 py-3">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            id="ai-chat-form"
            onSubmit={handleFormSubmit}
            className="p-4 border-t-[0.5px] border-black/20 bg-white"
          >
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="ENTER QUERY..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-[0.5px] border-black/20 px-4 py-3 text-xs uppercase font-bold tracking-widest text-black placeholder:text-black/40 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-black hover:bg-red-500 disabled:bg-neutral-300 disabled:text-neutral-500 text-white px-6 py-3 transition-colors text-[10px] uppercase font-bold tracking-widest"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
