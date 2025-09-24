import { memo } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RelatedBlog } from "../page";

interface RelatedArticlesProps {
  articles: RelatedBlog[];
  loading: boolean;
  error: string | null;
}

const pickImage = (post: RelatedBlog) => {
  return (
    post.image ||
    post.coverImageUrl ||
    post.thumbnailUrl ||
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  );
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return String(dateString);
  }
};

const LoadingSkeleton = memo(() => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
    <div className="aspect-[4/3] bg-gray-200"></div>
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
));

LoadingSkeleton.displayName = "LoadingSkeleton";

export const RelatedArticles = memo<RelatedArticlesProps>(
  ({ articles, loading, error }) => {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Related Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover more insights and stories that might interest you
            </p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                <p className="text-gray-600 font-medium">
                  No related articles found
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Check back later for more content
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug || article.id}`}
                >
                  <article className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={pickImage(article)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        {article.category && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                          >
                            {article.category}
                          </Badge>
                        )}
                        {article.readTime && (
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{article.readTime}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-1 text-green-600 group-hover:gap-2 transition-all">
                          <span className="text-sm font-medium">Read more</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

RelatedArticles.displayName = "RelatedArticles";
