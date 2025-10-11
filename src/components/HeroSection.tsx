"use client";

import { CirclePlay, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Hero section component for the homepage
 * Using client component with auto-sliding banner functionality
 */
export default function HeroSection() {
  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";
  
  // Fallback slides - always available
  const fallbackSlides = [
    "/bg-fruit4.jpg",
    "/bg-fruit1.jpg",
    "/bg-fruit2.jpg",
    "/bg-fruit3.jpg",
    "/bg-fruit.jpg",
  ];
  
  const [slides, setSlides] = useState<string[]>(fallbackSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch background images from API
  useEffect(() => {
    let isMounted = true;
    
    async function getBackgroundUrls(): Promise<string[]> {
      if (!backendOrigin) return fallbackSlides;
      
      try {
        const params = new URLSearchParams({
          limit: "10",
          category: "background_file",
          type: "image",
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/assets?${params.toString()}`;
        const res = await fetch(url, { cache: "no-store" });
        
        if (!res.ok) return fallbackSlides;
        
        const data = await res.json();
        const items = data?.data || [];
        
        if (items.length === 0) return fallbackSlides;
        
        const urls = items
          .map((item: any) => {
            const rawUrl: string = item?.url || "";
            if (!rawUrl) return "";
            return /^https?:\/\//i.test(rawUrl)
              ? rawUrl
              : `${backendOrigin}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
          })
          .filter(Boolean);
          
        // Need at least 2 slides for slider to work, otherwise use fallback
        return urls.length >= 2 ? urls : fallbackSlides;
      } catch (error) {
        console.error("Error fetching background images:", error);
        return fallbackSlides;
      }
    }

    (async () => {
      const urls = await getBackgroundUrls();
      if (isMounted) {
        setSlides(urls);
        setIsLoaded(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [backendOrigin]);

  // Auto-advance slider with ref to avoid stale closures
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Don't start if paused or only one slide
    if (isPaused || slides.length <= 1 || !isLoaded) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        return nextIndex;
      });
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, slides.length, isLoaded]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning, currentIndex]
  );

  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] flex items-start overflow-hidden pt-24 md:pt-32"
      aria-labelledby="hero-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
        {/* Slider backgrounds with fade effect */}
        {slides.map((url, idx) => (
          <div
            key={`slide-${idx}`}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out z-0 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${url}")`,
              backgroundPosition: "center center",
            }}
          />
        ))}
        {/* Background overlay for better text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-viet-earth-cream/20 to-viet-earth-cream/40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Large "ORGANIC AND FRESH" text overlay in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white uppercase tracking-widest leading-relaxed drop-shadow-lg"
            >
              <span className="block font-medium italic">Organic and</span>
              <span className="block font-medium italic tracking-widest leading-relaxed">
                Fresh
              </span>
              {/* Play icon */}
              <div className="flex items-center justify-center">
                <CirclePlay
                  className="w-10 h-10 text-white animate-pulse"
                  aria-hidden="true"
                />
              </div>
            </h1>
          </div>
        </div>

        <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left column - space for future content */}
            <div className="hidden lg:block" aria-hidden="true"></div>

            {/* Right column - reserved for future content */}
          </div>
        </div>

        {/* Decorative separator */}
        <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
          <div className="relative">
            {/* Main separator line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-viet-green-medium/60 to-transparent"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full bg-viet-earth-gold/80 animate-pulse"></div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-viet-green-dark to-viet-earth-gold rounded-full"></div>
              <div
                className="w-4 h-4 rounded-full bg-viet-green-medium/80 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Soft glow effect */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-48 h-3 bg-gradient-to-r from-transparent via-viet-green-light/30 to-transparent blur-md"></div>
          </div>
        </div>

        {/* Slider Dots Navigation */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </section>
  );
}
