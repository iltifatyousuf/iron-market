import { NextResponse } from 'next/server';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const results = await db.select().from(articles).orderBy(desc(articles.createdAt));
    return NextResponse.json({ data: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await db.insert(articles).values({
      title: data.title,
      slug: data.slug,
      category: data.category,
      content: data.content,
      excerpt: data.excerpt,
      image: data.image,
      author: data.author,
      status: data.status,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
