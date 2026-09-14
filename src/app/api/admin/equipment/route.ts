import { NextResponse } from 'next/server';
import { db } from '@/db';
import { equipment } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    await db.insert(equipment).values({
      ...data,
      price: data.price.toString(),
      year: parseInt(data.year),
      hours: data.hours ? parseInt(data.hours) : null,
      images: Array.isArray(data.images) ? data.images : [data.images],
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
