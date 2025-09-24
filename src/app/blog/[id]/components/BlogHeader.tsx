import { memo } from "react";
import { Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogDetail } from "../page";

interface BlogHeaderProps {
  post: BlogDetail;
}

const pickImage = (post: BlogDetail) => {
  return (
    post.image ||
    post.coverImageUrl ||
    post.thumbnailUrl ||
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

export const BlogHeader = memo<BlogHeaderProps>(({ post }) => {
  return (
    <header className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden pt-20">
      {/* Hero Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={pickImage(post)}
          alt={post.title}
          className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          data-testid="img-blog-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex items-end">
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            {post.category && (
              <div className="mb-6">
                <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium capitalize shadow-lg">
                  {post.category}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl"
              data-testid="text-blog-title"
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl leading-relaxed drop-shadow-lg"
                data-testid="text-blog-excerpt"
              >
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">
                  {formatDate(post.createdAt)}
                </span>
              </div>

              {post.readTime && (
                <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">{post.readTime}</span>
                </div>
              )}

              {typeof post.views === "number" && (
                <div className="flex items-center gap-2 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Eye className="h-5 w-5" />
                  <span className="font-medium">
                    {post.views.toLocaleString()} views
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </header>
  );
});

BlogHeader.displayName = "BlogHeader";
