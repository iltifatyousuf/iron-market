'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface Equipment {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  currency: string;
  status: string;
}

export default function AdminEquipmentList() {
  const [listings, setListings] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/equipment?limit=100${search ? `&search=${search}` : ''}`);
      const json = await res.json();
      setListings(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEquipment();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    
    try {
      const res = await fetch(`/api/admin/equipment/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setListings(listings.filter(l => l.id !== id));
      } else {
        alert('Failed to delete listing.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Equipment</h1>
        <Link href="/admin/equipment/new" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Add Equipment
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-neutral-800">
          <input
            type="text"
            placeholder="Search equipment by brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 bg-neutral-950 border border-neutral-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading equipment...</div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No equipment found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Machine</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {item.brand} {item.model}
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{item.year}</td>
                    <td className="px-6 py-4 text-neutral-300 font-medium">
                      {formatPrice(parseFloat(item.price), item.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/equipment/${item.slug}`} target="_blank" className="text-neutral-500 hover:text-white transition-colors" title="View">
                          👁️
                        </Link>
                        <Link href={`/admin/equipment/${item.id}`} className="text-blue-500 hover:text-blue-400 transition-colors" title="Edit">
                          ✏️
                        </Link>
                        <button onClick={() => handleDelete(item.id, `${item.brand} ${item.model}`)} className="text-red-500 hover:text-red-400 transition-colors" title="Delete">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
