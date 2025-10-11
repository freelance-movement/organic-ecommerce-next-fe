import {
  Target,
  Eye,
  Leaf,
  Heart,
  Globe,
  Award,
  Users2,
  TrendingUp,
} from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-viet-earth-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Image */}
          <div className="order-2 lg:order-1">
            <div className="border-2 border-viet-green-dark rounded-3xl p-4 h-[600px] bg-white transition-all duration-300 hover:shadow-xl hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000"
                alt="Vietnamese organic farming"
                className="rounded-2xl w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right - Vision & Mission Content */}
          <div className="order-1 lg:order-2 space-y-12">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-viet-green-dark mb-6">
                Vision & Mission
              </h2>
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className="w-16 h-0.5 bg-viet-green-dark"></div>
                <div className="w-2 h-2 bg-viet-green-dark rounded-full"></div>
                <div className="w-16 h-0.5 bg-viet-green-dark"></div>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-viet-green-dark">
                Vision
              </h3>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                To be the most trusted modern voice for Vietnamese produce, recognized for quality, cultural authenticity, and farming dignity.
              </p>
            </div>

            {/* Mission */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-viet-green-dark">
                Mission
              </h3>
              <ul className="space-y-3 text-base md:text-lg text-gray-800">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-viet-green-dark rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">
                    Connect Vietnam's best growing regions to global shelves with standards-first sourcing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-viet-green-dark rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">
                    Celebrate seasonality and terroir while protecting soil health and biodiversity.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-viet-green-dark rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">
                    Publish clear, useful information, ingredients, nutrition, certifications, and origin, so choices are simple.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-viet-green-dark rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">
                    Build long-term programs that raise farmer incomes and reward responsible practices.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
