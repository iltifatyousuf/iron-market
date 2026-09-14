'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equipment } from '@/data/types'; // Assuming we have this type

type CompareContextType = {
  compareList: any[];
  addToCompare: (item: any) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ironmarket_compare');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse compare list', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ironmarket_compare', JSON.stringify(compareList));
    }
  }, [compareList, isLoaded]);

  const addToCompare = (item: any) => {
    setCompareList((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      if (prev.length >= 3) {
        alert('You can only compare up to 3 machines at a time.');
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
