import { builder, type Handler } from "@netlify/functions";
import routes from "../shared/routes.json";

const handlerFn: Handler = async () => {
  const context = process.env.CONTEXT || "dev"; // production | deploy-preview | branch-deploy | dev
  const isPreview = context === "deploy-preview" || context === "branch-deploy";

  const siteUrl = (process.env.SITE_URL || "https://rankbee.ai").replace(/\/+$/, "");
  const now = new Date().toISOString();

  const routeList: string[] = Array.isArray(routes) ? (routes as string[]) : [];

  const priorityFor = (path: string): string => {
    switch (path) {
      case "/":
        return "1.0";
      case "/pricing":
      case "/about":
      case "/demo":
        return "0.8";
      case "/blog":
        return "0.7";
      case "/contact":
        return "0.5";
      default:
        return "0.6";
    }
  };

  const changefreqFor = (path: string): string => {
    switch (path) {
      case "/blog":
        return "weekly";
      case "/pricing":
        return "monthly";
      default:
        return "weekly";
    }
  };

  const toLoc = (path: string): string => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${siteUrl}${clean}`;
  };

  const urls = routeList
    .filter((p) => p && !["/sign-in", "/sign-up"].includes(p))
    .map((p) => {
      const loc = toLoc(p);
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreqFor(p)}</changefreq>
    <priority>${priorityFor(p)}</priority>
  </url>`.trim();
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache at CDN for 1 hour, allow SWR
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=60",
      // Make sure previews are not indexed (robots also disallows)
      ...(isPreview ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
    body: xml,
  };
};

// Netlify On‑Demand Builder wrapper (enables CDN caching)
export const handler = builder(handlerFn);