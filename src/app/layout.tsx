import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import { seoConfig, socialMediaLinks, businessInfo } from "@/lib/seo-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: seoConfig.siteName + " - " + seoConfig.siteDescription,
    template: `%s | ${seoConfig.siteName} - Vietnamese Organic Products`
  },
  description: seoConfig.siteDescription,
  keywords: [
    "Vietnamese organic products",
    "organic food Vietnam",
    "authentic Vietnamese rice",
    "organic Vietnamese tea",
    "natural Vietnamese spices",
    "sustainable farming Vietnam",
    "premium organic products",
    "Vietnamese heritage foods",
    "organic ecommerce",
    "natural healthy foods"
  ],
  authors: [{ name: businessInfo.name + " Team" }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  metadataBase: new URL(seoConfig.baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoConfig.baseUrl,
    title: seoConfig.siteName + " - " + seoConfig.siteDescription,
    description: seoConfig.siteDescription,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultOgImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName + " - Vietnamese Organic Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName + " - " + seoConfig.siteDescription,
    description: seoConfig.siteDescription,
    images: [seoConfig.defaultOgImage],
    creator: seoConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={seoConfig.baseUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#16a34a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": businessInfo.name,
              "description": businessInfo.description,
              "url": seoConfig.baseUrl,
              "logo": seoConfig.baseUrl + "/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": businessInfo.phone,
                "contactType": "customer service",
                "availableLanguage": ["English", "Vietnamese"]
              },
              "sameAs": [
                socialMediaLinks.facebook,
                socialMediaLinks.instagram,
                socialMediaLinks.linkedin,
                socialMediaLinks.twitter
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": businessInfo.address.street,
                "addressLocality": businessInfo.address.city,
                "addressCountry": businessInfo.address.country,
                "postalCode": businessInfo.address.postalCode
              }
            })
          }}
        />
        
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": businessInfo.name,
              "url": seoConfig.baseUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": seoConfig.baseUrl + "/products?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleTagManager />
        <GoogleAnalytics />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
