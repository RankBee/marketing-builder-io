#!/usr/bin/env node
import express from 'express';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const PORT = process.env.PORT || 8080;
const BUILD_DIR = resolve('build');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://rankbee.ai').replace(/\/+$/, '');

// Ghost API config
const GHOST_API_URL = 'https://geo.rankbee.ai/ghost/api/content';
const GHOST_CONTENT_API_KEY = '4d7724b1d3ab0bbf970850bf7f';

// In-memory cache: slug → { html, timestamp }
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Read the base HTML template once at startup
let templateHtml = '';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchGhostPost(slug) {
  try {
    const url = `${GHOST_API_URL}/posts/slug/${slug}/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors&fields=slug,title,excerpt,custom_excerpt,feature_image,published_at,updated_at,meta_title,meta_description,og_title,og_description,og_image`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.posts?.[0] || null;
  } catch (error) {
    console.error('[server] Error fetching Ghost post:', error.message);
    return null;
  }
}

function buildBlogPostHead(post, slug) {
  const title = post.meta_title || post.title || 'Blog Post';
  const description = post.meta_description || post.custom_excerpt || post.excerpt || '';
  const ogTitle = post.og_title || title;
  const ogDescription = post.og_description || description;
  const ogImage = post.og_image || post.feature_image || `${SITE_URL}/og.jpg`;
  const canonical = `${SITE_URL}/blog/${slug}`;
  const fullTitle = `${title} | RankBee`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: ogImage,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: 'RankBee' },
    publisher: {
      '@type': 'Organization',
      name: 'RankBee',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/bee-logo.png` }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
  };

  return [
    '<!-- Dynamic blog post meta injected by server.mjs -->',
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="RankBee" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta property="article:published_time" content="${post.published_at || ''}" />`,
    `<meta property="article:modified_time" content="${post.updated_at || ''}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(ogDescription)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  ].join('\n');
}

const app = express();

// Serve static assets first (JS, CSS, images, etc.)
app.use(express.static(BUILD_DIR, {
  index: false, // Don't auto-serve index.html for directories
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, path) => {
    // Don't cache HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Handle blog post routes with dynamic meta injection
app.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;
  
  // Skip if slug looks like a static asset
  if (slug.includes('.')) {
    return res.sendFile(join(BUILD_DIR, 'index.html'));
  }
  
  // Skip tag and page routes (handled by SPA)
  if (slug === 'tag' || slug === 'page') {
    return res.sendFile(join(BUILD_DIR, 'index.html'));
  }

  // Check cache
  const cached = cache.get(slug);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log(`[server] Cache hit for /blog/${slug}`);
    return res.type('html').send(cached.html);
  }

  console.log(`[server] Cache miss for /blog/${slug}, fetching from Ghost...`);

  // Fetch from Ghost
  const post = await fetchGhostPost(slug);
  
  if (!post) {
    console.log(`[server] Post not found: ${slug}, serving default SPA`);
    // Post not found - serve default SPA HTML
    return res.type('html').send(templateHtml);
  }

  console.log(`[server] Found post: ${post.title}`);

  // Remove existing prerendered meta tags (everything between the comment markers)
  let cleanHtml = templateHtml.replace(
    /<!-- prerendered meta by scripts\/prerender\.mjs[\s\S]*?(?=<\/head>)/,
    ''
  );
  
  // Inject article-specific meta tags
  const head = buildBlogPostHead(post, slug);
  const html = cleanHtml.replace('</head>', head + '\n</head>');

  // Cache the result
  cache.set(slug, { html, timestamp: Date.now() });

  return res.type('html').send(html);
});

// Handle blog tag/page sub-routes
app.get('/blog/tag/*', (req, res) => {
  res.sendFile(join(BUILD_DIR, 'blog', 'index.html'), {}, (err) => {
    if (err) res.sendFile(join(BUILD_DIR, 'index.html'));
  });
});

app.get('/blog/page/*', (req, res) => {
  res.sendFile(join(BUILD_DIR, 'blog', 'index.html'), {}, (err) => {
    if (err) res.sendFile(join(BUILD_DIR, 'index.html'));
  });
});

// SPA fallback: serve pre-rendered HTML if it exists, otherwise index.html
app.get('*', (req, res) => {
  const cleanPath = req.path.replace(/\/+$/, '') || '/';
  
  if (cleanPath === '/') {
    return res.sendFile(join(BUILD_DIR, 'index.html'));
  }
  
  // Try to serve pre-rendered page
  const prerenderedPath = join(BUILD_DIR, cleanPath.slice(1), 'index.html');
  res.sendFile(prerenderedPath, {}, (err) => {
    if (err) {
      // Fallback to main index.html (SPA routing)
      res.sendFile(join(BUILD_DIR, 'index.html'));
    }
  });
});

// Start server
async function start() {
  try {
    templateHtml = await readFile(join(BUILD_DIR, 'index.html'), 'utf-8');
    app.listen(PORT, () => {
      console.log(`[server] Listening on port ${PORT}`);
      console.log(`[server] Serving from ${BUILD_DIR}`);
      console.log(`[server] Blog post meta injection enabled (cache TTL: ${CACHE_TTL / 1000}s)`);
      console.log(`[server] Site URL: ${SITE_URL}`);
    });
  } catch (error) {
    console.error('[server] Failed to start:', error);
    process.exit(1);
  }
}

start();
