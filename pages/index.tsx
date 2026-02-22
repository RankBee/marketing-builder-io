import { SeoHead } from '../src/lib/SeoHead';
import { HomePage } from '../src/components/HomePage';
import { getSiteUrl } from '../src/lib/page-seo';

const siteUrl = getSiteUrl();

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RankBee Toolkit",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/pricing`,
    description: "Self-serve AI visibility and content optimisation tools for teams and founders. Track brand citations across ChatGPT, Claude, and Gemini, generate SEO-aware content, and optimise pages for AI search.",
    offers: [
      {
        "@type": "Offer",
        name: "Free Trial",
        priceCurrency: "GBP",
        price: "0",
        description: "14-day free trial, no credit card required",
        url: `${siteUrl}/pricing`
      },
      { "@type": "Offer", name: "Pro", priceCurrency: "GBP", price: "99", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "GBP", price: "199", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "GBP", price: "599", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "USD", price: "110", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "USD", price: "299", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "USD", price: "699", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "EUR", price: "99", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "EUR", price: "199", url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "EUR", price: "599", url: `${siteUrl}/pricing` }
    ],
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  }
];

export default function Home({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="home" jsonLd={homeJsonLd} />
      <HomePage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
