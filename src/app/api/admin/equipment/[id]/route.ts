import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(equipment).where(eq(equipment.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete equipment' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Remove id from payload so we don't try to update the primary key
    const { id: _, createdAt, updatedAt, ...updateData } = data;
    
    await db.update(equipment)
      .set({
        ...updateData,
        price: updateData.price.toString(),
        year: parseInt(updateData.year),
        hours: updateData.hours ? parseInt(updateData.hours) : null,
      })
      .where(eq(equipment.id, id));
      
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
