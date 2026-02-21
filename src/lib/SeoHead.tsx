import Head from 'next/head';
import { getPageSeo, getSiteUrl } from './page-seo';

interface SeoHeadProps {
  pageId: string;
  // Override for dynamic pages (blog posts)
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SeoHead({
  pageId,
  title: titleOverride,
  description: descOverride,
  canonical: canonicalOverride,
  image: imageOverride,
  noindex: noindexOverride,
  jsonLd,
  type,
  publishedTime,
  modifiedTime,
}: SeoHeadProps) {
  const seo = getPageSeo(pageId);
  const siteUrl = getSiteUrl();

  const fullTitle = titleOverride ? `${titleOverride} | RankBee` : seo.fullTitle;
  const description = descOverride || seo.description;
  const canonical = canonicalOverride || seo.canonical;
  const ogImage = imageOverride || `${siteUrl}/images/bee-logo.png`;
  const noindex = noindexOverride ?? seo.noindex;
  const ogType = type || 'website';

  const defaultJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "RankBee",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/rankbee-logo.png`,
        width: 200,
        height: 60
      },
      description: "RankBee helps companies grow organic visibility using AI-powered content and SEO. Track brand citations across ChatGPT, Claude, and Gemini, and optimise content for AI search.",
      foundingDate: "2024",
      founder: [
        {
          "@type": "Person",
          name: "Aris Vrakas",
          url: `${siteUrl}/about#aris-vrakas`,
          sameAs: "https://www.linkedin.com/in/arisvrakas/"
        }
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${siteUrl}/contact`
      },
      sameAs: [
        "https://x.com/rankbeeai",
        "https://www.linkedin.com/company/rankbee"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "RankBee",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  ];

  const allJsonLd = jsonLd
    ? [...defaultJsonLd, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]
    : defaultJsonLd;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:site_name" content="RankBee" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      {allJsonLd.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
      ))}
    </Head>
  );
}
