// Hinto AI Knowledge Base API client
// Server-side only — uses HINTO_API_KEY (no NEXT_PUBLIC_ prefix)

import sanitize from 'sanitize-html';
import he from 'he';

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
  const res = await fetch(`${HINTO_BASE_URL}/projects/structure`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Hinto API /projects/structure failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchAllArticles(): Promise<HintoArticlesResponse> {
  const res = await fetch(`${HINTO_BASE_URL}/projects/articles`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Hinto API /projects/articles failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchArticle(id: number): Promise<HintoArticle | null> {
  const res = await fetch(`${HINTO_BASE_URL}/projects/articles?id=${id}`, { headers: headers(), cache: 'no-store' });
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
 * Uses sanitize-html for robust sanitization (no JSDOM, no memory leak).
 * Applied server-side in getStaticProps before content reaches the client.
 */
export function sanitizeHtml(html: string): string {
  const allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li',
    'strong', 'b', 'em', 'i', 'u', 'br', 'hr', 'img', 'video', 'source',
    'div', 'span', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody',
    'tr', 'th', 'td', 'figure', 'figcaption', 'main', 'section', 'article',
    'nav', 'details', 'summary', 'mark', 'sub', 'sup', 'dl', 'dt', 'dd',
  ];
  const allowedAttributes: Record<string, string[]> = {};
  const sharedAttrs = [
    'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
    'width', 'height', 'style', 'data-article-id', 'loading', 'type',
    'controls', 'autoplay', 'muted', 'loop', 'poster', 'start',
  ];
  for (const tag of allowedTags) {
    allowedAttributes[tag] = sharedAttrs;
  }
  return sanitize(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}

// ─── Ordered List Continuation ───────────────────────────────────────

/**
 * Fix ordered list numbering when <ol> tags are interrupted by images or
 * other block-level elements. Browsers restart numbering at 1 for each
 * new <ol>. This function adds `start` attributes so numbering continues.
 */
export function fixOrderedListContinuation(html: string): string {
  // Split the HTML into tokens: <ol...>, </ol>, <li...>, </li>, and everything else
  const tagRegex = /(<\/?ol\b[^>]*>|<\/?li\b[^>]*>)/gi;
  const tokens = html.split(tagRegex);

  let olDepth = 0; // nesting depth of <ol>
  let liCount = 0; // number of <li> in the current top-level <ol> sequence
  let inOlSequence = false; // whether we're tracking a sequence of <ol> blocks
  const result: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const lower = token.toLowerCase().trim();

    if (/^<ol\b/i.test(lower)) {
      olDepth++;
      if (olDepth === 1) {
        if (inOlSequence && liCount > 0) {
          // This is a continuation <ol> — add start attribute
          const startVal = liCount + 1;
          if (/<ol\s/i.test(token)) {
            // <ol already has attributes — inject start
            result.push(token.replace(/^<ol\s/i, `<ol start="${startVal}" `));
          } else {
            // Plain <ol> or <ol>
            result.push(token.replace(/^<ol/i, `<ol start="${startVal}"`));
          }
          continue;
        } else {
          // First <ol> in a new sequence
          inOlSequence = true;
          liCount = 0;
        }
      }
      result.push(token);
    } else if (/^<\/ol>/i.test(lower)) {
      olDepth--;
      result.push(token);
    } else if (/^<li\b/i.test(lower)) {
      if (olDepth === 1) {
        liCount++;
      }
      result.push(token);
    } else if (/^<\/li>/i.test(lower)) {
      result.push(token);
    } else {
      // Non-list content — check if it breaks the sequence
      // Only reset if there's substantial non-whitespace content that isn't
      // an image, figure, or similar inline interruption
      if (olDepth === 0 && inOlSequence) {
        const stripped = token.replace(/<[^>]*>/g, '').trim();
        const isVisualInterruption = /^\s*$/.test(stripped) ||
          /<(img|figure|figcaption|div|br|hr|p)\b/i.test(token);
        if (!isVisualInterruption && stripped.length > 0) {
          // Real content between lists — reset the sequence
          inOlSequence = false;
          liCount = 0;
        }
      }
      result.push(token);
    }
  }

  return result.join('');
}

// ─── Orphaned List Items ─────────────────────────────────────────────

/**
 * Wrap orphaned <li> elements (not inside <ol>/<ul>) in a <ul>.
 * Hinto sometimes outputs sub-items as bare <li> tags between list blocks,
 * which browsers silently discard as invalid HTML.
 */
export function wrapOrphanedListItems(html: string): string {
  const tagRegex = /(<\/?(?:ol|ul|li)\b[^>]*>)/gi;
  const tokens = html.split(tagRegex);

  let listDepth = 0; // nesting depth of <ol>/<ul>
  let orphanBuffer: string[] = []; // collects consecutive orphaned <li>...</li>
  let inOrphanLi = false;
  const result: string[] = [];

  function flushOrphans() {
    if (orphanBuffer.length > 0) {
      result.push('<ul>');
      result.push(...orphanBuffer);
      result.push('</ul>');
      orphanBuffer = [];
    }
  }

  for (const token of tokens) {
    const lower = token.toLowerCase().trim();

    if (/^<(ol|ul)\b/i.test(lower)) {
      flushOrphans();
      listDepth++;
      result.push(token);
    } else if (/^<\/(ol|ul)>/i.test(lower)) {
      listDepth--;
      result.push(token);
    } else if (/^<li\b/i.test(lower)) {
      if (listDepth === 0) {
        // Orphaned <li> — buffer it
        inOrphanLi = true;
        orphanBuffer.push(token);
      } else {
        result.push(token);
      }
    } else if (/^<\/li>/i.test(lower)) {
      if (inOrphanLi && listDepth === 0) {
        orphanBuffer.push(token);
        inOrphanLi = false;
      } else {
        result.push(token);
      }
    } else {
      if (inOrphanLi && listDepth === 0) {
        // Content inside an orphaned <li>
        orphanBuffer.push(token);
      } else {
        // Non-list content — flush any buffered orphans first
        // but only if this isn't just whitespace between orphaned <li>s
        const stripped = token.replace(/<[^>]*>/g, '').trim();
        if (stripped.length > 0 && !inOrphanLi) {
          flushOrphans();
        }
        result.push(token);
      }
    }
  }

  flushOrphans();
  return result.join('');
}

// ─── HTML Processing ─────────────────────────────────────────────────

/**
 * Extract only the inner HTML of <main class="article-content"> from the
 * full HTML document returned by Hinto. Strips <html>, <head>, <style>, etc.
 */
export function extractMainContent(fullHtml: string): string {
  // Match content inside <main ...>...</main>
  const mainMatch = fullHtml.match(/<main[^>]*>([\s\S]*)<\/main>/i);
  if (mainMatch) {
    return mainMatch[1].trim();
  }
  // Fallback: match content inside <body>...</body>
  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    return bodyMatch[1].trim();
  }
  // Last resort: return as-is
  return fullHtml;
}

/**
 * Extract the text content of the first <h1> element from the article HTML.
 * Returns null if no H1 is found.
 */
export function extractH1(html: string): string | null {
  const content = extractMainContent(html);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const text = h1Match[1].replace(/<[^>]+>/g, '').trim();
    return decodeHtmlEntities(text);
  }
  return null;
}

function decodeHtmlEntities(text: string): string {
  return he.decode(text).trim();
}

/**
 * Extract the first paragraph text from HTML content for use as meta description.
 */
export function extractDescription(html: string): string {
  const content = extractMainContent(html);
  // Remove the H1 first, then grab the first <p>
  const withoutH1 = content.replace(/<h1[^>]*>[\s\S]*<\/h1>/i, '');
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
  for (const article of structure.rootArticles || []) {
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
  const withoutLeadingH1 = content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');
  const wrapped = wrapOrphanedListItems(withoutLeadingH1);
  const sanitized = sanitizeHtml(wrapped);
  const withLinks = rewriteArticleLinks(sanitized, articleMap);
  return fixOrderedListContinuation(withLinks);
}
