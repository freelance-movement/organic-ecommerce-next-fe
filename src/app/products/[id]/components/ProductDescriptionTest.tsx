import ProductDescription from "./ProductDescription";

export default function ProductDescriptionTest() {
  const testContent = `<p class="editor-paragraph"><b><strong class="editor-text-bold" style="white-space: pre-wrap;">Bold text example</strong></b></p>
<p class="editor-paragraph">This is a regular paragraph with some content.</p>
<h2 class="editor-heading-h2">This is a heading</h2>
<p class="editor-paragraph">Another paragraph with <em class="editor-text-italic">italic text</em> and <u class="editor-text-underline">underlined text</u>.</p>
<ul class="editor-list-ul">
  <li class="editor-listitem">First list item</li>
  <li class="editor-listitem">Second list item</li>
  <li class="editor-listitem">Third list item</li>
</ul>`;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Product Description Test</h1>
      
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Rendered Description:</h2>
        <ProductDescription content={testContent} />
      </div>

      <div className="mt-8 border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Raw HTML:</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {testContent}
        </pre>
      </div>
    </div>
  );
}