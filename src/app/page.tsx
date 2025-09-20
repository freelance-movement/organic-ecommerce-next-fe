"use client";
import { useEffect } from "react";

import HeroSection from "@/components/HeroSection";
import QuickIntro from "@/components/QuickIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurFarm from "@/components/OurFarm";
import MissionVision from "@/components/MissionVision";
import NewsletterSignup from "@/components/NewsletterSignup";
import CallToActionBlocks from "@/components/CallToActionBlocks";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  useEffect(() => {
    // Handle hash fragment on page load
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === "#newsletter-section") {
        setTimeout(() => {
          const newsletterSection =
            document.getElementById("newsletter-section");
          if (newsletterSection) {
            newsletterSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Small delay to ensure page is fully loaded
      }
    };

    // Check hash on component mount
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="absolute" />
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
