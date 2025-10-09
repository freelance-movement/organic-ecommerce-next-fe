import Link from "next/link";
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Partnership", href: "/partnerships" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const categories = [
  { name: "Organic Honey", href: "/products?category=organic-honey" },
  { name: "Green Tea", href: "/products?category=green-tea" },
  { name: "Dried Fruits", href: "/products?category=dried-fruits" },
  { name: "Coconut Products", href: "/products?category=coconut-products" },
  { name: "Spices", href: "/products?category=spices" },
];

const socialIcons = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

/**
 * Site footer component
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-viet-green-dark text-white pt-24 pb-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4" data-testid="footer-logo">
              <Leaf className="text-viet-green-light h-6 w-6 mr-2" aria-hidden="true" />
              <span className="font-bold text-xl">VietRoot</span>
            </div>
            <p
              className="text-gray-300 mb-4 leading-relaxed"
              data-testid="text-footer-description"
            >
              The Root of Goodness, The Taste of Vietnam. Bringing you the
              finest organic products from Vietnamese farmers.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-300 hover:text-viet-green-light transition-colors duration-200"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label} page`}
                  >
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              data-testid="text-footer-quicklinks-title"
              id="footer-quicklinks-heading"
            >
              Quick Links
            </h3>
            <ul 
              className="space-y-2"
              aria-labelledby="footer-quicklinks-heading"
            >
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    data-testid={`link-footer-${link.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              data-testid="text-footer-categories-title"
              id="footer-categories-heading"
            >
              Categories
            </h3>
            <ul 
              className="space-y-2"
              aria-labelledby="footer-categories-heading"
            >
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    data-testid={`link-category-${category.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              data-testid="text-footer-contact-title"
              id="footer-contact-heading"
            >
              Contact Info
            </h3>
            <address className="space-y-2 text-gray-300 not-italic">
              <p
                className="flex items-center"
                data-testid="text-contact-address"
              >
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <span>Ho Chi Minh City, Vietnam</span>
              </p>
              <p className="flex items-center" data-testid="text-contact-phone">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+84123456789" className="hover:text-white">+84 123 456 789</a>
              </p>
              <p className="flex items-center" data-testid="text-contact-email">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                <a href="mailto:hello@vietroot.com" className="hover:text-white">hello@vietroot.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-viet-green-medium mt-8 pt-8 text-center text-gray-300">
          <p data-testid="text-copyright">
            &copy; {currentYear} VietRoot. All rights reserved. Made with ❤️ in Vietnam.
          </p>
        </div>
      </div>
    </footer>
  );
}
