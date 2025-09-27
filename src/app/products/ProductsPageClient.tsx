"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Filter,
  Star,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import "./styles.css";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  type: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type CategoryGroup = {
  id: string;
  name: string;
  parent: string | null;
  children: Array<{ id: string; name: string }>;
};

type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  barCode: string;
  retailPrice: number;
  currency: string;
  inventoryQty: number;
  inventoryStatus?: string;
  variantName: string;
  description?: string;
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
  images?: ProductImage[];
  videos?: any[];
  documents?: any[];
  totalSize?: number;
  uploadedAt?: string;
};

type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

type ProductItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags?: string[];
  media?: ProductMedia;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  variants?: ProductVariant[];
  categories?: ProductCategory[];
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const productsPerPage = 9;
  const categoriesPerPage = 8; // 2 rows of 4 categories each

  const [categories, setCategories] = useState<CategoryGroup[]>([
    { id: "all", name: "All Products", parent: null, children: [] },
  ]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch categories once
  useEffect(() => {
    let isMounted = true;
    async function fetchCategories() {
      try {
        const res = await fetch(
          `/api/v1/categories?limit=99&page=1&isActive=true`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        const data = await res.json();
        const items: CategoryItem[] = data?.data || [];
        

        // Check for special category that might be a parent (like "By Fruit Type")
        const specialParent = items.find(item => 
          item.name === "By Fruit Type" || item.slug === "by-fruit-type");
        
        // Create groups with all items as top level if no parentId present in data
        let groups: CategoryGroup[] = [
          {
            id: "all",
            name: "All Products",
            parent: null,
            children: [],
          }
        ];
        
        if (specialParent) {
          // If we found a special parent category, use it as a parent for others
          const childCategories = items.filter(item => 
            item.id !== specialParent.id);
          
          groups.push({
            id: specialParent.id,
            name: specialParent.name,
            parent: null,
            children: childCategories.map(item => ({ 
              id: item.id, 
              name: item.name 
            })),
          });
          
          // Also add all categories as top-level items
          items.filter(item => item.id !== specialParent.id)
            .forEach(item => {
              groups.push({
                id: item.id,
                name: item.name,
                parent: null,
                children: [],
              });
            });
        } else {
          // No special parent found, just add all items as top level
          items.forEach(item => {
            groups.push({
              id: item.id,
              name: item.name,
              parent: null,
              children: [],
            });
          });
        }
        
        if (isMounted) setCategories(groups);
      } catch (e: any) {
        // Keep default All Products if categories fail
        console.error("Categories fetch error", e);
      }
    }
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products on filters/page change
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        // Build the fetch URL and body
        let url = "/api/v1/products";
        const headers = {
          "Content-Type": "application/json",
        };
        
        // Create the fetch options with query parameters
        let fetchOptions: RequestInit = {
          credentials: "include",
          headers,
        };
        
        // Create query parameters object
        const queryParams: Record<string, any> = {
          page: currentPage,
          limit: productsPerPage,
          sortBy: "createdAt",
          sortOrder: "DESC",
          isActive: true,
          includeVariants: true,
          includeCategories: true
        };
        
        // Add search query if provided
        if (searchQuery.trim()) {
          queryParams.search = searchQuery.trim();
        }
        
        // Add category ID as an array parameter if selected
        if (selectedCategory !== "all") {
          queryParams.categoryIds = [selectedCategory]; // Pass as an array
        }
        
        // Convert to query string
        const queryString = Object.entries(queryParams)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              // Handle array parameters - use proper encoding for arrays
              return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
            }
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join('&');
        
        // Build final URL
        url = `${url}?${queryString}`;
        const res = await fetch(url, fetchOptions);
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        const data = await res.json();
        const items: ProductItem[] = data?.data || [];
        const meta = data?.meta || {};
        if (isMounted) {
          setProducts(items);
          setTotalItems(meta.total ?? items.length);
          setTotalPages(
            meta.totalPages ??
              Math.max(
                1,
                Math.ceil((meta.total ?? items.length) / productsPerPage)
              )
          );
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load products");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchQuery, selectedCategory]);

  // Get visible categories (with pagination)
  const visibleCategories = useMemo(() => {
    if (showAllCategories) {
      return categories;
    }
    return categories.slice(0, categoriesPerPage);
  }, [showAllCategories, categoriesPerPage, categories]);

  // Use totalPages from backend meta, fallback to calculation if needed
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalItems);

  // Reset to first page when filters change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleSearchChange("");
    }
  };

  const pickImage = (p: ProductItem) => {
    if (p.media && p.media.images && p.media.images.length > 0) {
      return `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}${
        p.media.images[0].url ?? p.media.images[0]
      }`;
    }
    return "https://images.unsplash.com/photo-1553279030-83ba509d4d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
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

  const getProductPrice = (product: ProductItem) => {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].retailPrice;
    }
    return null;
  };

  const getInStock = (product: ProductItem) => {
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].inventoryQty > 0;
    }
    return product.isActive;
  };

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Hero Section */}
      <section className="products-hero mt-0 md:mt-8 pt-24 pb-3 md:pt-20 md:pb-8 text-white relative overflow-hidden">
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
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Search and Filter Section */}
          <div className="mb-12 overflow-visible">
            {/* Search and Results Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="search-container group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="flex items-center justify-center w-8 h-8 bg-viet-green-light/20 rounded-full transition-all duration-300 group-focus-within:bg-viet-green-medium/20 group-focus-within:scale-110">
                      <Search className="h-4 w-4 text-viet-green-medium transition-all duration-300 group-focus-within:text-viet-green-dark group-focus-within:scale-110" />
                    </div>
                  </div>
                  <Input
                    type="text"
                    placeholder="🔍 Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-14 pr-12 py-4 border-2 border-viet-green-light focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
                    data-testid="search-input"
                  />
                  {searchQuery && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <button
                        onClick={() => handleSearchChange("")}
                        className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-viet-green-medium transition-all duration-200 rounded-full hover:scale-110 hover:shadow-md"
                        title="Clear search"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Keyboard Shortcuts Hint */}
                  {searchQuery && (
                    <div className="absolute -bottom-8 left-0 text-xs text-gray-500 animate-fade-in-up">
                      <span className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                        <div className="w-1 h-1 bg-viet-green-medium rounded-full animate-pulse"></div>
                        <span className="flex items-center gap-1">
                          <kbd className="px-1 py-0.5 text-xs bg-gray-100 rounded border">
                            Enter
                          </kbd>
                          to search
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1">
                          <kbd className="px-1 py-0.5 text-xs bg-gray-100 rounded border">
                            Esc
                          </kbd>
                          to clear
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Count and Clear Filters */}
              <div className="flex items-center gap-4">
                <div className="text-right animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center justify-center w-6 h-6 bg-viet-green-light/20 rounded-full">
                      {loading ? (
                        <svg
                          className="h-3 w-3 text-viet-green-medium animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="h-3 w-3 text-viet-green-medium"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <p className="text-gray-600 font-medium">
                      {loading ? (
                        <span className="text-gray-500">
                          Loading products...
                        </span>
                      ) : (
                        <>
                          <span className="text-viet-green-dark font-bold text-lg">
                            {totalItems}
                          </span>{" "}
                          products found
                          {searchQuery && (
                            <span className="text-viet-green-dark font-semibold">
                              {" "}
                              for "{searchQuery}"
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  {!loading && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                        />
                      </svg>
                      Showing{" "}
                      <span className="font-medium text-viet-green-dark">
                        {startIndex + 1}-{endIndex}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-viet-green-dark">
                        {totalItems}
                      </span>
                    </p>
                  )}
                </div>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                    variant="outline"
                    className="px-4 py-2 text-viet-green-dark border-viet-green-medium hover:bg-viet-green-light transition-all duration-300 transform hover:scale-105 hover:shadow-md rounded-xl flex items-center gap-2"
                    data-testid="clear-filters"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter-container animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5 text-viet-green-medium transition-all duration-300 hover:scale-110 hover:rotate-12" />
                  <h3 className="text-lg font-semibold text-viet-green-dark">
                    Filter by Category
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {categories.length} categories
                  </span>
                </div>
                {categories.length > categoriesPerPage && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-viet-green-light rounded-full animate-pulse"></div>
                    <span className="hidden sm:inline">
                      {showAllCategories
                        ? "Showing all"
                        : `${categoriesPerPage} of ${categories.length}`}
                    </span>
                    <span className="sm:hidden">
                      {showAllCategories
                        ? "All"
                        : `${categoriesPerPage}/${categories.length}`}
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`category-grid ${
                  showAllCategories ? "max-h-96" : "max-h-40"
                }`}
                style={{
                  overflow: "visible",
                  position: "relative",
                  zIndex: 1,
                  isolation: "isolate",
                }}
              >
                {visibleCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="category-group relative group"
                    style={{
                      isolation: "isolate",
                      position: "relative",
                    }}
                  >
                    {category.children.length > 0 ? (
                      <div className="relative">
                        <Button
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => {
                            handleCategoryChange(category.id);
                            toggleCategory(category.id);
                          }}
                          className={`category-button ${
                            selectedCategory === category.id ? "selected" : ""
                          }`}
                          data-testid={`filter-${category.id}`}
                        >
                          {category.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-all duration-300 ${
                              expandedCategory === category.id
                                ? "rotate-180"
                                : "group-hover:rotate-90"
                            }`}
                          />
                        </Button>

                        {/* Hover Dropdown - Always visible on hover */}
                        <div
                          className="dropdown-menu group-hover:opacity-100 group-hover:visible"
                          style={{
                            minWidth: "max-content",
                            maxWidth: "300px",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            marginTop: "4px",
                            pointerEvents: "auto",
                            isolation: "isolate",
                            willChange: "opacity, transform",
                            backfaceVisibility: "hidden",
                            contain: "layout style paint",
                          }}
                        >
                          {category.children.map((subcategory, index) => (
                            <button
                              key={subcategory.id}
                              onClick={() =>
                                handleCategoryChange(subcategory.id)
                              }
                              className={`dropdown-item ${
                                selectedCategory === subcategory.id
                                  ? "selected"
                                  : ""
                              }`}
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animation:
                                  "slideInFromLeft 0.3s ease-out forwards",
                              }}
                              data-testid={`filter-${subcategory.id}`}
                            >
                              <span className="font-medium">
                                {subcategory.name}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Click Dropdown - For mobile/touch devices */}
                        {expandedCategory === category.id && (
                          <div
                            className="dropdown-menu opacity-100 visible sm:hidden"
                            style={{
                              minWidth: "max-content",
                              maxWidth: "300px",
                              position: "absolute",
                              top: "100%",
                              left: "0",
                              marginTop: "4px",
                              pointerEvents: "auto",
                              isolation: "isolate",
                              willChange: "opacity, transform",
                              backfaceVisibility: "hidden",
                              contain: "layout style paint",
                            }}
                          >
                            {category.children.map((subcategory, index) => (
                              <button
                                key={subcategory.id}
                                onClick={() =>
                                  handleCategoryChange(subcategory.id)
                                }
                                className={`dropdown-item ${
                                  selectedCategory === subcategory.id
                                    ? "selected"
                                    : ""
                                }`}
                                style={{
                                  animationDelay: `${index * 50}ms`,
                                  animation:
                                    "slideInFromLeft 0.3s ease-out forwards",
                                }}
                                data-testid={`filter-${subcategory.id}`}
                              >
                                <span className="font-medium">
                                  {subcategory.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        variant={
                          selectedCategory === category.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleCategoryChange(category.id)}
                        className={`category-button ${
                          selectedCategory === category.id ? "selected" : ""
                        }`}
                        data-testid={`filter-${category.id}`}
                      >
                        {category.name}
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Show More/Less Button */}
              {categories.length > categoriesPerPage && (
                <div className="mt-3 text-center">
                  <Button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    variant="outline"
                    size="sm"
                    className="show-more-button"
                  >
                    {showAllCategories ? (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1 rotate-180" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Show All ({categories.length})
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-0">
            {loading ? (
              // Enhanced Loading Skeleton
              Array.from({ length: productsPerPage }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                  {/* Image Skeleton */}
                  <div className="aspect-square bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                    {/* Badge Skeletons */}
                    <div className="absolute top-3 left-3 flex gap-1">
                      <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                      <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="space-y-1">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="col-span-3 text-center text-red-600 py-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-red-400 mb-4">
                    <svg
                      className="h-12 w-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error Loading Products
                  </h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-3 text-center text-gray-600">
                No products found.
              </div>
            ) : (
              products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug ? product.slug : product.id}`}
                >
                  <div
                    className="product-card h-full flex flex-col"
                    data-testid={`product-card-${product.id}`}
                  >
                    <div className="relative">
                      <img
                        src={pickImage(product)}
                        alt={product.name}
                        className="product-image"
                        data-testid={`product-image-${product.id}`}
                      />
                      {!getInStock(product) && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {/* Low Stock Badge */}
                        {product.variants &&
                          product.variants[0] &&
                          product.variants[0].inventoryQty < 10 &&
                          product.variants[0].inventoryQty > 0 && (
                            <Badge
                              className="product-badge bg-orange-500 text-white"
                              data-testid={`badge-${product.id}-low-stock`}
                            >
                              Low Stock
                            </Badge>
                          )}
                        {/* Category Badge */}
                        {product.categories &&
                          product.categories.length > 0 && (
                            <Badge
                              className="product-badge bg-viet-green-light text-viet-green-dark"
                              data-testid={`badge-${product.id}-category`}
                            >
                              {product.categories[0].name}
                            </Badge>
                          )}
                      </div>
                    </div>

                    <div className="product-content">
                      <h3
                        className="product-title"
                        data-testid={`product-name-${product.id}`}
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Extra info row: categories and stock status */}
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        {product.categories?.slice(0, 2).map((category) => (
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
                                : product.variants[0].inventoryQty < 10
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

                      <div className="product-footer">
                        <div>
                          <span
                            className="product-price"
                            data-testid={`product-price-${product.id}`}
                          >
                            {/* {formatPrice(getProductPrice(product))} */}
                            Coming Soon
                          </span>
                          {product.variants && product.variants.length > 0 && (
                            <span className="block text-xs text-gray-500 mt-1">
                              {product.variants[0].variantName}
                            </span>
                          )}
                        </div>

                        <Button
                          disabled={!getInStock(product)}
                          className={`add-to-cart-button ${
                            !getInStock(product) ? "disabled" : ""
                          }`}
                          data-testid={`add-to-cart-${product.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (
                              product.variants &&
                              product.variants.length > 0
                            ) {
                              console.log("Add to cart:", {
                                productId: product.id,
                                variantId: product.variants[0].id,
                                sku: product.variants[0].sku,
                                price: product.variants[0].retailPrice,
                              });
                            }
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {!getInStock(product)
                            ? // ? "Out of Stock"
                              // : "Add to Cart"}
                              "Coming Soon"
                            : "Coming Soon"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Pagination and No Results */}
          <div className="mt-12">
            {/* No Results Message */}
            {!loading && products.length === 0 ? (
              <div className="no-results-container">
                <div className="no-results-card">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery
                      ? `No products match your search for "${searchQuery}"`
                      : "Try adjusting your filters to see more products"}
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setCurrentPage(1);
                    }}
                    className="clear-filters-button"
                    data-testid="clear-filters"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              /* Pagination */
              <div className="pagination-container">
                {/* Page Info */}
                <div className="text-center sm:text-left">
                  <p className="text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </p>
                  <p className="text-sm text-gray-500">
                    {totalItems} total products
                  </p>
                </div>

                {/* Pagination Controls - only show if more than 1 page */}
                {totalPages >= 1 && (
                  <div className="flex justify-center sm:justify-end items-center space-x-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="pagination-button"
                      data-testid="pagination-prev"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          // Show first page, last page, current page, and pages around current page
                          const shouldShow =
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 &&
                              page <= currentPage + 1);

                          if (!shouldShow) {
                            // Show ellipsis for gaps
                            if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <span
                                  key={page}
                                  className="px-3 py-2 text-gray-400 font-medium"
                                >
                                  ...
                                </span>
                              );
                            }
                            return null;
                          }

                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              onClick={() => setCurrentPage(page)}
                              className={`pagination-page-button ${
                                currentPage === page ? "current" : ""
                              }`}
                              data-testid={`pagination-page-${page}`}
                            >
                              {page}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                      data-testid="pagination-next"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
