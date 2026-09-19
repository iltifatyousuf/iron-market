import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { equipment } from '../src/db/schema';
import { eq } from 'drizzle-orm';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is required');

const GSA_API_KEY = process.env.GSA_API_KEY || 'DEMO_KEY';
const GSA_BASE_URL = 'https://api.gsa.gov/assets/gsaauctions/v2/auctions';

const client = neon(DATABASE_URL);
const db = drizzle(client);

// Map GSA categories to our equipment categories
function mapCategory(gsaCategory: string): { category: string; categorySlug: string } | null {
  const lower = gsaCategory.toLowerCase();
  if (lower.includes('excavat')) return { category: 'Excavators', categorySlug: 'excavators' };
  if (lower.includes('bulldoz') || lower.includes('dozer')) return { category: 'Bulldozers', categorySlug: 'bulldozers' };
  if (lower.includes('crane')) return { category: 'Cranes', categorySlug: 'cranes' };
  if (lower.includes('loader') && lower.includes('backhoe')) return { category: 'Backhoe Loaders', categorySlug: 'backhoe-loaders' };
  if (lower.includes('loader')) return { category: 'Wheel Loaders', categorySlug: 'wheel-loaders' };
  if (lower.includes('dump') || lower.includes('truck')) return { category: 'Dump Trucks', categorySlug: 'dump-trucks' };
  if (lower.includes('grader')) return { category: 'Motor Graders', categorySlug: 'motor-graders' };
  if (lower.includes('forklift') || lower.includes('fork lift')) return { category: 'Forklifts', categorySlug: 'forklifts' };
  if (lower.includes('compact') || lower.includes('roller')) return { category: 'Compactors', categorySlug: 'compactors' };
  if (lower.includes('generator')) return { category: 'Generators', categorySlug: 'generators' };
  if (lower.includes('telehandler')) return { category: 'Telehandlers', categorySlug: 'telehandlers' };
  if (lower.includes('skid') || lower.includes('steer')) return { category: 'Skid Steers', categorySlug: 'skid-steers' };
  
  // Generic construction equipment
  if (lower.includes('construction') || lower.includes('heavy') || lower.includes('equipment')) {
    return { category: 'Heavy Equipment', categorySlug: 'heavy-equipment' };
  }
  
  return null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractBrand(title: string): string {
  const brands = ['Caterpillar', 'CAT', 'Komatsu', 'John Deere', 'Volvo', 'Liebherr', 'JCB', 'SANY', 'Hitachi', 'CASE', 'Hyundai', 'Doosan', 'Kubota', 'Bobcat', 'Kobelco', 'XCMG'];
  const upper = title.toUpperCase();
  for (const brand of brands) {
    if (upper.includes(brand.toUpperCase())) {
      return brand === 'CAT' ? 'Caterpillar' : brand;
    }
  }
  // Try to extract first word as brand
  return title.split(' ')[0] || 'Unknown';
}

function extractModel(title: string, brand: string): string {
  // Remove brand name and return the rest as model
  const cleaned = title.replace(new RegExp(brand, 'i'), '').trim();
  return cleaned.split(',')[0]?.trim() || title;
}

async function importFromGSA() {
  console.log('🏛️  Starting GSA Auctions import...');
  console.log(`🔑 Using API key: ${GSA_API_KEY === 'DEMO_KEY' ? 'DEMO_KEY (limited)' : 'Custom key'}`);

  let totalImported = 0;
  let totalSkipped = 0;

  try {
    // Fetch auctions - try multiple categories
    const categories = [
      'Construction Equipment',
      'Vehicles',
      'Material Handling Equipment',
    ];

    for (const cat of categories) {
      console.log(`\n📂 Searching: ${cat}...`);
      
      const url = `${GSA_BASE_URL}?api_key=${GSA_API_KEY}&category=${encodeURIComponent(cat)}&status=Active`;
      
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        console.log(`  ⚠️ GSA API returned ${response.status} for "${cat}"`);
        continue;
      }

      const data = await response.json();
      const auctions = Array.isArray(data) ? data : data.results || data.auctions || [];
      
      console.log(`  📦 Found ${auctions.length} auctions`);

      for (const auction of auctions) {
        try {
          const title = auction.title || auction.name || auction.description || '';
          const categoryMapping = mapCategory(title + ' ' + (auction.category || cat));
          
          if (!categoryMapping) {
            totalSkipped++;
            continue;
          }

          const brand = extractBrand(title);
          const model = extractModel(title, brand);
          const slug = slugify(`gsa-${brand}-${model}-${auction.id || Date.now()}`);

          // Check if already exists
          const existing = await db.select().from(equipment).where(eq(equipment.slug, slug)).limit(1);
          if (existing.length > 0) {
            totalSkipped++;
            continue;
          }

          const listing = {
            slug,
            brand,
            model: model.slice(0, 100),
            category: categoryMapping.category,
            categorySlug: categoryMapping.categorySlug,
            year: auction.year || new Date().getFullYear() - 2,
            hours: auction.hours || 0,
            condition: 'Used' as const,
            price: String(auction.currentBid || auction.startingBid || auction.price || '0'),
            currency: 'USD',
            location: auction.location || auction.city || 'United States',
            country: 'USA',
            sellerName: 'GSA Auctions (US Government)',
            sellerType: 'Government',
            sellerLocation: auction.state || 'USA',
            sellerVerified: true,
            images: auction.images || auction.photos || [],
            description: (auction.description || title).slice(0, 1000),
            features: [],
            specifications: {},
            affiliateUrl: auction.url || auction.auctionUrl || `https://gsaauctions.gov/auctions/${auction.id}`,
            affiliateNetwork: 'GSA',
            status: 'ACTIVE',
            featured: false,
          };

          await db.insert(equipment).values(listing as any);
          totalImported++;
          console.log(`  ✅ ${brand} ${model}`);
        } catch (err: any) {
          console.log(`  ❌ Failed to import: ${err.message}`);
          totalSkipped++;
        }
      }
    }
  } catch (err: any) {
    console.error('❌ GSA API Error:', err.message);
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`  ✅ Imported: ${totalImported}`);
  console.log(`  ⏭️ Skipped: ${totalSkipped}`);
  
  return { imported: totalImported, skipped: totalSkipped };
}

importFromGSA().then(() => process.exit(0)).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
