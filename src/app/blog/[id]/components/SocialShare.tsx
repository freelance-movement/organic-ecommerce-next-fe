import { memo } from "react";
import { Heart, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  onShare: (platform: string) => void;
}

export const SocialShare = memo<SocialShareProps>(
  ({ isLiked, likesCount, onLike, onShare }) => {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Like Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onLike}
              variant={isLiked ? "default" : "outline"}
              size="lg"
              className={`${
                isLiked
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  : "border-red-300 text-red-600 hover:bg-red-50"
              } transition-all duration-200`}
              data-testid="button-like-post"
            >
              <Heart
                className={`h-5 w-5 mr-2 transition-transform ${
                  isLiked ? "fill-current scale-110" : ""
                }`}
              />
              {likesCount + (isLiked ? 1 : 0)}{" "}
              {likesCount + (isLiked ? 1 : 0) === 1 ? "Like" : "Likes"}
            </Button>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Share2 className="h-4 w-4" />
              <span className="font-medium">Share:</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onShare("facebook")}
                className="p-3 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onShare("twitter")}
                className="p-3 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onShare("linkedin")}
                className="p-3 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SocialShare.displayName = "SocialShare";
