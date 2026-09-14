import { MetadataRoute } from 'next';
import { db } from '@/db';
import { equipment, articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

const baseUrl = 'https://ironmarket.example.com'; // Change this when deploying to production domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/equipment',
    '/about',
    '/contact',
    '/insights',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Fetch all active equipment for sitemap
    const listings = await db.select({ slug: equipment.slug, updatedAt: equipment.updatedAt })
      .from(equipment)
      .where(eq(equipment.status, 'ACTIVE'));

    const equipmentUrls = listings.map((item) => ({
      url: `${baseUrl}/equipment/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Fetch published articles for sitemap
    const blogPosts = await db.select({ slug: articles.slug, updatedAt: articles.updatedAt })
      .from(articles)
      .where(eq(articles.status, 'PUBLISHED'));

    const articleUrls = blogPosts.map((item) => ({
      url: `${baseUrl}/insights/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt).toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...routes, ...equipmentUrls, ...articleUrls];
  } catch (error) {
    // If DB fails, return just static routes
    return routes;
  }
}
