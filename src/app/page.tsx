import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import BrowseByEquipment from '@/components/home/BrowseByEquipment';
import FeaturedMachinery from '@/components/home/FeaturedMachinery';
import SmartSearch from '@/components/home/SmartSearch';
import MachineryComparison from '@/components/home/MachineryComparison';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <BrowseByEquipment />
      <FeaturedMachinery />
      <SmartSearch />
      <MachineryComparison />
    </>
  );
}
