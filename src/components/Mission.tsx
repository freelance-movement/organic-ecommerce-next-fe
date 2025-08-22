import { Target, Leaf, Heart, Globe } from "lucide-react";

export default function Mission() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-viet-green-dark to-viet-green-medium text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 animate-float">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up"
            data-testid="text-mission-title"
          >
            Our Mission
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-white to-viet-earth-gold mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Mission Statement */}
          <div className="space-y-8 animate-fade-in-up animation-delay-400">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Bringing Vietnam's Natural Treasures to the World
              </h3>
              <p className="text-lg leading-relaxed text-white/90 mb-6">
                At VietRoot, we bridge the gap between Vietnam's rich agricultural heritage and global consumers who value authenticity, quality, and sustainability. We empower local farmers while delivering premium organic products that tell the story of our beautiful homeland.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Every product we offer carries the essence of Vietnamese soil, the dedication of our farmers, and our unwavering commitment to preserving traditional farming methods for future generations.
              </p>
            </div>
          </div>
          
          {/* Right - Mission Values */}
          <div className="space-y-6 animate-fade-in-up animation-delay-600">
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Sustainable Agriculture</h4>
                <p className="text-white/80">Supporting eco-friendly farming practices that preserve our environment for future generations.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Farmer Empowerment</h4>
                <p className="text-white/80">Creating fair trade opportunities that improve livelihoods and strengthen rural communities.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Global Reach</h4>
                <p className="text-white/80">Sharing Vietnam's natural bounty with health-conscious consumers around the world.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}