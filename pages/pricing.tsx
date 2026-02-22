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
    description: "Self-serve AI visibility and content optimisation tools for teams and founders. Track brand citations across ChatGPT and Google AIO, generate SEO-aware content, optimise existing pages, and integrate via API.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: "99",
      highPrice: "599",
      offerCount: 3,
      offers: [
        {
          "@type": "Offer",
          name: "Pro",
          description: "For individual entrepreneurs and early-stage startups. 10 content generations/month, 500 AI prompt tracking, ChatGPT model, 1 brand. Includes 14-day free trial.",
          price: "99",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "99",
            priceCurrency: "GBP",
            unitText: "MON"
          },
          url: `${siteUrl}/en/register`
        },
        {
          "@type": "Offer",
          name: "Content Growth",
          description: "For growing businesses scaling content creation. 50 content generations/month, 500 AI prompt tracking, ChatGPT and Google AIO models, 1 brand. Add Perplexity and Grok models.",
          price: "199",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "199",
            priceCurrency: "GBP",
            unitText: "MON"
          },
          url: `${siteUrl}/en/register`
        },
        {
          "@type": "Offer",
          name: "For agencies",
          description: "For agencies managing multiple clients. 300 content generations/month, 1500 AI prompt tracking, ChatGPT and Google AIO models, unlimited brands, API access for content writing, re-writing, and scoring.",
          price: "599",
          priceCurrency: "GBP",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "599",
            priceCurrency: "GBP",
            unitText: "MON"
          },
          url: `${siteUrl}/demo`
        }
      ]
    },
    publisher: {
      "@id": `${siteUrl}/#organization`
    },
    featureList: [
      "AI visibility tracking across ChatGPT and Google AIO",
      "AI prompt tracking (500–1500 prompts/month)",
      "Add more AI models: Perplexity, Grok",
      "Content Writer with AI-ready content generation",
      "Content Recommendation Engine",
      "Existing Content Optimisation Engine",
      "Unlimited brands (Agency plan)",
      "API: Content Writing",
      "API: Content Re-writing and Optimisation",
      "API: Content Scoring and Simulation"
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
