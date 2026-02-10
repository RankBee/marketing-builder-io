import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchBlogPosts } from '../../src/lib/builder';

// Static routes with their priorities and change frequencies
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/demo', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/rankbee-api', priority: '0.6', changefreq: 'monthly' },
  { path: '/seo-professionals', priority: '0.6', changefreq: 'monthly' },
  { path: '/growing-business', priority: '0.6', changefreq: 'monthly' },
  { path: '/agencies', priority: '0.6', changefreq: 'monthly' },
  { path: '/political-campaigns', priority: '0.6', changefreq: 'monthly' },
  { path: '/news', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rankbee.ai').replace(/\/+$/, '');
  const now = new Date().toISOString();

  const posts = await fetchBlogPosts();
  const blogSlugs = posts.map(p => p.slug);

  const staticUrls = STATIC_ROUTES.map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  );

  const blogUrls = blogSlugs.map(
    (slug) => `  <url>
    <loc>${siteUrl}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...blogUrls].join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=60');
  res.status(200).send(xml);
}
