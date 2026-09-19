import { NextResponse } from 'next/server';
import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

const GSA_API_KEY = process.env.GSA_API_KEY || 'DEMO_KEY';
const GSA_BASE_URL = 'https://api.gsa.gov/assets/gsaauctions/v2/auctions';

function mapCategory(gsaCategory: string) {
  const lower = gsaCategory.toLowerCase();
  if (lower.includes('excavat')) return { category: 'Excavators', categorySlug: 'excavators' };
  if (lower.includes('bulldoz') || lower.includes('dozer')) return { category: 'Bulldozers', categorySlug: 'bulldozers' };
  if (lower.includes('crane')) return { category: 'Cranes', categorySlug: 'cranes' };
  if (lower.includes('loader') && lower.includes('backhoe')) return { category: 'Backhoe Loaders', categorySlug: 'backhoe-loaders' };
  if (lower.includes('loader')) return { category: 'Wheel Loaders', categorySlug: 'wheel-loaders' };
  if (lower.includes('dump') || lower.includes('truck')) return { category: 'Dump Trucks', categorySlug: 'dump-trucks' };
  if (lower.includes('grader')) return { category: 'Motor Graders', categorySlug: 'motor-graders' };
  if (lower.includes('forklift')) return { category: 'Forklifts', categorySlug: 'forklifts' };
  if (lower.includes('compact') || lower.includes('roller')) return { category: 'Compactors', categorySlug: 'compactors' };
  if (lower.includes('generator')) return { category: 'Generators', categorySlug: 'generators' };
  if (lower.includes('construction') || lower.includes('heavy') || lower.includes('equipment'))
    return { category: 'Heavy Equipment', categorySlug: 'heavy-equipment' };
  return null;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractBrand(title: string) {
  const brands = ['Caterpillar', 'CAT', 'Komatsu', 'John Deere', 'Volvo', 'Liebherr', 'JCB', 'SANY', 'Hitachi', 'CASE', 'Hyundai', 'Doosan', 'Kubota', 'Bobcat'];
  const upper = title.toUpperCase();
  for (const brand of brands) {
    if (upper.includes(brand.toUpperCase())) return brand === 'CAT' ? 'Caterpillar' : brand;
  }
  return title.split(' ')[0] || 'Unknown';
}

export async function POST(req: Request) {
  try {
    // Simple auth check
    const authHeader = req.headers.get('authorization');
    const adminSecret = process.env.ADMIN_SECRET;
    if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { source } = body;

    if (source === 'gsa') {
      let imported = 0;
      let skipped = 0;

      const categories = ['Construction Equipment', 'Vehicles', 'Material Handling Equipment'];

      for (const cat of categories) {
        try {
          const url = `${GSA_BASE_URL}?api_key=${GSA_API_KEY}&category=${encodeURIComponent(cat)}&status=Active`;
          const response = await fetch(url, { headers: { Accept: 'application/json' } });

          if (!response.ok) continue;

          const data = await response.json();
          const auctions = Array.isArray(data) ? data : data.results || data.auctions || [];

          for (const auction of auctions) {
            const title = auction.title || auction.name || auction.description || '';
            const categoryMapping = mapCategory(title + ' ' + (auction.category || cat));
            if (!categoryMapping) { skipped++; continue; }

            const brand = extractBrand(title);
            const model = (title.replace(new RegExp(brand, 'i'), '').trim().split(',')[0] || title).slice(0, 100);
            const slug = slugify(`gsa-${brand}-${model}-${auction.id || Date.now()}`);

            const existing = await db.select().from(equipment).where(eq(equipment.slug, slug)).limit(1);
            if (existing.length > 0) { skipped++; continue; }

            await db.insert(equipment).values({
              slug,
              brand,
              model,
              category: categoryMapping.category,
              categorySlug: categoryMapping.categorySlug,
              year: auction.year || new Date().getFullYear() - 2,
              hours: auction.hours || 0,
              condition: 'Used',
              price: String(auction.currentBid || auction.startingBid || '0'),
              currency: 'USD',
              location: auction.location || 'United States',
              country: 'USA',
              sellerName: 'GSA Auctions (US Government)',
              sellerType: 'Government',
              sellerLocation: auction.state || 'USA',
              sellerVerified: true,
              images: [],
              description: (auction.description || title).slice(0, 1000),
              features: [],
              specifications: {},
              affiliateUrl: auction.url || `https://gsaauctions.gov/auctions/${auction.id}`,
              affiliateNetwork: 'GSA',
              status: 'ACTIVE',
              featured: false,
            } as any);
            imported++;
          }
        } catch (err) {
          console.error(`GSA import error for ${cat}:`, err);
        }
      }

      return NextResponse.json({ success: true, source: 'gsa', imported, skipped });
    }

    // Get stats
    if (source === 'stats') {
      const totalResult = await db.select({ count: sql<number>`count(*)` }).from(equipment);
      const gsaResult = await db.select({ count: sql<number>`count(*)` }).from(equipment).where(eq(equipment.affiliateNetwork, 'GSA'));
      
      return NextResponse.json({
        total: Number(totalResult[0].count),
        gsa: Number(gsaResult[0].count),
        curated: Number(totalResult[0].count) - Number(gsaResult[0].count),
      });
    }

    return NextResponse.json({ error: 'Invalid source. Use "gsa" or "stats".' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
