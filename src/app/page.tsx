import CategoryGrid from "@/components/CategoryGrid";
import CollectionGrid from "@/components/CollectionGrid";
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";

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