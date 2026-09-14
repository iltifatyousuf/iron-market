'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';
import ImageUpload from './ImageUpload';

export default function EquipmentForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    brand: '', model: '', category: '', year: new Date().getFullYear(),
    price: '', currency: 'USD', condition: 'Used', status: 'ACTIVE',
    location: '', country: '', sellerName: '', sellerType: 'Dealer',
    sellerVerified: false, description: '', featured: false,
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'],
    slug: '', categorySlug: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const generateSlug = () => {
    const slug = `${formData.brand}-${formData.model}-${formData.year}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setFormData((prev: any) => ({ ...prev, slug }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catName = e.target.value;
    const cat = categories.find(c => c.name === catName);
    setFormData((prev: any) => ({
      ...prev,
      category: catName,
      categorySlug: cat?.slug || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = initialData ? `/api/admin/equipment/${initialData.id}` : '/api/admin/equipment';
    const method = initialData ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/equipment');
        router.refresh();
      } else {
        alert('Failed to save equipment.');
      }
    } catch (err) {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8">
      {/* Basic Info */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Brand</label>
            <select name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="">Select Brand</option>
              {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleCategoryChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Year</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2 flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-300 mb-2">URL Slug</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <button type="button" onClick={generateSlug} className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm h-[42px]">
              Auto-generate
            </button>
          </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Pricing & Condition */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Pricing & Condition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Price (USD)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Certified Pre-Owned">Certified Pre-Owned</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="ACTIVE">Active (Live)</option>
              <option value="SOLD">Sold</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
          <div className="flex items-center pt-8">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-orange-500 rounded border-neutral-700" />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-neutral-300">Feature on Homepage</label>
          </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Location & Seller */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Location & Seller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" placeholder="City, State" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Seller Name</label>
            <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div className="flex items-center pt-8">
            <input type="checkbox" id="sellerVerified" name="sellerVerified" checked={formData.sellerVerified} onChange={handleChange} className="w-5 h-5 accent-orange-500 rounded border-neutral-700" />
            <label htmlFor="sellerVerified" className="ml-2 text-sm font-medium text-neutral-300">Verified Seller</label>
          </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Details */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Details</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Images</label>
            <ImageUpload 
              value={formData.images} 
              onChange={(urls) => setFormData((prev: any) => ({ ...prev, images: urls }))} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Equipment'}
        </button>
      </div>
    </form>
  );
}
