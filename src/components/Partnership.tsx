"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Partnership() {
  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="pt-16 pb-12 md:pt-18 md:pb-14 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Title Section - Following same format as OurFarm and QuickIntro */}
        {/* <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <Handshake className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-viet-green-dark mb-6 animate-fade-in-up">
            Partner with VietRoot
          </h2>
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-viet-green-dark to-transparent mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
          {/* Vertical Divider Line - with decorative dots */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-viet-green-medium to-transparent transform -translate-x-1/2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full shadow-lg"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full shadow-lg"></div>
          </div>

          {/* Left Side - For Farmers in Vietnam */}
          <div className="animate-fade-in-up animation-delay-400 pr-0 lg:pr-8 bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-viet-green-light/20">
            {/* Title Section - Fixed Height */}
            <div className="text-center mb-6 min-h-[140px] flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                For Farmers in Vietnam
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Grow with us. VietRoot partners with skilled, responsible farms
                to turn great harvests into clean, traceable snacks loved
                worldwide.
              </p>
            </div>

            {/* Content Grid - Fixed Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 min-h-[280px]">
              {/* What we offer */}
              <div>
                <h4 className="text-lg font-bold text-viet-green-dark mb-3">
                  What we offer
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Fair, long-term purchase commitments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Technical guidance on VietGAP/organic practices and
                      post-harvest handling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Transparent pricing, on-time payments, and farm-to-snack
                      traceability
                    </span>
                  </li>
                </ul>
              </div>

              {/* What we look for */}
              <div>
                <h4 className="text-lg font-bold text-viet-green-dark mb-3">
                  What we look for
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Consistent quality and volumes by season</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Compliance with VietGAP (required) and readiness for USDA
                      Organic (preferred)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Commitment to sustainable practices and recordkeeping
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Three Image Placeholders - Fixed Height */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-green-light/30 shadow-lg hover:shadow-2xl hover:border-viet-green-medium transition-all duration-300 cursor-pointer relative">
                <img
                  src="/image_1755871684707.png"
                  alt="Vietnamese farmer in organic rice field"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-green-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-green-light/30 shadow-lg hover:shadow-2xl hover:border-viet-green-medium transition-all duration-300 cursor-pointer relative">
                <img
                  src="/image_1755871696467.png"
                  alt="Traditional farming methods in Vietnam"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-green-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-green-light/30 shadow-lg hover:shadow-2xl hover:border-viet-green-medium transition-all duration-300 cursor-pointer relative">
                <img
                  src="/image_1755874088476.png"
                  alt="Sustainable agriculture practices"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-green-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Button */}
            <Button
              onClick={scrollToContactForm}
              className="w-full bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Apply as a Farm Partner!
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Right Side - For Retailers & Distributors in the U.S. */}
          <div className="animate-fade-in-up animation-delay-600 pl-0 lg:pl-8 bg-white rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-viet-earth-gold/20">
            {/* Title Section - Fixed Height */}
            <div className="text-center mb-6 min-h-[140px] flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                For Retailers & Distributors in the U.S.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Stock authentic, better-for-you snacks. Bring VietRoot to your
                customers with turnkey support.
              </p>
            </div>

            {/* Content Grid - Fixed Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 min-h-[280px]">
              {/* Why carry VietRoot */}
              <div>
                <h4 className="text-lg font-bold text-viet-green-dark mb-3">
                  Why carry VietRoot
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Distinct origin story: traceable snacks from Vietnam's
                      river deltas
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Clean label: no added sugar for key SKUs; growing USDA
                      Organic range
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Retail-ready: compliant packaging, English nutrition
                      panels, UPC/GS1, case packs
                    </span>
                  </li>
                </ul>
              </div>

              {/* Programs & support */}
              <div>
                <h4 className="text-lg font-bold text-viet-green-dark mb-3">
                  Programs & support
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>Intro pricing and MOQ-friendly starter packs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Marketing assets: lifestyle images, shelf talkers, QR farm
                      stories
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black">•</span>
                    <span>
                      Logistics: FOB USA or direct import; EDI/3PL options
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Three Image Placeholders - Fixed Height */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-earth-gold/30 shadow-lg hover:shadow-2xl hover:border-viet-earth-gold transition-all duration-300 cursor-pointer relative">
                <img
                  src="/image_1755874292354.png"
                  alt="VietRoot products ready for retail"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-earth-gold/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-earth-gold/30 shadow-lg hover:shadow-2xl hover:border-viet-earth-gold transition-all duration-300 cursor-pointer relative">
                <img
                  src="/bg-fruit.jpg"
                  alt="Fresh Vietnamese organic fruits"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-earth-gold/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group aspect-square rounded-2xl overflow-hidden border-2 border-viet-earth-gold/30 shadow-lg hover:shadow-2xl hover:border-viet-earth-gold transition-all duration-300 cursor-pointer relative">
                <img
                  src="/bg-fruit2.jpg"
                  alt="Premium Vietnamese snacks"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-viet-earth-gold/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Button */}
            <Button
              onClick={scrollToContactForm}
              className="w-full bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Become a Retail/Distribution Partner
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
