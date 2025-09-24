import { memo } from "react";
import { User, Calendar, Edit } from "lucide-react";
import { BlogDetail } from "../page";

interface AuthorCardProps {
  post: BlogDetail;
}

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

export const AuthorCard = memo<AuthorCardProps>(({ post }) => {
  const hasAuthorInfo = post.author || post.authorBio || post.authorImage;

  if (!hasAuthorInfo) return null;

  return (
    <div className="px-6 sm:px-8 lg:px-12 pt-8 pb-4">
      <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          {post.authorImage ? (
            <img
              src={post.authorImage}
              alt={post.author || "Author"}
              className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {post.author || "Anonymous Author"}
          </h3>

          {post.authorBio && (
            <p className="text-gray-600 text-base mb-3 leading-relaxed">
              {post.authorBio}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Published {formatDate(post.createdAt)}</span>
              </div>
            )}

            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <div className="flex items-center gap-1">
                <Edit className="w-4 h-4" />
                <span>Updated {formatDate(post.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

AuthorCard.displayName = "AuthorCard";
