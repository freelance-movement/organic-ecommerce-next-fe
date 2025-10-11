import { Metadata } from "next";
import Footer from "@/components/Footer";
import { Users, Target, Clock, Heart } from "lucide-react";
import ProductsHero from "@/components/ProductsHero";
import Navigation from "@/components/Navigation";
import MissionVision from "@/components/MissionVision";

export const metadata: Metadata = {
  title: "About VietRoot - Our Story & Vietnamese Organic Farming Heritage",
  description:
    "Discover VietRoot's journey: connecting authentic Vietnamese organic farmers with global consumers. Learn about our sustainable farming partnerships, cultural heritage, and mission to share Vietnam's finest organic products worldwide.",
  keywords: [
    "VietRoot story",
    "Vietnamese organic farming",
    "sustainable agriculture Vietnam",
    "organic farmers partnership",
    "Vietnamese heritage foods",
    "authentic Vietnamese products",
    "organic farming tradition",
    "Vietnamese food culture",
    "sustainable farming practices",
    "local farmers support Vietnam",
  ],
  openGraph: {
    title: "About VietRoot - Our Vietnamese Organic Farming Heritage",
    description:
      "Discover VietRoot's journey: connecting authentic Vietnamese organic farmers with global consumers. Learn about our sustainable farming partnerships and cultural heritage.",
    url: "https://vietroot.com/about",
    type: "website",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "VietRoot - Vietnamese Organic Farming Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About VietRoot - Our Vietnamese Organic Farming Heritage",
    description:
      "Discover VietRoot's journey: connecting authentic Vietnamese organic farmers with global consumers.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "https://vietroot.com/about",
  },
};

const milestones = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "VietRoot was founded with a simple dream: to bring the authentic taste of Vietnam to the world while supporting local farmers.",
  },
  {
    year: "2020",
    title: "Growing Network",
    description:
      "Partnered with over 50 organic farms across Vietnam, establishing a reliable supply chain of premium products.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Launched international shipping and established partnerships with retailers in Southeast Asia.",
  },
  {
    year: "2024",
    title: "Future Vision",
    description:
      "Expanding to serve customers worldwide while maintaining our commitment to sustainability and quality.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      <ProductsHero
        title="Our Story"
        icon={<Heart className="h-6 w-6 text-white" />}
        className="bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark"
      />

      {/* Our Story */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-story-title"
            >
              Our Brand Story
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-32 h-0.5 bg-viet-green-dark"></div>
              <div className="w-3 h-3 bg-viet-green-dark rounded-full"></div>
              <div className="w-32 h-0.5 bg-viet-green-dark"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight"
                data-testid="text-story-subtitle"
              >
                Rooted in Vietnam.
                <br />
                Growing for the world!
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed lg:leading-loose">
                <p data-testid="text-story-paragraph-1">
                  VietRoot curates Vietnam's native bounty, from river deltas to highlands and turns seasonal harvests into light, vibrant fruit snacks. We work directly with trusted growers, keep processing minimal to preserve natural character, and make origin easy to understand. The result is flavor that feels fresh from the orchard and a supply chain you can feel proud of.
                </p>
              </div>
            </div>
            <div>
              <div className="border-2 border-viet-green-dark rounded-3xl p-4 h-[500px] transition-all duration-300 hover:shadow-xl hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Vietnamese farmers working in organic fields"
                  className="rounded-2xl w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  data-testid="img-story"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Founder Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-viet-earth-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-6">
                  Our Founder
                </h2>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="w-32 h-0.5 bg-viet-green-dark"></div>
                  <div className="w-3 h-3 bg-viet-green-dark rounded-full"></div>
                  <div className="w-32 h-0.5 bg-viet-green-dark"></div>
                </div>
              </div>

              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed lg:leading-loose">
                  "VietRoot is the passion project I've honed for years. It began in the U.S., as a mother searching for a clean, honest snack for my son amid a sea of junk. That small, urgent question, what will my child eat today? - opened a larger calling: to bring Vietnam's best, responsibly grown produce to families everywhere. With VietRoot, I'm building a bridge from skilled Vietnamese farmers to the world, offering snacks that are clean, transparent, and traceable, and a future where our children can choose better without compromise."
                </p>

                <div className="pt-6">
                  <p className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
                    Because we're proud of the quality
                    <br />
                    of Vietnamese produce.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Founder Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                    alt="VietRoot Founder"
                    className="w-full h-auto object-cover"
                    data-testid="img-founder"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      {/* <section className="py-16 md:py-24 bg-viet-earth-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
            <Heart className="text-viet-green-medium h-12 w-12 mx-auto mb-6" />
            <h2
              className="text-2xl md:text-3xl font-bold text-viet-green-dark mb-6"
              data-testid="text-founder-title"
            >
              A Personal Message from Our Founder
            </h2>
            <blockquote
              className="text-lg text-gray-700 italic leading-relaxed mb-6"
              data-testid="text-founder-message"
            >
              "Growing up in rural Vietnam, I learned that the best products
              come from the heart. Every farmer we partner with shares our
              commitment to quality and sustainability. VietRoot is more than a
              business – it's our way of sharing Vietnam's natural treasures
              with the world while ensuring our farmers receive fair
              compensation for their dedication."
            </blockquote>
            <p
              className="font-semibold text-viet-green-dark"
              data-testid="text-founder-name"
            >
              — Nguyen Minh, Founder & CEO
            </p>
          </div>
        </div>
      </section> */}

      {/* Mission & Vision Section */}
      <MissionVision />

      {/* Our Vision Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-timeline-title"
            >
              Our Journey
            </h2>
            <p
              className="text-lg text-gray-600"
              data-testid="text-timeline-subtitle"
            >
              From local passion to global mission
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                data-testid={`milestone-${milestone.year}`}
              >
                <div className="md:w-1/2">
                  <div className="bg-viet-green-dark text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-4 mx-auto md:mx-0">
                    {milestone.year}
                  </div>
                  <h3
                    className="text-xl font-semibold text-viet-green-dark mb-2 text-center md:text-left"
                    data-testid={`text-milestone-title-${milestone.year}`}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    className="text-gray-700 text-center md:text-left"
                    data-testid={`text-milestone-description-${milestone.year}`}
                  >
                    {milestone.description}
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-viet-earth-cream rounded-xl p-8 text-center">
                    <Clock className="text-viet-green-medium h-12 w-12 mx-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-values-section-title"
            >
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Target className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-viet-green-dark mb-3">
                Quality First
              </h3>
              <p className="text-gray-600">
                Every product is carefully selected and tested to meet our high
                standards.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Users className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-viet-green-dark mb-3">
                Community Impact
              </h3>
              <p className="text-gray-600">
                Supporting local farmers and sustainable agricultural practices.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <Heart className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-viet-green-dark mb-3">
                Cultural Heritage
              </h3>
              <p className="text-gray-600">
                Preserving and sharing the rich agricultural traditions of
                Vietnam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
