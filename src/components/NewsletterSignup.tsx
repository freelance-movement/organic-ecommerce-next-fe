"use client";

import { useState } from "react";
import { Mail, Phone, User, Sparkles, CheckCircle2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/actions/newsletter-actions";

// Form submit button with loading state
function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-viet-earth-gold to-viet-earth-orange hover:from-viet-earth-orange hover:to-viet-earth-gold text-white px-8 py-6 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:transform-none group"
      data-testid="button-newsletter-subscribe"
      aria-label="Subscribe to newsletter"
    >
      <span className="flex items-center">
        {pending ? (
          <>
            <div
              className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"
              aria-hidden="true"
            ></div>
            <span>Subscribing...</span>
          </>
        ) : (
          <>
            <Mail
              className="h-5 w-5 mr-3 group-hover:animate-bounce"
              aria-hidden="true"
            />
            <span>Subscribe Now</span>
          </>
        )}
      </span>
    </Button>
  );
}

/**
 * Newsletter signup section
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  // Validation functions
  const validateName = (name: string): string => {
    const charCount = name.trim().length;
    if (charCount > 100) {
      return `Name must not exceed 100 characters. Current: ${charCount} characters.`;
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    const charCount = email.trim().length;
    if (charCount > 254) {
      return `Email must not exceed 254 characters. Current: ${charCount} characters.`;
    }
    return "";
  };

  const validatePhone = (phone: string): string => {
    const charCount = phone.trim().length;
    if (charCount > 0 && charCount > 20) {
      return `Phone number must not exceed 20 characters. Current: ${charCount} characters.`;
    }
    return "";
  };

  // Client-side form handler
  async function clientAction(formData: FormData) {
    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    const errors = {
      name: nameError,
      email: emailError,
      phone: phoneError,
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      toast({
        title: "Subscribed successfully!",
        description:
          "Welcome to the VietRoot family. We'll keep you updated with our latest news and offers.",
      });

      // Reset form fields
      setEmail("");
      setName("");
      setPhone("");
      setFormErrors({ name: "", email: "", phone: "" });
    } else {
      toast({
        title: "Subscription failed",
        description: result.error || "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <section
      id="newsletter-section"
      className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Left: Vertical signup form */}
          <div className="order-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl animate-fade-in-up animation-delay-200 h-full">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-viet-earth-gold to-viet-earth-orange rounded-2xl mb-4 shadow-lg">
                  <Sparkles className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-white/80 text-sm">
                  Stay connected with our farming community
                </p>
              </div>

              <form action={clientAction} className="space-y-6">
                <div className="space-y-6">
                  <div className="group relative">
                    <label htmlFor="name" className="sr-only">
                      Your full name (max 100 characters)
                    </label>
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors duration-300 group-focus-within:text-viet-green-medium"
                      aria-hidden="true"
                    />
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => {
                        const value = e.target.value;
                        const limitedValue =
                          value.length > 100 ? value.slice(0, 100) : value;
                        setName(limitedValue);
                        setFormErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      maxLength={100}
                      className={`pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border ${
                        formErrors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/30 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                      } rounded-xl transition-all duration-300 focus:bg-white hover:bg-white/95`}
                      data-testid="input-newsletter-name"
                    />
                    <div className="mt-1 flex justify-between items-center">
                      {formErrors.name && (
                        <p
                          className="text-red-300 text-xs"
                          data-testid="error-newsletter-name"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="group relative">
                    <label htmlFor="email" className="sr-only">
                      Your email address{" "}
                    </label>
                    <Mail
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors duration-300 group-focus-within:text-viet-green-medium"
                      aria-hidden="true"
                    />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value;
                        const limitedValue =
                          value.length > 254 ? value.slice(0, 254) : value;
                        setEmail(limitedValue);
                        setFormErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      required
                      maxLength={254}
                      className={`pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border ${
                        formErrors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/30 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                      } rounded-xl transition-all duration-300 focus:bg-white hover:bg-white/95`}
                      data-testid="input-newsletter-email"
                      aria-required="true"
                    />
                    {formErrors.email && (
                      <p
                        className="text-red-300 text-xs mt-1"
                        data-testid="error-newsletter-email"
                      >
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="group relative">
                    <label htmlFor="phone" className="sr-only">
                      Your phone number
                    </label>
                    <Phone
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors duration-300 group-focus-within:text-viet-green-medium"
                      aria-hidden="true"
                    />
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        const limitedValue =
                          value.length > 20 ? value.slice(0, 20) : value;
                        setPhone(limitedValue);
                        setFormErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      maxLength={20}
                      className={`pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border ${
                        formErrors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/30 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                      } rounded-xl transition-all duration-300 focus:bg-white hover:bg-white/95`}
                      data-testid="input-newsletter-phone"
                    />
                    <div className="mt-1 flex justify-between items-center">
                      {formErrors.phone && (
                        <p
                          className="text-red-300 text-xs"
                          data-testid="error-newsletter-phone"
                        >
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <SubscribeButton />
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-white/70 text-xs md:text-sm">
                  <span className="flex items-center gap-1">
                    <span className="text-lg">📧</span>
                    Weekly updates
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-lg">🎁</span>
                    Exclusive deals
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-lg">🌱</span>
                    Farm stories
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Text card with benefits */}
          <div className="order-2">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl animate-fade-in-up animation-delay-300 h-full flex flex-col justify-center">
              {/* Icon and Title */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                  <Heart
                    className="h-8 w-8 text-viet-earth-gold"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Why Subscribe?
                </h3>
              </div>

              {/* Main Description */}
              <p
                className="text-lg md:text-xl text-white/90 leading-relaxed mb-6"
                data-testid="text-newsletter-description"
              >
                Be the first to discover new products, get exclusive offers, and
                hear inspiring stories from our farming communities across
                Vietnam.
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-viet-earth-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">
                      Fresh Updates Weekly
                    </p>
                    <p className="text-white/70 text-sm">
                      Get the latest from our farms every week
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-viet-earth-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">
                      Exclusive Discounts
                    </p>
                    <p className="text-white/70 text-sm">
                      Special offers just for subscribers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-viet-earth-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Farmer Stories</p>
                    <p className="text-white/70 text-sm">
                      Inspiring tales from Vietnamese communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
