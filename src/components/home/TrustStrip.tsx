export default function TrustStrip() {
  const brands = ['CATERPILLAR', 'KOMATSU', 'VOLVO', 'LIEBHERR', 'JCB', 'JOHN DEERE', 'HITACHI'];
  
  return (
    <section className="w-full bg-black text-white font-sans border-b-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-8 w-full">
        <div className="col-span-1 border-r-[0.5px] border-white/20 p-6 flex items-center justify-center bg-white text-black">
           <span className="text-[10px] uppercase font-bold tracking-widest text-center">Trusted<br/>Partners</span>
        </div>
        
        <div className="col-span-1 md:col-span-7 flex overflow-hidden relative">
          {/* Marquee effect for brands */}
          <div className="flex w-full overflow-x-auto no-scrollbar items-center py-6">
            <div className="flex gap-16 px-10 min-w-max items-center">
              {brands.map((brand, index) => (
                <div 
                  key={index} 
                  className="text-3xl font-black uppercase tracking-tighter text-white/30 hover:text-white transition-colors duration-300"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
