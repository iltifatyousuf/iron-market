import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const allArticles = await db.select()
    .from(articles)
    .where(eq(articles.status, 'PUBLISHED'))
    .orderBy(desc(articles.publishedAt));

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Industry Insights</h1>
        <p className="text-lg text-neutral-400 mb-12 max-w-2xl">
          The latest news, buying guides, and market trends in the heavy equipment industry.
        </p>

        {allArticles.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-xl">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
            <p className="text-neutral-400">Check back soon for our latest insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.map((article) => (
              <Link key={article.id} href={`/insights/${article.slug}`} className="group">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden h-full flex flex-col hover:border-orange-500/50 transition-colors">
                  <div 
                    className="h-48 bg-neutral-800 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${article.image || 'https://images.unsplash.com/photo-1581092595537-fa4d232c9186?w=800&q=80'})` }}
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{article.category}</span>
                      <span className="text-xs text-neutral-500">
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-neutral-500">By {article.author}</span>
                      <span className="text-orange-500 text-sm font-medium group-hover:translate-x-1 transition-transform">Read Article →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
