import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq, desc, asc, ilike, and, or, sql } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category   = searchParams.get('category');
  const brand      = searchParams.get('brand');
  const condition  = searchParams.get('condition');
  const search     = searchParams.get('search');
  const sort       = searchParams.get('sort') || 'newest';
  const page       = parseInt(searchParams.get('page') || '1');
  const limit      = parseInt(searchParams.get('limit') || '24');
  const featured   = searchParams.get('featured');

  // Build WHERE conditions
  const conditions: ReturnType<typeof eq>[] = [eq(equipment.status, 'ACTIVE')];

  if (category)  conditions.push(eq(equipment.category, category));
  if (brand)     conditions.push(eq(equipment.brand, brand));
  if (condition) conditions.push(eq(equipment.condition, condition));
  if (featured === 'true') conditions.push(eq(equipment.featured, true));
  if (search) {
    conditions.push(
      or(
        ilike(equipment.brand, `%${search}%`),
        ilike(equipment.model, `%${search}%`),
        ilike(equipment.category, `%${search}%`),
        ilike(equipment.location, `%${search}%`),
        ilike(equipment.description, `%${search}%`),
        ilike(equipment.sellerName, `%${search}%`),
      )!
    );
  }

  // Sort
  const orderBy = sort === 'price_asc'  ? asc(equipment.price)
                : sort === 'price_desc' ? desc(equipment.price)
                : desc(equipment.createdAt);

  // Query data + count in parallel
  const [results, countResult] = await Promise.all([
    db.select()
      .from(equipment)
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(limit)
      .offset((page - 1) * limit),

    db.select({ count: sql<number>`count(*)` })
      .from(equipment)
      .where(and(...conditions)),
  ]);

  const total = Number(countResult[0].count);

  return Response.json({
    data: results,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
