'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-white font-black text-2xl">IRON</span>
              <span className="text-orange-500 font-black text-2xl">MARKET</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/equipment" className="text-sm font-medium text-neutral-300 hover:text-white transition">Equipment</Link>
            <Link href="/brands" className="text-sm font-medium text-neutral-300 hover:text-white transition">Brands</Link>
            <Link href="/compare" className="text-sm font-medium text-neutral-300 hover:text-white transition">Compare</Link>
            <Link href="/industries" className="text-sm font-medium text-neutral-300 hover:text-white transition">Industries</Link>
            <Link href="/insights" className="text-sm font-medium text-neutral-300 hover:text-white transition">Insights</Link>
          </nav>

          <div className="hidden md:flex">
            <Link href="/list-equipment" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition">
              List Equipment
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white focus:outline-none"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-neutral-950/98 z-50 flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <Link href="/equipment" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Equipment</Link>
          <Link href="/brands" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
          <Link href="/compare" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
          <Link href="/industries" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
          <Link href="/insights" className="text-2xl font-bold text-white" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
          <Link href="/list-equipment" className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-8 py-4 rounded-lg mt-4 transition" onClick={() => setMobileMenuOpen(false)}>
            List Equipment
          </Link>
        </div>
      )}
    </header>
  );
}
