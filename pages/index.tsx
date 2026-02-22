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
      { "@type": "Offer", name: "Pro", priceCurrency: "GBP", price: PRICING.pro.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "GBP", price: PRICING.contentGrowth.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "GBP", price: PRICING.agency.GBP, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "USD", price: PRICING.pro.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "USD", price: PRICING.contentGrowth.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "USD", price: PRICING.agency.USD, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Pro", priceCurrency: "EUR", price: PRICING.pro.EUR, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Content Growth", priceCurrency: "EUR", price: PRICING.contentGrowth.EUR, url: `${siteUrl}/pricing` },
      { "@type": "Offer", name: "Agency", priceCurrency: "EUR", price: PRICING.agency.EUR, url: `${siteUrl}/pricing` }
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
