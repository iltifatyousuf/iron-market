import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(articles).where(eq(articles.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Remove id from payload
    const { id: _, createdAt, updatedAt, publishedAt, ...updateData } = data;
    
    await db.update(articles)
      .set({
        ...updateData,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      })
      .where(eq(articles.id, id));
      
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
