'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Category, Brand } from '@/data/types';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

interface EquipmentRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  hours: number;
  condition: string;
  price: string;
  currency: string;
  location: string;
  images: string[];
  sellerName: string;
  sellerVerified: boolean;
  featured: boolean;
}

export default function EquipmentPage() {
  const [listings, setListings] = useState<EquipmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch equipment from API whenever filters change
  useEffect(() => {
    async function fetchEquipment() {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedBrand) params.set('brand', selectedBrand);
      if (selectedCondition) params.set('condition', selectedCondition);
      if (search) params.set('search', search);
      params.set('sort', sortBy);
      params.set('page', currentPage.toString());
      params.set('limit', '24');

      try {
        const res = await fetch(`/api/equipment?${params}`);
        const json = await res.json();
        setListings(json.data || []);
        setTotalCount(json.total || 0);
        setTotalPages(json.totalPages || 1);
      } catch (err) {
        console.error('Failed to fetch equipment:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEquipment();
  }, [selectedCategory, selectedBrand, selectedCondition, search, sortBy, currentPage]);

  const clearAll = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedCondition('');
    setCurrentPage(1);
  };

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">Equipment</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Heavy Equipment</h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full md:w-72 bg-neutral-900 border border-neutral-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <button
              className="md:hidden bg-neutral-800 text-white px-4 py-2 rounded-lg"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className={`lg:block w-full lg:w-72 flex-shrink-0 ${mobileFiltersOpen ? 'block fixed inset-0 z-50 bg-neutral-950 p-4 overflow-y-auto' : 'hidden'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              {mobileFiltersOpen ? (
                <button onClick={() => setMobileFiltersOpen(false)} className="text-white text-2xl">&times;</button>
              ) : (
                <button onClick={clearAll} className="text-sm text-orange-500 hover:text-orange-400">Clear All</button>
              )}
            </div>

            {/* Category Filter */}
            <div className="border-b border-neutral-800 py-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Category</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {categories.map((cat: Category) => (
                  <label key={cat.id} className="flex items-center text-neutral-400 cursor-pointer hover:text-white text-sm">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.name}
                      onChange={() => { setSelectedCategory(selectedCategory === cat.name ? '' : cat.name); setCurrentPage(1); }}
                      className="mr-3 accent-orange-500"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="border-b border-neutral-800 py-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Brand</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {brands.map((brand: Brand) => (
                  <label key={brand.id} className="flex items-center text-neutral-400 cursor-pointer hover:text-white text-sm">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand.name}
                      onChange={() => { setSelectedBrand(selectedBrand === brand.name ? '' : brand.name); setCurrentPage(1); }}
                      className="mr-3 accent-orange-500"
                    />
                    {brand.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="border-b border-neutral-800 py-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Condition</h3>
              <div className="space-y-2">
                {['New', 'Used', 'Certified Pre-Owned'].map((cond) => (
                  <label key={cond} className="flex items-center text-neutral-400 cursor-pointer hover:text-white text-sm">
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond}
                      onChange={() => { setSelectedCondition(selectedCondition === cond ? '' : cond); setCurrentPage(1); }}
                      className="mr-3 accent-orange-500"
                    />
                    {cond}
                  </label>
                ))}
              </div>
            </div>

            {mobileFiltersOpen && (
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg font-semibold"
              >
                Apply Filters
              </button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-neutral-400">{totalCount} Equipment Listings</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-neutral-800" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-neutral-800 rounded w-3/4" />
                      <div className="h-4 bg-neutral-800 rounded w-1/2" />
                      <div className="h-4 bg-neutral-800 rounded w-1/3" />
                      <div className="h-6 bg-neutral-800 rounded w-1/2 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((eq) => (
                  <div key={eq.id} className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300 group flex flex-col">
                    <div className="relative h-48 bg-neutral-800 overflow-hidden">
                      <div
                        className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${eq.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'})` }}
                      />
                      <span className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded">
                        {eq.condition}
                      </span>
                      {eq.featured && (
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {eq.brand} {eq.model}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-2">
                        {eq.year} • {eq.hours?.toLocaleString() || 0} hrs
                      </p>
                      <p className="text-sm text-neutral-500 flex items-center mb-1">
                        📍 {eq.location}
                      </p>
                      <p className="text-xs text-neutral-500 mb-4">
                        {eq.sellerName} {eq.sellerVerified && <span className="text-green-500 ml-1">✓</span>}
                      </p>

                      <div className="mt-auto pt-4 border-t border-neutral-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-orange-500">
                            {formatPrice(parseFloat(eq.price), eq.currency)}
                          </span>
                          <Link
                            href={`/equipment/${eq.slug}`}
                            className="text-sm text-orange-500 hover:text-orange-400 font-medium"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && listings.length === 0 && (
              <div className="text-center py-20 text-neutral-500">
                No equipment found matching your criteria.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-neutral-800 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition disabled:opacity-30"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition ${currentPage === page ? 'bg-orange-500 text-white' : 'border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-neutral-800 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition disabled:opacity-30"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
