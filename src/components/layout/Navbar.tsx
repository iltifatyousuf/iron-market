'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from '@/components/ui/AuthModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black text-white border-b-[0.5px] border-white/20">
        <div className="grid grid-cols-2 lg:grid-cols-12 w-full h-16">
          
          {/* Logo Section */}
          <div className="col-span-1 lg:col-span-2 border-r-[0.5px] border-white/20 flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <span className="font-mono font-bold text-xl tracking-tighter uppercase">IRON<span className="text-red-500">MARKET</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex col-span-7 items-center justify-center border-r-[0.5px] border-white/20 divide-x-[0.5px] divide-white/20">
            <Link href="/equipment" className="px-6 h-full flex items-center uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors w-full justify-center">Equipment</Link>
            <Link href="/brands" className="px-6 h-full flex items-center uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors w-full justify-center">Brands</Link>
            <Link href="/compare" className="px-6 h-full flex items-center uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors w-full justify-center">Compare</Link>
            <Link href="/insights" className="px-6 h-full flex items-center uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors w-full justify-center">Insights</Link>
            <Link href="/contact" className="px-6 h-full flex items-center uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-colors w-full justify-center">Contact</Link>
          </nav>

          {/* Desktop Action Section */}
          <div className="hidden lg:flex col-span-3 items-center">
            {session ? (
              <div className="flex h-full w-full">
                <Link href="/account" className="flex-1 h-full flex items-center justify-center border-r-[0.5px] border-white/20 hover:bg-white hover:text-black transition-colors px-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[80px]">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                </Link>
                <button onClick={() => signOut()} className="px-4 h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors border-r-[0.5px] border-white/20">
                  OUT
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex-1 h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors border-r-[0.5px] border-white/20"
              >
                Sign In
              </button>
            )}
            
            <Link 
              href="/contact" 
              className="flex-1 h-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              Sell •
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden col-span-1 justify-end items-center px-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2 border-[0.5px] border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="flex flex-col items-center space-y-8 w-full px-8">
            <Link href="/equipment" className="text-3xl font-bold uppercase tracking-tight text-white hover:text-red-500 transition-colors w-full text-center border-b-[0.5px] border-white/20 pb-4" onClick={() => setMobileMenuOpen(false)}>Equipment</Link>
            <Link href="/brands" className="text-3xl font-bold uppercase tracking-tight text-white hover:text-red-500 transition-colors w-full text-center border-b-[0.5px] border-white/20 pb-4" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
            <Link href="/compare" className="text-3xl font-bold uppercase tracking-tight text-white hover:text-red-500 transition-colors w-full text-center border-b-[0.5px] border-white/20 pb-4" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
            <Link href="/insights" className="text-3xl font-bold uppercase tracking-tight text-white hover:text-red-500 transition-colors w-full text-center border-b-[0.5px] border-white/20 pb-4" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            
            {session ? (
              <>
                <Link href="/account" className="text-xl font-medium text-white" onClick={() => setMobileMenuOpen(false)}>MY ACCOUNT</Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-xl font-medium text-neutral-500">LOG OUT</button>
              </>
            ) : (
              <button 
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="text-xl font-medium text-white uppercase"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
