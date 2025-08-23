"use client";
import Navigation1 from "@/components/Navigation1";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  ArrowLeft,
  ChevronRight,
  Plus,
  Minus,
  Share2,
  CheckCircle,
  Leaf,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock product data based on id
const getProductById = (id: string) => {
  const products: Record<string, any> = {
    "1": {
      id: 1,
      name: "Wild Ha Giang Honey",
      category: "Herbal Remedies",
      description: "Pure, naturally harvested from the mountains of Ha Giang",
      price: "₫450,000",
      originalPrice: "₫500,000",
      rating: 4.9,
      reviews: 127,
      images: [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      ],
      badges: ["Organic", "Wild Harvested", "Premium Quality"],
      inStock: true,
      stockCount: 24,
      weight: "500g",
      origin: "Ha Giang Province, Vietnam",
      harvestDate: "March 2024",
      fullDescription:
        "Our Wild Ha Giang Honey is a rare treasure harvested from the pristine mountain forests of northern Vietnam. This golden nectar is collected by indigenous bees from wildflowers that bloom in one of the world's most biodiverse regions. The honey maintains its raw, unprocessed state, preserving all natural enzymes, antioxidants, and therapeutic properties that have been cherished in Vietnamese traditional medicine for generations.",
      benefits: [
        "Rich in natural antioxidants and enzymes",
        "Supports immune system health",
        "Anti-inflammatory properties",
        "Natural energy booster",
        "Aids in digestive wellness",
      ],
      ingredients: ["100% Pure Wild Honey"],
      usage:
        "Take 1-2 tablespoons daily on empty stomach or dissolve in warm water. Can be used as natural sweetener in teas and beverages.",
      storage:
        "Store in cool, dry place away from direct sunlight. Crystallization is natural and indicates purity.",
      certifications: [
        "Organic Certified",
        "HACCP Compliant",
        "Quality Tested",
      ],
      farmer: {
        name: "Nguyen Van Duc",
        location: "Ha Giang",
        experience: "25 years",
        story:
          "Third generation beekeeper maintaining traditional harvesting methods",
      },
    },
    "2": {
      id: 2,
      name: "Premium Green Tea",
      category: "Organic Teas",
      description: "Hand-picked from the highlands of Thai Nguyen",
      price: "₫320,000",
      rating: 4.8,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      ],
      badges: ["Organic", "Premium", "Hand-Picked"],
      inStock: true,
      stockCount: 156,
      weight: "200g",
      origin: "Thai Nguyen Province, Vietnam",
      harvestDate: "April 2024",
      fullDescription:
        "Sourced from the mist-covered mountains of Thai Nguyen, this premium green tea represents the pinnacle of Vietnamese tea craftsmanship. Each leaf is carefully hand-picked at dawn to preserve maximum freshness and flavor. The high altitude and mineral-rich soil create ideal conditions for tea cultivation, resulting in a delicate, aromatic brew with complex flavor notes.",
      benefits: [
        "High in antioxidants (catechins)",
        "Supports metabolism and weight management",
        "Promotes mental clarity and focus",
        "Heart-healthy properties",
        "Natural detoxification support",
      ],
      ingredients: ["100% Organic Green Tea Leaves"],
      usage:
        "Steep 1 teaspoon in 80°C water for 2-3 minutes. Can be re-steeped 2-3 times.",
      storage:
        "Store in airtight container away from light, heat, and moisture.",
      certifications: ["Organic Certified", "Fair Trade", "Quality Tested"],
      farmer: {
        name: "Tran Thi Mai",
        location: "Thai Nguyen",
        experience: "15 years",
        story: "Continues grandmother's tea garden legacy with organic methods",
      },
    },
  };

  return products[id] || products["1"];
};

const relatedProducts = [
  {
    id: 3,
    name: "Turmeric Root Powder",
    price: "₫180,000",
    image:
      "https://images.unsplash.com/photo-1615485499601-773e0eb7f0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Virgin Coconut Oil",
    price: "₫280,000",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Dried Jackfruit",
    price: "₫150,000",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.6,
  },
];

export default function ProductDetail() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!params.id) {
    return <div>Product not found</div>;
  }

  const product = getProductById(params.id as string);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(product.stockCount, quantity + delta)));
  };

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      {/* <Navigation1 /> */}

      {/* Breadcrumb */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-viet-green-dark transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/products"
              className="hover:text-viet-green-dark transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  data-testid="img-product-main"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-white rounded-xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? "border-viet-green-dark scale-105"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {product.badges.map((badge: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-viet-green-light text-viet-green-dark"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <h1
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                  data-testid="text-product-name"
                >
                  {product.name}
                </h1>

                <p
                  className="text-xl text-gray-600 mb-6"
                  data-testid="text-product-description"
                >
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-lg font-semibold ml-2">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-viet-green-light to-viet-earth-light p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <span
                    className="text-4xl font-bold text-viet-green-dark"
                    data-testid="text-product-price"
                  >
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-viet-green-dark mt-2">
                  Free shipping on orders over ₫500,000
                </p>
              </div>

              {/* Stock & Quantity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      data-testid="button-quantity-decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      data-testid="button-quantity-increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  className="w-full bg-viet-green-dark hover:bg-viet-green-medium text-white text-lg py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  Add to Cart - {product.price}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-2 border-viet-green-dark text-viet-green-dark hover:bg-viet-green-light py-3"
                    onClick={() => setIsFavorite(!isFavorite)}
                    data-testid="button-add-to-wishlist"
                  >
                    <Heart
                      className={`h-5 w-5 mr-2 ${
                        isFavorite ? "fill-current text-red-500" : ""
                      }`}
                    />
                    {isFavorite ? "Favorited" : "Add to Wishlist"}
                  </Button>

                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 py-3"
                    data-testid="button-share"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-viet-green-dark mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500">Orders over ₫500k</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-viet-green-dark mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500">SSL Protected</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-viet-green-dark mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Quality Guarantee
                  </p>
                  <p className="text-xs text-gray-500">100% Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="description" className="rounded-lg">
                Description
              </TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-lg">
                Benefits
              </TabsTrigger>
              <TabsTrigger value="farmer" className="rounded-lg">
                Our Farmer
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">
                Reviews
              </TabsTrigger>
            </TabsList>

            <div className="mt-12">
              <TabsContent value="description" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Product
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.fullDescription}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-viet-green-light/30 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Product Details
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          <strong>Weight:</strong> {product.weight}
                        </li>
                        <li>
                          <strong>Origin:</strong> {product.origin}
                        </li>
                        <li>
                          <strong>Harvest Date:</strong> {product.harvestDate}
                        </li>
                        <li>
                          <strong>Storage:</strong> {product.storage}
                        </li>
                      </ul>
                    </div>

                    <div className="bg-viet-earth-light/30 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Certifications
                      </h4>
                      <ul className="space-y-2">
                        {product.certifications.map(
                          (cert: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              {cert}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Health Benefits
                </h3>
                <div className="grid gap-4">
                  {product.benefits.map((benefit: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-viet-green-light/20 rounded-xl"
                    >
                      <Leaf className="h-6 w-6 text-viet-green-dark mt-1 flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-viet-green-light to-viet-earth-light p-8 rounded-2xl mt-8">
                  <h4 className="font-bold text-xl text-viet-green-dark mb-4">
                    How to Use
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="farmer" className="space-y-6">
                <div className="bg-gradient-to-r from-viet-green-dark to-viet-green-medium text-white p-8 rounded-2xl">
                  <h3 className="text-3xl font-bold mb-6">Meet Your Farmer</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {product.farmer.name}
                      </h4>
                      <p className="text-viet-green-light mb-1">
                        {product.farmer.location}
                      </p>
                      <p className="text-viet-green-light mb-4">
                        {product.farmer.experience} of experience
                      </p>
                      <p className="text-lg leading-relaxed">
                        {product.farmer.story}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-6xl">👨‍🌾</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <Button className="bg-viet-green-dark hover:bg-viet-green-medium text-white">
                    Write a Review
                  </Button>
                </div>

                {/* Review Summary */}
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-viet-green-dark mb-2">
                        {product.rating}
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Based on {product.reviews} reviews
                      </p>
                    </div>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-3">
                            {stars}
                          </span>
                          <Star className="h-4 w-4 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${
                                  stars === 5
                                    ? 70
                                    : stars === 4
                                    ? 20
                                    : stars === 3
                                    ? 5
                                    : stars === 2
                                    ? 3
                                    : 2
                                }%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {stars === 5
                              ? "70%"
                              : stars === 4
                              ? "20%"
                              : stars === 3
                              ? "5%"
                              : stars === 2
                              ? "3%"
                              : "2%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Linh Nguyen",
                      rating: 5,
                      date: "March 20, 2024",
                      comment:
                        "Absolutely amazing honey! The flavor is so pure and rich. You can really taste the difference from regular store-bought honey. Will definitely order again.",
                    },
                    {
                      name: "David Chen",
                      rating: 5,
                      date: "March 15, 2024",
                      comment:
                        "Best quality honey I've ever had. Perfect for my morning tea routine. Fast shipping and excellent packaging too.",
                    },
                    {
                      name: "Maria Santos",
                      rating: 4,
                      date: "March 10, 2024",
                      comment:
                        "Great product, love the natural taste. Only wish the packaging was a bit larger for the price, but the quality is definitely worth it.",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {review.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-viet-green-dark">
                        {relatedProduct.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
