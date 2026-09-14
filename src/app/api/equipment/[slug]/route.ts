import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const result = await db.select()
    .from(equipment)
    .where(eq(equipment.slug, slug))
    .limit(1);

  if (result.length === 0) {
    return Response.json({ error: 'Equipment not found' }, { status: 404 });
  }

  return Response.json({ data: result[0] });
}
