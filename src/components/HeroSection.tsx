"use client";

import { CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Hero section component for the homepage
 * Using client component to dynamically fetch background asset
 */
export default function HeroSection() {
  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";
  const [backgroundUrl, setBackgroundUrl] = useState<string>("/bg-fruit4.jpg");

  useEffect(() => {
    let isMounted = true;
    async function getBackgroundUrl(): Promise<string> {
      const fallback = "/bg-fruit4.jpg";
      if (!backendOrigin) return fallback;
      try {
        const params = new URLSearchParams({
          limit: "1",
          category: "background_file",
          type: "image",
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/assets?${params.toString()}`;
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) return fallback;
        const data = await res.json();
        const first = data?.data?.[0];
        const rawUrl: string | undefined = first?.url;
        if (!rawUrl) return fallback;
        const absolute = /^https?:\/\//i.test(rawUrl)
          ? rawUrl
          : `${backendOrigin}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
        return absolute;
      } catch {
        return fallback;
      }
    }

    (async () => {
      const url = await getBackgroundUrl();
      if (isMounted) setBackgroundUrl(url);
    })();

    return () => {
      isMounted = false;
    };
  }, [backendOrigin]);

  return (
    <>
      {/* Warm the browser cache for the CSS background image */}
      <img
        src={backgroundUrl}
        alt=""
        loading="eager"
        decoding="async"
        style={{ display: "none" }}
      />
      <section
        className="relative min-h-[600px] md:min-h-[700px] flex items-start bg-viet-earth-cream bg-cover bg-no-repeat pt-16"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
          backgroundPosition: "center center",
        }}
        aria-labelledby="hero-heading"
      >
        {/* Large "ORGANIC AND FRESH" text overlay in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

        {/* Background overlay for better text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-viet-earth-cream/20 to-viet-earth-cream/40"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left column - space for future content */}
            <div className="hidden lg:block" aria-hidden="true"></div>

            {/* Right column - reserved for future content */}
          </div>
        </div>

        {/* Decorative separator */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
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
      </section>
    </>
  );
}
