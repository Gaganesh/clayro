import HeroSection from "@/components/HeroSection";
import CollectionGrid from "@/components/CollectionGrid";
import CategoryGrid from "@/components/CategoryGrid";
import WhySection from "@/components/WhySection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-[#eeeeee] text-[#1a1a1a] overflow-x-hidden">
      <HeroSection />
      <CollectionGrid />
      <CategoryGrid />
      <CTASection />
    </main>
  );
}