# Product Description Component

This component renders rich HTML content from the Lexical editor used in the admin panel for product descriptions.

## Usage

```tsx
import ProductDescription from "./components/ProductDescription";

// In your component
<ProductDescription 
  content={product.description} 
  className="custom-styling"
/>
```

## Features

- **Rich Text Support**: Renders HTML content with proper styling
- **Lexical Editor Classes**: Supports all editor classes from admin panel
- **Responsive Design**: Mobile-friendly styling
- **Consistent Styling**: Matches blog content styling patterns

## Supported Elements

- Headings (H1-H6)
- Paragraphs
- Text formatting (bold, italic, underline, strikethrough)
- Lists (ordered and unordered)
- Links
- Images
- Code blocks
- Blockquotes
- Tables

## Styling

The component uses CSS classes that match the Lexical editor output:
- `.editor-paragraph`
- `.editor-text-bold`
- `.editor-text-italic`
- `.editor-heading-h1` through `.editor-heading-h6`
- `.editor-list-ul`, `.editor-list-ol`
- `.editor-listitem`
- And more...

## Security

The component uses `dangerouslySetInnerHTML` to render HTML content. Ensure that the content comes from trusted sources (your admin panel) and consider implementing additional sanitization if needed.