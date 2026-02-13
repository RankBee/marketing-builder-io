// Shared CSS styles for Knowledge Base article content
// Used by both pages/knowledge-base/index.tsx and pages/knowledge-base/[id].tsx

export const kbArticleStyles = `
  .kb-article-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #111827;
    line-height: 1.2;
  }

  .kb-article-content h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: #111827;
    line-height: 1.2;
  }

  .kb-article-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: #1f2937;
  }

  .kb-article-content p {
    margin-bottom: 1.25rem;
    line-height: 1.8;
    color: #374151;
    font-size: 1.125rem;
  }

  .kb-article-content ul,
  .kb-article-content ol {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .kb-article-content ul {
    list-style-type: disc;
  }

  .kb-article-content ol {
    list-style-type: decimal;
  }

  .kb-article-content li {
    margin-bottom: 0.625rem;
    color: #374151;
    line-height: 1.8;
    font-size: 1.125rem;
  }

  .kb-article-content strong,
  .kb-article-content b {
    font-weight: 600;
    color: #111827;
  }

  .kb-article-content a {
    color: #2563eb;
    text-decoration: none;
  }

  .kb-article-content a:hover {
    text-decoration: underline;
  }

  .kb-article-content .article-link {
    color: #2563eb;
    text-decoration: none;
    background: #ede9fe;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .kb-article-content .article-link:hover {
    background: #ddd6fe;
    text-decoration: none;
  }

  .kb-article-content .ce-article-link {
    color: #2563eb;
    text-decoration: none;
    background: #ede9fe;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .kb-article-content .ce-article-link:hover {
    background: #ddd6fe;
    text-decoration: none;
  }

  .kb-article-content blockquote {
    border-left: 4px solid #7c3aed !important;
    background: #f5f3ff !important;
    margin: 2rem 0 !important;
    padding: 1.5rem 1.75rem 1.5rem 1.75rem !important;
    border-radius: 0 0.75rem 0.75rem 0 !important;
    font-style: italic !important;
    color: #4b5563 !important;
    position: relative;
    quotes: none !important;
  }

  .kb-article-content blockquote::before {
    content: "\\201C";
    font-size: 3rem;
    line-height: 1;
    color: #7c3aed;
    opacity: 0.3;
    position: absolute;
    top: 0.25rem;
    left: 0.5rem;
    font-style: normal;
  }

  .kb-article-content blockquote p {
    margin-bottom: 0.5rem !important;
    color: #4b5563 !important;
    padding-left: 1.5rem;
  }

  .kb-article-content blockquote p:last-child {
    margin-bottom: 0 !important;
  }

  .kb-article-content img {
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
  }

  .kb-article-content .video-timestamp {
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  }
`;
