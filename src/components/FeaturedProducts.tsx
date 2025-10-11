"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

type ProductMedia = {
  images: ProductImage[];
  videos: any[];
  documents: any[];
  totalSize: number;
  uploadedAt: string;
};

type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

type BackendProduct = {
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

export default function FeaturedProducts() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchLatest() {
      try {
        setLoading(true);
        setError(null);
        const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN;
        if (!backendOrigin) {
          if (isMounted) setError("Backend origin not configured");
          return;
        }
        const params = new URLSearchParams({
          page: "1",
          limit: "20", // Fetch more products for slider
          isActive: "true",
        });
        const url = `${backendOrigin}/api/v1/products?${params.toString()}`;
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) {
          if (isMounted) setError(`HTTP ${res.status}: ${res.statusText}`);
          return;
        }
        const json = await res.json();
        const items: BackendProduct[] = json?.data || [];
        if (isMounted) setProducts(items);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic products per slide based on screen size - max 4 products
  const productsPerSlide = useMemo(() => {
    if (windowWidth >= 1280) return 4; // xl: 4 products (reduced from 5)
    if (windowWidth >= 1024) return 3; // lg: 3 products
    if (windowWidth >= 640) return 2; // sm: 2 products
    return 1; // mobile: 1 product
  }, [windowWidth]);

  const totalSlides = useMemo(
    () => Math.max(1, Math.ceil(products.length / productsPerSlide)),
    [products.length, productsPerSlide]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleProductClick = (product: BackendProduct) => {
    const productIdentifier = product.slug || product.id;
    router.push(`/products/${productIdentifier}`);
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

  const getProductPrice = (product: BackendProduct) => {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].retailPrice;
    }
    return null;
  };

  const pickImage = (p: BackendProduct) => {
    if (p.media && p.media.images && p.media.images.length > 0) {
      return `${p.media.images[0].url ?? p.media.images[0]}`;
    }
    return "https://images.unsplash.com/photo-1553279030-83ba509d4d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
  };

  return (
    <section className="pt-16 pb-12 md:pt-18 md:pb-14 bg-[#e6f5dc] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-viet-green-light/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
      </div>

      <div className="relative max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
            <ShoppingCart className="h-6 w-6 text-white" />
          </div>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
            data-testid="text-products-title"
          >
            Our Most Loved Products
          </h2>
          <p
            className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto animate-fade-in-up animation-delay-200"
            data-testid="text-products-subtitle"
          >
            Handpicked organic treasures from across Vietnam, bringing you the
            finest natural flavors
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold mx-auto rounded-full mt-6 animate-fade-in-up animation-delay-400 shadow-lg"></div>
        </div>

        {/* Product Slider - One Row Only */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-viet-green-light/30">
            <div className="relative overflow-hidden rounded-2xl py-3">
              {loading ? (
                <div className="flex flex-nowrap gap-6 px-4">
                  {Array.from({ length: productsPerSlide }).map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl shadow-md h-80 animate-pulse flex-shrink-0"
                      style={{
                        width: `calc((100% - ${
                          (productsPerSlide - 1) * 24
                        }px) / ${productsPerSlide})`,
                        minWidth: "200px",
                      }}
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="p-8 text-center text-red-600">{error}</div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-600">
                  No products found.
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="flex flex-nowrap gap-6 px-4">
                        {products
                          .slice(
                            slideIndex * productsPerSlide,
                            (slideIndex + 1) * productsPerSlide
                          )
                          .map((product) => (
                            <div
                              key={product.id}
                              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group relative border border-gray-100 cursor-pointer flex-shrink-0"
                              style={{
                                width: `calc((100% - ${
                                  (productsPerSlide - 1) * 24
                                }px) / ${productsPerSlide})`,
                                minWidth: "200px",
                              }}
                              data-testid={`card-product-${product.id}`}
                              onClick={() => handleProductClick(product)}
                            >
                              {/* Badge */}
                              <div className="absolute top-3 left-3 z-10">
                                {product.variants &&
                                product.variants.length > 0 &&
                                product.variants[0].inventoryQty < 10 ? (
                                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                    Low Stock
                                  </span>
                                ) : product.categories &&
                                  product.categories.length > 0 ? (
                                  <span className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                    {product.categories[0].name}
                                  </span>
                                ) : null}
                              </div>

                              {/* Image Container */}
                              <div className="relative overflow-hidden">
                                <img
                                  src={pickImage(product)}
                                  alt={product.name}
                                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                  data-testid={`img-product-${product.id}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>

                              <div className="p-6 space-y-2">
                                {/* Price Section */}
                                <div className="flex items-center justify-between">
                                  {/* <div className="flex flex-col">
                                    <span
                                      className="text-2xl font-bold text-viet-green-medium"
                                      data-testid={`text-product-price-${product.id}`}
                                    >
                                      {formatPrice(getProductPrice(product))}
                                    </span>
                                    {product.variants &&
                                      product.variants.length > 0 && (
                                        <span className="text-xs text-gray-500">
                                          {product.variants[0].variantName}
                                        </span>
                                      )}
                                  </div> */}

                                  {/* <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                    data-testid={`button-add-to-cart-${product.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Add to cart", {
                                        productId: product.id,
                                        variantId: product.variants?.[0]?.id,
                                        name: product.name,
                                        price: getProductPrice(product),
                                      });
                                    }}
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    Add
                                  </Button> */}
                                </div>

                                <h3
                                  className="text-lg font-bold text-gray-800 group-hover:text-viet-green-dark transition-colors duration-300 truncate"
                                  data-testid={`text-product-name-${product.id}`}
                                  title={product.name}
                                >
                                  {product.name}
                                </h3>

                                {/* Extra info row: categories and stock status */}
                                <div className="flex items-center flex-wrap gap-2">
                                  {product.categories
                                    ?.slice(0, 2)
                                    .map((category) => (
                                      <span
                                        key={category.id}
                                        className="text-xs bg-viet-green-light/20 text-viet-green-dark px-2 py-1 rounded-full"
                                      >
                                        {category.name}
                                      </span>
                                    ))}
                                  {product.variants && product.variants[0] && (
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ml-auto ${
                                        product.variants[0].inventoryQty <= 0
                                          ? "bg-gray-200 text-gray-600"
                                          : product.variants[0].inventoryQty <
                                            10
                                          ? "bg-orange-100 text-orange-700"
                                          : "bg-green-100 text-green-700"
                                      }`}
                                      data-testid={`stock-chip-${product.id}`}
                                    >
                                      {product.variants[0].inventoryQty <= 0
                                        ? "Out of stock"
                                        : product.variants[0].inventoryQty < 10
                                        ? "Low stock"
                                        : "In stock"}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Hover Effect Border */}
                              <div className="absolute inset-0 rounded-2xl border-2 border-viet-green-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="button-prev-slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="button-next-slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-3 mt-6">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-viet-green-medium scale-125 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`dot-indicator-${index}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <Button
            className="bg-gradient-to-r from-viet-green-dark to-viet-green-medium hover:from-viet-green-medium hover:to-viet-green-dark text-white px-12 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            data-testid="button-view-all-products"
            onClick={() => router.push("/products")}
          >
            View All Products
            <ArrowRight className="h-5 w-5 ml-3" />
          </Button>
        </div>
      </div>
    </section>
  );
}
