import { Eye, TrendingUp, Award, Users2 } from "lucide-react";

const visionGoals = [
  {
    icon: Award,
    title: "Market Leader",
    description: "Become the most trusted brand for Vietnamese organic products globally by 2030."
  },
  {
    icon: Users2,
    title: "Community Impact",
    description: "Partner with 1,000+ farmers and support 10,000+ rural families across Vietnam."
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth", 
    description: "Achieve carbon-neutral operations while maintaining 100% organic certification."
  }
];

export default function Vision() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-viet-earth-cream to-white opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-viet-green-light/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-viet-earth-gold/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-xl">
            <Eye className="h-10 w-10 text-white" />
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-vision-title"
          >
            Our Vision
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Vision Statement */}
          <div className="space-y-8 animate-fade-in-up animation-delay-400">
            <div className="bg-gradient-to-br from-white to-viet-earth-cream rounded-3xl p-8 shadow-2xl border border-viet-green-light/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-viet-green-medium/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold text-viet-green-dark mb-6 text-center">
                  A World Connected by Nature's Goodness
                </h3>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    We envision a future where Vietnamese organic products are recognized worldwide as symbols of quality, authenticity, and sustainable agriculture.
                  </p>
                  <p>
                    Through innovation and tradition, we will create a global network that honors our farmers, protects our environment, and nourishes communities across continents.
                  </p>
                  <div className="bg-viet-green-medium/10 rounded-xl p-6 border-l-4 border-viet-green-medium">
                    <p className="font-semibold text-viet-green-dark italic">
                      "To be the bridge that brings Vietnam's agricultural heritage to every table in the world, creating prosperity for our farmers and wellness for our customers."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - Vision Goals */}
          <div className="space-y-8 animate-fade-in-up animation-delay-600">
            <h3 className="text-2xl font-bold text-viet-green-dark text-center mb-8">
              Our 2030 Goals
            </h3>
            
            <div className="space-y-6">
              {visionGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-viet-green-medium/30 relative overflow-hidden"
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-viet-green-medium/10 to-viet-earth-gold/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div className="relative flex items-start space-x-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-viet-green-dark mb-2 group-hover:text-viet-green-medium transition-colors duration-300">
                          {goal.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}