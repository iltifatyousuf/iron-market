import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import BrowseByEquipment from '@/components/home/BrowseByEquipment';
import FeaturedMachinery from '@/components/home/FeaturedMachinery';
import SmartSearch from '@/components/home/SmartSearch';
import MachineryComparison from '@/components/home/MachineryComparison';
import HowItWorks from '@/components/home/HowItWorks';
import GlobalMarketplace from '@/components/home/GlobalMarketplace';
import InsightsSection from '@/components/home/InsightsSection';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <BrowseByEquipment />
      <FeaturedMachinery />
      <SmartSearch />
      <MachineryComparison />
      <HowItWorks />
      <GlobalMarketplace />
      <InsightsSection />
      <FAQSection />
    </>
  );
}
