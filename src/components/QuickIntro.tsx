/**
 * Farm story and image gallery
 */
"use client";

import { useState, useEffect } from "react";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import ImageCarousel from "./ImageCarousel";

/**
 * Farm story and image gallery
 */
export default function QuickIntro() {
  // Image carousel state and data
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";
  const defaultImages = [
    {
      url: "/image_1755871684707.png",
      alt: "Organic farmer in Vietnam harvesting fresh produce",
      caption: "Mr. Tran in the Red River Delta, nurturing organic greens",
    },
    {
      url: "/image_1755871696467.png",
      alt: "Traditional Vietnamese farming methods",
      caption: "Preserving traditional farming wisdom in Dalat highlands",
    },
    {
      url: "/image_1755874088476.png",
      alt: "Sustainable agriculture practices",
      caption: "Sustainable water management in Mekong Delta rice fields",
    },
    {
      url: "/image_1755874292354.png",
      alt: "Organic produce direct from Vietnam",
      caption: "Hand-selected harvest ready for VietRoot customers",
    },
  ];
  const [images, setImages] = useState<typeof defaultImages>(defaultImages);

  useEffect(() => {
    let isMounted = true;
    const fetchAssets = async () => {
      if (!backendOrigin) return; // stay with defaults
      try {
        const params = new URLSearchParams({
          page: "1",
          limit: "10",
          category: "letter_file",
          type: "image",
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/assets?${params.toString()}`;
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) return;
        const json = await res.json();
        const items: Array<{ url?: string; title?: string }> = json?.data || [];
        const mapped = items
          .map((it, idx) => {
            const raw = it?.url || "";
            if (!raw) return null;
            const absolute = /^https?:\/\//i.test(raw)
              ? raw
              : `${backendOrigin}${raw.startsWith("/") ? "" : "/"}${raw}`;
            return {
              url: absolute,
              alt: it?.title || `VietRoot letter image ${idx + 1}`,
              caption: it?.title || "",
            };
          })
          .filter(Boolean) as typeof defaultImages;
        if (isMounted && mapped.length > 0) {
          setImages(mapped);
          setCurrentImageIndex(0);
        }
      } catch {
        // silent fallback to defaults
      }
    };
    fetchAssets();
    return () => {
      isMounted = false;
    };
  }, [backendOrigin]);

  // Image navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      className="pt-16 pb-14 md:pt-18 md:pb-12 bg-gradient-to-br from-viet-earth-cream via-white to-viet-green-light/20 relative overflow-hidden"
      aria-labelledby="intro-heading"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-10 left-10 w-64 h-64 bg-viet-green-medium/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-viet-green-light/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <Leaf className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h2
            id="intro-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-intro-title"
          >
            Rooted in Vietnam. Growing for the World!
          </h2>
          <div
            className="w-64 h-1 bg-gradient-to-r from-transparent via-viet-green-dark to-transparent mx-auto rounded-full animate-fade-in-up animation-delay-200"
            aria-hidden="true"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mx-auto">
          {/* Left - Story Section (1/3 width) */}
          <div className="lg:col-span-1 animate-fade-in-up animation-delay-400">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-viet-green-light/30 relative overflow-hidden h-full flex flex-col">
              {/* Letter Header */}
              <div className="relative mb-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-4 shadow-lg">
                    <Leaf className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    A Letter from VietRoot
                  </p>
                  <h3 className="text-2xl font-bold text-viet-green-dark mb-2 font-serif">
                    Our Story, Our Promise
                  </h3>
                </div>
              </div>

              {/* Letter Content */}
              <div className="relative text-gray-800 flex-grow">
                <p className="text-base leading-relaxed mb-4">
                  Dear friends,
                </p>

                <div
                  className="text-base leading-relaxed space-y-4 text-justify"
                  data-testid="text-intro-description"
                >
                  <p>
                    VietRoot began with a simple belief: the soul of Vietnamese 
                    agriculture deserves a place on the world's shelf. Walking the 
                    rice fields and fruit orchards of our Mekong and Red River Deltas, 
                    we met farmers whose care and craft never wavered, even as the 
                    world rushed ahead.
                  </p>

                  <p>
                    Today, we partner with those families to champion sustainable 
                    farming, full traceability, and authentic flavor. Every harvest is 
                    selected with intention. Every snack is made to be clean, vibrant, 
                    and true to its roots.
                  </p>

                  <p>
                    Every bite carries a story, from Vietnamese soil to you.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-base font-medium text-viet-green-dark">
                    With gratitude,
                  </p>
                  <p className="text-base font-semibold text-viet-green-dark">
                    The VietRoot Family
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Image Section (2/3 width) */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-600">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-viet-green-light/30 overflow-hidden h-full min-h-[600px]">
              <div className="relative h-full rounded-2xl overflow-hidden">
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
                      className="w-full h-full object-cover"
                      data-testid={`img-farmer-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    {/* <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white font-semibold text-lg drop-shadow-lg">
                        {image.caption}
                      </p>
                    </div> */}
                  </div>
                ))}

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full w-12 h-12 p-0 transition-all duration-300"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-white rounded-full w-12 h-12 p-0 transition-all duration-300"
                  data-testid="button-next-image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white scale-125 shadow-lg"
                        : "bg-white/50 hover:bg-white/80"
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
