import { db } from '@/db';
import { equipment, inquiries } from '@/db/schema';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch stats from Neon
  const [eqCountResult, inqCountResult, latestInquiries] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(equipment),
    db.select({ count: sql<number>`count(*)` }).from(inquiries),
    db.select().from(inquiries).orderBy(sql`${inquiries.createdAt} DESC`).limit(5)
  ]);

  const totalEquipment = Number(eqCountResult[0].count);
  const totalInquiries = Number(inqCountResult[0].count);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 font-medium">Total Equipment</h3>
            <span className="text-2xl">🚜</span>
          </div>
          <div className="text-4xl font-bold text-white">{totalEquipment}</div>
          <Link href="/admin/equipment" className="text-orange-500 hover:text-orange-400 text-sm mt-4 inline-block font-medium">
            Manage Listings →
          </Link>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-400 font-medium">Total Inquiries</h3>
            <span className="text-2xl">📩</span>
          </div>
          <div className="text-4xl font-bold text-white">{totalInquiries}</div>
          <Link href="/admin/inquiries" className="text-orange-500 hover:text-orange-400 text-sm mt-4 inline-block font-medium">
            View All Inquiries →
          </Link>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-orange-500 font-medium">Quick Actions</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <div className="space-y-3 mt-4">
            <Link href="/admin/equipment/new" className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors">
              + Add New Equipment
            </Link>
            <Link href="/" target="_blank" className="block w-full border border-neutral-700 hover:bg-neutral-800 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors">
              View Live Site ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <h2 className="text-xl font-bold text-white mb-6">Recent Inquiries</h2>
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {latestInquiries.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No inquiries yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {latestInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{inquiry.name}</td>
                    <td className="px-6 py-4 text-neutral-400">{inquiry.email}</td>
                    <td className="px-6 py-4 text-neutral-300 capitalize">{inquiry.equipmentType || 'General'}</td>
                    <td className="px-6 py-4 text-neutral-500">
                      {new Date(inquiry.createdAt!).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {latestInquiries.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-neutral-950/30 text-center">
            <Link href="/admin/inquiries" className="text-sm text-neutral-400 hover:text-white transition-colors">
              View All Inquiries
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
