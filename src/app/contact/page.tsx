import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact VietRoot - Get in Touch About Vietnamese Organic Products",
  description: "Contact VietRoot for inquiries about Vietnamese organic products, wholesale opportunities, partnerships, or customer support. Located in Vietnam, serving customers worldwide with authentic organic foods.",
  keywords: [
    "contact VietRoot",
    "Vietnamese organic products inquiry",
    "VietRoot customer service",
    "organic food support Vietnam",
    "wholesale organic products contact",
    "Vietnamese organic supplier contact",
    "VietRoot partnerships contact",
    "organic products Vietnam inquiry",
    "contact Vietnamese organic company",
    "VietRoot business contact"
  ],
  openGraph: {
    title: "Contact VietRoot - Get in Touch About Vietnamese Organic Products",
    description: "Contact VietRoot for inquiries about Vietnamese organic products, wholesale opportunities, partnerships, or customer support.",
    url: "https://vietroot.com/contact",
    type: "website",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact VietRoot - Vietnamese Organic Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact VietRoot - Get in Touch About Vietnamese Organic Products",
    description: "Contact VietRoot for inquiries about Vietnamese organic products, wholesale opportunities, partnerships, or customer support.",
    images: ["/og-contact.jpg"],
  },
  alternates: {
    canonical: "https://vietroot.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}