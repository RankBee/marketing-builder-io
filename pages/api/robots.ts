import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'development';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rankbee.ai').replace(/\/+$/, '');
  const isProduction = appEnv === 'production' || appEnv === 'prod';

  const body = isProduction
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${siteUrl}/sitemap.xml`,
      ].join('\n')
    : [
        'User-agent: *',
        'Disallow: /',
      ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=60');
  if (!isProduction) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
  res.status(200).send(body);
}
