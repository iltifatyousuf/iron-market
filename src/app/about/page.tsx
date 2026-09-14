import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | IRONMARKET',
  description: 'Learn about IRONMARKET, the premier global marketplace for heavy machinery and construction equipment.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About IRONMARKET</h1>
        
        <div className="prose prose-invert prose-orange max-w-none">
          <p className="text-xl text-neutral-400 leading-relaxed mb-12">
            IRONMARKET is a specialized global marketplace connecting buyers and sellers of heavy machinery. 
            We make it easier for construction companies, contractors, and dealers to find, compare, and acquire the equipment they need to build the world.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-6">Our Mission</h2>
          <p className="text-neutral-300 leading-relaxed">
            The heavy equipment industry has historically been fragmented and localized. Finding the right machine often meant relying on limited local networks or scrolling through outdated catalogs. 
            Our mission is to bring transparency, speed, and global reach to the heavy equipment market. 
            We provide a centralized platform where buyers can search thousands of listings from trusted sellers worldwide, backed by powerful tools to help them make informed decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-orange-500 mb-2">25K+</div>
              <div className="text-neutral-400 font-medium">Machines Listed</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-orange-500 mb-2">1.2K+</div>
              <div className="text-neutral-400 font-medium">Verified Sellers</div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-black text-orange-500 mb-2">40+</div>
              <div className="text-neutral-400 font-medium">Countries Served</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">How We Work</h2>
          <p className="text-neutral-300 leading-relaxed mb-6">
            IRONMARKET operates as an aggregator and lead-generation platform. We don't own the inventory ourselves. 
            Instead, we partner with top manufacturers, authorized dealers, and reputable auction houses to showcase their inventory to a global audience.
          </p>
          <ul className="list-disc pl-6 text-neutral-300 space-y-3 mb-12">
            <li><strong>For Buyers:</strong> A single destination to search inventory across multiple sellers, compare specs, and submit inquiries directly to the source.</li>
            <li><strong>For Sellers:</strong> A powerful marketing channel that drives high-intent leads and expands your reach beyond your local market.</li>
          </ul>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 md:p-12 text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">Looking to sell your equipment?</h2>
            <p className="text-neutral-400 mb-8">Join thousands of dealers who use IRONMARKET to reach buyers globally.</p>
            <a href="/contact" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
