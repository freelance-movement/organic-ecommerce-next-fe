import { memo } from "react";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TagSectionProps {
  tags: string[];
}

export const TagSection = memo<TagSectionProps>(({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
      <div className="flex items-center gap-3 mb-4">
        <Tag className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-gray-900 text-lg">Tags</h4>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag: string, index: number) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
          >
            <Tag className="h-3 w-3 mr-2" />
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
});

TagSection.displayName = "TagSection";
