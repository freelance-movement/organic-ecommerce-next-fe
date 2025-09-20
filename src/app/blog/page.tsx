"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type BlogItem = {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  image?: string;
  coverImageUrl?: string | null;
  thumbnailUrl?: string | null;
  tags?: string[];
  readTime?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
  category?: string;
};

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(postsPerPage),
          sortBy: "createdAt",
          sortOrder: "DESC",
          published: "true",
        });
        if (searchTerm.trim()) params.set("search", searchTerm.trim());
        const res = await fetch(`/api/v1/blogs?${params.toString()}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        const data = await res.json();
        const items: BlogItem[] = data?.items || data?.data || [];
        const meta = data?.meta || data?.pagination || {};
        if (isMounted) {
          setPosts(items);
          // Use meta.total and meta.totalPages from backend response
          setTotalItems(meta.total ?? items.length);
          setTotalPages(
            meta.totalPages ??
              Math.max(
                1,
                Math.ceil((meta.total ?? items.length) / postsPerPage)
              )
          );
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load blogs");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const pickImage = (post: BlogItem) => {
    return (
      post.image ||
      post.thumbnailUrl ||
      post.coverImageUrl ||
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    );
  };

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Hero Section */}
      <section className="pt-24 pb-3 md:pt-20 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
              data-testid="text-blog-hero-title"
            >
              <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                VietRoot's Journal
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-viet-green-dark mb-4">
              Discover Our Stories
            </h2>
            <p className="text-lg text-gray-600">
              Search through our collection of articles about Vietnamese
              culture, organic farming, and wellness
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <div className="flex items-center justify-center w-8 h-8 bg-viet-green-light/20 rounded-full transition-all duration-300 group-focus-within:bg-viet-green-medium/20 group-focus-within:scale-110">
                  <Search className="h-4 w-4 text-viet-green-medium transition-all duration-300 group-focus-within:text-viet-green-dark group-focus-within:scale-110" />
                </div>
              </div>

              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearchTerm(e.target.value);
                }}
                className="pl-14 pr-12 py-4 border-2 border-viet-green-light focus:border-viet-green-medium focus:ring-2 focus:ring-viet-green-medium/20 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
                data-testid="input-search-blog"
              />

              {/* Clear Button */}
              {searchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <button
                    onClick={() => setSearchTerm("")}
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
            </div>

            {/* Search Results Count */}
            {searchTerm && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Found {""}
                  <span className="font-semibold text-viet-green-dark">
                    {totalItems}
                  </span>{" "}
                  articles for "
                  <span className="font-medium text-viet-green-dark">
                    {searchTerm}
                  </span>
                  "
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Post - Only show on first page */}
      {currentPage === 1 && posts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img
                    src={pickImage(posts[0])}
                    alt={posts[0].title}
                    className="w-full h-full object-cover"
                    data-testid="featured-post-image"
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center mb-4">
                    <Badge className="bg-viet-green-medium text-white mr-3">
                      Featured
                    </Badge>
                    <span
                      className="text-sm text-gray-500"
                      data-testid="featured-post-read-time"
                    >
                      {posts[0].readTime || ""}
                    </span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-bold text-viet-green-dark mb-4"
                    data-testid="featured-post-title"
                  >
                    {posts[0].title}
                  </h2>

                  <p
                    className="text-gray-700 mb-6 text-lg leading-relaxed"
                    data-testid="featured-post-excerpt"
                  >
                    {posts[0].excerpt || ""}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span data-testid="featured-post-author">
                        {posts[0].author || ""}
                      </span>
                      <Calendar className="h-4 w-4 ml-4 mr-2" />
                      <span data-testid="featured-post-date">
                        {formatDate(posts[0].createdAt)}
                      </span>
                    </div>

                    <Link href={`/blog/${posts[0].id}`}>
                      <Button
                        className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
                        data-testid="featured-post-read-more"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-lg h-96 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse all our articles
                </p>
              </div>
              <Button
                onClick={() => setSearchTerm("")}
                variant="outline"
                className="border-viet-green-medium text-viet-green-dark hover:bg-viet-green-light"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(currentPage === 1 ? posts.slice(1) : posts).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <article
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                      data-testid={`blog-post-${post.id}`}
                    >
                      <img
                        src={pickImage(post)}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        data-testid={`blog-image-${post.id}`}
                      />

                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span
                            className="text-xs text-gray-500"
                            data-testid={`blog-read-time-${post.id}`}
                          >
                            {post.readTime || ""}
                          </span>
                          <div className="flex gap-1 ml-auto">
                            {(post.tags || []).slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs border-viet-green-medium text-viet-green-medium"
                                data-testid={`blog-tag-${post.id}-${index}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <h3
                          className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2"
                          data-testid={`blog-title-${post.id}`}
                        >
                          {post.title}
                        </h3>

                        <p
                          className="text-gray-600 text-sm mb-4 line-clamp-3"
                          data-testid={`blog-excerpt-${post.id}`}
                        >
                          {post.excerpt || ""}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span data-testid={`blog-author-${post.id}`}>
                              {post.author || ""}
                            </span>
                            <Calendar className="h-3 w-3 ml-3 mr-1" />
                            <span data-testid={`blog-date-${post.id}`}>
                              {formatDate(post.createdAt)}
                            </span>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-viet-green-medium hover:text-viet-green-dark"
                            data-testid={`blog-read-more-${post.id}`}
                          >
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination-container mt-12">
                {/* Page Info */}
                <div className="text-center sm:text-left">
                  <p className="text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </p>
                  <p className="text-sm text-gray-500">
                    {totalItems} total posts
                  </p>
                </div>

                {/* Pagination Controls - only show if more than 1 page */}
                {totalPages >= 1 && (
                  <div className="flex justify-center sm:justify-end items-center space-x-2">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
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
                              onClick={() => handlePageChange(page)}
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
                      onClick={() => handlePageChange(currentPage + 1)}
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
