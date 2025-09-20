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
  { name: "About Us", href: "#" },
  { name: "Products", href: "#" },
  { name: "Partnership", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
];

const categories = [
  { name: "Organic Honey", href: "#" },
  { name: "Green Tea", href: "#" },
  { name: "Dried Fruits", href: "#" },
  { name: "Coconut Products", href: "#" },
  { name: "Spices", href: "#" },
];

const socialIcons = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-viet-green-dark text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4" data-testid="footer-logo">
              <Leaf className="text-viet-green-light h-6 w-6 mr-2" />
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
                  >
                    <IconComponent className="h-5 w-5" />
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
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    data-testid={`link-footer-${link.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              data-testid="text-footer-categories-title"
            >
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    data-testid={`link-category-${category.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="font-semibold text-lg mb-4"
              data-testid="text-footer-contact-title"
            >
              Contact Info
            </h3>
            <div className="space-y-2 text-gray-300">
              <p
                className="flex items-center"
                data-testid="text-contact-address"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Ho Chi Minh City, Vietnam
              </p>
              <p className="flex items-center" data-testid="text-contact-phone">
                <Phone className="h-4 w-4 mr-2" />
                +84 123 456 789
              </p>
              <p className="flex items-center" data-testid="text-contact-email">
                <Mail className="h-4 w-4 mr-2" />
                hello@vietroot.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-viet-green-medium mt-8 pt-8 text-center text-gray-300">
          <p data-testid="text-copyright">
            &copy; 2024 VietRoot. All rights reserved. Made with ❤️ in Vietnam.
          </p>
        </div>
      </div>
    </footer>
  );
}
