"use client";
import Navigation1 from "@/components/Navigation1";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ShoppingCart, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const categories = [
  { id: "all", name: "All Products", count: 24 },
  { id: "teas", name: "Organic Teas", count: 8 },
  { id: "powders", name: "Herbal Powders", count: 6 },
  { id: "remedies", name: "Herbal Remedies", count: 10 },
];

const products = [
  {
    id: 1,
    name: "Wild Ha Giang Honey",
    category: "remedies",
    description: "Pure, naturally harvested from the mountains of Ha Giang",
    price: "₫450,000",
    originalPrice: "₫500,000",
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["Organic", "Wild Harvested"],
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Green Tea",
    category: "teas",
    description: "Hand-picked from the highlands of Thai Nguyen",
    price: "₫320,000",
    rating: 4.8,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["Organic", "Premium"],
    inStock: true,
  },
  {
    id: 3,
    name: "Turmeric Root Powder",
    category: "powders",
    description:
      "Ground from fresh turmeric roots, anti-inflammatory properties",
    price: "₫180,000",
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1615485499601-773e0eb7f0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["Organic", "Ground Fresh"],
    inStock: true,
  },
  {
    id: 4,
    name: "Virgin Coconut Oil",
    category: "remedies",
    description: "Cold-pressed from Ben Tre coconuts, multiple health benefits",
    price: "₫280,000",
    rating: 4.9,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["Cold-Pressed", "Virgin"],
    inStock: false,
  },
  {
    id: 5,
    name: "Dried Jackfruit",
    category: "remedies",
    description: "Sweet & natural dried fruit, no added sugar or preservatives",
    price: "₫150,000",
    rating: 4.6,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["No Additives", "Natural"],
    inStock: true,
  },
  {
    id: 6,
    name: "Ginger Root Powder",
    category: "powders",
    description: "Potent ginger powder for digestive health and immunity",
    price: "₫120,000",
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1599639402519-8d7e0c0cd55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    badges: ["Organic", "Immune Boost"],
    inStock: true,
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation1 />

      {/* Hero Section */}
      <section className="pt-12 pb-3 md:pt-12 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-products-hero-title"
            >
              {/* Our Premium */}
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                Our Products
              </span>
            </h1>
          </div>

          {/* Stats Section */}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? "bg-viet-green-medium text-white"
                      : "text-viet-green-dark border-viet-green-medium hover:bg-viet-green-light"
                  }`}
                  data-testid={`filter-${category.id}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      data-testid={`product-image-${product.id}`}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {product.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className="bg-viet-green-medium text-white text-xs"
                          data-testid={`badge-${product.id}-${badge
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-lg font-semibold text-gray-800 mb-2"
                      data-testid={`product-name-${product.id}`}
                    >
                      {product.name}
                    </h3>

                    <p
                      className="text-gray-600 text-sm mb-3 line-clamp-2"
                      data-testid={`product-description-${product.id}`}
                    >
                      {product.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span
                        className="text-sm text-gray-600 ml-1"
                        data-testid={`product-rating-${product.id}`}
                      >
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className="text-xl font-bold text-viet-earth-gold"
                          data-testid={`product-price-${product.id}`}
                        >
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span
                            className="text-sm text-gray-400 line-through ml-2"
                            data-testid={`product-original-price-${product.id}`}
                          >
                            {product.originalPrice}
                          </span>
                        )}
                      </div>

                      <Button
                        disabled={!product.inStock}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          product.inStock
                            ? "bg-viet-green-medium hover:bg-viet-green-dark text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              className="bg-viet-green-dark hover:bg-viet-green-medium text-white px-8 py-3 rounded-lg text-lg font-semibold"
              data-testid="button-load-more"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
