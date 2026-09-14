import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const results = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);

  if (results.length === 0 || results[0].status !== 'PUBLISHED') {
    notFound();
  }

  const article = results[0];

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/insights" className="hover:text-white transition">Insights</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">{article.category}</span>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-500/10 text-orange-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-sm text-neutral-400">
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-neutral-400">
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-white">
              {article.author?.charAt(0) || 'I'}
            </div>
            <div>
              <div className="font-medium text-white">{article.author}</div>
              <div className="text-xs">IRONMARKET Contributor</div>
            </div>
          </div>
        </div>

        <div 
          className="w-full h-64 md:h-[400px] bg-neutral-900 rounded-2xl mb-12 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image || 'https://images.unsplash.com/photo-1581092595537-fa4d232c9186?w=800&q=80'})` }}
        />

        <article className="prose prose-invert prose-orange max-w-none prose-lg prose-p:text-neutral-300 prose-headings:text-white prose-a:text-orange-500 hover:prose-a:text-orange-400">
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
        </article>
      </div>
    </div>
  );
}
