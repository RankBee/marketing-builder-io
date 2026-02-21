import { SeoHead } from '../src/lib/SeoHead';
import { HomePage } from '../src/components/HomePage';
import { getSiteUrl } from '../src/lib/page-seo';

const siteUrl = getSiteUrl();

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/pricing#toolkit`,
    name: "RankBee Toolkit",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/pricing`,
    description: "Self-serve AI visibility and content optimisation tools for teams and founders. Track brand citations across ChatGPT, Claude, and Gemini, generate SEO-aware content, and optimise pages for AI search.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "0",
      description: "14-day free trial included",
      url: `${siteUrl}/pricing`
    },
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
