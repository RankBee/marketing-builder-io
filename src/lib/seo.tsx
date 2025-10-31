import { Helmet } from "react-helmet-async";

type JSONLD = Record<string, any>;

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string; // canonical path like "/", "/pricing"
  image?: string; // absolute or relative OG image
  noindex?: boolean;
  jsonLd?: JSONLD | JSONLD[];
}

const defaultOrigin =
  typeof window !== "undefined" ? window.location.origin : "https://rankbee.ai";
const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string) || defaultOrigin;

function absoluteUrl(path?: string): string {
  const p = (path || "/").startsWith("/") ? (path || "/") : `/${path || ""}`;
  try {
    return new URL(p, SITE_URL).toString().replace(/\/+$/, "") + (p === "/" ? "/" : "");
  } catch {
    // Fallback to concatenation if SITE_URL is malformed
    return `${SITE_URL.replace(/\/+$/, "")}${p}`;
  }
}

export function Seo({
  title,
  description,
  path = "/",
  image,
  noindex = false,
  jsonLd,
}: SeoProps) {
  const baseTitle = "RankBee";
  const defaultTitle = "RankBee — Win AI Visibility Across ChatGPT, Claude, Gemini";
  const siteName = "RankBee";
  const desc =
    description ||
    "Optimize your site so AI assistants actually mention your brand. Track rankings, citations, and competitive share-of-voice across models.";
  const canonical = absoluteUrl(path);
  const ogImage =
    image || `${SITE_URL.replace(/\/+$/, "")}/og.jpg`;

  const fullTitle = title ? `${title} | ${baseTitle}` : defaultTitle;

  const jsonLdArray: JSONLD[] = [];
  // Organization
  jsonLdArray.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RankBee",
    url: SITE_URL,
    logo: `${SITE_URL.replace(/\/+$/, "")}/logo.png`,
    sameAs: [
      "https://x.com/rankbeeai",
      "https://www.linkedin.com/company/rankbee",
    ],
  });
  // WebSite with potential search
  jsonLdArray.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RankBee",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL.replace(/\/+$/, "")}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });
  if (jsonLd) {
    if (Array.isArray(jsonLd)) jsonLdArray.push(...jsonLd);
    else jsonLdArray.push(jsonLd);
  }

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={desc} />

        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={ogImage} />

        {/* Robots (meta). robots.txt is authoritative and served via ODB */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}

        {/* Basic theming and crawl hints */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* Canonical hreflang (single-lang site). Extend to multi-lang if needed */}
        <link rel="alternate" hrefLang="en" href={canonical} />
      </Helmet>

      {/* JSON-LD scripts */}
      {jsonLdArray.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}