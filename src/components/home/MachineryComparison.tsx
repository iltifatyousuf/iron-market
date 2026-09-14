import React from 'react';
import Link from 'next/link';

export default function MachineryComparison() {
  return (
    <section className="py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-orange-500 uppercase tracking-widest font-bold mb-4">Compare</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Compare Machines Before You Buy</h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Side-by-side specifications to help you choose the right equipment.
          </p>
        </div>

        <div className="bg-transparent border border-neutral-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="p-6 w-1/4"></th>
                <th className="p-6 w-1/4 border-l border-neutral-800">
                  <div className="flex flex-col gap-2">
                    <div className="h-24 bg-neutral-800 rounded-lg w-full"></div>
                    <span className="text-white font-bold text-lg">Caterpillar 320</span>
                    <span className="text-neutral-500 text-sm">2024</span>
                  </div>
                </th>
                <th className="p-6 w-1/4 border-l border-neutral-800">
                  <div className="flex flex-col gap-2">
                    <div className="h-24 bg-neutral-800 rounded-lg w-full"></div>
                    <span className="text-white font-bold text-lg">Komatsu PC210</span>
                    <span className="text-neutral-500 text-sm">2023</span>
                  </div>
                </th>
                <th className="p-6 w-1/4 border-l border-neutral-800">
                  <div className="flex flex-col gap-2">
                    <div className="h-24 bg-neutral-800 rounded-lg w-full"></div>
                    <span className="text-white font-bold text-lg">Volvo EC220</span>
                    <span className="text-neutral-500 text-sm">2024</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-neutral-800 bg-transparent">
                <td className="p-4 font-semibold text-neutral-400">Operating Weight</td>
                <td className="p-4 border-l border-neutral-800">22,200 kg</td>
                <td className="p-4 border-l border-neutral-800">21,500 kg</td>
                <td className="p-4 border-l border-neutral-800">22,100 kg</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-black/20 backdrop-blur-sm border-y border-white/5">
                <td className="p-4 font-semibold text-neutral-400">Engine Power</td>
                <td className="p-4 border-l border-neutral-800">121 kW</td>
                <td className="p-4 border-l border-neutral-800">123 kW</td>
                <td className="p-4 border-l border-neutral-800 text-orange-500 font-bold">129 kW</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-transparent">
                <td className="p-4 font-semibold text-neutral-400">Bucket Capacity</td>
                <td className="p-4 border-l border-neutral-800">1.19 m³</td>
                <td className="p-4 border-l border-neutral-800">1.08 m³</td>
                <td className="p-4 border-l border-neutral-800 text-orange-500 font-bold">1.21 m³</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-black/20 backdrop-blur-sm border-y border-white/5">
                <td className="p-4 font-semibold text-neutral-400">Max Digging Depth</td>
                <td className="p-4 border-l border-neutral-800">6,710 mm</td>
                <td className="p-4 border-l border-neutral-800">6,590 mm</td>
                <td className="p-4 border-l border-neutral-800 text-orange-500 font-bold">6,780 mm</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-transparent">
                <td className="p-4 font-semibold text-neutral-400">Year</td>
                <td className="p-4 border-l border-neutral-800">2024</td>
                <td className="p-4 border-l border-neutral-800">2023</td>
                <td className="p-4 border-l border-neutral-800">2024</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-black/20 backdrop-blur-sm border-y border-white/5">
                <td className="p-4 font-semibold text-neutral-400">Hours</td>
                <td className="p-4 border-l border-neutral-800">1,240</td>
                <td className="p-4 border-l border-neutral-800">2,850</td>
                <td className="p-4 border-l border-neutral-800 text-green-500 font-bold">680</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-transparent">
                <td className="p-4 font-semibold text-neutral-400">Location</td>
                <td className="p-4 border-l border-neutral-800">Dubai</td>
                <td className="p-4 border-l border-neutral-800">Houston</td>
                <td className="p-4 border-l border-neutral-800">London</td>
              </tr>
              <tr className="border-b border-neutral-800 bg-black/20 backdrop-blur-sm border-y border-white/5">
                <td className="p-4 font-semibold text-neutral-400">Price</td>
                <td className="p-4 border-l border-neutral-800">$185,000</td>
                <td className="p-4 border-l border-neutral-800 text-green-500 font-bold">$165,000</td>
                <td className="p-4 border-l border-neutral-800">$198,000</td>
              </tr>
              <tr>
                <td className="p-6 bg-transparent"></td>
                <td className="p-6 border-l border-neutral-800 bg-transparent text-center">
                  <Link href="#" className="inline-block w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium">View Details</Link>
                </td>
                <td className="p-6 border-l border-neutral-800 bg-transparent text-center">
                  <Link href="#" className="inline-block w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium">View Details</Link>
                </td>
                <td className="p-6 border-l border-neutral-800 bg-transparent text-center">
                  <Link href="#" className="inline-block w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium">View Details</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link href="#" className="text-orange-500 hover:text-orange-400 font-medium inline-flex items-center group">
            Compare Your Own Equipment 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
