'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

export default function ArticleForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    title: '', slug: '', category: 'Industry News', excerpt: '',
    content: '', image: 'https://images.unsplash.com/photo-1581092595537-fa4d232c9186?w=800&q=80',
    author: 'IRONMARKET Team', status: 'DRAFT',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const generateSlug = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData((prev: any) => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = initialData ? `/api/admin/articles/${initialData.id}` : '/api/admin/articles';
    const method = initialData ? 'PUT' : 'POST';

    // Set publishedAt if status is PUBLISHED and wasn't before
    const submissionData = { ...formData };
    if (submissionData.status === 'PUBLISHED' && (!initialData || initialData.status !== 'PUBLISHED')) {
      submissionData.publishedAt = new Date().toISOString();
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        router.push('/admin/insights');
        router.refresh();
      } else {
        alert('Failed to save article.');
      }
    } catch (err) {
      alert('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Article Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
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
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="Industry News">Industry News</option>
              <option value="Buying Guides">Buying Guides</option>
              <option value="Equipment Reviews">Equipment Reviews</option>
              <option value="Market Trends">Market Trends</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">Image</label>
            <ImageUpload 
              value={formData.image ? [formData.image] : []} 
              onChange={(urls) => setFormData((prev: any) => ({ ...prev, image: urls[0] || '' }))} 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">Excerpt (Short description)</label>
            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">Content (Markdown/HTML supported)</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows={12} required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-white font-mono text-sm"></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  );
}
