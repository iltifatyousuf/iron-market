'use client';

import { useState, useEffect } from 'react';

export default function ImportListingsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ imported: number, skipped: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number, gsa: number, curated: number } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'stats' })
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch stats', e);
    }
  };

  const handleImport = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'gsa' })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Import failed');
      
      setResult({ imported: data.imported, skipped: data.skipped });
      fetchStats();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">GSA Auto-Import</h2>
      <p className="text-neutral-400 text-sm mb-6">
        Pull live government surplus heavy equipment listings directly from the GSA Auctions API into the marketplace.
      </p>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#111] rounded-lg border border-white/5">
          <div>
            <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider">Curated Listings</div>
            <div className="text-2xl font-bold text-white">{stats.curated}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-500 uppercase font-bold tracking-wider">GSA Listings</div>
            <div className="text-2xl font-bold text-orange-500">{stats.gsa}</div>
          </div>
        </div>
      )}

      <button
        onClick={handleImport}
        disabled={isLoading}
        className="w-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Importing from GSA...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Run GSA Sync
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-lg">
          Successfully imported {result.imported} listings! (Skipped {result.skipped} duplicates)
        </div>
      )}
    </div>
  );
}
