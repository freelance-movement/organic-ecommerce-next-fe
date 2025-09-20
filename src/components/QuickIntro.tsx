"use client";
import { useState, useEffect } from "react";
import { Search, Leaf, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Vietnamese farmer with fresh organic produce",
    caption: "Our dedicated farmers working in organic fields",
  },
  {
    url: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Traditional Vietnamese farming methods",
    caption: "Traditional farming methods passed down generations",
  },
  {
    url: "https://images.unsplash.com/photo-1571168507631-6b5b6c0b0c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Organic vegetables harvest",
    caption: "Fresh organic harvest from Vietnamese soil",
  },
  {
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Tea plantation in mountains",
    caption: "Tea plantations in the misty mountains of Vietnam",
  },
];

export default function QuickIntro() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="pt-24 pb-20 md:pt-24 md:pb-16 bg-gradient-to-br from-viet-earth-cream via-white to-viet-green-light/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-viet-green-medium/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-viet-green-light/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-intro-title"
          >
            VietRoot: Where the Essence of Vietnam Converges
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-viet-green-medium via-viet-earth-gold to-viet-green-medium mx-auto rounded-full animate-fade-in-up animation-delay-200 shadow-lg"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story Section */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-viet-green-light/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-viet-green-medium/5 rounded-full -translate-y-16 translate-x-16"></div>

              {/* Letter Header */}
              <div className="relative mb-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-3 shadow-lg">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    A Letter from VietRoot
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-viet-green-dark mb-4 text-center font-serif">
                  Our Story, Our Promise
                </h3>
              </div>

              {/* Letter Content - Shortened */}
              <div className="relative text-gray-700">
                <p className="text-lg leading-relaxed font-medium italic mb-4 text-center">
                  "Dear Friends,"
                </p>

                <div
                  className="text-base leading-relaxed space-y-3"
                  data-testid="text-intro-description"
                >
                  <p>
                    VietRoot was born from a profound realization: we were
                    losing touch with the essence of Vietnamese agriculture in
                    our rush toward modernization.
                  </p>

                  <p>
                    Walking through my grandmother's abandoned rice fields in
                    the Mekong Delta changed everything. Today, we connect you
                    with passionate farmers who still believe in organic,
                    sustainable farming filled with love.
                  </p>

                  <p className="italic">
                    Every product tells a story of dedication, bringing you
                    flavors that carry the soul of Vietnam in every bite.
                  </p>
                </div>

                <div className="text-center mt-6">
                  <p className="text-base font-semibold text-viet-green-dark">
                    With gratitude, The VietRoot Family
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image Slider Section */}
          <div className="animate-fade-in-up animation-delay-600">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-viet-green-light/30">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentImageIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-110"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-2xl"
                      data-testid={`img-farmer-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-lg drop-shadow-lg">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
                  data-testid="button-next-image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-viet-green-medium scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`dot-indicator-${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
