"use client";

import { useState } from "react";
import { Mail, Phone, User } from "lucide-react";
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
      className="bg-gradient-to-r from-viet-earth-gold to-viet-earth-orange hover:from-viet-earth-orange hover:to-viet-earth-gold text-white px-12 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:transform-none group"
      data-testid="button-newsletter-subscribe"
      aria-label="Subscribe to newsletter"
    >
      <span className="flex items-center">
        {pending ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" aria-hidden="true"></div>
            <span>Subscribing...</span>
          </>
        ) : (
          <>
            <Mail className="h-5 w-5 mr-3 group-hover:animate-bounce" aria-hidden="true" />
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
  const { toast } = useToast();

  // Client-side form handler
  async function clientAction(formData: FormData) {
    const result = await subscribeToNewsletter(formData);
    
    if (result.success) {
      toast({
        title: "Subscribed successfully!",
        description: "Welcome to the VietRoot family. We'll keep you updated with our latest news and offers.",
      });
      
      // Reset form fields
      setEmail("");
      setName("");
      setPhone("");
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
      className="py-16 md:py-16 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-float">
            <Mail className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <h2
            id="newsletter-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-fade-in-up"
            data-testid="text-newsletter-title"
          >
            Join Our Newsletter
          </h2>
          <p
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200"
            data-testid="text-newsletter-description"
          >
            Be the first to discover new products, get exclusive offers, and
            hear inspiring stories from our farming communities across Vietnam.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in-up animation-delay-400">
            <form action={clientAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative">
                  <label htmlFor="name" className="sr-only">Your full name</label>
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
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border border-white/30 rounded-xl transition-all duration-300 focus:bg-white focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 hover:bg-white/95"
                    data-testid="input-newsletter-name"
                  />
                </div>

                <div className="group relative">
                  <label htmlFor="email" className="sr-only">Your email address</label>
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border border-white/30 rounded-xl transition-all duration-300 focus:bg-white focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 hover:bg-white/95"
                    data-testid="input-newsletter-email"
                    aria-required="true"
                  />
                </div>

                <div className="group relative">
                  <label htmlFor="phone" className="sr-only">Your phone number</label>
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
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-12 py-4 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 border border-white/30 rounded-xl transition-all duration-300 focus:bg-white focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 hover:bg-white/95"
                    data-testid="input-newsletter-phone"
                  />
                </div>
              </div>

              <div className="text-center">
                <SubscribeButton />
              </div>

              <p className="text-center text-white/70 text-sm">
                📧 Get weekly updates • 🎁 Exclusive discounts • 📖 Farmer
                stories • 🌱 Sustainability tips
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
