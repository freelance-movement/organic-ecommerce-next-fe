"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Handshake, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ProductsHero from "@/components/ProductsHero";
import Partnership from "@/components/Partnership";

export default function Partnerships() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Validation functions
  const validateCompany = (company: string): string => {
    const charCount = company.trim().length;
    if (charCount > 150) {
      return `Company name must not exceed 150 characters. Current: ${charCount} characters.`;
    }
    return "";
  };

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

  const validateMessage = (message: string): string => {
    const charCount = message.trim().length;
    if (charCount > 0 && charCount < 10) {
      return `Message must be at least 10 characters. Current: ${charCount} characters.`;
    }
    if (charCount > 1000) {
      return `Message must not exceed 1000 characters. Current: ${charCount} characters.`;
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate all fields
    const companyError = validateCompany(formData.company);
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);

    const errors = {
      company: companyError,
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError,
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
      setFormErrors({
        company: "",
        name: "",
        email: "",
        phone: "",
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
    const { name, value } = e.target;

    // Apply character limits
    let limitedValue = value;
    if (name === "company" && value.length > 150)
      limitedValue = value.slice(0, 150);
    if (name === "name" && value.length > 100)
      limitedValue = value.slice(0, 100);
    if (name === "email" && value.length > 254)
      limitedValue = value.slice(0, 254);
    if (name === "phone" && value.length > 20)
      limitedValue = value.slice(0, 20);
    if (name === "message" && value.length > 1000)
      limitedValue = value.slice(0, 1000);

    setFormData((prev) => ({
      ...prev,
      [name]: limitedValue,
    }));

    // Clear validation errors when user starts typing
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      <ProductsHero
        title="Partner With VietRoot"
        icon={<Handshake className="h-6 w-6 text-white" />}
        className="bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark"
      />

      {/* Partnership Section */}
      <Partnership />

      {/* Transition Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-viet-green-light/10 via-white to-viet-earth-gold/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 shadow-lg">
              <Handshake className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-viet-green-dark mb-4">
              Ready to Partner With Us?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join our growing network of partners and help us bring fresh,
              organic Vietnamese produce to communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 md:py-24 bg-gray-50">
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
                    maxLength={150}
                    className={`w-full border-2 ${
                      formErrors.company
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                    } rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300`}
                    data-testid="input-company"
                  />
                  {formErrors.company && (
                    <p
                      className="text-red-500 text-sm mt-1"
                      data-testid="error-company-validation"
                    >
                      {formErrors.company}
                    </p>
                  )}
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
                    maxLength={100}
                    className={`w-full border-2 ${
                      formErrors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                    } rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300`}
                    data-testid="input-name"
                  />
                  {formErrors.name && (
                    <p
                      className="text-red-500 text-sm mt-1"
                      data-testid="error-name-validation"
                    >
                      {formErrors.name}
                    </p>
                  )}
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
                    maxLength={254}
                    className={`w-full border-2 ${
                      formErrors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                    } rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300`}
                    data-testid="input-email"
                  />
                  {formErrors.email && (
                    <p
                      className="text-red-500 text-sm mt-1"
                      data-testid="error-email-validation"
                    >
                      {formErrors.email}
                    </p>
                  )}
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
                    maxLength={20}
                    className={`w-full border-2 ${
                      formErrors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                    } rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300`}
                    data-testid="input-phone"
                  />
                  {formErrors.phone && (
                    <p
                      className="text-red-500 text-sm mt-1"
                      data-testid="error-phone-validation"
                    >
                      {formErrors.phone}
                    </p>
                  )}
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
                  <option value="Farm Partner">Farm Partner</option>
                  <option value="Retail Partner">Retail Partner</option>
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
                  maxLength={1000}
                  className={`w-full border-2 ${
                    formErrors.message
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-viet-green-medium focus:ring-viet-green-medium/20"
                  } rounded-xl px-4 py-3 text-lg transition-all duration-300 hover:border-gray-300`}
                  placeholder="Tell us about your business and partnership goals..."
                  data-testid="textarea-message"
                />
                {formErrors.message && (
                  <p
                    className="text-red-500 text-sm mt-1"
                    data-testid="error-message-validation"
                  >
                    {formErrors.message}
                  </p>
                )}
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
