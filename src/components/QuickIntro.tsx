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
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h2
            id="intro-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-intro-title"
          >
            VietRoot: Where the Essence of Vietnam Converges
          </h2>
          <div
            className="w-32 h-2 bg-gradient-to-r from-viet-green-medium via-viet-earth-gold to-viet-green-medium mx-auto rounded-full animate-fade-in-up animation-delay-200 shadow-lg"
            aria-hidden="true"
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story Section */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-viet-green-light/30 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-viet-green-medium/5 rounded-full -translate-y-16 translate-x-16"
                aria-hidden="true"
              ></div>

              {/* Letter Header */}
              <div className="relative mb-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-3 shadow-lg">
                    <Leaf className="h-6 w-6 text-white" aria-hidden="true" />
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
