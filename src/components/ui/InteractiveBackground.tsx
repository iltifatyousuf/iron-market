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

      {/* 2. Base Dot Grid (Faint white) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* 3. Glowing Dot Grid (Bright Orange, masked by mouse position) */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'radial-gradient(rgba(249, 115, 22, 1) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      {/* 4. Subtle ambient glow behind the dots */}
      <div 
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08), transparent 100%)`,
        }}
      />
      
      {/* Overlay to dim the edges of the screen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06090e_100%)] opacity-80 pointer-events-none" />
    </div>
  );
}
