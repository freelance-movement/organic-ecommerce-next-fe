"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BlogHeader } from "./components/BlogHeader";
import { BlogContent } from "./components/BlogContent";
import { AuthorCard } from "./components/AuthorCard";

import { SocialShare } from "./components/SocialShare";
import { RelatedArticles } from "./components/RelatedArticles";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { ReadingProgress } from "./components/ReadingProgress";

// Types
export type BlogDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string | any;
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

export type RelatedBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  coverImageUrl?: string | null;
  thumbnailUrl?: string | null;
  category?: string;
  readTime?: string;
  createdAt?: string;
};

// Custom hook for blog data
const useBlogData = (identifier: string | undefined) => {
  const [post, setPost] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier) return;

    let isMounted = true;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determine if identifier is UUID (ID) or slug
        const isUUID =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            identifier
          );
        const endpoint = isUUID
          ? `/api/v1/blogs/${identifier}`
          : `/api/v1/blogs/slug/${identifier}`;

        const res = await fetch(endpoint, {
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
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [identifier]);

  return { post, loading, error };
};

// Custom hook for related blogs
const useRelatedBlogs = (post: BlogDetail | null) => {
  const [related, setRelated] = useState<RelatedBlog[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);

  const searchParams = useMemo(() => {
    if (!post) return null;

    const params = new URLSearchParams({
      page: "1",
      limit: "6",
      sortBy: "createdAt",
      sortOrder: "DESC",
      published: "true",
    });

    // Prefer first tag; otherwise author; else no search
    const tag = post.tags && post.tags.length ? post.tags[0] : "";
    if (tag) {
      params.set("search", tag);
    } else if (post.author) {
      params.set("author", post.author);
    }

    return params;
  }, [post?.tags, post?.author]);

  useEffect(() => {
    if (!post || !searchParams) return;

    let isMounted = true;

    const fetchRelated = async () => {
      try {
        setRelatedLoading(true);
        setRelatedError(null);

        const res = await fetch(`/api/v1/blogs?${searchParams.toString()}`, {
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
        if (isMounted) {
          setRelatedError(e?.message || "Failed to load related blogs");
        }
      } finally {
        if (isMounted) setRelatedLoading(false);
      }
    };

    fetchRelated();

    return () => {
      isMounted = false;
    };
  }, [post?.id, searchParams]);

  return { related, relatedLoading, relatedError };
};

// Main component
const BlogDetail = memo(() => {
  const params = useParams();
  const identifier = params.id as string | undefined; // Can be either ID or slug
  const [isLiked, setIsLiked] = useState(false);

  const { post, loading, error } = useBlogData(identifier);
  const { related, relatedLoading, relatedError } = useRelatedBlogs(post);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const handleShare = useCallback(
    (platform: string) => {
      if (typeof window === "undefined") return;

      const url = window.location.href;
      const title = post?.title || "Check out this article!";

      const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
      };

      const shareUrl = shareUrls[platform as keyof typeof shareUrls];
      if (shareUrl) {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    },
    [post?.title]
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <Navigation variant="fixed" />
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
        <Navigation variant="fixed" />
        <ErrorMessage message={error || "Blog post not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navigation variant="fixed" />

      {/* Reading Progress */}
      <ReadingProgress />

      {/* Blog Header with Hero Image */}
      <BlogHeader post={post} />

      {/* Main Content */}
      <main className="relative -mt-6  z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Author Info */}
            <AuthorCard post={post} />

            {/* Article Content */}
            <article className="px-6 sm:px-8 lg:px-12 pb-8">
              <BlogContent
                content={post.content}
                enableScrolling={false}
                maxHeight="100vh"
              />
            </article>

            {/* Social Share & Like */}
            <div className="px-6 sm:px-8 lg:px-12 pb-8">
              <SocialShare
                isLiked={isLiked}
                likesCount={post.likes || 0}
                onLike={handleLike}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      <RelatedArticles
        articles={related}
        loading={relatedLoading}
        error={relatedError}
      />

      <Footer />
    </div>
  );
});

BlogDetail.displayName = "BlogDetail";

export default BlogDetail;
