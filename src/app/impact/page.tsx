import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Leaf, Users, Award, Heart, MapPin, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact - Supporting Vietnamese Farmers & Sustainable Agriculture",
  description: "Discover how VietRoot supports over 150+ Vietnamese organic farmers, promotes sustainable agriculture, and preserves traditional farming practices. See our community impact, environmental benefits, and cultural preservation efforts.",
  keywords: [
    "Vietnamese farmers support",
    "sustainable agriculture Vietnam",
    "organic farming impact",
    "community development Vietnam",
    "traditional farming preservation",
    "environmental impact Vietnam",
    "farmer partnership program",
    "sustainable development goals",
    "rural development Vietnam",
    "organic certification Vietnam"
  ],
  openGraph: {
    title: "Our Impact - Supporting Vietnamese Farmers & Sustainable Agriculture",
    description: "Discover how VietRoot supports over 150+ Vietnamese organic farmers and promotes sustainable agriculture while preserving traditional farming practices.",
    url: "https://vietroot.com/impact",
    type: "website",
    images: [
      {
        url: "/og-impact.jpg",
        width: 1200,
        height: 630,
        alt: "VietRoot Impact - Supporting Vietnamese Farmers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Impact - Supporting Vietnamese Farmers & Sustainable Agriculture",
    description: "Discover how VietRoot supports over 150+ Vietnamese organic farmers and promotes sustainable agriculture.",
    images: ["/og-impact.jpg"],
  },
  alternates: {
    canonical: "https://vietroot.com/impact",
  },
};

const farmerStories = [
  {
    id: 1,
    name: "Nguyen Van Duc",
    location: "Ha Giang Province",
    product: "Wild Honey",
    story:
      "For three generations, my family has been beekeeping in the pristine mountains of Ha Giang. VietRoot has helped us reach customers who truly appreciate the purity and quality of our wild honey.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    partnership: "3 years",
  },
  {
    id: 2,
    name: "Tran Thi Mai",
    location: "Thai Nguyen Province",
    product: "Organic Green Tea",
    story:
      "My tea gardens have been organic for over 15 years. Working with VietRoot has allowed me to expand my reach while maintaining the traditional methods passed down from my grandmother.",
    image:
      "https://images.unsplash.com/photo-1571168507631-6b5b6c0b0c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    partnership: "2 years",
  },
  {
    id: 3,
    name: "Le Van Minh",
    location: "Ben Tre Province",
    product: "Virgin Coconut Oil",
    story:
      "Our coconut groves have been in the family for decades. VietRoot's fair trade practices have improved our quality of life and allowed us to invest in sustainable farming methods.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    partnership: "4 years",
  },
];

const impactStats = [
  {
    icon: Users,
    number: "150+",
    label: "Partner Farmers",
    description: "Directly supporting farmers across Vietnam",
  },
  {
    icon: Leaf,
    number: "500+",
    label: "Hectares Organic",
    description: "Land converted to organic farming",
  },
  {
    icon: TrendingUp,
    number: "40%",
    label: "Income Increase",
    description: "Average farmer income improvement",
  },
  {
    icon: Award,
    number: "12",
    label: "Certifications",
    description: "Organic and fair trade certifications",
  },
];

const culturalPractices = [
  {
    title: "Traditional Tea Ceremony",
    description:
      "Our tea farmers maintain the ancient art of Vietnamese tea preparation, ensuring each leaf carries cultural significance.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  {
    title: "Ancestral Beekeeping",
    description:
      "Wild honey collection follows methods passed down through generations, respecting both bees and forest ecosystems.",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  {
    title: "Heritage Spice Cultivation",
    description:
      "Turmeric and ginger cultivation using traditional companion planting techniques for maximum potency.",
    image:
      "https://images.unsplash.com/photo-1599639402519-8d7e0c0cd55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
];

export default function Impact() {
  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Hero Section */}
      <section className="pt-20 pb-3 md:pt-20 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-impact-hero-title"
            >
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                Our Impact Story
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-stats-title"
            >
              By the Numbers
            </h2>
            <p
              className="text-lg text-gray-600"
              data-testid="text-stats-subtitle"
            >
              Measuring our positive impact on communities and environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-viet-earth-cream rounded-xl"
                  data-testid={`stat-${index}`}
                >
                  <IconComponent className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
                  <div
                    className="text-3xl font-bold text-viet-green-dark mb-2"
                    data-testid={`stat-number-${index}`}
                  >
                    {stat.number}
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-800 mb-2"
                    data-testid={`stat-label-${index}`}
                  >
                    {stat.label}
                  </h3>
                  <p
                    className="text-gray-600 text-sm"
                    data-testid={`stat-description-${index}`}
                  >
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Farmer Stories */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-stories-title"
            >
              Farmer Stories
            </h2>
            <p
              className="text-lg text-gray-600"
              data-testid="text-stories-subtitle"
            >
              Meet the passionate farmers behind our products
            </p>
          </div>

          <div className="space-y-12">
            {farmerStories.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                data-testid={`farmer-story-${farmer.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-4">
                      <MapPin className="text-viet-green-medium h-5 w-5 mr-2" />
                      <span
                        className="text-gray-600"
                        data-testid={`farmer-location-${farmer.id}`}
                      >
                        {farmer.location}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-bold text-viet-green-dark mb-2"
                      data-testid={`farmer-name-${farmer.id}`}
                    >
                      {farmer.name}
                    </h3>
                    <p
                      className="text-viet-earth-gold font-semibold mb-4"
                      data-testid={`farmer-product-${farmer.id}`}
                    >
                      {farmer.product} Producer
                    </p>
                    <blockquote
                      className="text-gray-700 italic text-lg leading-relaxed mb-4"
                      data-testid={`farmer-story-${farmer.id}`}
                    >
                      "{farmer.story}"
                    </blockquote>
                    <div className="flex items-center text-sm text-gray-600">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      <span data-testid={`farmer-partnership-${farmer.id}`}>
                        Partnership: {farmer.partnership}
                      </span>
                    </div>
                  </div>
                  <div className="h-64 lg:h-auto">
                    <img
                      src={farmer.image}
                      alt={`${farmer.name} - ${farmer.product} farmer`}
                      className="w-full h-full object-cover"
                      data-testid={`farmer-image-${farmer.id}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Roots */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-culture-title"
            >
              Preserving Cultural Heritage
            </h2>
            <p
              className="text-lg text-gray-600"
              data-testid="text-culture-subtitle"
            >
              Every product carries the wisdom of Vietnamese agricultural
              traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {culturalPractices.map((practice, index) => (
              <div
                key={index}
                className="bg-viet-earth-cream rounded-xl overflow-hidden"
                data-testid={`cultural-practice-${index}`}
              >
                <img
                  src={practice.image}
                  alt={practice.title}
                  className="w-full h-48 object-cover"
                  data-testid={`cultural-image-${index}`}
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-viet-green-dark mb-3"
                    data-testid={`cultural-title-${index}`}
                  >
                    {practice.title}
                  </h3>
                  <p
                    className="text-gray-700"
                    data-testid={`cultural-description-${index}`}
                  >
                    {practice.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 md:py-24 bg-viet-green-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            data-testid="text-why-matters-title"
          >
            Why It Matters
          </h2>
          <div className="space-y-6 text-lg text-gray-300">
            <p data-testid="text-why-matters-p1">
              In a world of mass-produced goods, we choose to work directly with
              farmers who care about quality, sustainability, and cultural
              preservation. This isn't just business – it's a movement.
            </p>
            <p data-testid="text-why-matters-p2">
              When you choose VietRoot, you're supporting families, preserving
              traditions, and promoting sustainable agriculture. You're part of
              a story that connects Vietnamese soil to your table, carrying with
              it generations of knowledge and care.
            </p>
            <p data-testid="text-why-matters-p3">
              Together, we're proving that commerce can be a force for good,
              creating prosperity while protecting our planet and honoring our
              cultural heritage.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
