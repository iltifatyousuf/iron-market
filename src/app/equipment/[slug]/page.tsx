import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq, and, ne } from 'drizzle-orm';
import { formatPrice } from '@/lib/utils';
import CompareButton from '@/components/equipment/CompareButton';

interface Spec {
  label: string;
  value: string;
  unit: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const results = await db.select().from(equipment).where(eq(equipment.slug, slug)).limit(1);
  if (results.length === 0) return { title: 'Equipment Not Found | IRONMARKET' };
  const item = results[0];
  return {
    title: `${item.year} ${item.brand} ${item.model} — ${item.condition} | IRONMARKET`,
    description: `${item.year} ${item.brand} ${item.model}. ${item.hours?.toLocaleString()} hours, ${item.condition}, located in ${item.location}. ${formatPrice(parseFloat(item.price), item.currency || 'USD')}.`,
  };
}

export default async function EquipmentDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch from Neon database
  const results = await db.select().from(equipment).where(eq(equipment.slug, slug)).limit(1);

  if (results.length === 0) {
    notFound();
  }

  const item = results[0];
  const specs = (item.specifications as Spec[]) || [];
  const features = item.features || [];
  const images = item.images || [];
  const price = parseFloat(item.price);

  // Fetch similar equipment (same category, different slug)
  const similar = await db.select()
    .from(equipment)
    .where(and(eq(equipment.category, item.category), ne(equipment.slug, slug), eq(equipment.status, 'ACTIVE')))
    .limit(4);

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/equipment" className="hover:text-white transition">Equipment</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{item.category}</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">{item.brand} {item.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Left: Image Gallery */}
          <div className="lg:col-span-3">
            <div
              className="h-96 md:h-[500px] w-full bg-neutral-900 rounded-xl bg-cover bg-center mb-4"
              style={{ backgroundImage: `url(${images[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'})` }}
            />
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="h-24 w-32 flex-shrink-0 bg-neutral-800 rounded-lg cursor-pointer border-2 border-transparent hover:border-orange-500 transition bg-cover bg-center"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Panel */}
          <div className="lg:col-span-2 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {item.year} {item.brand} {item.model}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">{item.condition}</span>
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">{(item.hours || 0).toLocaleString()} Hours</span>
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">{item.category}</span>
            </div>

            <div className="text-4xl font-bold text-orange-500 mb-8">
              {formatPrice(price, item.currency || 'USD')}
            </div>

            {/* Seller Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 mb-8">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Seller Information</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-lg text-orange-500">
                  {item.sellerName?.charAt(0) || 'S'}
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {item.sellerName}
                    {item.sellerVerified && <span className="text-green-500 text-xs bg-green-500/10 px-1.5 py-0.5 rounded">✓ Verified</span>}
                  </div>
                  <div className="text-xs text-neutral-400">{item.sellerType}</div>
                </div>
              </div>
              <p className="text-sm text-neutral-500 flex items-center gap-1">📍 {item.location}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-auto">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors">
                Request Information
              </button>
              {item.affiliateUrl && item.affiliateUrl !== '#' ? (
                <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" className="w-full border border-neutral-700 hover:bg-neutral-800 text-white font-bold py-4 rounded-lg transition-colors text-center block">
                  View Seller Offer
                </a>
              ) : (
                <button className="w-full border border-neutral-700 hover:bg-neutral-800 text-white font-bold py-4 rounded-lg transition-colors">
                  View Seller Offer
                </button>
              )}
              <div className="pt-2 flex justify-center">
                <CompareButton equipment={item} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="border-t border-neutral-800 pt-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-neutral-300 leading-relaxed mb-12">{item.description}</p>

              {specs.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4">Technical Specifications</h2>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden mb-12">
                    <table className="w-full text-left text-sm">
                      <tbody>
                        <tr className="border-b border-neutral-800">
                          <td className="py-3 px-4 text-neutral-400 font-medium w-1/3 bg-neutral-950/30">Make</td>
                          <td className="py-3 px-4 text-white">{item.brand}</td>
                        </tr>
                        <tr className="border-b border-neutral-800">
                          <td className="py-3 px-4 text-neutral-400 font-medium bg-neutral-950/30">Model</td>
                          <td className="py-3 px-4 text-white">{item.model}</td>
                        </tr>
                        <tr className="border-b border-neutral-800">
                          <td className="py-3 px-4 text-neutral-400 font-medium bg-neutral-950/30">Year</td>
                          <td className="py-3 px-4 text-white">{item.year}</td>
                        </tr>
                        <tr className="border-b border-neutral-800">
                          <td className="py-3 px-4 text-neutral-400 font-medium bg-neutral-950/30">Hours</td>
                          <td className="py-3 px-4 text-white">{(item.hours || 0).toLocaleString()}</td>
                        </tr>
                        {specs.map((spec, i) => (
                          <tr key={i} className="border-b border-neutral-800 last:border-b-0">
                            <td className="py-3 px-4 text-neutral-400 font-medium bg-neutral-950/30">{spec.label}</td>
                            <td className="py-3 px-4 text-white">{spec.value} {spec.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            <div>
              {features.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
                  <div className="space-y-2 mb-8">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 text-neutral-300 px-4 py-3 rounded-lg text-sm">
                        <span className="text-orange-500">✓</span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Quick Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-400 text-sm">Price</span>
                    <span className="text-orange-500 font-bold">{formatPrice(price, item.currency || 'USD')}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-4">
                    <span className="text-neutral-400 text-sm">Condition</span>
                    <span className="text-white text-sm">{item.condition}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-4">
                    <span className="text-neutral-400 text-sm">Hours</span>
                    <span className="text-white text-sm">{(item.hours || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-4">
                    <span className="text-neutral-400 text-sm">Location</span>
                    <span className="text-white text-sm">{item.location}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-4">
                    <span className="text-neutral-400 text-sm">Seller</span>
                    <span className="text-white text-sm">{item.sellerName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Equipment */}
        {similar.length > 0 && (
          <div className="border-t border-neutral-800 pt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Similar Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((s) => (
                <Link href={`/equipment/${s.slug}`} key={s.id} className="group">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden h-full flex flex-col hover:border-orange-500/50 transition-all duration-300">
                    <div className="relative h-40 bg-neutral-800 overflow-hidden">
                      <div
                        className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${s.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'})` }}
                      />
                      <span className="absolute top-2 right-2 bg-neutral-900/80 text-xs text-neutral-300 px-2 py-1 rounded">{s.condition}</span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="font-bold text-white text-sm mb-1">{s.year} {s.brand} {s.model}</h4>
                      <p className="text-xs text-neutral-400 mb-1">{(s.hours || 0).toLocaleString()} hrs • {s.location}</p>
                      <div className="mt-auto pt-3 border-t border-neutral-800">
                        <span className="text-orange-500 font-bold">{formatPrice(parseFloat(s.price), s.currency || 'USD')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
