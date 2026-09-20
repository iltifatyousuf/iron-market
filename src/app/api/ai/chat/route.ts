import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq, ilike, and, or, lte, gte, desc, sql } from 'drizzle-orm';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are the IRONMARKET AI Equipment Advisor — an expert heavy machinery consultant helping buyers find the perfect equipment.

Your personality:
- Professional, knowledgeable, and confident
- You speak like a seasoned equipment dealer who genuinely wants to help
- You are concise but thorough — no fluff

Your capabilities:
- You help users find heavy equipment (excavators, bulldozers, cranes, loaders, dump trucks, etc.)
- You understand budgets, project requirements, terrain conditions, and brand preferences
- You can recommend specific equipment based on use cases
- You have access to the IRONMARKET database of listings

IMPORTANT RULES:
1. When the user describes what they need, extract these filters: category, brand, condition (New/Used), maxPrice, minPrice, location, minYear
2. Return your equipment recommendations in this EXACT format so the frontend can render cards:

===EQUIPMENT_RESULTS===
[JSON array of equipment objects]
===END_RESULTS===

3. Always provide context about WHY each machine is a good fit
4. If no matches are found, suggest alternatives or ask clarifying questions
5. Keep responses focused on heavy equipment — politely redirect off-topic questions
6. Use imperial units (tons, feet, hp) for US/Middle East, metric for Europe/Asia
7. Never make up equipment listings — only recommend what's in the database results provided to you`;

async function searchEquipment(filters: {
  category?: string;
  brand?: string;
  condition?: string;
  maxPrice?: number;
  minPrice?: number;
  location?: string;
  minYear?: number;
  search?: string;
}) {
  const conditions: any[] = [eq(equipment.status, 'ACTIVE')];

  if (filters.category) {
    conditions.push(
      or(
        ilike(equipment.category, `%${filters.category}%`),
        ilike(equipment.categorySlug, `%${filters.category}%`)
      )!
    );
  }
  if (filters.brand) conditions.push(ilike(equipment.brand, `%${filters.brand}%`));
  if (filters.condition) conditions.push(eq(equipment.condition, filters.condition));
  if (filters.maxPrice) conditions.push(lte(equipment.price, String(filters.maxPrice)));
  if (filters.minPrice) conditions.push(gte(equipment.price, String(filters.minPrice)));
  if (filters.location) {
    conditions.push(
      or(
        ilike(equipment.location, `%${filters.location}%`),
        ilike(equipment.country, `%${filters.location}%`)
      )!
    );
  }
  if (filters.minYear) conditions.push(gte(equipment.year, filters.minYear));
  if (filters.search) {
    conditions.push(
      or(
        ilike(equipment.brand, `%${filters.search}%`),
        ilike(equipment.model, `%${filters.search}%`),
        ilike(equipment.category, `%${filters.search}%`),
        ilike(equipment.description, `%${filters.search}%`)
      )!
    );
  }

  const results = await db
    .select()
    .from(equipment)
    .where(and(...conditions))
    .orderBy(desc(equipment.featured), desc(equipment.createdAt))
    .limit(6);

  return results;
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Extract the latest user message to search for equipment
  const latestUserMessage = messages
    .filter((m: any) => m.role === 'user')
    .pop()?.content || '';

  // Search the database based on the user's query
  let dbResults: any[] = [];
  const lowerMsg = latestUserMessage.toLowerCase();

  // Simple keyword extraction for DB search
  const filters: any = {};

  // Category detection
  const categoryMap: Record<string, string> = {
    'excavator': 'Excavators', 'excavators': 'Excavators',
    'bulldozer': 'Bulldozers', 'dozer': 'Bulldozers', 'bulldozers': 'Bulldozers',
    'crane': 'Cranes', 'cranes': 'Cranes',
    'loader': 'Wheel Loaders', 'loaders': 'Wheel Loaders', 'wheel loader': 'Wheel Loaders',
    'backhoe': 'Backhoe Loaders', 'backhoe loader': 'Backhoe Loaders',
    'dump truck': 'Dump Trucks', 'dumper': 'Dump Trucks', 'dump trucks': 'Dump Trucks',
    'skid steer': 'Skid Steers', 'skid': 'Skid Steers',
    'grader': 'Motor Graders', 'motor grader': 'Motor Graders',
    'telehandler': 'Telehandlers', 'telehandlers': 'Telehandlers',
    'compactor': 'Compactors', 'roller': 'Compactors', 'compactors': 'Compactors',
    'forklift': 'Forklifts', 'forklifts': 'Forklifts',
    'generator': 'Generators', 'generators': 'Generators',
  };

  for (const [keyword, category] of Object.entries(categoryMap)) {
    if (lowerMsg.includes(keyword)) {
      filters.category = category;
      break;
    }
  }

  // Brand detection
  const brands = ['caterpillar', 'cat', 'komatsu', 'volvo', 'liebherr', 'jcb', 'sany', 'john deere', 'deere', 'hitachi', 'case', 'hyundai', 'doosan', 'xcmg', 'kubota', 'bobcat', 'kobelco'];
  for (const brand of brands) {
    if (lowerMsg.includes(brand)) {
      filters.brand = brand === 'cat' ? 'caterpillar' : brand;
      break;
    }
  }

  // Price extraction
  const priceMatch = lowerMsg.match(/(?:under|below|less than|max|budget[:\s]*)\s*\$?([\d,]+)/i);
  if (priceMatch) filters.maxPrice = parseInt(priceMatch[1].replace(/,/g, ''));

  const minPriceMatch = lowerMsg.match(/(?:above|over|more than|min|at least)\s*\$?([\d,]+)/i);
  if (minPriceMatch) filters.minPrice = parseInt(minPriceMatch[1].replace(/,/g, ''));

  // Condition
  if (lowerMsg.includes('new') && !lowerMsg.includes('new york')) filters.condition = 'New';
  if (lowerMsg.includes('used') || lowerMsg.includes('second hand')) filters.condition = 'Used';

  // Location
  const locations = ['usa', 'united states', 'uae', 'dubai', 'saudi', 'uk', 'germany', 'australia', 'india', 'japan', 'china', 'canada', 'brazil', 'nigeria', 'south africa', 'middle east', 'europe', 'asia'];
  for (const loc of locations) {
    if (lowerMsg.includes(loc)) {
      filters.location = loc;
      break;
    }
  }

  // If we have any filters, or the message seems equipment-related, search
  if (Object.keys(filters).length > 0) {
    dbResults = await searchEquipment(filters);
  } else if (lowerMsg.includes('equipment') || lowerMsg.includes('machine') || lowerMsg.includes('buy') || lowerMsg.includes('find') || lowerMsg.includes('need') || lowerMsg.includes('recommend') || lowerMsg.includes('show') || lowerMsg.includes('list')) {
    dbResults = await searchEquipment({ search: latestUserMessage.slice(0, 50) });
  }

  // Build context for Gemini
  let equipmentContext = '';
  if (dbResults.length > 0) {
    equipmentContext = `\n\nDATABASE RESULTS (${dbResults.length} matches found):\n${JSON.stringify(dbResults.map(r => ({
      id: r.id,
      slug: r.slug,
      brand: r.brand,
      model: r.model,
      category: r.category,
      year: r.year,
      hours: r.hours,
      condition: r.condition,
      price: r.price,
      currency: r.currency,
      location: r.location,
      country: r.country,
      sellerName: r.sellerName,
      sellerType: r.sellerType,
      images: r.images,
      description: r.description?.slice(0, 200),
      features: r.features?.slice(0, 5),
    })), null, 2)}\n\nPresent these results to the user using the ===EQUIPMENT_RESULTS=== format with the full objects, then explain why each is a good match.`;
  } else if (Object.keys(filters).length > 0) {
    equipmentContext = '\n\nDATABASE RESULTS: No exact matches found for the specified criteria. Suggest the user broaden their search or try different filters. Do NOT make up listings.';
  }

  const result = await streamText({
    model: google('gemini-2.0-flash'),
    system: SYSTEM_PROMPT + equipmentContext,
    messages,
  });

  return result.toAIStreamResponse();
}
