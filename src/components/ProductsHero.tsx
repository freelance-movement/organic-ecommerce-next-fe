"use client";

import React from "react";

type ProductsHeroProps = {
  title: string;
  icon: React.ReactNode;
  className?: string;
};

export default function ProductsHero({
  title,
  icon,
  className,
}: ProductsHeroProps) {
  return (
    <section
      className={`products-hero mt-8 md:mt-10 pt-12 pb-4 md:pt-12 md:pb-4 text-white relative overflow-hidden ${
        className || ""
      }`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full animate-float shadow-2xl">
              {icon}
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold animate-fade-in-up"
              data-testid="text-products-hero-title"
            >
              <span className="inline-block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                {title}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
