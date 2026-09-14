import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../src/db/schema';

// Import existing static data
import { equipmentListings } from '../src/data/equipment';
import { categories as categoriesData } from '../src/data/categories';
import { brands as brandsData } from '../src/data/brands';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found. Make sure .env.local exists.');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log('🌱 Seeding IRONMARKET database...\n');

  // ── Seed Categories ──
  console.log('📁 Inserting categories...');
  for (const cat of categoriesData) {
    try {
      await db.insert(schema.categories).values({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        shortDescription: cat.shortDescription,
        image: cat.image,
        icon: cat.icon,
      }).onConflictDoNothing();
      console.log(`   ✓ ${cat.name}`);
    } catch (e: any) {
      console.log(`   ⚠ ${cat.name} — ${e.message?.slice(0, 60)}`);
    }
  }

  // ── Seed Brands ──
  console.log('\n🏭 Inserting brands...');
  for (const brand of brandsData) {
    try {
      await db.insert(schema.brands).values({
        name: brand.name,
        slug: brand.slug,
        logo: brand.logo,
        country: brand.country,
        description: brand.description,
        founded: brand.founded,
      }).onConflictDoNothing();
      console.log(`   ✓ ${brand.name}`);
    } catch (e: any) {
      console.log(`   ⚠ ${brand.name} — ${e.message?.slice(0, 60)}`);
    }
  }

  // ── Seed Equipment ──
  console.log('\n🚜 Inserting equipment listings...');
  let inserted = 0;
  for (const eq of equipmentListings) {
    try {
      await db.insert(schema.equipment).values({
        slug: eq.slug,
        brand: eq.brand,
        model: eq.model,
        category: eq.category,
        categorySlug: eq.categorySlug,
        year: eq.year,
        hours: eq.hours,
        condition: eq.condition,
        price: eq.price.toString(),
        currency: eq.currency,
        location: eq.location,
        country: eq.country,
        sellerName: eq.seller.name,
        sellerType: eq.seller.type,
        sellerLocation: eq.seller.location,
        sellerVerified: eq.seller.verified,
        images: eq.images,
        description: eq.description,
        features: eq.features,
        specifications: eq.specifications,
        affiliateUrl: eq.affiliateUrl,
        affiliateNetwork: eq.affiliateNetwork,
        status: eq.status,
        featured: eq.featured,
      }).onConflictDoNothing();
      inserted++;
      console.log(`   ✓ ${eq.brand} ${eq.model} (${eq.year})`);
    } catch (e: any) {
      console.log(`   ⚠ ${eq.brand} ${eq.model} — ${e.message?.slice(0, 80)}`);
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Seeding complete!`);
  console.log(`   📁 ${categoriesData.length} categories`);
  console.log(`   🏭 ${brandsData.length} brands`);
  console.log(`   🚜 ${inserted} equipment listings`);
  console.log('═'.repeat(50));
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
