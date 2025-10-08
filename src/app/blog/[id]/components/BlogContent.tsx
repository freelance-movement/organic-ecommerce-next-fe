import { memo, useCallback, useMemo } from "react";
import "../blog-scroll.css";

interface BlogContentProps {
  content?: string | any;
  enableScrolling?: boolean;
  maxHeight?: string;
}

// Parse tiptap/prosemirror JSON content
const tryParseJSON = (input: unknown): any | null => {
  if (typeof input === "object" && input !== null) return input as any;
  if (typeof input !== "string") return null;
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
};

// Memoized render node function for better performance
const useRenderNode = () => {
  return useCallback((node: any, key?: number): React.ReactNode => {
    if (!node) return null;

    switch (node.type) {
      case "doc": {
        return (node.content || []).map((child: any, i: number) =>
          renderNodeImpl(child, i)
        );
      }

      case "paragraph": {
        const align = node.attrs?.textAlign;
        const style = align ? { textAlign: align } : undefined;
        return (
          <p
            key={key}
            style={style}
            className="mb-6 leading-8 text-gray-700 text-lg"
          >
            {(node.content || []).map((child: any, i: number) =>
              renderNodeImpl(child, i)
            )}
          </p>
        );
      }

      case "heading": {
        const level = node.attrs?.level || 1;
        const align = node.attrs?.textAlign;
        const style = align ? { textAlign: align } : undefined;
        const content = (node.content || []).map((child: any, i: number) =>
          renderNodeImpl(child, i)
        );

        const headingClasses = {
          1: "text-4xl font-bold mb-8 mt-12 text-gray-900 leading-tight",
          2: "text-3xl font-bold mb-7 mt-10 text-gray-900 leading-tight",
          3: "text-2xl font-bold mb-6 mt-8 text-gray-900 leading-snug",
          4: "text-xl font-bold mb-5 mt-7 text-gray-900 leading-snug",
          5: "text-lg font-bold mb-4 mt-6 text-gray-900",
          6: "text-base font-bold mb-3 mt-5 text-gray-900",
        };

        const className = headingClasses[level as keyof typeof headingClasses];

        switch (level) {
          case 1:
            return (
              <h1 key={key} style={style} className={className}>
                {content}
              </h1>
            );
          case 2:
            return (
              <h2 key={key} style={style} className={className}>
                {content}
              </h2>
            );
          case 3:
            return (
              <h3 key={key} style={style} className={className}>
                {content}
              </h3>
            );
          case 4:
            return (
              <h4 key={key} style={style} className={className}>
                {content}
              </h4>
            );
          case 5:
            return (
              <h5 key={key} style={style} className={className}>
                {content}
              </h5>
            );
          case 6:
            return (
              <h6 key={key} style={style} className={className}>
                {content}
              </h6>
            );
          default:
            return (
              <h3 key={key} style={style} className={className}>
                {content}
              </h3>
            );
        }
      }

      case "text": {
        let element: React.ReactNode = node.text || "";
        const marks = node.marks || [];

        // Apply text formatting marks
        for (const mark of marks) {
          switch (mark.type) {
            case "bold":
              element = (
                <strong className="font-semibold text-gray-900">
                  {element}
                </strong>
              );
              break;
            case "italic":
              element = <em className="italic text-gray-700">{element}</em>;
              break;
            case "code":
              element = (
                <code className="bg-gray-100 text-red-600 px-2 py-1 rounded-md text-sm font-mono border">
                  {element}
                </code>
              );
              break;
            case "link":
              element = (
                <a
                  href={mark.attrs?.href}
                  target={mark.attrs?.target || "_blank"}
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 underline decoration-2 underline-offset-2 transition-colors"
                >
                  {element}
                </a>
              );
              break;
            case "strike":
              element = (
                <del className="line-through text-gray-500">{element}</del>
              );
              break;
            case "underline":
              element = <u className="underline decoration-2">{element}</u>;
              break;
          }
        }

        return <span key={key}>{element}</span>;
      }

      case "image": {
        const { src, alt, title, width, height } = node.attrs || {};
        let imageSrc = src;

        // Fix image URLs
        if (imageSrc) {
          imageSrc = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}${imageSrc}`;
        }

        const imageStyle: React.CSSProperties = {
          maxWidth: "100%",
          height: "auto",
          borderRadius: "1rem",
          margin: "3rem auto",
          display: "block",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        };

        if (width) imageStyle.width = width;
        if (height) imageStyle.height = height;

        return (
          <figure key={key} className="my-12 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={alt || ""}
              title={title || undefined}
              style={imageStyle}
              loading="lazy"
              className="transition-transform duration-300 hover:scale-105"
            />
            {(alt || title) && (
              <figcaption className="mt-4 text-sm text-gray-600 italic font-medium">
                {alt || title}
              </figcaption>
            )}
          </figure>
        );
      }

      case "bulletList": {
        return (
          <ul key={key} className="list-none mb-8 space-y-3 ml-0">
            {(node.content || []).map((child: any, i: number) =>
              renderNodeImpl(child, i)
            )}
          </ul>
        );
      }

      case "orderedList": {
        const start = node.attrs?.start || 1;
        return (
          <ol
            key={key}
            start={start}
            className="list-decimal list-inside mb-8 space-y-3 ml-6 marker:text-green-600 marker:font-semibold"
          >
            {(node.content || []).map((child: any, i: number) =>
              renderNodeImpl(child, i)
            )}
          </ol>
        );
      }

      case "listItem": {
        return (
          <li key={key} className="relative leading-relaxed text-gray-700 pl-6">
            <span className="absolute left-0 top-2 w-2 h-2 bg-green-500 rounded-full"></span>
            {(node.content || []).map((child: any, i: number) => {
              // For list items, render paragraphs without margin
              if (child.type === "paragraph") {
                return (
                  <span key={i} className="block">
                    {(child.content || []).map((grandChild: any, j: number) =>
                      renderNodeImpl(grandChild, j)
                    )}
                  </span>
                );
              }
              return renderNodeImpl(child, i);
            })}
          </li>
        );
      }

      case "blockquote": {
        return (
          <blockquote
            key={key}
            className="border-l-4 border-green-500 pl-8 py-6 my-8 bg-green-50 italic text-gray-700 text-lg rounded-r-lg"
          >
            {(node.content || []).map((child: any, i: number) =>
              renderNodeImpl(child, i)
            )}
          </blockquote>
        );
      }

      case "codeBlock": {
        const language = node.attrs?.language || "";
        const content = (node.content || [])
          .map((child: any) => child.text || "")
          .join("");

        return (
          <div key={key} className="my-8">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto border shadow-lg">
              <code className={language ? `language-${language}` : ""}>
                {content}
              </code>
            </pre>
          </div>
        );
      }

      case "hardBreak": {
        return <br key={key} />;
      }

      case "horizontalRule": {
        return (
          <hr
            key={key}
            className="border-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"
          />
        );
      }

      default: {
        // For unknown node types, try to render their content if available
        if (node.content && Array.isArray(node.content)) {
          return (
            <div key={key} className="unknown-node">
              {node.content.map((child: any, i: number) =>
                renderNodeImpl(child, i)
              )}
            </div>
          );
        }

        console.warn("Unknown node type:", node.type, node);
        return null;
      }
    }
  }, []);
};

// Actual render function (needs to be outside the hook)
const renderNodeImpl = (node: any, key?: number): React.ReactNode => {
  if (!node) return null;

  switch (node.type) {
    case "doc": {
      return (node.content || []).map((child: any, i: number) =>
        renderNodeImpl(child, i)
      );
    }

    case "paragraph": {
      const align = node.attrs?.textAlign;
      const style = align ? { textAlign: align } : undefined;
      return (
        <p
          key={key}
          style={style}
          className="mb-6 leading-8 text-gray-700 text-lg"
        >
          {(node.content || []).map((child: any, i: number) =>
            renderNodeImpl(child, i)
          )}
        </p>
      );
    }

    case "heading": {
      const level = node.attrs?.level || 1;
      const align = node.attrs?.textAlign;
      const style = align ? { textAlign: align } : undefined;
      const content = (node.content || []).map((child: any, i: number) =>
        renderNodeImpl(child, i)
      );

      const headingClasses = {
        1: "text-4xl font-bold mb-8 mt-12 text-gray-900 leading-tight",
        2: "text-3xl font-bold mb-7 mt-10 text-gray-900 leading-tight",
        3: "text-2xl font-bold mb-6 mt-8 text-gray-900 leading-snug",
        4: "text-xl font-bold mb-5 mt-7 text-gray-900 leading-snug",
        5: "text-lg font-bold mb-4 mt-6 text-gray-900",
        6: "text-base font-bold mb-3 mt-5 text-gray-900",
      };

      const className = headingClasses[level as keyof typeof headingClasses];

      switch (level) {
        case 1:
          return (
            <h1 key={key} style={style} className={className}>
              {content}
            </h1>
          );
        case 2:
          return (
            <h2 key={key} style={style} className={className}>
              {content}
            </h2>
          );
        case 3:
          return (
            <h3 key={key} style={style} className={className}>
              {content}
            </h3>
          );
        case 4:
          return (
            <h4 key={key} style={style} className={className}>
              {content}
            </h4>
          );
        case 5:
          return (
            <h5 key={key} style={style} className={className}>
              {content}
            </h5>
          );
        case 6:
          return (
            <h6 key={key} style={style} className={className}>
              {content}
            </h6>
          );
        default:
          return (
            <h3 key={key} style={style} className={className}>
              {content}
            </h3>
          );
      }
    }

    case "text": {
      let element: React.ReactNode = node.text || "";
      const marks = node.marks || [];

      // Apply text formatting marks
      for (const mark of marks) {
        switch (mark.type) {
          case "bold":
            element = (
              <strong className="font-semibold text-gray-900">{element}</strong>
            );
            break;
          case "italic":
            element = <em className="italic text-gray-700">{element}</em>;
            break;
          case "code":
            element = (
              <code className="bg-gray-100 text-red-600 px-2 py-1 rounded-md text-sm font-mono border">
                {element}
              </code>
            );
            break;
          case "link":
            element = (
              <a
                href={mark.attrs?.href}
                target={mark.attrs?.target || "_blank"}
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 underline decoration-2 underline-offset-2 transition-colors"
              >
                {element}
              </a>
            );
            break;
          case "strike":
            element = (
              <del className="line-through text-gray-500">{element}</del>
            );
            break;
          case "underline":
            element = <u className="underline decoration-2">{element}</u>;
            break;
        }
      }

      return <span key={key}>{element}</span>;
    }

    case "image": {
      const { src, alt, title, width, height } = node.attrs || {};
      let imageSrc = src;

      // Fix image URLs
      if (imageSrc) {
        imageSrc = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}${imageSrc}`;
      }

      const imageStyle: React.CSSProperties = {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "1rem",
        margin: "3rem auto",
        display: "block",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      };

      if (width) imageStyle.width = width;
      if (height) imageStyle.height = height;

      return (
        <figure key={key} className="my-12 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={alt || ""}
            title={title || undefined}
            style={imageStyle}
            loading="lazy"
            className="transition-transform duration-300 hover:scale-105"
          />
          {(alt || title) && (
            <figcaption className="mt-4 text-sm text-gray-600 italic font-medium">
              {alt || title}
            </figcaption>
          )}
        </figure>
      );
    }

    case "bulletList": {
      return (
        <ul key={key} className="list-none mb-8 space-y-3 ml-0">
          {(node.content || []).map((child: any, i: number) =>
            renderNodeImpl(child, i)
          )}
        </ul>
      );
    }

    case "orderedList": {
      const start = node.attrs?.start || 1;
      return (
        <ol
          key={key}
          start={start}
          className="list-decimal list-inside mb-8 space-y-3 ml-6 marker:text-green-600 marker:font-semibold"
        >
          {(node.content || []).map((child: any, i: number) =>
            renderNodeImpl(child, i)
          )}
        </ol>
      );
    }

    case "listItem": {
      return (
        <li key={key} className="relative leading-relaxed text-gray-700 pl-6">
          <span className="absolute left-0 top-2 w-2 h-2  rounded-full"></span>
          {(node.content || []).map((child: any, i: number) => {
            // For list items, render paragraphs without margin
            if (child.type === "paragraph") {
              return (
                <span key={i} className="block">
                  {(child.content || []).map((grandChild: any, j: number) =>
                    renderNodeImpl(grandChild, j)
                  )}
                </span>
              );
            }
            return renderNodeImpl(child, i);
          })}
        </li>
      );
    }

    case "blockquote": {
      return (
        <blockquote
          key={key}
          className="border-l-4 border-green-500 pl-8 py-6 my-8 bg-green-50 italic text-gray-700 text-lg rounded-r-lg"
        >
          {(node.content || []).map((child: any, i: number) =>
            renderNodeImpl(child, i)
          )}
        </blockquote>
      );
    }

    case "codeBlock": {
      const language = node.attrs?.language || "";
      const content = (node.content || [])
        .map((child: any) => child.text || "")
        .join("");

      return (
        <div key={key} className="my-8">
          <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto border shadow-lg">
            <code className={language ? `language-${language}` : ""}>
              {content}
            </code>
          </pre>
        </div>
      );
    }

    case "hardBreak": {
      return <br key={key} />;
    }

    case "horizontalRule": {
      return (
        <hr
          key={key}
          className="border-0 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12"
        />
      );
    }

    default: {
      // For unknown node types, try to render their content if available
      if (node.content && Array.isArray(node.content)) {
        return (
          <div key={key} className="unknown-node">
            {node.content.map((child: any, i: number) =>
              renderNodeImpl(child, i)
            )}
          </div>
        );
      }

      console.warn("Unknown node type:", node.type, node);
      return null;
    }
  }
};

// Main render content function
const renderContent = (content?: string | any): React.ReactNode => {
  // Handle empty or null content
  if (!content) {
    return <p className="text-gray-500 italic">No content available</p>;
  }

  // Try to parse content as JSON (Tiptap format)
  const json = tryParseJSON(content);

  if (json && json.type === "doc") {
    try {
      return <div className="tiptap-content">{renderNodeImpl(json)}</div>;
    } catch (error) {
      console.error("Error rendering Tiptap content:", error);
      console.error("Content that failed:", json);

      // Fallback to string rendering if available
      if (typeof content === "string") {
        return (
          <div className="fallback-content">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Content rendering issue. Showing raw content.
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="article-content"
            />
          </div>
        );
      }

      return (
        <div className="error-content">
          <p className="text-red-600">Error rendering content</p>
        </div>
      );
    }
  }

  // If content is already HTML string
  if (typeof content === "string") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="article-content prose prose-lg max-w-none"
        data-testid="text-blog-content"
      />
    );
  }

  // Final fallback
  return <p className="text-gray-500">Unsupported content format</p>;
};

export const BlogContent = memo<BlogContentProps>(
  ({ content, enableScrolling = false, maxHeight = "100vh" }) => {
    // Analyze content length to determine if scrolling should be enabled
    const isLongContent = useMemo(() => {
      if (!content) return false;

      const json = tryParseJSON(content);
      let textContent = "";

      if (json && json.type === "doc") {
        const extractText = (node: any): string => {
          if (node.type === "text") {
            return node.text || "";
          }
          if (node.content && Array.isArray(node.content)) {
            return node.content.map(extractText).join(" ");
          }
          return "";
        };
        textContent = extractText(json);
      } else if (typeof content === "string") {
        // Remove HTML tags for text length
        textContent = content.replace(/<[^>]*>/g, "");
      }

      // Check by text length instead of word count
      const textLength = textContent.trim().length;
      return textLength > 5000; // Consider long if content > 5000 characters
    }, [content]);

    const renderedContent = (
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 prose-strong:text-gray-900"
        data-testid="text-blog-content"
      >
        {renderContent(content)}
      </div>
    );

    // For long content or when explicitly enabled, use scrollable container
    // if (enableScrolling || isLongContent) {
    if (enableScrolling) {
      return (
        <div className="py-8">
          {/* Scrollable content container */}
          <div
            className="blog-content-scroll overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-sm"
            style={{ maxHeight }}
          >
            <div className="p-6">
              {renderedContent}

              {/* End indicator */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  ✅ <span>You've reached the end</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="py-8">{renderedContent}</div>;

    // For normal content, use regular rendering
  }
);

BlogContent.displayName = "BlogContent";
