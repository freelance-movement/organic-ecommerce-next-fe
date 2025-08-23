"use client";
import Navigation1 from "@/components/Navigation1";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const categories = [
  { id: "all", name: "All Posts", count: 12 },
  { id: "wellness", name: "Wellness Tips", count: 4 },
  { id: "farmers", name: "Farmer Stories", count: 3 },
  { id: "culture", name: "Vietnamese Culture", count: 3 },
  { id: "sustainability", name: "Sustainability", count: 2 },
];

const blogPosts = [
  {
    id: 1,
    title: "The Ancient Art of Vietnamese Tea Ceremony",
    excerpt:
      "Discover the cultural significance and health benefits of traditional Vietnamese tea ceremonies, passed down through generations.",
    content: "Vietnamese tea culture dates back over 1,000 years...",
    author: "Mai Nguyen",
    date: "2024-03-15",
    category: "culture",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Tea", "Culture", "Tradition"],
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Meet Farmer Duc: Guardian of Wild Honey Traditions",
    excerpt:
      "Learn about Nguyen Van Duc's family legacy of wild honey harvesting in the pristine mountains of Ha Giang province.",
    content:
      "High in the mountains of Ha Giang, Nguyen Van Duc continues a tradition...",
    author: "VietRoot Team",
    date: "2024-03-10",
    category: "farmers",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Farmers", "Honey", "Ha Giang"],
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Turmeric: The Golden Root of Wellness",
    excerpt:
      "Explore the incredible health benefits of Vietnamese turmeric and how to incorporate this powerful spice into your daily routine.",
    content:
      "Turmeric has been used in Vietnamese traditional medicine for centuries...",
    author: "Dr. Linh Pham",
    date: "2024-03-08",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1615485499601-773e0eb7f0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Turmeric", "Health", "Wellness"],
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Sustainable Farming: Our Commitment to the Earth",
    excerpt:
      "How VietRoot partners with farmers to promote organic, sustainable agricultural practices that benefit both people and planet.",
    content:
      "Sustainability isn't just a buzzword for us – it's our commitment...",
    author: "Minh Nguyen",
    date: "2024-03-05",
    category: "sustainability",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Sustainability", "Organic", "Farming"],
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "5 Ways to Boost Your Immunity Naturally",
    excerpt:
      "Discover natural ways to strengthen your immune system using traditional Vietnamese herbs and organic products.",
    content:
      "In Vietnamese traditional medicine, prevention is always better than cure...",
    author: "Dr. Linh Pham",
    date: "2024-03-01",
    category: "wellness",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Immunity", "Health", "Natural"],
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "The Story Behind Our Organic Green Tea",
    excerpt:
      "Journey to the tea gardens of Thai Nguyen and meet the farmers who grow our premium organic green tea.",
    content:
      "The misty mountains of Thai Nguyen province are home to some of Vietnam's finest tea...",
    author: "VietRoot Team",
    date: "2024-02-28",
    category: "farmers",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    tags: ["Tea", "Farmers", "Thai Nguyen"],
    readTime: "6 min read",
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

      {/* Search and Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3"
                data-testid="input-search-blog"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? "bg-viet-green-medium text-white"
                      : "text-viet-green-dark border-viet-green-medium hover:bg-viet-green-light"
                  }`}
                  data-testid={`filter-category-${category.id}`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
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
                      {filteredPosts[0].readTime}
                    </span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-bold text-viet-green-dark mb-4"
                    data-testid="featured-post-title"
                  >
                    {filteredPosts[0].title}
                  </h2>

                  <p
                    className="text-gray-700 mb-6 text-lg leading-relaxed"
                    data-testid="featured-post-excerpt"
                  >
                    {filteredPosts[0].excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span data-testid="featured-post-author">
                        {filteredPosts[0].author}
                      </span>
                      <Calendar className="h-4 w-4 ml-4 mr-2" />
                      <span data-testid="featured-post-date">
                        {formatDate(filteredPosts[0].date)}
                      </span>
                    </div>

                    <Button
                      className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
                      data-testid="featured-post-read-more"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
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
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                    data-testid={`blog-post-${post.id}`}
                  >
                    <img
                      src={post.image}
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
                          {post.readTime}
                        </span>
                        <div className="flex gap-1 ml-auto">
                          {post.tags.slice(0, 2).map((tag, index) => (
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
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <User className="h-3 w-3 mr-1" />
                          <span data-testid={`blog-author-${post.id}`}>
                            {post.author}
                          </span>
                          <Calendar className="h-3 w-3 ml-3 mr-1" />
                          <span data-testid={`blog-date-${post.id}`}>
                            {formatDate(post.date)}
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
          )}

          {/* Load More */}
          {filteredPosts.length > 6 && (
            <div className="text-center mt-12">
              <Button
                className="bg-viet-green-dark hover:bg-viet-green-medium text-white px-8 py-3 rounded-lg text-lg font-semibold"
                data-testid="button-load-more-posts"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
