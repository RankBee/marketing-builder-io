import { builder, type Handler } from "@netlify/functions";

const handlerFn: Handler = async () => {
  const context = process.env.CONTEXT || "dev"; // production | deploy-preview | branch-deploy | dev
  const siteUrl = (process.env.SITE_URL || "https://rankbee.ai").replace(/\/+$/, "");
  const isPreview = context === "deploy-preview" || context === "branch-deploy";

  // Disallow indexing on previews/branches
  const body = isPreview
    ? [
        "User-agent: *",
        "Disallow: /",
        "",
        `# Preview URL: ${process.env.DEPLOY_PRIME_URL || ""}`,
      ].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${siteUrl}/sitemap.xml`,
      ].join("\n");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Revalidate robots.txt every 1 hour at the CDN
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=60",
      // Extra safety: search engines respect this header if they fetch robots via a generic fetcher
      ...(isPreview ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
    body,
  };
};

// Netlify On‑Demand Builder wrapper (enables caching at the CDN)
export const handler = builder(handlerFn);