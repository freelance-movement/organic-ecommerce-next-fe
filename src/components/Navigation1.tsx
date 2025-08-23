"use client";
import React, { useState } from "react";
import { Leaf, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation1() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
    <nav className="w-full shadow-sm absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white max-w-screen-lg rounded-md px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center" data-testid="nav-logo">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Leaf className="text-viet-green-medium h-6 w-6 mr-2" />
              <span className="font-bold text-xl text-viet-green-dark">
                VietRoot
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-700 hover:text-viet-green-medium transition-all duration-300 px-4 py-2 text-sm font-medium group"
                  data-testid={item.testId}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-out"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-700 hover:text-viet-green-medium"
              data-testid="button-mobile-menu"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 rounded-b-md shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-viet-green-medium hover:bg-gray-50 rounded-md transition-all duration-200"
                  data-testid={`mobile-${item.testId}`}
                  onClick={closeMobileMenu}
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
