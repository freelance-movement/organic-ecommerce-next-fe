import { memo } from "react";
import "../product-description.css";

interface ProductDescriptionProps {
  content?: string;
  className?: string;
}

const ProductDescription = memo(function ProductDescription({
  content,
  className = "",
}: ProductDescriptionProps) {
  if (!content) {
    return (
      <div className={`text-gray-500 italic ${className}`}>
        No description available.
      </div>
    );
  }

  // Clean and sanitize HTML content
  const sanitizedContent = content.trim();

  return (
    <div
      className={`product-description-content prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
});

export default ProductDescription;