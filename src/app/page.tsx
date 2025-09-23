import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import QuickIntro from "@/components/QuickIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurFarm from "@/components/OurFarm";
import MissionVision from "@/components/MissionVision";
import NewsletterSignup from "@/components/NewsletterSignup";
import CallToActionBlocks from "@/components/CallToActionBlocks";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ScrollToNewsletter } from "@/components/ScrollToNewsletter";

/**
 * Home page component
 * Uses server component by default with client components only where needed
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="absolute" />
      
      <main>
        <HeroSection />
        
        <QuickIntro />
        
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        
        <OurFarm />
        
        <MissionVision />
        
        <NewsletterSignup />
        
        <CallToActionBlocks />
      </main>
      
      <Footer />
      
      {/* Client component for handling hash navigation */}
      <ScrollToNewsletter />
    </div>
  );
}

// Skeleton loader for featured products
function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-viet-earth-cream to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-6"></div>
          <div className="h-8 w-64 bg-gray-200 mx-auto mb-4 rounded"></div>
          <div className="h-4 w-96 bg-gray-200 mx-auto rounded"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 mb-6 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
