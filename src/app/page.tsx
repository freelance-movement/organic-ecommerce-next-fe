import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickIntro from "@/components/QuickIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurFarm from "@/components/OurFarm";
import MissionVision from "@/components/MissionVision";
import NewsletterSignup from "@/components/NewsletterSignup";
import CallToActionBlocks from "@/components/CallToActionBlocks";
import Footer from "@/components/Footer";
import Navigation1 from "@/components/Navigation1";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation1 />
      <HeroSection />
      <QuickIntro />
      <FeaturedProducts />
      <OurFarm />
      <MissionVision />
      <NewsletterSignup />
      <CallToActionBlocks />
      <Footer />
    </div>
  );
}
