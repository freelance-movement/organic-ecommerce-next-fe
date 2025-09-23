"use client";

import { useEffect } from "react";

/**
 * Client component to handle hash navigation to newsletter section
 * Extracted from Home page to keep it as a server component
 */
export function ScrollToNewsletter() {
  useEffect(() => {
    // Handle hash fragment on page load
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash === "#newsletter-section") {
        setTimeout(() => {
          const newsletterSection = document.getElementById("newsletter-section");
          if (newsletterSection) {
            newsletterSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Small delay to ensure page is fully loaded
      }
    };

    // Check hash on component mount
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return null; // This component doesn't render anything
}