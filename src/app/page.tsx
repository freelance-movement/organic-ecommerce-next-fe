import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QuickIntro from "@/components/QuickIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurFarm from "@/components/OurFarm";
import MissionVision from "@/components/MissionVision";
import NewsletterSignup from "@/components/NewsletterSignup";
import CallToActionBlocks from "@/components/CallToActionBlocks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
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
