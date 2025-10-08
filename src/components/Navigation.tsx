"use client";

import { useState, useEffect } from "react";
import { Leaf, Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface NavigationProps {
  variant?: "absolute" | "fixed";
}

/**
 * Main navigation component
 */
export default function Navigation({ variant = "absolute" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToNewsletter = () => {
    // Check if we're on the home page
    if (pathname === "/") {
      // If on home page, scroll to newsletter section
      const newsletterSection = document.getElementById("newsletter-section");
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on other pages, navigate to home page with hash
      router.push("/#newsletter-section");
    }
  };

  const navItems = [
    { href: "/", label: "Home", testId: "nav-home" },
    { href: "/products", label: "Products", testId: "nav-products" },
    { href: "/about", label: "About Us", testId: "nav-about" },
    { href: "/partnerships", label: "Partnership", testId: "nav-partnerships" },
    { href: "/blog", label: "Blog", testId: "nav-blog" },
    { href: "/contact", label: "Contact", testId: "nav-contact" },
  ];

  // Fetch logo asset by category 'logo_file'
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN || "";

  useEffect(() => {
    const controller = new AbortController();
    const fetchLogo = async () => {
      try {
        const params = new URLSearchParams({
          limit: "1",
          category: "logo_file",
          type: "image",
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/assets?${params.toString()}`;
        const res = await fetch(url, {
          signal: controller.signal,
          cache: "force-cache",
        });

        if (!res.ok) return;
        const data = await res.json();

        const first = data?.data?.[0];
        const rawUrl: string | undefined = first?.url;
        if (!rawUrl) return;
        const absolute = /^https?:\/\//i.test(rawUrl)
          ? rawUrl
          : `${backendOrigin}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
        setLogoUrl(absolute);
      } catch (_) {
        // fail silently; fallback will render
      }
    };
    if (backendOrigin) fetchLogo();
    return () => controller.abort();
  }, [backendOrigin]);

  return (
    <nav
      className={`w-full shadow-sm z-50 ${
        variant === "absolute"
          ? "absolute top-10 left-1/2 transform -translate-x-1/2"
          : "fixed top-0 left-0 "
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`bg-white px-4 sm:px-6 lg:px-8 mx-auto ${
          variant === "absolute" ? "max-w-screen-lg rounded-md" : "w-full"
        }`}
      >
        <div
          className={`flex justify-between items-center ${
            variant === "absolute" ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center" data-testid="nav-logo">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="VietRoot logo"
                  className="h-8 w-auto mr-2"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <>
                  <Leaf
                    className="text-viet-green-medium h-6 w-6 mr-2"
                    aria-hidden="true"
                  />
                  <span className="font-bold text-xl text-viet-green-dark">
                    VietRoot
                  </span>
                </>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div
              className="ml-10 flex items-baseline space-x-2"
              role="navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                  data-testid={item.testId}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 transition-all duration-300 ease-out ${
                      pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={scrollToNewsletter}
              className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              data-testid="button-join-us"
              aria-label="Join our newsletter"
            >
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Join Us</span>
              <span className="sm:hidden">Join</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-700 hover:text-viet-green-medium"
              data-testid="button-mobile-menu"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 rounded-b-md shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                    pathname === item.href
                      ? "text-viet-green-medium bg-gray-50"
                      : "text-gray-700 hover:text-viet-green-medium hover:bg-gray-50"
                  }`}
                  data-testid={`mobile-${item.testId}`}
                  onClick={closeMobileMenu}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
