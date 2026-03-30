import HeroSection from "@/components/HeroSection";
import CollectionGrid from "@/components/CollectionGrid";
import CategoryGrid from "@/components/CategoryGrid";
import WhySection from "@/components/WhySection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-[#f7f5f2] text-gray-900">
      <HeroSection />
      <CollectionGrid />
      <CategoryGrid />
      <WhySection />
      <CTASection />
    </main>
  );
}