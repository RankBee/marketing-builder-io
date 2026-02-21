import { SeoHead } from '../src/lib/SeoHead';
import { PricingPage } from '../src/components/PricingPage';
import { getSiteUrl } from '../src/lib/page-seo';

const siteUrl = getSiteUrl();

const pricingJsonLd = [
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
    },
    featureList: [
      "AI visibility tracking across ChatGPT, Claude, and Gemini",
      "Brand citation analysis",
      "Competitor share-of-voice monitoring",
      "AI-ready content generation",
      "SEO-aware content optimisation",
      "Real-time ranking alerts"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What's included in the free 14 days?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You get a full tracking package to monitor your AI visibility across all platforms, plus 10 content creation credits to start optimizing your content for AI discovery right away."
        }
      },
      {
        "@type": "Question",
        name: "What happens if I cancel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer pro-rated refunds on cancellations. You'll only pay for the time you've used, making it risk-free to try RankBee."
        }
      }
    ]
  }
];

export default function Pricing({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="pricing" jsonLd={pricingJsonLd} />
      <PricingPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
