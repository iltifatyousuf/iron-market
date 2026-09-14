'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  publishedAt: string;
}

export default function AdminArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/articles`);
      const json = await res.json();
      setArticles(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
      } else {
        alert('Failed to delete article.');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Insights</h1>
        <Link href="/admin/insights/new" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Write Article
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No articles found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Published</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {articles.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-500' : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/insights/${item.slug}`} target="_blank" className="text-neutral-500 hover:text-white transition-colors" title="View">
                          👁️
                        </Link>
                        <Link href={`/admin/insights/${item.id}`} className="text-blue-500 hover:text-blue-400 transition-colors" title="Edit">
                          ✏️
                        </Link>
                        <button onClick={() => handleDelete(item.id, item.title)} className="text-red-500 hover:text-red-400 transition-colors" title="Delete">
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
