'use client';

import { useEffect, useState } from 'react';

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#06090e] pointer-events-none">
      
      {/* 1. Diagonal Stripes */}
      <div 
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)',
        }}
      />

      {/* 2. Tiny Dot Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Crosshair Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crosshairs" x="0" y="0" width="144" height="144" patternUnits="userSpaceOnUse">
              {/* Center Crosshair */}
              <path d="M 72 68 L 72 76 M 68 72 L 76 72" stroke="#ffffff" strokeWidth="1" fill="none" />
              {/* Corner Crosshairs (to ensure perfect tiling) */}
              <path d="M 0 -4 L 0 4 M -4 0 L 4 0" stroke="#ffffff" strokeWidth="1" fill="none" />
              <path d="M 144 -4 L 144 4 M 140 0 L 148 0" stroke="#ffffff" strokeWidth="1" fill="none" />
              <path d="M 0 140 L 0 148 M -4 144 L 4 144" stroke="#ffffff" strokeWidth="1" fill="none" />
              <path d="M 144 140 L 144 148 M 140 144 L 148 144" stroke="#ffffff" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosshairs)" />
        </svg>
      </div>

      {/* 3. Interactive Mouse Glow (Highlights the grid - SMALLER AREA) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.15), transparent 100%)`,
        }}
      />
      
      {/* 4. Interactive Cell Highlight (Block highlight - SMALLER AREA) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 opacity-40"
        style={{
          background: `radial-gradient(100px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.25), transparent 100%)`,
          maskImage: 'linear-gradient(#000, #000)',
          WebkitMaskImage: 'linear-gradient(#000, #000)',
          backgroundPosition: `${Math.floor(mousePosition.x / 144) * 144}px ${Math.floor(mousePosition.y / 144) * 144}px`,
        }}
      />
      
      {/* Overlay to dim the edges of the screen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06090e_100%)] opacity-80" />
    </div>
  );
}
