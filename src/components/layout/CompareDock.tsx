'use client';

import { useCompare } from '@/context/CompareContext';
import Link from 'next/link';

export default function CompareDock() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
        <div className="flex-1 w-full overflow-x-auto no-scrollbar">
          <div className="flex gap-4">
            {compareList.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-neutral-950 p-2 rounded-lg border border-neutral-800 min-w-[200px]">
                <div 
                  className="w-12 h-12 rounded bg-cover bg-center shrink-0" 
                  style={{ backgroundImage: `url(${item.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&q=80'})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-neutral-400 truncate">{item.brand}</div>
                  <div className="text-sm text-white font-bold truncate">{item.model}</div>
                </div>
                <button 
                  onClick={() => removeFromCompare(item.id)}
                  className="p-1.5 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded transition"
                >
                  ✕
                </button>
              </div>
            ))}
            
            {compareList.length < 3 && (
              <div className="flex items-center justify-center min-w-[200px] bg-neutral-950/50 border border-dashed border-neutral-800 rounded-lg p-2 text-neutral-500 text-sm">
                Add up to {3 - compareList.length} more
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={clearCompare}
            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition"
          >
            Clear
          </button>
          <Link 
            href="/compare"
            className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition text-center whitespace-nowrap"
          >
            Compare ({compareList.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
