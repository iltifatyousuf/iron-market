import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ArticleForm from '@/components/admin/ArticleForm';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const results = await db.select().from(articles).where(eq(articles.id, id));
  
  if (results.length === 0) {
    notFound();
  }
  
  const item = results[0];
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Article</h1>
      <ArticleForm initialData={item} />
    </div>
  );
}
