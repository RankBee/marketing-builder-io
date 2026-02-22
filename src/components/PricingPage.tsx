import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { trackEvent } from "../lib/posthog";
import HowItWorks from "../imports/HowItWorks";
import { PricingTable } from "./PricingTable";

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const alwaysOpen = [
    {
      q: "What's included in the free 14 days?",
      a: <p className="text-gray-600">You get a full tracking package to monitor your AI visibility across all platforms, plus 10 content creation credits to start optimizing your content for AI discovery right away.</p>,
    },
    {
      q: "What happens if I cancel?",
      a: <p className="text-gray-600">We offer pro-rated refunds on cancellations. You'll only pay for the time you've used, making it risk-free to try RankBee.</p>,
    },
    {
      q: "What's the difference between Pro and Content Growth?",
      a: <p className="text-gray-600">Pro is built for solo founders and early-stage teams — you get 10 content generations/month, ChatGPT tracking, and 1 brand. Content Growth steps it up to 50 generations, adds Google AIO tracking, and unlocks the ability to add more AI models (Perplexity, Grok) and purchase content and prompt tracking add-on packages as your needs grow.</p>,
    },
    {
      q: "What are Attributes, and why do they matter for AI ranking?",
      a: <p className="text-gray-600">Attributes are the specific features, benefits, and qualities that AI models reason about when deciding which brands and content to recommend. When someone asks an AI assistant a question, it doesn't just match keywords — it evaluates whether your content clearly signals the right attributes for that query (e.g. "fast onboarding", "enterprise-grade security", "best for agencies"). RankBee automatically generates prompts based on your brand's attributes, so you're tracking the queries that actually matter for your visibility — not just generic ones. The better your content covers the attributes AI models reward, the more likely you are to appear in AI-generated answers. <a href="/knowledge-base/12476" className="text-purple-600 underline hover:text-purple-800">Learn more about Attributes in our Knowledge Base →</a></p>,
    },
  ];

  const collapsible = [
    {
      q: "What are content add-on packages?",
      a: "If you need more content generations than your plan includes, you can purchase add-on packages without upgrading your entire plan. This is available on Content Growth and Agency plans, giving you flexibility to scale content output when you have a busy month without committing to a higher tier permanently.",
    },
    {
      q: "Can I add more AI models to track?",
      a: "Yes — on Content Growth and Agency plans you can add Perplexity and Grok on top of the included ChatGPT and Google AIO models. You can also purchase AI prompts tracking add-ons if you need to monitor more queries than your plan's base allowance.",
    },
    {
      q: "What does API access include on the Agency plan?",
      a: "The Agency plan includes three API endpoints: Content Writing (generate AI-ready content programmatically), Content Re-writing & Optimisation (improve and optimise existing content at scale), and Content Scoring & Simulation (simulate content against competitors to know how your content could perform before publishing it, or to compare multiple content versions). These are designed for agencies that want to embed RankBee's capabilities directly into their own workflows or client dashboards.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately and are pro-rated. Downgrades apply at the start of your next billing cycle.",
    },
    {
      q: "Is the Agency plan right for me if I manage multiple clients?",
      a: "Yes — the Agency plan is built specifically for this. You get unlimited brands, 300 content generations/month, 1500 AI prompt tracking slots, and full API access so you can automate content workflows across all your clients. We recommend tracking at least 200 prompts per brand for meaningful visibility data — if you need more, you can purchase additional AI prompts tracking add-on packages at any time. If you're unsure whether it fits your setup, book a demo and we'll walk you through it.",
    },
  ];

  return (
    <div className="space-y-4">
      {alwaysOpen.map((faq, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <h4 className="text-lg mb-2 text-gray-900">{faq.q}</h4>
            {faq.a}
          </CardContent>
        </Card>
      ))}
      <div className="space-y-2 mt-2">
        {collapsible.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", overflow: "hidden" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", margin: 0 }}>{faq.q}</h4>
                <span style={{ flexShrink: 0, fontSize: "1.25rem", color: "#9333ea", lineHeight: 1, display: "inline-block", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 1.5rem 1.25rem" }}>
                  <p style={{ margin: 0, fontSize: "0.9375rem", color: "#4b5563", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PricingPageProps {
  onPageChange: (page: string) => void;
}

export function PricingPage({ onPageChange }: PricingPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Plans That Fit Your <span className="text-purple-600">Growth</span>, No Surprises
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start small or go big-unlimited users, weekly crawls, and insights that pay off fast.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Whether you're testing waters or scaling content operations, our tiers let you optimize your content for AI and track performance without breaking the bank. Agencies? Hit us up for custom deals.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section> */}

      {/* RankBee Toolkit Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden py-12 sm:py-16 lg:py-20">
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-5xl mx-auto">
              RankBee <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Toolkit</span>
            </h1>

            <div className="max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                For teams and founders who want to move fast on their own.
              </p>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Use RankBee's toolkit to generate SEO-aware content, optimise pages efficiently, and experiment at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-white">
        <PricingTable />
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
            <FaqSection />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-6">Not Sure? Book a Demo to Test Drive</h2>
          <p className="text-xl mb-8 text-purple-100">
            See RankBee in action with your own brand data in just 20 minutes.
          </p>
          <a
            href="/demo"
            onClick={(e) => {
              e.preventDefault();
              trackEvent('CTA Clicked', {
                button_text: 'Book Your Demo',
                location: 'pricing_page_footer',
                variant: 'secondary',
                destination: 'demo'
              });
              onPageChange('demo');
            }}
          >
            <Button
              size="lg"
              className="bg-white text-cta hover:bg-gray-100 px-8"
            >
              Book Your Demo
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
