'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from '@/components/ui/AuthModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full flex justify-center z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled ? 'top-4' : 'top-8'
        }`}
      >
        <div 
          className="flex items-center justify-between bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 rounded-full px-4 py-2"
          style={{ 
            width: '90%', 
            maxWidth: '1200px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center px-4">
            <Link href="/" className="flex items-center">
              <span className="text-white font-black text-xl tracking-tighter">IRON</span>
              <span className="text-orange-500 font-black text-xl tracking-tighter">MARKET</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center bg-[#0d0d0d] rounded-full px-2 py-1.5 border border-white/5">
            <Link href="/equipment" className="text-neutral-400 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all text-sm font-medium">Equipment</Link>
            <Link href="/brands" className="text-neutral-400 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all text-sm font-medium">Brands</Link>
            <Link href="/compare" className="text-neutral-400 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all text-sm font-medium">Compare</Link>
            <Link href="/insights" className="text-neutral-400 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all text-sm font-medium">Insights</Link>
            <Link href="/contact" className="text-neutral-400 hover:text-white hover:bg-white/5 px-4 py-1.5 rounded-full transition-all text-sm font-medium">Contact</Link>
          </nav>

          {/* Desktop Action Section */}
          <div className="hidden lg:flex items-center space-x-3 pl-2">
            
            <button className="text-neutral-400 hover:text-white bg-[#0d0d0d] border border-white/5 hover:bg-white/10 p-2.5 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {session ? (
              <div className="flex items-center space-x-3 bg-[#0d0d0d] border border-white/5 rounded-full p-1.5 pr-4">
                <Link href="/account" className="flex items-center space-x-2 text-sm text-neutral-300 hover:text-white">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="User" className="w-7 h-7 rounded-full border border-neutral-800" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-[10px]">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="font-medium max-w-[80px] truncate">{session.user?.name?.split(' ')[0]}</span>
                </Link>
                <div className="w-px h-4 bg-white/10"></div>
                <button onClick={() => signOut()} className="text-xs font-semibold text-neutral-500 hover:text-white transition-colors">OUT</button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#0d0d0d] hover:bg-white/10 text-white px-5 py-2 rounded-full font-medium transition-colors text-sm border border-white/5"
              >
                Sign In
              </button>
            )}
            
            <Link 
              href="/contact" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-medium transition-colors text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]"
            >
              Sell Equipment
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden pr-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white bg-[#0d0d0d] border border-white/5 p-2 rounded-full focus:outline-none"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-neutral-950/98 backdrop-blur-xl flex flex-col justify-center items-center">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-white p-2 rounded-full bg-white/10"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="flex flex-col items-center space-y-6">
            <Link href="/equipment" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Equipment</Link>
            <Link href="/brands" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
            <Link href="/compare" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
            <Link href="/insights" className="text-2xl font-bold text-white hover:text-orange-500 transition-colors" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            
            <div className="w-12 h-px bg-white/20 my-4"></div>
            
            {session ? (
              <>
                <Link href="/account" className="text-xl font-medium text-white" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="text-xl font-medium text-neutral-400">Log Out</button>
              </>
            ) : (
              <button 
                onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}
                className="text-xl font-medium text-white"
              >
                Sign In / Sign Up
              </button>
            )}
            
            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold px-8 py-3 rounded-full mt-4 transition" onClick={() => setMobileMenuOpen(false)}>
              Sell Equipment
            </Link>
          </nav>
        </div>
      )}
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
