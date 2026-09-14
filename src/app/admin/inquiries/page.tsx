import { db } from '@/db';
import { inquiries } from '@/db/schema';
import { desc, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function AdminInquiries() {
  const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));

  async function deleteInquiry(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await db.delete(inquiries).where(sql`id = ${id}`);
    revalidatePath('/admin/inquiries');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Inquiries & Leads</h1>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {allInquiries.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No inquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Requirements</th>
                  <th className="px-6 py-4 font-medium">Details</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {allInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium mb-1">{inq.name}</div>
                      <div className="text-neutral-400 text-xs mb-1">📧 {inq.email}</div>
                      {inq.phone && <div className="text-neutral-400 text-xs">📞 {inq.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-300 font-medium mb-1 capitalize">
                        {inq.equipmentType || 'Not specified'} {inq.condition && `(${inq.condition})`}
                      </div>
                      <div className="text-neutral-400 text-xs line-clamp-2 max-w-xs">
                        {inq.requirements || 'No specific requirements.'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-neutral-400 text-xs mb-1">📍 {inq.location || 'Any'}</div>
                      <div className="text-neutral-400 text-xs mb-1">💰 {inq.budget ? `$${inq.budget}` : 'Not specified'}</div>
                      <div className="text-neutral-500 text-xs mt-2">
                        {new Date(inq.createdAt!).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={deleteInquiry}>
                        <input type="hidden" name="id" value={inq.id} />
                        <button type="submit" className="text-red-500 hover:text-red-400 transition-colors text-xs border border-red-500/30 hover:border-red-500/50 px-3 py-1.5 rounded bg-red-500/5">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
