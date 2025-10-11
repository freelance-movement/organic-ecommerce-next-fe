import { Suspense } from "react";
import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import QuickIntro from "@/components/QuickIntro";
import FeaturedProducts from "@/components/FeaturedProducts";
import OurFarm from "@/components/OurFarm";
import Partnership from "@/components/Partnership";
import NewsletterSignup from "@/components/NewsletterSignup";
import CallToActionBlocks from "@/components/CallToActionBlocks";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ScrollToNewsletter } from "@/components/ScrollToNewsletter";

export const metadata: Metadata = {
  title:
    "VietRoot - Premium Vietnamese Organic Products | Authentic Natural Foods from Local Farmers",
  description:
    "Discover the finest Vietnamese organic products: premium rice, authentic tea, natural spices, fresh fruits and traditional foods. Direct from trusted local farmers, delivered worldwide with sustainable farming practices.",
  keywords: [
    "Vietnamese organic products",
    "premium Vietnamese rice",
    "organic Vietnamese tea",
    "natural Vietnamese spices",
    "authentic Vietnamese food",
    "sustainable farming Vietnam",
    "local Vietnamese farmers",
    "organic ecommerce Vietnam",
    "traditional Vietnamese products",
    "healthy Vietnamese food",
  ],
  openGraph: {
    title: "VietRoot - Premium Vietnamese Organic Products",
    description:
      "Discover the finest Vietnamese organic products: premium rice, authentic tea, natural spices, fresh fruits and traditional foods. Direct from trusted local farmers.",
    url: "https://vietroot.com",
    type: "website",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "VietRoot Vietnamese Organic Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VietRoot - Premium Vietnamese Organic Products",
    description:
      "Discover the finest Vietnamese organic products: premium rice, authentic tea, natural spices, fresh fruits and traditional foods.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "https://vietroot.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="absolute" />

      <main>
        {/* Structured Data for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://vietroot.com/#business",
              name: "VietRoot",
              image: "https://vietroot.com/logo.png",
              description:
                "Premium Vietnamese organic products from trusted local farmers including rice, tea, spices, fruits and traditional foods.",
              url: "https://vietroot.com",
              telephone: "+84-xxx-xxx-xxx",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Vietnam",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 14.0583,
                longitude: 108.2772,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                  ],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                "https://facebook.com/vietroot",
                "https://instagram.com/vietroot",
              ],
            }),
          }}
        />

        <HeroSection />

        <QuickIntro />

        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>

        <OurFarm />

        {/* <Partnership /> */}

        <NewsletterSignup />

        <CallToActionBlocks />
      </main>

      <Footer />

      {/* Client component for handling hash navigation */}
      <ScrollToNewsletter />

      <script
        async
        src="https://intern-chatbot-widget.zodinet.tech/widget.js"
        data-client-key="70f9239c-a6e9-43c3-b340-379779493591"
      ></script>
    </div>
  );
}

// Skeleton loader for featured products
function FeaturedProductsSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-viet-earth-cream to-white relative overflow-hidden">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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
