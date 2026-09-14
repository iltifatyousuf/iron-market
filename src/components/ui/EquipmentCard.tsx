import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import CompareButton from '@/components/equipment/CompareButton';

interface EquipmentCardProps {
  equipment: any;
  featured?: boolean;
}

export default function EquipmentCard({ equipment, featured = false }: EquipmentCardProps) {
  return (
    <Link href={`/equipment/${equipment.slug}`} className="group block h-full">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden h-full flex flex-col hover:border-orange-500/50 transition-colors">
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] bg-neutral-800 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${equipment.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80'})` }}
          />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                Featured
              </span>
            )}
            <span className="bg-neutral-950/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
              {equipment.year}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
            {equipment.category}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
            {equipment.brand} {equipment.model}
          </h3>
          
          <div className="flex items-center text-sm text-neutral-400 mb-4">
            <span className="mr-3 flex items-center">
              <span className="mr-1">📍</span> {equipment.location}
            </span>
            {equipment.hours && (
              <span className="flex items-center">
                <span className="mr-1">⏱️</span> {equipment.hours}h
              </span>
            )}
          </div>
          
          <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div className="text-xl font-bold text-white">
              {formatPrice(parseFloat(equipment.price), equipment.currency)}
            </div>
            
            <div className="text-sm font-medium text-neutral-500 group-hover:text-white transition-colors">
              View Details →
            </div>
          </div>
        </div>
        
        {/* Actions Section */}
        <div className="px-5 pb-5 pt-0 flex justify-between items-center" onClick={(e) => e.preventDefault()}>
          <div className="text-xs text-neutral-500">
            {equipment.sellerName || 'Verified Dealer'}
          </div>
          <CompareButton equipment={equipment} />
        </div>
      </div>
    </Link>
  );
}
