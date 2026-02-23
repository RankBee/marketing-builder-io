import { SeoHead } from '../src/lib/SeoHead';
import { HomePage } from '../src/components/HomePage';
import { getSiteUrl } from '../src/lib/page-seo';
import { PRICING } from '../src/lib/pricing-data';

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
      { "@type": "Offer", name: "Pro", priceCurrency: "GBP", price: PRICING.pro.monthly.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "GBP", price: PRICING.contentGrowth.monthly.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "For agencies", priceCurrency: "GBP", price: PRICING.agency.monthly.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "USD", price: PRICING.pro.monthly.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "USD", price: PRICING.contentGrowth.monthly.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "For agencies", priceCurrency: "USD", price: PRICING.agency.monthly.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "EUR", price: PRICING.pro.monthly.EUR, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "EUR", price: PRICING.contentGrowth.monthly.EUR, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "For agencies", priceCurrency: "EUR", price: PRICING.agency.monthly.EUR, url: `${siteUrl}/pricing` }
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
