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
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import ProductDescription from "./components/ProductDescription";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  barCode: string;
  retailPrice: string;
  currency: string;
  inventoryQty: number;
  inventoryStatus: string | null;
  variantName: string;
  description: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type ProductImage = {
  url: string;
  path: string;
  size: number;
  filename: string;
  mimetype: string;
  originalName: string;
};

type ProductVideo = {
  url: string;
  path: string;
  size: number;
  filename: string;
  mimetype: string;
  originalName: string;
};

type ProductMedia = {
  images: ProductImage[];
  videos: ProductVideo[];
  documents: any[];
  totalSize: number;
  uploadedAt: string;
};

type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  media: ProductMedia;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  categories: ProductCategory[];
};

type RelatedProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: string[];
  media: ProductMedia;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
  categories: ProductCategory[];
};

export default function ProductDetail() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMediaType, setCurrentMediaType] = useState<"image" | "video">(
    "image"
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

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

  // Fetch related products when main product is loaded
  useEffect(() => {
    let isMounted = true;
    async function fetchRelatedProducts() {
      if (!product || !product.categories || product.categories.length === 0)
        return;

      try {
        setRelatedLoading(true);
        setRelatedError(null);

        // Get category IDs from the current product
        const categoryIds = product.categories.map((cat) => cat.id);

        // Use your backend API structure - build URL with array parameters
        const params = new URLSearchParams({
          limit: "6",
          isActive: "true",
          includeVariants: "true",
          includeCategories: "true",
        });

        // Backend expects categoryIds as an array without transform
        // Send as repeated query parameters
        categoryIds.forEach((id) => {
          params.append("categoryIds", id);
        });

        const url = `/api/v1/products?${params.toString()}`;

        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }

        const data = await res.json();
        // Based on your PaginatedProductResponseDto structure
        const items: RelatedProduct[] = data?.data || [];

        // Filter out the current product and limit to 3 items
        const filteredItems = items
          .filter((item) => item.id !== product.id)
          .slice(0, 3);

        if (isMounted) setRelatedProducts(filteredItems);
      } catch (e: any) {
        if (isMounted)
          setRelatedError(e?.message || "Failed to load related products");
      } finally {
        if (isMounted) setRelatedLoading(false);
      }
    }

    fetchRelatedProducts();
    return () => {
      isMounted = false;
    };
  }, [product]);

  if (!params.id) {
    return <div>Product not found</div>;
  }

  const images: string[] = useMemo(() => {
    if (!product) return [];

    // Handle new API structure with media.images
    if (
      product.media &&
      product.media.images &&
      product.media.images.length > 0
    ) {
      return product.media.images.map((img) => `${img.url ?? img}`);
    }

    // // Fallback to legacy structure
    // if (
    //   Array.isArray(product.media.images) &&
    //   product.media.images.length > 0
    // ) {
    //   const arr = product.media.images as ProductImage[];
    //   return arr.map((it) => (typeof it === "string" ? it : it.url ?? it));
    // }

    // const fallback = product.media.images[0].url || product.media.images[0];
    // return fallback ? [fallback] : [];
    return [];
  }, [product]);

  const videos: string[] = useMemo(() => {
    if (!product) return [];
    if (
      product.media &&
      product.media.videos &&
      product.media.videos.length > 0
    ) {
      return product.media.videos.map((video) => `${video.url}`);
    }
    return [];
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

  const maxAvailable =
    selectedVariant?.inventoryQty ?? product?.variants[0].inventoryQty ?? 0;

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
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return String(value);
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(numValue);
    } catch {
      return `$${numValue.toFixed(2)}`;
    }
  };

  const displayPrice = formatPrice(
    selectedVariant?.retailPrice ?? product?.variants[0].retailPrice
  );
  // const displayOriginalPrice = formatPrice(product?.variants[0].re ?? null);

  // Helper functions for related products
  const getRelatedProductPrice = (product: RelatedProduct) => {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].retailPrice;
    }
    return null;
  };

  const getRelatedProductImage = (product: RelatedProduct) => {
    if (
      product.media &&
      product.media.images &&
      product.media.images.length > 0
    ) {
      return `${product.media.images[0].url}`;
    }
    return "https://images.unsplash.com/photo-1553279030-83ba509d4d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
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

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Breadcrumb */}
      <section className="pt-20 py-6 bg-gradient-to-r from-white via-gray-50/30 to-white border-b border-gray-200/50 mt-4">
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
      <section className="py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
              <div className="lg:col-span-3 aspect-[5/4] lg:aspect-[6/5] bg-white rounded-2xl shadow-xl animate-pulse" />
              <div className="lg:col-span-2 space-y-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
              {/* Product Media - Larger section */}
              <div className="lg:col-span-3 space-y-6">
                {/* Media Type Selector */}
                {videos.length > 0 && (
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <button
                      onClick={() => setCurrentMediaType("image")}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        currentMediaType === "image"
                          ? "bg-viet-green-medium text-white shadow-lg transform scale-105"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      Images ({images.length})
                    </button>
                    <button
                      onClick={() => setCurrentMediaType("video")}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        currentMediaType === "video"
                          ? "bg-viet-green-medium text-white shadow-lg transform scale-105"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      Videos ({videos.length})
                    </button>
                  </div>
                )}

                {/* Main Media Display - Larger and more prominent */}
                <div className="relative group">
                  <div className="aspect-[5/4] lg:aspect-[6/5] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
                    {currentMediaType === "image" && images[0] ? (
                      <>
                        <img
                          src={images[currentImageIndex]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          data-testid="img-product-main"
                        />
                        {/* Image overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Media counter */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {currentImageIndex + 1} / {images.length}
                        </div>

                        {/* Navigation arrows */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev === 0 ? images.length - 1 : prev - 1
                                )
                              }
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                              <ChevronLeft className="h-6 w-6" />
                            </button>
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev === images.length - 1 ? 0 : prev + 1
                                )
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                            >
                              <ChevronRight className="h-6 w-6" />
                            </button>
                          </>
                        )}
                      </>
                    ) : currentMediaType === "video" && videos[0] ? (
                      <video
                        src={videos[currentImageIndex] || videos[0]}
                        controls
                        className="w-full h-full object-cover"
                        data-testid="video-product-main"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                          <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p>No {currentMediaType} available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Media - Enhanced Grid */}
                {((currentMediaType === "image" && images.length > 1) ||
                  (currentMediaType === "video" && videos.length > 1)) && (
                  <div className="space-y-4">
                    {/* <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-1 h-6 bg-gradient-to-b from-viet-green-medium to-viet-earth-gold rounded-full mr-3"></div>
                      {currentMediaType === "image"
                        ? `Product Gallery (${images.length} images)`
                        : `Video Gallery (${videos.length} videos)`}
                    </h4> */}
                    <div className="relative">
                      {/* Scroll Buttons */}
                      {(currentMediaType === "image"
                        ? images.length
                        : videos.length) > 4 && (
                        <>
                          <button
                            onClick={() => scrollThumbnails("left")}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-10 h-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => scrollThumbnails("right")}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-10 h-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}

                      {/* Thumbnails Container - Larger thumbnails */}
                      <div
                        ref={thumbnailScrollRef}
                        className="flex gap-3 overflow-x-auto scrollbar-hide px-8"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {currentMediaType === "image"
                          ? images.map((img, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative flex-shrink-0 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl overflow-hidden border-3 transition-all duration-300 hover:scale-110 group ${
                                  index === currentImageIndex
                                    ? "border-viet-green-medium shadow-xl scale-110 ring-4 ring-viet-green-light"
                                    : "border-gray-200 hover:border-viet-green-light hover:shadow-lg"
                                }`}
                                data-testid={`button-thumbnail-${index}`}
                              >
                                <img
                                  src={img}
                                  alt={`${product.name} ${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {index === currentImageIndex && (
                                  <div className="absolute inset-0 bg-viet-green-medium/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-lg" />
                                  </div>
                                )}
                              </button>
                            ))
                          : videos.map((video, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative flex-shrink-0 w-20 h-20 lg:w-28 lg:h-28 rounded-2xl overflow-hidden border-3 transition-all duration-300 hover:scale-110 group ${
                                  index === currentImageIndex
                                    ? "border-viet-green-medium shadow-xl scale-110 ring-4 ring-viet-green-light"
                                    : "border-gray-200 hover:border-viet-green-light hover:shadow-lg"
                                }`}
                                data-testid={`button-video-thumbnail-${index}`}
                              >
                                <video
                                  src={video}
                                  className="w-full h-full object-cover"
                                  muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/80 rounded-full flex items-center justify-center">
                                    <div className="w-0 h-0 border-l-[4px] lg:border-l-[6px] border-l-black border-y-[3px] lg:border-y-[4px] border-y-transparent ml-1"></div>
                                  </div>
                                </div>
                                {index === currentImageIndex && (
                                  <div className="absolute inset-0 bg-viet-green-medium/20 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-lg" />
                                  </div>
                                )}
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info - Smaller but well-organized section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1
                      className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-viet-green-dark to-viet-earth-gold bg-clip-text text-transparent leading-tight"
                      data-testid="text-product-name"
                    >
                      {product.name}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {product.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 hover:shadow-md transition-all"
                        >
                          <Leaf className="h-3 w-3 mr-1.5 text-green-600" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.categories?.map((category) => (
                        <Badge
                          key={category.id}
                          variant="secondary"
                          className="bg-viet-green-light text-white border-viet-green-medium/30 px-3 py-1.5 text-sm font-medium shadow-sm"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* <p
                    className="text-xl text-gray-600 mb-6"
                    data-testid="text-product-description"
                  >
                    {product.description || ""}
                  </p> */}

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
                  <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-bold text-base">
                        Select Variant:
                      </span>
                      {selectedVariant && (
                        <span
                          className="text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 text-sm"
                          data-testid="text-selected-variant"
                        >
                          {selectedVariant.variantName || selectedVariant.sku}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v: ProductVariant) => {
                        const isSelected =
                          String(selectedVariant?.id) === String(v.id);
                        const isOut = (v.inventoryQty ?? 0) <= 0;
                        return (
                          <button
                            key={String(v.id)}
                            onClick={() => {
                              setSelectedVariantId(String(v.id));
                              setQuantity(1);
                            }}
                            disabled={isOut}
                            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                              isSelected
                                ? "border-viet-green-dark bg-viet-green-light text-white shadow-md scale-105"
                                : "border-gray-300 bg-white hover:bg-gray-50 text-viet-green-dark hover:scale-105"
                            } ${isOut ? "opacity-50 cursor-not-allowed" : ""}`}
                            data-testid={`button-variant-${String(v.id)}`}
                          >
                            {v.variantName || v.sku}
                            {isOut && (
                              <span className="block text-xs text-red-500 mt-1">
                                Out of stock
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {/* Price - Compact Coming Soon Section */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
                  <div className="text-center space-y-3">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold text-orange-600">
                        Coming Soon
                      </h3>
                      <p className="text-gray-700 font-medium text-sm">
                        This product will be available soon!
                      </p>
                    </div>

                    {selectedVariant && (
                      <div className="flex items-center justify-between pt-3 border-t border-orange-200 text-sm">
                        <div className="text-left">
                          <p className="font-semibold text-gray-600">Variant</p>
                          <p className="font-bold text-gray-900">
                            {selectedVariant.variantName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-600">Stock</p>
                          <p className="font-bold text-green-600">
                            {selectedVariant.inventoryQty} units
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity Selector - Compact */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-bold">Quantity:</span>
                    <div className="flex items-center border-2 border-gray-300 rounded-xl bg-white shadow-sm">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                        data-testid="button-quantity-decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-6 py-3 min-w-[4rem] text-center font-bold text-gray-900 bg-gray-50">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-3 hover:bg-gray-100 transition-colors rounded-r-xl"
                        data-testid="button-quantity-increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Compact */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-viet-earth-gold to-amber-500 hover:from-amber-500 hover:to-viet-earth-gold text-white py-3 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    size="lg"
                    data-testid="button-notify-me"
                    onClick={scrollToNewsletter}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Notify Me When Available
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-2 border-green-500 text-green-700 font-semibold hover:bg-green-50 transition-all duration-300 py-2 text-sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                      data-testid="button-add-wishlist"
                    >
                      <Heart
                        className={`h-4 w-4 mr-1.5 ${
                          isFavorite
                            ? "fill-current text-red-500"
                            : "text-green-600"
                        }`}
                      />
                      Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-blue-500 text-blue-700 font-semibold hover:bg-blue-50 transition-all duration-300 py-2 text-sm"
                      data-testid="button-share"
                    >
                      <Share2 className="h-4 w-4 mr-1.5 text-blue-600" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Trust Indicators - Compact */}
                <div className="grid grid-cols-3 gap-3 py-4 border-t-2 border-orange-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-600">Orders over ₫500k</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-gray-900">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-600">SSL Protected</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-gray-900">
                      Quality Guarantee
                    </p>
                    <p className="text-xs text-gray-600">100% Organic</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="pt-8 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
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

            <div className="mt-4">
              <TabsContent value="description" className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    About This Product
                  </h3>
                  <ProductDescription content={product?.description} />
                  {/* 
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
                  </div> */}
                </div>
              </TabsContent>

              {/* <TabsContent value="benefits" className="space-y-6">
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
              </TabsContent> */}

              <TabsContent value="farmer" className="space-y-6">
                <div className="bg-gradient-to-r from-viet-green-dark to-viet-green-medium text-white p-8 rounded-2xl">
                  <h3 className="text-3xl font-bold mb-6">Meet Your Farmer</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {"Our Partner"}
                      </h4>
                      <p className="text-viet-green-light mb-1">{"Vietnam"}</p>
                      <p className="text-viet-green-light mb-4">
                        {"Many years"} of experience
                      </p>
                      <p className="text-lg leading-relaxed">
                        {
                          "Working closely with our network of smallholder farmers across Vietnam."
                        }
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
                {/* <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <Button className="bg-viet-green-dark hover:bg-viet-green-medium text-white">
                    Write a Review
                  </Button>
                </div> */}

                {/* Review Summary */}
                {/* <div className="bg-gray-50 p-8 rounded-2xl">
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
                </div> */}

                {/* Sample Reviews */}
                {/* <div className="space-y-6">
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
                </div> */}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="pt-10 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-viet-green-light text-viet-green-dark/90 border border-viet-green-medium/20 text-white">
              Recommended for you
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-viet-green-dark via-viet-green-medium to-viet-earth-gold bg-clip-text text-transparent">
              Related Products
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-viet-green-dark to-viet-earth-gold"></div>
          </div>

          {relatedLoading ? (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-md h-80 animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : relatedError ? (
            <div className="text-center text-red-600 py-8">
              <p>Failed to load related products</p>
            </div>
          ) : relatedProducts.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p>No related products found in this category</p>
            </div>
          ) : (
            <Carousel opts={{ align: "start" }} className="relative">
              <CarouselContent className="py-4">
                {relatedProducts.map((relatedProduct) => (
                  <CarouselItem
                    key={relatedProduct.id}
                    className="sm:basis-1/2 lg:basis-1/3 px-2"
                  >
                    <Link
                      href={`/products/${
                        relatedProduct.slug || relatedProduct.id
                      }`}
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group ring-1 ring-gray-100 hover:ring-viet-green-light h-full">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                          <img
                            src={getRelatedProductImage(relatedProduct)}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Hover gradient overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          {/* Hover action button */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-viet-green-medium text-white shadow">
                              View details
                            </span>
                          </div>
                        </div>
                        <div className="p-6 relative z-10 bg-white rounded-b-2xl">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {relatedProduct.categories
                              ?.slice(0, 2)
                              .map((category) => (
                                <span
                                  key={category.id}
                                  className="text-xs bg-viet-green-light text-viet-green-dark px-2 py-1 rounded-full text-white"
                                >
                                  {category.name}
                                </span>
                              ))}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-viet-green-dark transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Click to view</span>
                            <span className="underline decoration-viet-green-light/60 group-hover:decoration-viet-green-dark">
                              Learn more
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-6 md:-left-10" />
              <CarouselNext className="-right-6 md:-right-10" />
            </Carousel>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
