import { ArrowRight, CirclePlay, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation1 from "./Navigation";
// import heroImagePath from '@assets/fruits-background.png';
// import healthySnackText from '@assets/healthy-snack-text.png';

export default function HeroSection() {
  // console.log(heroImagePath);
  return (
    <section
      className="relative min-h-[600px] md:min-h-[700px] flex items-start bg-viet-earth-cream bg-cover bg-no-repeat pt-16"
      style={{
        backgroundImage: `url("/bg-fruit4.jpg")`,
        backgroundPosition: "center center",
      }}
    >
      {/* Large "ORGANIC AND FRESH" text overlay in center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white uppercase tracking-widest leading-relaxed drop-shadow-lg">
            <span className="block font-medium  italic">Organic and</span>
            <span className=" block font-medium italic  tracking-widest leading-relaxed">
              Fresh
            </span>
            {/* icon play */}
            <div className="flex items-center justify-center">
              <CirclePlay className="w-10 h-10 text-white animate-pulse" />
            </div>
          </h1>
        </div>
      </div>

      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-viet-earth-cream/20 to-viet-earth-cream/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column - empty space for image */}
          <div className="hidden lg:block">
            {/* This space is for the fruit jar image part */}
          </div>

          {/* Right column - Text content */}
          {/* <div className="flex flex-col justify-start text-center lg:text-left lg:pl-8 bg-white/95 lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none backdrop-blur-sm lg:backdrop-blur-none pt-8 md:pt-16 lg:pt-20"> */}
          {/* Healthy Snack Image */}
          {/* <div className="mb-6 lg:mb-8">
              <img
                src="/healthy-snack-text.png"
                alt="Healthy Snack - The Root of Goodness, The Taste of Vietnam"
                className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-[540px] xl:w-[600px] max-w-lg h-auto mx-auto lg:mx-0 lg:-ml-8 lg:-mt-10 drop-shadow-2xl transform hover:scale-105 transition-all duration-700 ease-out filter brightness-105"
                data-testid="hero-title-image"
              />
            </div> */}

          {/* Description Text */}
          {/* <div className="mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 lg:-mt-20">
              <p
                className="text-lg md:text-xl lg:text-xl text-slate-700 leading-relaxed font-normal tracking-wide"
                data-testid="text-hero-description"
                style={{
                  textShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  lineHeight: "1.7",
                }}
              >
                <span className="text-viet-green-dark font-semibold text-xl md:text-2xl lg:text-3xl">
                  Discover
                </span>{" "}
                <span className="text-gray-700">
                  exquisite organic products,
                </span>{" "}
                <span className="text-viet-green-medium font-medium italic text-xl md:text-2xl lg:text-3xl">
                  bursting
                </span>{" "}
                <span className="text-gray-700">with the fresh,</span>{" "}
                <span className="text-viet-green-medium font-semibold">
                  natural flavors
                </span>{" "}
                <span className="text-gray-700">of our homeland.</span>
              </p>
            </div> */}

          {/* CTA Button */}
          {/* <div className="flex justify-center lg:justify-start mb-8">
              <Button
                className="group relative bg-gradient-to-br from-viet-green-medium via-viet-green-dark to-viet-green-medium hover:from-viet-green-dark hover:via-viet-green-medium hover:to-viet-green-dark text-white px-12 py-6 rounded-full text-lg font-bold transition-all duration-700 transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl border border-white/30"
                data-testid="button-discover-now"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center relative z-10">
                  <ArrowRight className="h-5 w-5 mr-3 transform group-hover:translate-x-2 transition-transform duration-500" />
                  <span className="tracking-wide">Discover Now</span>
                </div>
              </Button>
            </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Decorative separator */}
      <div className="absolute bottom-0 left-0 right-0">
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
  );
}
