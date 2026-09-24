import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white font-sans border-t-[0.5px] border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        
        {/* Newsletter Section */}
        <div className="col-span-1 md:col-span-2 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 bg-white text-black flex flex-col justify-end min-h-[300px]">
          <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tighter mb-4">Stay<br/>Updated.</h2>
          <p className="text-xs uppercase font-bold tracking-widest opacity-60 mb-8">Get the latest equipment listings.</p>
          <form className="flex w-full border border-black rounded-full overflow-hidden" action="#">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="flex-1 bg-transparent text-black px-6 py-4 uppercase text-[10px] font-bold tracking-widest focus:outline-none"
              required 
            />
            <button 
              type="submit" 
              className="bg-black hover:bg-red-500 text-white uppercase text-[10px] font-bold tracking-widest px-8 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links 1 */}
        <div className="col-span-1 border-r-[0.5px] border-b-[0.5px] border-white/20 p-10 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-10 text-red-500">Marketplace</h3>
            <ul className="space-y-4">
              <li><Link href="/equipment" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">All Equipment</Link></li>
              <li><Link href="/equipment?condition=new" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">New Equipment</Link></li>
              <li><Link href="/equipment?condition=used" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Used Equipment</Link></li>
              <li><Link href="/featured" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Featured</Link></li>
              <li><Link href="/compare" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Compare</Link></li>
            </ul>
        </div>

        {/* Links 2 */}
        <div className="col-span-1 border-b-[0.5px] border-white/20 p-10 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-10 text-red-500">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">About</Link></li>
              <li><Link href="/contact" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Contact</Link></li>
              <li><Link href="/partner" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Partner With Us</Link></li>
              <li><Link href="/privacy" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm font-bold uppercase tracking-tight hover:text-red-500 transition">Terms</Link></li>
            </ul>
        </div>

        {/* Bottom Bar */}
        <div className="col-span-1 md:col-span-4 p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <p>© 2025 IRONMARKET.</p>
          <div className="flex gap-4">
             <a href="#" className="hover:text-white transition">IN</a>
             <a href="#" className="hover:text-white transition">FB</a>
             <a href="#" className="hover:text-white transition">X</a>
          </div>
          <p>An affiliate marketplace.</p>
        </div>

      </div>
    </footer>
  );
}
