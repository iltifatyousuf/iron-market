export default function TrustStrip() {
  const brands = ['CAT', 'KOMATSU', 'VOLVO', 'LIEBHERR', 'JCB', 'JOHN DEERE', 'HITACHI', 'CASE', 'HYUNDAI', 'DOOSAN'];
  
  return (
    <section className="py-16 bg-transparent border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm text-neutral-500 uppercase tracking-widest text-center mb-10">
          Equipment from leading manufacturers and dealers
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="text-2xl font-bold text-neutral-600 hover:text-orange-500 transition-colors duration-300"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
