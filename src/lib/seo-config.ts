export const socialMediaLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/vietroot",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/vietroot",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/vietroot",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/vietroot",
};

export const seoConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "VietRoot",
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Premium Vietnamese Organic Products from Trusted Local Farmers",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://vietroot.com",
  defaultOgImage: "/og-default.jpg",
  twitterHandle: "@VietRoot",
};

export const businessInfo = {
  name: "VietRoot",
  description: "Premium Vietnamese organic products from trusted local farmers including rice, tea, spices, fruits and traditional foods.",
  phone: "+84-xxx-xxx-xxx",
  email: "contact@vietroot.com",
  address: {
    street: "123 Nguyen Hue Street",
    city: "Ho Chi Minh City", 
    country: "Vietnam",
    postalCode: "700000"
  },
  coordinates: {
    latitude: 10.7769,
    longitude: 106.7009
  }
};