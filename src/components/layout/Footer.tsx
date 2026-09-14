import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-neutral-400 mb-6">Get the latest equipment listings and market insights.</p>
          <form className="flex max-w-md gap-3" action="#">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-orange-500"
              required 
            />
            <button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Marketplace</h3>
            <ul className="space-y-3">
              <li><Link href="/equipment" className="text-sm text-neutral-500 hover:text-neutral-300 transition">All Equipment</Link></li>
              <li><Link href="/equipment?condition=new" className="text-sm text-neutral-500 hover:text-neutral-300 transition">New Equipment</Link></li>
              <li><Link href="/equipment?condition=used" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Used Equipment</Link></li>
              <li><Link href="/featured" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Featured Machinery</Link></li>
              <li><Link href="/compare" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Compare Machines</Link></li>
              <li><Link href="/insights" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Industry Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Equipment</h3>
            <ul className="space-y-3">
              <li><Link href="/equipment?category=excavators" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Excavators</Link></li>
              <li><Link href="/equipment?category=bulldozers" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Bulldozers</Link></li>
              <li><Link href="/equipment?category=loaders" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Loaders</Link></li>
              <li><Link href="/equipment?category=cranes" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Cranes</Link></li>
              <li><Link href="/equipment?category=dump-trucks" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Dump Trucks</Link></li>
              <li><Link href="/equipment?category=forklifts" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Forklifts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/guides" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Buying Guides</Link></li>
              <li><Link href="/news" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Equipment News</Link></li>
              <li><Link href="/insights" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Market Insights</Link></li>
              <li><Link href="/calculator" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Equipment Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-neutral-500 hover:text-neutral-300 transition">About</Link></li>
              <li><Link href="/contact" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Contact</Link></li>
              <li><Link href="/partner" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Partner With Us</Link></li>
              <li><Link href="/advertise" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Advertise</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Terms</Link></li>
              <li><Link href="/affiliate-disclosure" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Affiliate Disclosure</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-neutral-500 hover:text-neutral-300 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">© 2025 IRONMARKET. All rights reserved.</p>
          <p className="text-xs text-neutral-700">An affiliate marketplace. IRONMARKET does not sell equipment directly.</p>
        </div>
      </div>
    </footer>
  );
}
