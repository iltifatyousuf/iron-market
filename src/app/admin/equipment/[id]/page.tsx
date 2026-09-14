import { db } from '@/db';
import { equipment } from '@/db/schema';
import { eq } from 'drizzle-orm';
import EquipmentForm from '@/components/admin/EquipmentForm';
import { notFound } from 'next/navigation';

export default async function EditEquipmentPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const results = await db.select().from(equipment).where(eq(equipment.id, id));
  
  if (results.length === 0) {
    notFound();
  }
  
  const item = results[0];
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Edit Equipment</h1>
      <EquipmentForm initialData={item} />
    </div>
  );
}
