import Footer from "@/components/Footer";
import { Users, Target, Clock, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";

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

      {/* Hero Section */}
      <section className="pt-24 pb-3 mt-0 md:mt-8 md:pt-20 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-about-hero-title"
            >
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                Our Story
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-6"
                data-testid="text-story-title"
              >
                Born from Vietnamese Soil
              </h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p data-testid="text-story-paragraph-1">
                  VietRoot began as a passion project in the heart of Vietnam's
                  agricultural regions. Our founders, deeply connected to the
                  land and its traditions, witnessed the incredible quality of
                  organic products grown by local farmers.
                </p>
                <p data-testid="text-story-paragraph-2">
                  We saw an opportunity to bridge the gap between these
                  dedicated farmers and conscious consumers around the world.
                  Our mission became clear: to create a sustainable platform
                  that honors Vietnamese agricultural heritage while meeting the
                  growing global demand for authentic, organic products.
                </p>
                <p data-testid="text-story-paragraph-3">
                  Today, VietRoot stands as a testament to the power of
                  community, quality, and cultural authenticity. Every product
                  we offer tells a story of Vietnamese craftsmanship and natural
                  excellence.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Vietnamese farmers working in organic fields"
                className="rounded-xl shadow-lg w-full"
                data-testid="img-story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-16 md:py-24 bg-viet-earth-cream">
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
      </section>

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
