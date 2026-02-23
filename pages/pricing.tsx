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
      },
      {
        "@type": "Question",
        name: "What's the difference between Pro and Content Growth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pro is built for solo founders and early-stage teams — you get 10 content generations/month, ChatGPT tracking, and 1 brand. Content Growth steps it up to 50 generations, adds Google AIO tracking, and unlocks the ability to add more AI models (Perplexity, Grok) and purchase content and prompt tracking add-on packages as your needs grow."
        }
      },
      {
        "@type": "Question",
        name: "What are Attributes, and why do they matter for AI ranking?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Attributes are the specific features, benefits, and qualities that AI models reason about when deciding which brands and content to recommend. When someone asks an AI assistant a question, it doesn't just match keywords — it evaluates whether your content clearly signals the right attributes for that query. RankBee automatically generates prompts based on your brand's attributes, so you're tracking the queries that actually matter for your visibility — not just generic ones. The better your content covers the attributes AI models reward, the more likely you are to appear in AI-generated answers. Learn more at rankbee.ai/knowledge-base/12476"
        }
      },
      {
        "@type": "Question",
        name: "What are content add-on packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you need more content generations than your plan includes, you can purchase add-on packages without upgrading your entire plan. This is available on Content Growth and Agency plans, giving you flexibility to scale content output when you have a busy month without committing to a higher tier permanently."
        }
      },
      {
        "@type": "Question",
        name: "Can I add more AI models to track?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — on Content Growth and Agency plans you can add Perplexity and Grok on top of the included ChatGPT and Google AIO models. You can also purchase AI prompts tracking add-ons if you need to monitor more queries than your plan's base allowance."
        }
      },
      {
        "@type": "Question",
        name: "What does API access include on the Agency plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Agency plan includes three API endpoints: Content Writing (generate AI-ready content programmatically), Content Re-writing & Optimisation (improve and optimise existing content at scale), and Content Scoring & Simulation (simulate content against competitors to know how your content could perform before publishing it, or to compare multiple content versions). These are designed for agencies that want to embed RankBee's capabilities directly into their own workflows or client dashboards."
        }
      },
      {
        "@type": "Question",
        name: "Can I switch plans later?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately and are pro-rated. Downgrades apply at the start of your next billing cycle."
        }
      },
      {
        "@type": "Question",
        name: "Is the Agency plan right for me if I manage multiple clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — the Agency plan is built specifically for this. You get unlimited brands, 300 content generations/month, 1500 AI prompt tracking slots, and full API access so you can automate content workflows across all your clients. We recommend tracking at least 200 prompts per brand for meaningful visibility data — if you need more, you can purchase additional AI prompts tracking add-on packages at any time."
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
