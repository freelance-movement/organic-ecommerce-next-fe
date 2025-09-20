"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Heart,
  ChevronRight,
  Tag,
  Clock,
  Eye,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";

type BlogDetail = {
  id: string;
  title: string;
  excerpt?: string;
  content?: string | any; // HTML or Tiptap JSON
  author?: string;
  authorBio?: string;
  authorImage?: string;
  image?: string;
  coverImageUrl?: string | null;
  thumbnailUrl?: string | null;
  readTime?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  publishedAt?: string | null;
};

type RelatedBlog = {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  coverImageUrl?: string | null;
  thumbnailUrl?: string | null;
  category?: string;
  readTime?: string;
  createdAt?: string;
};

export default function BlogDetail() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [related, setRelated] = useState<RelatedBlog[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail(id: string) {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/v1/blogs/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        const data = await res.json();
        if (isMounted) setPost(data);
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load blog");
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

  useEffect(() => {
    let isMounted = true;
    async function fetchRelated() {
      if (!post) return;
      try {
        setRelatedLoading(true);
        setRelatedError(null);
        const params = new URLSearchParams({
          page: "1",
          limit: "6",
          sortBy: "createdAt",
          sortOrder: "DESC",
          published: "true",
        });
        // Prefer first tag; otherwise author; else no search
        const tag = post.tags && post.tags.length ? post.tags[0] : "";
        if (tag) params.set("search", tag);
        else if (post.author) params.set("author", post.author);
        const res = await fetch(`/api/v1/blogs?${params.toString()}`, {
          credentials: "include",
        });
        if (!res.ok) {
          const text = (await res.text()) || res.statusText;
          throw new Error(`${res.status}: ${text}`);
        }
        const data = await res.json();
        let items: RelatedBlog[] = data?.items || data?.data || [];
        // Exclude current post and cap to 3
        items = items
          .filter((b: any) => String(b.id) !== String(post.id))
          .slice(0, 3);
        if (isMounted) setRelated(items);
      } catch (e: any) {
        if (isMounted)
          setRelatedError(e?.message || "Failed to load related blogs");
      } finally {
        if (isMounted) setRelatedLoading(false);
      }
    }
    fetchRelated();
    return () => {
      isMounted = false;
    };
  }, [
    post?.id,
    post?.author,
    Array.isArray(post?.tags) ? post?.tags.join(",") : "",
  ]);

  if (!params.id) {
    return <div>Blog post not found</div>;
  }

  const handleShare = (platform: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = post?.title || "Check out this article!";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`
        );
        break;
    }
  };

  const pickImage = (
    p?: {
      image?: string;
      coverImageUrl?: string | null;
      thumbnailUrl?: string | null;
    } | null
  ) => {
    if (!p) return "";
    return (
      p.image ||
      p.coverImageUrl ||
      p.thumbnailUrl ||
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return String(dateString);
    }
  };

  // Parse tiptap/prosemirror JSON content into JSX
  function tryParseJSON(input: unknown): any | null {
    if (typeof input === "object" && input !== null) return input as any;
    if (typeof input !== "string") return null;
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  }

  function renderNode(node: any, key?: number) {
    if (!node) return null;
    switch (node.type) {
      case "paragraph": {
        const align = node.attrs?.textAlign as string | null | undefined;
        const style = align ? { textAlign: align as any } : undefined;
        return (
          <p key={key} style={style}>
            {(node.content || []).map((child: any, i: number) =>
              renderNode(child, i)
            )}
          </p>
        );
      }
      case "text": {
        return <span key={key}>{node.text}</span>;
      }
      case "image": {
        const { src, alt, title, width, height } = node.attrs || {};
        const style: any = {};
        if (width) style.width = width;
        if (height) style.height = height;
        return (
          <figure key={key} style={{ margin: "1rem 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || ""}
              title={title || undefined}
              style={style}
            />
            {alt ? (
              <figcaption style={{ fontSize: 12, color: "#6b7280" }}>
                {alt}
              </figcaption>
            ) : null}
          </figure>
        );
      }
      case "doc": {
        return (node.content || []).map((child: any, i: number) =>
          renderNode(child, i)
        );
      }
      default:
        return null;
    }
  }

  function renderContent(content?: string | any) {
    const json = tryParseJSON(content as any);
    if (json && json.type === "doc") {
      return <div>{renderNode(json)}</div>;
    }
    if (typeof content === "string") {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="article-content"
          data-testid="text-blog-content"
        />
      );
    }
    return <p className="text-gray-700">No content</p>;
  }

  return (
    <div className="min-h-screen bg-[#e6f5dc]">
      <Navigation variant="fixed" />

      {/* Loading / Error */}
      {loading ? (
        <section className="pt-20 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg h-96 animate-pulse" />
          </div>
        </section>
      ) : error ? (
        <section className="pt-20 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-600">
            {error}
          </div>
        </section>
      ) : !post ? (
        <section className="pt-20 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            Not found
          </div>
        </section>
      ) : (
        <>
          {/* Hero Image */}
          <section className="relative h-96 md:h-[500px] overflow-hidden pt-20">
            <img
              src={pickImage(post)}
              alt={post.title}
              className="w-full h-full object-cover"
              data-testid="img-blog-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Category Badge */}
            {post.category && (
              <div className="absolute top-8 left-8">
                <Badge className="bg-viet-green-dark text-white px-4 py-2 text-sm font-medium capitalize">
                  {post.category}
                </Badge>
              </div>
            )}

            {/* Article Meta */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h1
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                data-testid="text-blog-title"
              >
                {post.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-200 mb-6 max-w-4xl"
                data-testid="text-blog-excerpt"
              >
                {post.excerpt || ""}
              </p>

              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{post.readTime}</span>
                  </div>
                )}
                {typeof post.views === "number" && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Content */}
              <div>
                {/* Author Info */}
                {(post.author || post.authorBio || post.authorImage) && (
                  <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg mb-8">
                    {post.authorImage && (
                      <img
                        src={post.authorImage}
                        alt={post.author || "Author"}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {post.author || ""}
                      </h3>
                      {post.authorBio && (
                        <p className="text-gray-600 text-sm">
                          {post.authorBio}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        {post.createdAt && (
                          <span>Published {formatDate(post.createdAt)}</span>
                        )}
                        {post.updatedAt &&
                          post.updatedAt !== post.createdAt && (
                            <span>• Updated {formatDate(post.updatedAt)}</span>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none"
                  data-testid="text-blog-content"
                >
                  {renderContent(post.content)}
                </div>

                {/* Tags */}
                {!!(post.tags && post.tags.length) && (
                  <div className="mt-12 p-6 bg-viet-green-light/20 rounded-2xl">
                    <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags!.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-viet-green-dark text-white"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share & Like */}
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => setIsLiked(!isLiked)}
                        variant={isLiked ? "default" : "outline"}
                        className={`${
                          isLiked
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : ""
                        }`}
                        data-testid="button-like-post"
                      >
                        <Heart
                          className={`h-5 w-5 mr-2 ${
                            isLiked ? "fill-current" : ""
                          }`}
                        />
                        {(post.likes || 0) + (isLiked ? 1 : 0)} Likes
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 mr-2">Share:</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare("facebook")}
                        className="p-2"
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare("twitter")}
                        className="p-2"
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare("linkedin")}
                        className="p-2"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Related Articles
              </h2>

              {relatedLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg h-72 animate-pulse"
                    />
                  ))}
                </div>
              ) : relatedError ? (
                <div className="text-center text-red-600">{relatedError}</div>
              ) : related.length === 0 ? (
                <div className="text-center text-gray-600">
                  No related articles
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {related.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                      <article className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={pickImage(relatedPost)}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            {relatedPost.category && (
                              <Badge
                                variant="secondary"
                                className="bg-viet-green-light text-viet-green-dark capitalize"
                              >
                                {relatedPost.category}
                              </Badge>
                            )}
                            {relatedPost.readTime && (
                              <span className="text-sm text-gray-500">
                                {relatedPost.readTime}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          {relatedPost.excerpt && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {relatedPost.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(relatedPost.createdAt)}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
