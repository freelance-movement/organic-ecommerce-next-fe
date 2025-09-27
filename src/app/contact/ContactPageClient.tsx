"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const fallbackContactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: [
      "123 Nguyen Hue Street",
      "District 1, Ho Chi Minh City",
      "Vietnam",
    ],
    action: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+84 123 456 789", "+84 987 654 321"],
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@vietroot.com", "support@vietroot.com"],
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Mon - Fri: 8:00 AM - 6:00 PM",
      "Saturday: 9:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
    action: null,
  },
];

const fallbackSocialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/vietroot",
    color: "hover:text-blue-600",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/vietroot",
    color: "hover:text-sky-500",
    bgColor: "hover:bg-sky-50",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/vietroot",
    color: "hover:text-pink-600",
    bgColor: "hover:bg-pink-50",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/vietroot",
    color: "hover:text-blue-700",
    bgColor: "hover:bg-blue-50",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/vietroot",
    color: "hover:text-red-600",
    bgColor: "hover:bg-red-50",
  },
];

const faqs = [
  {
    question: "What makes your products organic?",
    answer:
      "All our products are certified organic and sourced directly from farmers who follow strict organic farming practices without the use of synthetic pesticides or fertilizers.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Please contact us for specific shipping information to your country.",
  },
  {
    question: "How do you ensure product quality?",
    answer:
      "We have strict quality control measures in place, including regular farm visits, third-party certifications, and thorough testing of all products before they reach our customers.",
  },
  {
    question: "Can I visit your partner farms?",
    answer:
      "We offer farm tours by appointment. Contact us to arrange a visit to see our sustainable farming practices firsthand and meet our partner farmers.",
  },
];

export default function ContactPageClient() {
  const [contact, setContact] = useState<any | null>(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Fetch contact info from backend
  useEffect(() => {
    let isMounted = true;
    const fetchContactInfo = async () => {
      try {
        setContactLoading(true);
        setContactError(null);
        // Try common endpoints: /contact-info or /contact-info/public
        const endpoints = [
          "/api/v1/contact-info/public",
          "/api/v1/contact-info",
        ];
        let data: any = null;
        for (const ep of endpoints) {
          try {
            const res = await fetch(ep, { credentials: "include" });
            if (res.ok) {
              const json = await res.json();
              // Accept {data: T} | {items: T[]} | T
              const maybeArray = json?.items || json?.data || json;
              data = Array.isArray(maybeArray) ? maybeArray[0] : maybeArray;
              break;
            }
          } catch {}
        }
        if (isMounted) {
          setContact(data);
        }
      } catch (e: any) {
        if (isMounted)
          setContactError(e?.message || "Failed to load contact info");
      } finally {
        if (isMounted) setContactLoading(false);
      }
    };
    fetchContactInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/customer-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type: "contact",
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        const errText = (await res.text()) || res.statusText;
        throw new Error(errText);
      }
      toast({
        title: "Message sent successfully!",
        description:
          "Thank you for contacting us. We'll respond within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      toast({
        title: "Failed to send message",
        description: err?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      <section className="pt-24 pb-3  mt-0 md:mt-8 md:pt-20 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-contact-hero-title"
            >
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                Get In Touch
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {contactLoading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center px-4 py-2 bg-viet-green-light/10 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-viet-green-medium mr-2"></div>
                <span className="text-viet-green-dark">
                  Loading contact information...
                </span>
              </div>
            </div>
          )}

          {contactError && (
            <div className="text-center py-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-red-600">
                  Failed to load contact info: {contactError}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(() => {
              // Build cards from API data if available
              if (contact) {
                const addressLines: string[] =
                  contact.addressLines ||
                  (contact.address
                    ? contact.address
                        .split("\n")
                        .filter((line: string) => line.trim())
                    : []) ||
                  [];
                const phones: string[] =
                  contact.phones ||
                  contact.phoneNumbers ||
                  (contact.phone ? [contact.phone] : []) ||
                  [];
                const emails: string[] =
                  contact.emails ||
                  contact.emailAddresses ||
                  (contact.email ? [contact.email] : []) ||
                  [];
                const hours: string[] =
                  contact.businessHours ||
                  contact.hours ||
                  (contact.operatingHours ? [contact.operatingHours] : []) ||
                  [];
                return [
                  {
                    icon: MapPin,
                    title: "Visit Our Office",
                    details:
                      addressLines.length > 0
                        ? addressLines
                        : ["Address not available"],
                    action: addressLines.length > 0 ? "Get Directions" : null,
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    details:
                      phones.length > 0 ? phones : ["Phone not available"],
                    action: phones.length > 0 ? "Call Now" : null,
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    details:
                      emails.length > 0 ? emails : ["Email not available"],
                    action: emails.length > 0 ? "Send Email" : null,
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    details: hours.length > 0 ? hours : ["Hours not available"],
                    action: null,
                  },
                ];
              }
              // Fallback when no API data
              return fallbackContactInfo;
            })().map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-viet-green-light transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  data-testid={`contact-info-${index}`}
                >
                  <div className="p-4 bg-viet-green-light/10 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <IconComponent className="text-viet-green-medium h-10 w-10" />
                  </div>
                  <h3
                    className="text-xl font-bold text-viet-green-dark mb-4"
                    data-testid={`contact-title-${index}`}
                  >
                    {info.title}
                  </h3>
                  <div className="space-y-2 text-gray-700 mb-6">
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className="text-sm leading-relaxed"
                        data-testid={`contact-detail-${index}-${detailIndex}`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                  {info.action && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                      data-testid={`contact-action-${index}`}
                    >
                      {info.action}
                    </Button>
                  )}
                </div>
              );
            })}
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
                Send Us a Message
              </h2>
              <p
                className="text-lg text-gray-600"
                data-testid="text-contact-form-subtitle"
              >
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your full name"
                    data-testid="input-contact-name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your email address"
                    data-testid="input-contact-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    placeholder="Enter your phone number"
                    data-testid="input-contact-phone"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300"
                    placeholder="What's this about?"
                    data-testid="input-contact-subject"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border-2 border-gray-200 focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300 resize-none"
                  placeholder="Tell us how we can help you..."
                  data-testid="textarea-contact-message"
                />
              </div>

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  data-testid="button-send-message"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4">
              Follow Us
            </h2>
            <p className="text-lg text-gray-600">
              Stay connected with VietRoot on social media for the latest
              updates, tips, and behind-the-scenes content
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {((): any[] => {
              if (contact?.socials && Array.isArray(contact.socials)) {
                // Expecting [{name, url, platform}] shape
                return contact.socials.map((s: any) => ({
                  name: s.name || s.platform || "Social",
                  icon:
                    (s.platform || "").toLowerCase() === "facebook"
                      ? Facebook
                      : (s.platform || "").toLowerCase() === "twitter"
                      ? Twitter
                      : (s.platform || "").toLowerCase() === "instagram"
                      ? Instagram
                      : (s.platform || "").toLowerCase() === "linkedin"
                      ? Linkedin
                      : (s.platform || "").toLowerCase() === "youtube"
                      ? Youtube
                      : Facebook,
                  url: s.url,
                  color: "hover:text-viet-green-dark",
                  bgColor: "hover:bg-viet-green-light/10",
                }));
              }
              return fallbackSocialLinks;
            })().map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-viet-green-light transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${social.bgColor}`}
                >
                  <div
                    className={`p-4 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-300 ${social.color}`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <span className="mt-3 text-sm font-medium text-gray-700 group-hover:text-viet-green-dark transition-colors duration-300">
                    {social.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Chat Option */}
      <section className="py-16 md:py-24 bg-viet-green-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="h-16 w-16 mx-auto mb-6 text-viet-green-light" />
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-quick-chat-title"
          >
            Need Immediate Help?
          </h2>
          <p
            className="text-lg text-gray-300 mb-8"
            data-testid="text-quick-chat-description"
          >
            Connect with us instantly via WhatsApp for quick questions and
            immediate support.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            data-testid="button-whatsapp-chat"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
              data-testid="text-faq-title"
            >
              Frequently Asked Questions
            </h2>
            <p
              className="text-lg text-gray-600"
              data-testid="text-faq-subtitle"
            >
              Find quick answers to common questions about VietRoot
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-viet-earth-cream rounded-xl p-6"
                data-testid={`faq-${index}`}
              >
                <h3
                  className="text-lg font-semibold text-viet-green-dark mb-3"
                  data-testid={`faq-question-${index}`}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-gray-700"
                  data-testid={`faq-answer-${index}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
