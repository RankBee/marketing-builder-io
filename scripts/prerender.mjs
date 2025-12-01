#!/usr/bin/env node
/* Browserless prerender of SPA routes:
   - Reads build/index.html as a template
   - Injects per-route SEO meta, OpenGraph/Twitter tags, and JSON-LD
   - Writes build/<route>/index.html
   This avoids headless browsers in CI (e.g., DigitalOcean) while keeping SEO-friendly HTML.
*/

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const BUILD_DIR = resolve('build');
const ROUTES_MANIFEST = resolve('netlify/shared/routes.json');
const TEMPLATE_FILE = resolve(join(BUILD_DIR, 'index.html'));

/* ------------------- util helpers ------------------- */
function trimTrailingSlash(url) {
  return String(url || '').replace(/\/+$/, '');
}
function ensureStartsWithSlash(p) {
  return p.startsWith('/') ? p : `/${p}`;
}
function absoluteUrl(siteUrl, path = '/') {
  const base = trimTrailingSlash(siteUrl);
  const p = ensureStartsWithSlash(path || '/');
  return `${base}${p === '/' ? '/' : p}`;
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ------------------- routes and IO ------------------- */
async function readRoutes() {
  const raw = await readFile(ROUTES_MANIFEST, 'utf-8');
  const list = JSON.parse(raw);
  if (!Array.isArray(list)) throw new Error('routes.json must be an array');
  return list;
}
function routeToOutPath(route) {
  if (route === '/' || route === '') return join(BUILD_DIR, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/+$/, '');
  return join(BUILD_DIR, clean, 'index.html');
}
async function ensureDirForFile(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

/* -------------- page id mapping (mirrors App) -------------- */
function pathToPage(pathname) {
  const path = String(pathname || '/').replace(/\/+$/, '') || '/';
  switch (path) {
    case '/sign-in': return 'sign-in';
    case '/sign-up': return 'sign-up';
    case '/about': return 'about';
    case '/pricing': return 'pricing';
    case '/blog': return 'blog';
    case '/article-detail': return 'article-detail';
    case '/demo': return 'demo';
    case '/contact': return 'contact';
    case '/privacy-policy': return 'privacy-policy';
    case '/terms-of-service': return 'terms-of-service';
    case '/':
    default: return 'home';
  }
}

/* -------------- SEO meta mapping (mirrors App.metaByPage) -------------- */
const metaByPage = {
  home: {
    title: 'AI Visibility for ChatGPT, Claude, Gemini',
    description: 'Optimize your site so AI assistants actually mention your brand. Track rankings, citations, and competitive share-of-voice across models.',
    path: '/'
  },
  about: {
    title: 'About RankBee',
    description: 'Why we built RankBee and how we help teams win AI visibility.',
    path: '/about'
  },
  pricing: {
    title: 'Pricing',
    description: 'Simple pricing to start improving AI visibility.',
    path: '/pricing'
  },
  blog: {
    title: 'Blog',
    description: 'Insights on AI search optimization and LLM-era marketing.',
    path: '/blog'
  },
  demo: {
    title: 'Free Visibility Test',
    description: 'Run a free AI visibility test across ChatGPT, Claude, and Gemini.',
    path: '/demo'
  },
  contact: {
    title: 'Contact',
    description: 'Get in touch with the RankBee team.',
    path: '/contact'
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'Privacy Policy for RankBee.',
    path: '/privacy-policy'
  },
  'terms-of-service': {
    title: 'Terms of Service',
    description: 'Terms of Service for RankBee.',
    path: '/terms-of-service'
  },
  'sign-in': {
    title: 'Sign In',
    description: 'Access your RankBee account.',
    path: '/sign-in',
    noindex: true
  },
  'sign-up': {
    title: 'Sign Up',
    description: 'Create your RankBee account.',
    path: '/sign-up',
    noindex: true
  }
};

/* -------------- build & inject head tags -------------- */
function buildHeadForRoute(route, siteUrl) {
  const pageId = pathToPage(route);
  const seo = metaByPage[pageId] || metaByPage.home;

  const baseTitle = 'RankBee';
  const defaultTitle = 'RankBee - Win AI Visibility Across ChatGPT, Claude, Gemini';
  const siteName = 'RankBee';
  const desc = seo.description || metaByPage.home.description;
  const canonical = absoluteUrl(siteUrl, seo.path || '/');
  const ogImage = `${trimTrailingSlash(siteUrl)}/og.jpg`;
  const fullTitle = seo.title ? `${seo.title} | ${baseTitle}` : defaultTitle;
  const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow';

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RankBee',
    url: siteUrl,
    logo: `${trimTrailingSlash(siteUrl)}/rankbee-logo.png`,
    sameAs: [
      'https://x.com/rankbeeai',
      'https://www.linkedin.com/company/rankbee'
    ]
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RankBee',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${trimTrailingSlash(siteUrl)}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return [
    '<!-- prerendered meta by scripts/prerender.mjs (browserless) -->',
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(desc)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(siteName)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(desc)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(desc)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="theme-color" content="#7c3aed" />`,
    `<meta name="referrer" content="no-referrer-when-downgrade" />`,
    `<link rel="alternate" hrefLang="en" href="${escapeHtml(canonical)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLdOrg)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(jsonLdWebsite)}</script>`
  ].join('\n');
}

/* ------------------- main ------------------- */
async function prerender() {
  const siteUrl = trimTrailingSlash(
    process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://rankbee.ai'
  );

  const template = await readFile(TEMPLATE_FILE, 'utf-8');
  const routes = await readRoutes();

  for (const route of routes) {
    const head = buildHeadForRoute(route, siteUrl);
    const html = template.replace('</head>', head + '\n</head>');
    const outPath = routeToOutPath(route);
    await ensureDirForFile(outPath);
    await writeFile(outPath, html, 'utf-8');
    console.log(`[prerender:ssg] Wrote ${outPath}`);
  }
}

prerender().catch((err) => {
  console.error('[prerender:ssg] Failed:', err?.stack || err);
  process.exit(1);
});