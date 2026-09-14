'use client';

import { useCompare } from '@/context/CompareContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="pt-32 bg-neutral-950 min-h-screen pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Compare Equipment</h1>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12">
            <div className="text-6xl mb-4">🚜</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Machines Selected</h2>
            <p className="text-neutral-400 mb-8">
              Browse our inventory and click "Compare" on up to 3 machines to see them side-by-side.
            </p>
            <Link href="/equipment" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
              Browse Equipment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get all unique specification labels across all compared items
  const allSpecLabels = new Set<string>();
  compareList.forEach(item => {
    if (item.specifications && Array.isArray(item.specifications)) {
      item.specifications.forEach((s: any) => allSpecLabels.add(s.label));
    }
  });
  const specLabelsArray = Array.from(allSpecLabels);

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Compare Equipment</h1>
            <p className="text-neutral-400">Comparing {compareList.length} machines side-by-side</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={clearCompare}
              className="text-neutral-400 hover:text-white transition text-sm font-medium"
            >
              Clear All
            </button>
            <Link href="/equipment" className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              + Add Another
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left min-w-[800px]">
            {/* Header / Basic Info */}
            <thead className="bg-neutral-950/50 border-b border-neutral-800">
              <tr>
                <th className="p-6 w-1/4 align-top">
                  <div className="text-sm text-neutral-500 uppercase tracking-wider font-bold">Specs</div>
                </th>
                {compareList.map(item => (
                  <th key={item.id} className="p-6 w-1/4 border-l border-neutral-800 align-top relative group">
                    <button 
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition opacity-0 group-hover:opacity-100"
                      title="Remove from comparison"
                    >
                      ✕
                    </button>
                    <div 
                      className="w-full aspect-[4/3] bg-neutral-800 rounded-lg mb-4 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80'})` }}
                    />
                    <div className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1">{item.brand}</div>
                    <div className="text-lg font-bold text-white mb-2 line-clamp-2">{item.model}</div>
                    <div className="text-2xl font-black text-white mb-4">
                      {formatPrice(parseFloat(item.price), item.currency)}
                    </div>
                    <Link href={`/equipment/${item.slug}`} className="block w-full bg-neutral-800 hover:bg-neutral-700 text-white text-center py-2 rounded-lg text-sm font-medium transition">
                      View Details
                    </Link>
                  </th>
                ))}
                {/* Empty columns to maintain layout if less than 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-6 w-1/4 border-l border-neutral-800 bg-neutral-900/30">
                    <div className="w-full aspect-[4/3] border-2 border-dashed border-neutral-800 rounded-lg flex items-center justify-center text-neutral-600 mb-4">
                      Add Machine
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-neutral-800">
              {/* General Specs */}
              <tr className="hover:bg-neutral-800/20 transition-colors">
                <td className="p-6 text-sm font-bold text-neutral-400">Year</td>
                {compareList.map(item => (
                  <td key={`year-${item.id}`} className="p-6 border-l border-neutral-800 text-white font-medium">{item.year}</td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-year-${i}`} className="p-6 border-l border-neutral-800 bg-neutral-900/30"></td>
                ))}
              </tr>
              <tr className="hover:bg-neutral-800/20 transition-colors">
                <td className="p-6 text-sm font-bold text-neutral-400">Condition</td>
                {compareList.map(item => (
                  <td key={`cond-${item.id}`} className="p-6 border-l border-neutral-800 text-white font-medium">{item.condition}</td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-cond-${i}`} className="p-6 border-l border-neutral-800 bg-neutral-900/30"></td>
                ))}
              </tr>
              <tr className="hover:bg-neutral-800/20 transition-colors">
                <td className="p-6 text-sm font-bold text-neutral-400">Hours</td>
                {compareList.map(item => (
                  <td key={`hours-${item.id}`} className="p-6 border-l border-neutral-800 text-white font-medium">{item.hours ? `${item.hours}h` : 'N/A'}</td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-hours-${i}`} className="p-6 border-l border-neutral-800 bg-neutral-900/30"></td>
                ))}
              </tr>
              <tr className="hover:bg-neutral-800/20 transition-colors">
                <td className="p-6 text-sm font-bold text-neutral-400">Location</td>
                {compareList.map(item => (
                  <td key={`loc-${item.id}`} className="p-6 border-l border-neutral-800 text-white font-medium">{item.location}</td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-loc-${i}`} className="p-6 border-l border-neutral-800 bg-neutral-900/30"></td>
                ))}
              </tr>

              {/* Technical Specs Header */}
              <tr>
                <td colSpan={4} className="bg-neutral-950/80 p-4 text-xs font-bold text-orange-500 uppercase tracking-widest border-y border-neutral-800">
                  Technical Specifications
                </td>
              </tr>

              {/* Dynamic Technical Specs */}
              {specLabelsArray.map((label, idx) => (
                <tr key={idx} className="hover:bg-neutral-800/20 transition-colors">
                  <td className="p-6 text-sm font-bold text-neutral-400">{label}</td>
                  {compareList.map(item => {
                    const spec = item.specifications?.find((s: any) => s.label === label);
                    return (
                      <td key={`spec-${item.id}-${idx}`} className="p-6 border-l border-neutral-800 text-white font-medium">
                        {spec ? `${spec.value} ${spec.unit}` : <span className="text-neutral-600">—</span>}
                      </td>
                    );
                  })}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <td key={`empty-spec-${idx}-${i}`} className="p-6 border-l border-neutral-800 bg-neutral-900/30"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
