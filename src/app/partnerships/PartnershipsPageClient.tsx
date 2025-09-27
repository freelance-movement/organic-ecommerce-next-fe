"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Handshake, TrendingUp, Globe, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  {
    icon: TrendingUp,
    title: "Premium Quality Products",
    description:
      "Access to Vietnam's finest organic products with guaranteed quality and traceability.",
  },
  {
    icon: Globe,
    title: "Growing Market Demand",
    description:
      "Tap into the rapidly expanding organic and wellness market worldwide.",
  },
  {
    icon: Handshake,
    title: "Reliable Partnership",
    description:
      "Work with a trusted partner committed to long-term relationships and mutual success.",
  },
];

const partnershipTypes = [
  {
    title: "Distributor",
    description:
      "Become a regional distributor for VietRoot products in your market.",
    minOrder: "Minimum order: ₫10,000,000",
    benefits: ["Wholesale pricing", "Marketing support", "Exclusive territory"],
  },
  {
    title: "Retail Partner",
    description: "Stock VietRoot products in your store or online marketplace.",
    minOrder: "Minimum order: ₫2,000,000",
    benefits: ["Competitive margins", "Product training", "Display materials"],
  },
  {
    title: "Franchise",
    description: "Join us in expanding VietRoot's global reach and impact.",
    minOrder: "Investment from: $50,000 USD",
    benefits: ["Brand recognition", "Operational support", "Training programs"],
  },
];

export default function PartnershipsPageClient() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/v1/partnerships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.company,
          contactName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone || undefined,
          partnershipType: formData.partnershipType || undefined,
          message: formData.message || undefined,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to submit partnership inquiry"
        );
      }

      toast({
        title: "Partnership inquiry sent!",
        description:
          "Thank you for your interest. Our team will contact you within 24 hours.",
      });
      setFormData({
        company: "",
        name: "",
        email: "",
        phone: "",
        partnershipType: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send inquiry",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Hero Section */}
      <section className="pt-24 pb-3 mt-0 md:mt-8 md:pt-20 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <Handshake className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-partnerships-hero-title"
            >
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                Partner With VietRoot
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-why-partner-title"
            >
              Why Partner With VietRoot?
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              data-testid="text-why-partner-subtitle"
            >
              We're more than a supplier – we're your partner in building a
              sustainable, profitable business in the organic products market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-viet-earth-cream rounded-xl"
                  data-testid={`benefit-${index}`}
                >
                  <IconComponent className="text-viet-green-medium h-16 w-16 mx-auto mb-6" />
                  <h3
                    className="text-xl font-semibold text-viet-green-dark mb-4"
                    data-testid={`benefit-title-${index}`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-gray-700"
                    data-testid={`benefit-description-${index}`}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-partnership-types-title"
            >
              Partnership Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                data-testid={`partnership-type-${index}`}
              >
                <h3
                  className="text-2xl font-bold text-viet-green-dark mb-4"
                  data-testid={`partnership-title-${index}`}
                >
                  {type.title}
                </h3>
                <p
                  className="text-gray-700 mb-4"
                  data-testid={`partnership-description-${index}`}
                >
                  {type.description}
                </p>
                <p
                  className="text-viet-earth-gold font-semibold mb-6"
                  data-testid={`partnership-min-order-${index}`}
                >
                  {type.minOrder}
                </p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-gray-600"
                      data-testid={`partnership-benefit-${index}-${benefitIndex}`}
                    >
                      <div className="w-2 h-2 bg-viet-green-medium rounded-full mr-3"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-8"
            data-testid="text-resources-title"
          >
            Partnership Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-viet-earth-cream rounded-xl p-8">
              <Download className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
              <h3
                className="text-xl font-semibold text-viet-green-dark mb-4"
                data-testid="text-wholesale-linesheet-title"
              >
                Wholesale Line Sheet
              </h3>
              <p
                className="text-gray-700 mb-6"
                data-testid="text-wholesale-linesheet-description"
              >
                Download our complete product catalog with wholesale pricing and
                specifications.
              </p>
              <Button
                className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
                data-testid="button-download-linesheet"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Line Sheet
              </Button>
            </div>

            <div className="bg-viet-earth-cream rounded-xl p-8">
              <Download className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
              <h3
                className="text-xl font-semibold text-viet-green-dark mb-4"
                data-testid="text-investor-deck-title"
              >
                Investor Pitch Deck
              </h3>
              <p
                className="text-gray-700 mb-6"
                data-testid="text-investor-deck-description"
              >
                Access our investor presentation with market analysis and growth
                projections.
              </p>
              <Button
                className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
                data-testid="button-download-pitchdeck"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Pitch Deck
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
                data-testid="text-contact-form-title"
              >
                Start Your Partnership Journey
              </h2>
              <p
                className="text-lg text-gray-600"
                data-testid="text-contact-form-subtitle"
              >
                Get in touch with our partnership team to explore opportunities
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    data-testid="input-company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    data-testid="input-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Type *
                </label>
                <select
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                  data-testid="select-partnership-type"
                >
                  <option value="">Select partnership type</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Franchise">Franchise</option>
                  <option value="Retail Partner">Retail Partner</option>
                  <option value="Marketing Partner">Marketing Partner</option>
                  <option value="Technology Partner">Technology Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                  placeholder="Tell us about your business and partnership goals..."
                  data-testid="textarea-message"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-8 py-3 rounded-lg text-lg font-semibold"
                  data-testid="button-submit-partnership"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
