'use client';

import { useCompare } from '@/context/CompareContext';

export default function CompareButton({ equipment }: { equipment: any }) {
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  
  const isSelected = compareList.some((item) => item.id === equipment.id);

  if (isSelected) {
    return (
      <button 
        onClick={(e) => { e.preventDefault(); removeFromCompare(equipment.id); }}
        className="flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition"
      >
        <span className="w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">✓</span>
        Added to Compare
      </button>
    );
  }

  return (
    <button 
      onClick={(e) => { e.preventDefault(); addToCompare(equipment); }}
      className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition"
    >
      <span className="w-4 h-4 rounded-full border border-neutral-500 flex items-center justify-center text-[10px]">+</span>
      Compare
    </button>
  );
}
