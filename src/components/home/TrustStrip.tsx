export default function TrustStrip() {
  const brands = ['CATERPILLAR', 'KOMATSU', 'VOLVO', 'LIEBHERR', 'JCB', 'JOHN DEERE', 'HITACHI'];
  const doubledBrands = [...brands, ...brands, ...brands, ...brands]; // Quadruple to ensure enough width
  
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="flex flex-col md:flex-row w-full">
        
        {/* Left static block */}
        <div className="w-full md:w-48 flex-shrink-0 border-b-[0.5px] md:border-b-0 md:border-r-[0.5px] border-white/20 p-6 flex items-center justify-center bg-white text-black z-10 relative">
           <span className="text-[10px] uppercase font-bold tracking-widest text-center">Trusted<br/>Partners</span>
        </div>
        
        {/* Animated Marquee */}
        <div className="flex-1 overflow-hidden relative flex items-center bg-black">
          
          {/* Subtle gradient masks for smooth fade in/out */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>

          <div className="flex w-max animate-marquee py-6 items-center">
            {doubledBrands.map((brand, index) => (
              <div 
                key={index} 
                className="text-4xl font-black uppercase tracking-tighter text-white/30 hover:text-white transition-colors duration-300 px-12"
              >
                {brand}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
