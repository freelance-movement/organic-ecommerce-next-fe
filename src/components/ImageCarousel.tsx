"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the image data type
type CarouselImage = {
  url: string;
  alt: string;
  caption: string;
};

// Farm imagery data
const images: CarouselImage[] = [
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

/**
 * Image carousel component with autoplay and navigation
 */
export default function ImageCarousel() {
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
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-viet-green-light/30">
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
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full w-10 h-10 p-0 transition-all duration-300"
          data-testid="button-next-image"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
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
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === currentImageIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}