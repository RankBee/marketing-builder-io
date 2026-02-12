// Hinto AI Knowledge Base API client
// Server-side only — uses HINTO_API_KEY (no NEXT_PUBLIC_ prefix)

import DOMPurify from 'isomorphic-dompurify';

const HINTO_BASE_URL = 'https://app.hintoai.com/api/external/v1';

function getApiKey(): string {
  const key = process.env.HINTO_API_KEY;
  if (!key) {
    throw new Error('HINTO_API_KEY environment variable is not set');
  }
  return key;
}

function headers(): HeadersInit {
  return {
    'X-API-Key': getApiKey(),
    'Accept': 'application/json',
  };
}

// ─── Types ───────────────────────────────────────────────────────────

export interface HintoArticleStub {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  video_id?: string;
}

export interface HintoFolder {
  id: number;
  name: string;
  articles: HintoArticleStub[];
  children: HintoFolder[];
}

export interface HintoStructure {
  folders: HintoFolder[];
  rootArticles: HintoArticleStub[];
}

export interface HintoArticle {
  id: number;
  title: string;
  folder_id: number;
  folder_name: string;
  created_at: string;
  updated_at: string;
  content: {
    html: string;
    format: string;
  };
}

export interface HintoStructureResponse {
  project: { id: string; name: string; description: string };
  structure: HintoStructure;
}

export interface HintoArticlesResponse {
  project: { id: string; name: string; description: string };
  articles: HintoArticle[];
}

// ─── API Fetchers ────────────────────────────────────────────────────

export async function fetchStructure(): Promise<HintoStructureResponse> {
  const res = await fetch(`${HINTO_BASE_URL}/projects/structure`, { headers: headers() });
  if (!res.ok) {
    throw new Error(`Hinto API /projects/structure failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchAllArticles(): Promise<HintoArticlesResponse> {
  const res = await fetch(`${HINTO_BASE_URL}/projects/articles`, { headers: headers() });
  if (!res.ok) {
    throw new Error(`Hinto API /projects/articles failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchArticle(id: number): Promise<HintoArticle | null> {
  const res = await fetch(`${HINTO_BASE_URL}/projects/articles?id=${id}`, { headers: headers() });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Hinto API /projects/articles?id=${id} failed: ${res.status} ${res.statusText}`);
  }
  const data: HintoArticlesResponse = await res.json();
  // The endpoint returns the full articles array; find the one we need
  const article = data.articles?.find((a) => a.id === id);
  return article || null;
}

// ─── HTML Sanitization ──────────────────────────────────────────────

/**
 * Sanitize HTML from external sources to prevent XSS.
 * Uses DOMPurify for robust sanitization (same library used by blog ArticleDetailPage).
 * Applied server-side in getStaticProps before content reaches the client.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u', 'br', 'hr', 'img', 'video', 'source',
      'div', 'span', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'figure', 'figcaption', 'main', 'section', 'article',
      'nav', 'details', 'summary', 'mark', 'sub', 'sup', 'dl', 'dt', 'dd',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
      'width', 'height', 'style', 'data-article-id', 'loading', 'type',
      'controls', 'autoplay', 'muted', 'loop', 'poster',
    ],
  });
}

// ─── HTML Processing ─────────────────────────────────────────────────

/**
 * Extract only the inner HTML of <main class="article-content"> from the
 * full HTML document returned by Hinto. Strips <html>, <head>, <style>, etc.
 */
export function extractMainContent(fullHtml: string): string {
  // Match content inside <main ...>...</main>
  const mainMatch = fullHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    return mainMatch[1].trim();
  }
  // Fallback: match content inside <body>...</body>
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }
  // Last resort: return as-is
  return fullHtml;
}

/**
 * Extract the first paragraph text from HTML content for use as meta description.
 */
export function extractDescription(html: string): string {
  const content = extractMainContent(html);
  // Remove the H1 first, then grab the first <p>
  const withoutH1 = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
  const pMatch = withoutH1.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) {
    // Strip HTML tags from the paragraph
    const text = pMatch[1].replace(/<[^>]+>/g, '').trim();
    // Truncate to ~160 chars for meta description
    if (text.length > 160) {
      return text.substring(0, 157) + '...';
    }
    return text;
  }
  return 'RankBee Knowledge Base';
}

/**
 * Rewrite internal article links in the HTML content.
 * Transforms href="#article-XXXX" and data-article-id links into
 * proper /knowledge-base/{id} routes.
 * Also rewrites .ce-article-link href="#" with data-article-id attributes.
 */
export function rewriteArticleLinks(
  html: string,
  articleMap: Map<number, { id: number; title: string }>
): string {
  let result = html;

  // Rewrite href="#article-XXXX" links
  result = result.replace(
    /href="#article-(\d+)"/g,
    (_match, articleId) => {
      const id = parseInt(articleId, 10);
      if (articleMap.has(id)) {
        return `href="/knowledge-base/${id}"`;
      }
      // If the article ID doesn't match any known article, keep as-is
      return `href="/knowledge-base"`;
    }
  );

  // Rewrite .ce-article-link with data-article-id
  // These have href="#" and data-article-id="some-slug"
  // Since we can't reliably map slugs to IDs, link to the KB index
  result = result.replace(
    /<a\s+class="ce-article-link"\s+href="#"\s+data-article-id="[^"]*">/g,
    (match) => {
      // Extract the link text to try to find a matching article by title
      return match.replace('href="#"', 'href="/knowledge-base"');
    }
  );

  return result;
}

/**
 * Build a lookup map from article ID to article info, using the structure data.
 */
export function buildArticleMap(
  structure: HintoStructure
): Map<number, { id: number; title: string }> {
  const map = new Map<number, { id: number; title: string }>();

  function addFromFolder(folder: HintoFolder) {
    for (const article of folder.articles) {
      map.set(article.id, { id: article.id, title: article.title });
    }
    for (const child of folder.children) {
      addFromFolder(child);
    }
  }

  for (const folder of structure.folders) {
    addFromFolder(folder);
  }
  for (const article of structure.rootArticles) {
    map.set(article.id, { id: article.id, title: article.title });
  }

  return map;
}

/**
 * Process article HTML: extract main content, sanitize, and rewrite links.
 */
export function processArticleHtml(
  fullHtml: string,
  articleMap: Map<number, { id: number; title: string }>
): string {
  const content = extractMainContent(fullHtml);
  const sanitized = sanitizeHtml(content);
  return rewriteArticleLinks(sanitized, articleMap);
}
