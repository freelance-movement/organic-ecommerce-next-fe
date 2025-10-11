"use client";

import { useState, useEffect, useRef } from "react";
import { Leaf, Menu, X, Mail, Search } from "lucide-react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus input when opening
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      closeMobileMenu();
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
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

  return (
    <nav
      className={`w-full shadow-sm z-50 ${
        variant === "absolute"
          ? "absolute top-6 left-1/2 transform -translate-x-1/2 mt-4"
          : "fixed top-0 left-0 "
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`bg-white ${
          variant === "absolute"
            ? "px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-2 sm:mx-4 lg:mx-6 max-w-8xl rounded-xl shadow-xl"
            : "px-4 sm:px-6 lg:px-8 w-full shadow-md"
        }`}
      >
        <div
          className={`flex justify-between items-center ${
            variant === "absolute" ? "h-16" : "h-16"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center" data-testid="nav-logo">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/asset-logo.png"
                alt="VietRoot logo"
                className="h-8 w-auto mr-2"
                style={{ objectFit: "contain" }}
              />
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
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              onClick={toggleSearch}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-viet-green-medium hover:bg-gray-50 transition-colors duration-200"
              data-testid="button-search"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </Button>

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

        {/* Search Bar - Desktop & Mobile */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 px-2 sm:px-4 lg:px-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search for products..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viet-green-medium focus:border-transparent transition-all duration-200"
                      data-testid="search-input"
                      aria-label="Search products"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap"
                    data-testid="search-submit"
                  >
                    Search
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    data-testid="search-close"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press{" "}
                  <kbd className="px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
                    ESC
                  </kbd>{" "}
                  to close
                </p>
              </form>
            </div>
          </div>
        )}

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
