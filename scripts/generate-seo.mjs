#!/usr/bin/env node
/* Generate robots.txt and sitemap.xml at build time for static hosting (e.g., DigitalOcean App Platform) */
try { await import('dotenv/config'); } catch {}

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const BUILD_DIR = resolve('build');
const ROUTES_MANIFEST = resolve('netlify/shared/routes.json');

// Ghost CMS API configuration
const GHOST_CONTENT_API_KEY = '4d7724b1d3ab0bbf970850bf7f';
const GHOST_API_URL = 'https://geo.rankbee.ai/ghost/api/content';

function trimTrailingSlash(url) {
  return url.replace(/\/+$/, '');
}
function ensureStartsWithSlash(p) {
  return p.startsWith('/') ? p : `/${p}`;
}

async function ensureDirForFile(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

async function fetchGhostPosts() {
  try {
    const url = `${GHOST_API_URL}/posts/?key=${GHOST_CONTENT_API_KEY}&limit=all&fields=slug,updated_at`;
    const response = await fetch(url);
    if (!response.ok) {
      console.warn('[seo] Ghost API returned:', response.status);
      return [];
    }
    const result = await response.json();
    console.log(`[seo] Found ${result.posts?.length || 0} blog posts from Ghost`);
    return result.posts || [];
  } catch (error) {
    console.warn('[seo] Failed to fetch Ghost posts:', error.message);
    return [];
  }
}

function isIndexable(appEnv) {
  const v = String(appEnv || '').toLowerCase();
  return v === 'production' || v === 'prod';
}

function robotsBody(indexable, siteUrl) {
  if (!indexable) {
    return [
      'User-agent: *',
      'Disallow: /',
      ''
    ].join('\n');
  }
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`
  ].join('\n');
}

function priorityFor(path) {
  // Individual blog posts get 0.7 priority
  if (path.startsWith('/blog/') && path !== '/blog') {
    return '0.7';
  }
  
  switch (path) {
    case '/':
      return '1.0';
    case '/pricing':
    case '/about':
    case '/demo':
      return '0.8';
    case '/blog':
      return '0.7';
    case '/contact':
      return '0.5';
    default:
      return '0.6';
  }
}

function changefreqFor(path) {
  // Blog posts change weekly
  if (path.startsWith('/blog/')) {
    return 'weekly';
  }
  
  switch (path) {
    case '/blog':
      return 'weekly';
    case '/pricing':
      return 'monthly';
    default:
      return 'weekly';
  }
}

function toLoc(siteUrl, path) {
  return `${siteUrl}${ensureStartsWithSlash(path)}`;
}

async function generateRobots(siteUrl, indexable) {
  const outPath = resolve(join(BUILD_DIR, 'robots.txt'));
  await ensureDirForFile(outPath);
  await writeFile(outPath, robotsBody(indexable, siteUrl), 'utf-8');
  console.log(`[seo] wrote ${outPath}`);
}

async function generateSitemap(siteUrl, routes) {
  const now = new Date().toISOString();
  
  // Fetch blog posts from Ghost
  const ghostPosts = await fetchGhostPosts();
  const blogPostRoutes = ghostPosts.map(post => `/blog/${post.slug}`);
  
  // Combine static routes with blog posts
  const allRoutes = [...routes, ...blogPostRoutes];
  
  const filtered = allRoutes
    .filter(Boolean)
    .filter((p) => !['/sign-in', '/sign-up'].includes(p));

  const urls = filtered
    .map((p) => {
      const loc = toLoc(siteUrl, p);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <changefreq>${changefreqFor(p)}</changefreq>`,
        `    <priority>${priorityFor(p)}</priority>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>'
  ].join('\n');

  const outPath = resolve(join(BUILD_DIR, 'sitemap.xml'));
  await ensureDirForFile(outPath);
  await writeFile(outPath, xml, 'utf-8');
  console.log(`[seo] wrote ${outPath}`);
}

async function readRoutes() {
  const raw = await readFile(ROUTES_MANIFEST, 'utf-8');
  const list = JSON.parse(raw);
  if (!Array.isArray(list)) throw new Error('routes.json must be an array');
  return list;
}

async function main() {
  const siteUrl = trimTrailingSlash(
    process.env.VITE_SITE_URL ||
      process.env.SITE_URL ||
      'https://rankbee.ai'
  );
  const appEnv =
    process.env.VITE_APP_ENV ||
    process.env.APP_ENV ||
    process.env.NODE_ENV ||
    'production';
  const indexable = isIndexable(appEnv);

  const routes = await readRoutes().catch((e) => {
    console.warn('[seo] Failed to read routes manifest, proceeding with empty list:', e?.message || e);
    return [];
  });

  await Promise.all([
    generateRobots(siteUrl, indexable),
    generateSitemap(siteUrl, routes),
  ]);
}

main().catch((err) => {
  console.error('[seo] generation failed:', err?.stack || err);
  process.exit(1);
});