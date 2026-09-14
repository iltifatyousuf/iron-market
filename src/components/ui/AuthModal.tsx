'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: '/account' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row bg-neutral-950 border border-neutral-800 animate-in fade-in zoom-in-95 duration-300"
        style={{ minHeight: '600px' }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full p-2 transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Brutalist Visual (Inspired by the reference image) */}
        <div className="relative w-full md:w-1/2 p-10 flex flex-col justify-between overflow-hidden">
          
          {/* Brutalist Image Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070')] bg-cover bg-center grayscale contrast-125 brightness-50 mix-blend-screen"></div>
          
          {/* Brutalist Crosshairs */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="modal-crosshairs" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 40 35 L 40 45 M 35 40 L 45 40" stroke="#ffffff" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#modal-crosshairs)" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#06090e]/80 via-transparent to-[#0c0c0c]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-12">
              <span className="text-white font-black text-2xl tracking-tighter">IRON</span>
              <span className="text-orange-400 font-black text-2xl tracking-tighter">MARKET</span>
            </div>
          </div>

          <div className="relative z-10 pb-8">
            <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-4">
              REAL<span className="text-orange-400 opacity-80">:</span>ESTATE <br/> FOR MACHINES
            </h2>
            <p className="text-orange-200/80 text-lg font-medium max-w-sm">
              Join the global network of heavy equipment dealers and buyers.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Forms (Dark Cards) */}
        <div className="w-full md:w-1/2 bg-[#0c0c0c] p-8 md:p-12 flex flex-col justify-center relative border-l border-neutral-800/50">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to IronMarket</h3>
              <p className="text-neutral-500 text-sm">Create an account or sign in to save machines and track your inquiries.</p>
            </div>

            {/* Google Login Card */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-neutral-200 text-black py-3.5 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Connecting securely...</span>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="px-4 bg-[#0c0c0c] text-neutral-600">or use email</span>
              </div>
            </div>

            {/* Email Collection Card (Visual only for now based on prompt) */}
            <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Email magic links coming soon! Please use Google Login."); }}>
                <div>
                  <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-3.5 px-4 rounded-xl font-semibold transition-colors border border-neutral-700"
                >
                  Continue with Email
                </button>
              </form>
            </div>
            
            <p className="text-center text-xs text-neutral-600 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
