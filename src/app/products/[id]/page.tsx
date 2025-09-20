"use client";
import Navigation1 from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useRef, useMemo, useEffect } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
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
import Navigation from "@/components/Navigation";

type ProductVariant = {
  id: string;
  name?: string;
  sku?: string;
  price?: number | string;
  originalPrice?: number | string | null;
  stockCount?: number;
};

type ProductDetail = {
  id: string | number;
  name: string;
  category?: string;
  description?: string;
  price?: number | string;
  originalPrice?: number | string | null;
  rating?: number;
  reviews?: number;
  images?: string[] | Array<{ url: string }>;
  tags?: string[];
  badges?: string[];
  inStock?: boolean;
  stockCount?: number;
  weight?: string;
  origin?: string;
  harvestDate?: string;
  fullDescription?: string;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
  storage?: string;
  certifications?: string[];
  farmer?: {
    name?: string;
    location?: string;
    experience?: string;
    story?: string;
  };
  variants?: ProductVariant[];
  variantLabel?: string;
  mainImageUrl?: string | null;
  thumbnailUrl?: string | null;
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
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail(idOrSlug: string) {
      try {
        setLoading(true);
        setError(null);

        // Try by ID first
        // let res = await fetch(
        //   `/api/v1/products/${idOrSlug}?includeVariants=true&includeCategories=true`,
        //   { credentials: "include" }
        // );

        // If not found or invalid, try by slug
        // if (!res.ok && (res.status === 404 || res.status === 400)) {
        const res = await fetch(
          `/api/v1/products/slug/${encodeURIComponent(
            idOrSlug
          )}?includeVariants=true&includeCategories=true`,
          { credentials: "include" }
        );
        // }

        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }

        const data = await res.json();
        if (isMounted) setProduct(data);
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load product");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    const id = params.id as string | undefined;
    if (id) fetchDetail(id);
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  if (!params.id) {
    return <div>Product not found</div>;
  }

  const images: string[] = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      const arr = product.images as any[];
      return arr.map((it) => (typeof it === "string" ? it : it.url));
    }
    const fallback = product.mainImageUrl || product.thumbnailUrl;
    return fallback ? [fallback] : [];
  }, [product]);

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariantId(String(product.variants[0].id));
    }
  }, [product?.variants]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return null;
    return (
      product.variants.find(
        (v) => String(v.id) === String(selectedVariantId)
      ) || product.variants[0]
    );
  }, [product, selectedVariantId]);

  const maxAvailable = selectedVariant?.stockCount ?? product?.stockCount ?? 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (maxAvailable && next > maxAvailable) return maxAvailable;
      return next;
    });
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailScrollRef.current) {
      const scrollAmount = 120; // Width of one thumbnail + gap
      const currentScroll = thumbnailScrollRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      thumbnailScrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  const formatPrice = (value?: number | string | null) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value;
    try {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(value);
    } catch {
      return String(value);
    }
  };

  const displayPrice = formatPrice(selectedVariant?.price ?? product?.price);
  const displayOriginalPrice = formatPrice(
    selectedVariant?.originalPrice ?? product?.originalPrice ?? null
  );

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Breadcrumb */}
      <section className="pt-20 py-6 bg-white border-b">
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
            <span className="text-gray-900">{product?.name || "Product"}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-10 bg-white rounded animate-pulse" />
                <div className="h-6 bg-white rounded animate-pulse" />
                <div className="h-40 bg-white rounded animate-pulse" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : !product ? (
            <div className="text-center text-gray-600">Product not found</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl">
                  {images[0] ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      data-testid="img-product-main"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>

                {/* Thumbnail Images - Horizontal Scroll */}
                {images.length > 0 && (
                  <div className="relative">
                    {/* Scroll Buttons */}
                    {images.length > 3 && (
                      <>
                        <button
                          onClick={() => scrollThumbnails("left")}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-8 h-8 p-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                          data-testid="button-scroll-left"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => scrollThumbnails("right")}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-8 h-8 p-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                          data-testid="button-scroll-right"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {/* Thumbnail Container */}
                    <div
                      ref={thumbnailScrollRef}
                      className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-24 h-24 bg-white rounded-xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
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
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {(product.badges || product.tags || []).map(
                      (badge: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-viet-green-light text-viet-green-dark"
                        >
                          {badge}
                        </Badge>
                      )
                    )}
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
                    {product.description || ""}
                  </p>

                  {/* Rating */}
                  {/* <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-lg font-semibold ml-2">
                        {product.rating || 0}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div> */}
                </div>

                {/* Variant Selector */}
                {product?.variants?.length ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">
                        {product.variantLabel || "Variant"}:
                      </span>
                      {selectedVariant && (
                        <span
                          className="text-gray-900 font-semibold"
                          data-testid="text-selected-variant"
                        >
                          {selectedVariant.name || selectedVariant.sku}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v: ProductVariant) => {
                        const isSelected =
                          String(selectedVariant?.id) === String(v.id);
                        const isOut = (v.stockCount ?? 0) <= 0;
                        return (
                          <button
                            key={String(v.id)}
                            onClick={() => {
                              setSelectedVariantId(String(v.id));
                              setQuantity(1);
                            }}
                            disabled={isOut}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                              isSelected
                                ? "border-viet-green-dark bg-viet-green-light text-viet-green-dark"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                            } ${isOut ? "opacity-50 cursor-not-allowed" : ""}`}
                            data-testid={`button-variant-${String(v.id)}`}
                          >
                            {v.name || v.sku}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* Price */}
                <div className="bg-gradient-to-r from-viet-green-light to-viet-earth-light p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-4xl font-bold text-viet-green-dark"
                      data-testid="text-product-price"
                    >
                      {displayPrice}
                    </span>
                    {displayOriginalPrice && (
                      <span className="text-2xl text-gray-500 line-through">
                        {displayOriginalPrice}
                      </span>
                    )}
                  </div>
                  {/* <p className="text-viet-green-dark mt-2">
                    Free shipping on orders over ₫500,000
                  </p> */}
                </div>

                {/* Stock & Quantity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium">
                      {maxAvailable > 0
                        ? `In Stock (${maxAvailable} available)`
                        : "Out of Stock"}
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
                    onClick={() => {
                      console.log("Add to cart", {
                        productId: product.id,
                        variantId: selectedVariant?.id,
                        sku: selectedVariant?.sku,
                        quantity,
                      });
                    }}
                    disabled={maxAvailable <= 0}
                  >
                    <ShoppingCart className="h-6 w-6 mr-3" />
                    Add to Cart - {displayPrice}
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
          )}
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
              {/* <TabsTrigger value="benefits" className="rounded-lg">
                Benefits
              </TabsTrigger> */}
              <TabsTrigger value="farmer" className="rounded-lg">
                Our Farmer
              </TabsTrigger>
              {/* <TabsTrigger value="reviews" className="rounded-lg">
                Reviews
              </TabsTrigger> */}
            </TabsList>

            <div className="mt-12">
              <TabsContent value="description" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    About This Product
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product?.fullDescription || product?.description || ""}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-viet-green-light/30 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Product Details
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        {product?.weight && (
                          <li>
                            <strong>Weight:</strong> {product.weight}
                          </li>
                        )}
                        {product?.origin && (
                          <li>
                            <strong>Origin:</strong> {product.origin}
                          </li>
                        )}
                        {product?.harvestDate && (
                          <li>
                            <strong>Harvest Date:</strong> {product.harvestDate}
                          </li>
                        )}
                        {product?.storage && (
                          <li>
                            <strong>Storage:</strong> {product.storage}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-viet-earth-light/30 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Certifications
                      </h4>
                      <ul className="space-y-2">
                        {(product?.certifications || []).map(
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
                  {(product?.benefits || []).map(
                    (benefit: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-viet-green-light/20 rounded-xl"
                      >
                        <Leaf className="h-6 w-6 text-viet-green-dark mt-1 flex-shrink-0" />
                        <p className="text-gray-700 text-lg">{benefit}</p>
                      </div>
                    )
                  )}
                </div>

                {product?.usage && (
                  <div className="bg-gradient-to-r from-viet-green-light to-viet-earth-light p-8 rounded-2xl mt-8">
                    <h4 className="font-bold text-xl text-viet-green-dark mb-4">
                      How to Use
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {product.usage}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="farmer" className="space-y-6">
                <div className="bg-gradient-to-r from-viet-green-dark to-viet-green-medium text-white p-8 rounded-2xl">
                  <h3 className="text-3xl font-bold mb-6">Meet Your Farmer</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {product?.farmer?.name || "Our Partner"}
                      </h4>
                      <p className="text-viet-green-light mb-1">
                        {product?.farmer?.location || "Vietnam"}
                      </p>
                      <p className="text-viet-green-light mb-4">
                        {product?.farmer?.experience || "Many years"} of
                        experience
                      </p>
                      <p className="text-lg leading-relaxed">
                        {product?.farmer?.story ||
                          "Working closely with our network of smallholder farmers across Vietnam."}
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
                        {product?.rating || 0}
                      </div>
                      <div className="flex justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-6 w-6 ${
                              i < Math.floor(product?.rating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">
                        Based on {product?.reviews || 0} reviews
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
