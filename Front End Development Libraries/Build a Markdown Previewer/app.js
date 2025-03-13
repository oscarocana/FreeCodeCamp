// React and Marked CDN imports (add these in CodePen's JS Settings)
// https://unpkg.com/react@17/umd/react.development.js
// https://unpkg.com/react-dom@17/umd/react-dom.development.js
// https://unpkg.com/marked/marked.min.js

// Main App Component
function App() {
  // React hook to manage markdown state
  const [markdown, setMarkdown] = React.useState(`# Markdown Previewer

## Welcome to the Markdown Preview App

This is a simple markdown previewer that allows you to:
- Write markdown in real-time
- See instant HTML rendering
- Inline code representation
- Supports multiple markdown features

### Key Features
1. GitHub based Markdown
2. Live Preview
3. Easy to Use

#### Inline Code exmaple

\`print("hello World!")\`

#### Code block Example
\`\`\`javascript
// Sample Code Block
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

**Bold Text** and *Italic Text*

[Visit FCC Challenge](https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-markdown-previewer)

> Blockquote example

![FCC LOGO](https://upload.wikimedia.org/wikipedia/commons/f/fa/FreeCodeCamp_logo.svg)
`);

  // Configure marked library options
  // Enable GitHub Flavored Markdown and line breaks
  React.useEffect(() => {
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: function(code, lang) {
        // Optional syntax highlighting
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    });
  }, []);

  // Handler for textarea changes
  // Updates markdown state as user types
  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  // Render method with two main sections
  return (
    // Container for entire application
    React.createElement('div', { className: 'container' }, 
      // Editor section (input)
      React.createElement('div', { className: 'editor-wrap' }, 
        React.createElement('h2', null, 'Editor'),
        React.createElement('textarea', {
          id: 'editor',
          value: markdown,
          onChange: handleChange
        })
      ),
      
      // Preview section (output)
      React.createElement('div', { className: 'preview-wrap' }, 
        React.createElement('h2', null, 'Preview'),
        React.createElement('div', {
          id: 'preview',
          // Convert markdown to HTML safely
          dangerouslySetInnerHTML: {
            __html: marked.parse(markdown)
          }
        })
      )
    )
  );
}

// Render the App to the DOM
ReactDOM.render(
  React.createElement(App),
  document.getElementById('app')
);
