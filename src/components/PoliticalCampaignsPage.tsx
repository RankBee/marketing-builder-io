import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

interface FaqItem {
  id: string;
  q: string;
  a: React.ReactNode;
}

function CampaignFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const alwaysOpen: FaqItem[] = [
    {
      id: "info-density",
      q: "What is information density and why does it matter?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>Information density refers to how much clear, relevant factual content is packed into a response. In campaign communications, high-density answers that provide substantive policy details and credible sources are more effective than vague or low-information replies. <a href="https://ctse.aei.org/ai-chatbots-are-reshaping-political-persuasion/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">Research from AEI CTSE</a> shows that when AI assistants provide fact-based, information-dense responses, voters are better informed and more engaged with campaign messaging.</p>,
    },
    {
      id: "tone-best-practices",
      q: "What tone works best for political AI assistants?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>Calm, evidence-based dialogue outperforms emotional appeals. Chatbots using measured tone, credible sources and respectful conversation move opinions more than pushy or inflammatory tactics. <a href="https://ctse.aei.org/ai-chatbots-are-reshaping-political-persuasion/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">Source: AEI CTSE</a>.</p>,
    },
    {
      id: "voter-engagement",
      q: "How can AI help with voter engagement in large-scale local elections?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>In local elections, voters increasingly turn to AI assistants to understand their options, compare candidates, and learn about local policies. AI can help ensure that local candidates and their positions are accurately represented when voters ask questions. By optimizing campaign content for AI visibility, candidates can make sure voters receive correct, up-to-date information about their platform - helping voters make informed decisions while ensuring candidates are fairly represented in AI-generated responses. <a href="https://ctse.aei.org/ai-chatbots-are-reshaping-political-persuasion/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">Source: AEI CTSE</a>.</p>,
    },
  ];

  const collapsible: FaqItem[] = [
    {
      id: "biased-data",
      q: "What are the risks of biased training data?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>Biased or poor training data can present falsehoods as fact. Without careful curation and testing, assistants may echo inaccuracies, cherry-pick sources or overstate certainty. RankBee recommends source-balanced content, periodic dataset reviews, and issue trackers to mitigate training bias.</p>,
    },
    {
      id: "governance-trust",
      q: "How does governance build trust in campaign AI?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>Best practices include clear disclosure when voters are interacting with AI, traceable sourcing, and human oversight to reduce risk and improve perceived legitimacy. Transparency builds trust - campaigns that proactively disclose AI use and provide verifiable sources demonstrate accountability and respect for voters.</p>,
    },
    {
      id: "ai-hallucination",
      q: "What safeguards prevent AI hallucination?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>AI can state unverified facts as certain if not properly controlled. We recommend source citations, human fact-checking, and confidence cues to ensure AI responses are accurate and trustworthy. Every claim should be traceable to a verified source.</p>,
    },
    {
      id: "current-policies",
      q: "How do you keep AI responses current with evolving policies?",
      a: <p style={{ fontSize: "1.125rem", color: "#6b7280", lineHeight: 1.7 }}>Old positions can persist in AI summaries if not actively managed. Scheduled refreshes, versioning, and real-time update workflows ensure your AI responses reflect your current platform. Policies change, headlines move, and assistants update their answers often - RankBee helps you set the guardrails and keep the record straight across AI platforms.</p>,
    },
  ];

  return (
    <div className="space-y-4">
      {alwaysOpen.map((faq) => (
        <Card key={faq.id}>
          <CardContent className="pt-6">
            <h4 style={{ fontSize: "1.125rem", marginBottom: "0.5rem", color: "#111827" }}>{faq.q}</h4>
            {faq.a}
          </CardContent>
        </Card>
      ))}
      <div className="space-y-2 mt-2">
        {collapsible.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", overflow: "hidden" }}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}
              >
                <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#111827", margin: 0 }}>{faq.q}</h4>
                <span style={{ flexShrink: 0, fontSize: "1.25rem", color: "#9333ea", lineHeight: 1, display: "inline-block", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 1.5rem 1.25rem" }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PoliticalCampaignsPageProps {
  onPageChange: (page: string) => void;
}

export function PoliticalCampaignsPage({ onPageChange }: PoliticalCampaignsPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-5xl mx-auto">
              Political <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Campaigns</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ensure your message reaches voters through AI search assistants. Amplify your campaign's voice across ChatGPT, Claude, Gemini, and other AI platforms.
            </p>

            <div className="pt-4">
              <a
                href="/contact#contact-channels"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Contact Us',
                    location: 'political_campaigns_hero',
                    variant: 'primary',
                    destination: 'contact'
                  });
                  onPageChange('contact');
                  // Scroll to the contact channels section
                  setTimeout(() => {
                    const element = document.getElementById('contact-channels');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <button
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-3 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                >
                  Contact Us
                </button>
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-purple-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <a href="https://geo.rankbee.ai/the-new-information-layer-why-political-organizations-must-own-their-ai-visibility/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity block mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">
                Why AI Visibility Is Now a Campaign Priority
              </h2>
            </a>
            <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
              Voters are increasingly asking AI assistants questions about candidates, policies, and issues. Campaigns that actively manage their AI visibility gain a strategic advantage: they influence how their story is told at the point voters are asking questions. RankBee helps campaigns ensure their message is visible, accurate, and consistent across AI-driven search platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Monitor Your Presence</h3>
              <p className="text-gray-600 mb-6">
                Understand how your campaign is referenced and summarised across AI platforms.
              </p>
              <p className="text-gray-600 mb-6">
                RankBee's analytical platform helps campaigns see how they appear across AI assistants and identify gaps or risks early.  Our team tracks and compares campaign visibility, highlights inconsistencies and flags opportunities to clarify positions before issues spread.
              </p>
              <p className="text-gray-600 mb-6">
                Our visibility audit enables rapid response, message correction, and proactive optimization.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Connect with Voters</h3>
              <p className="text-gray-600 mb-6">
                Our Content Optimization Tool helps ensure your content is structured and optimized so AI systems can surface clear, accurate, and up-to-date information about your campaign. Our optimization engine rewrites and tests your pages so ChatGPT, Gemini, and Google AI Overviews are more likely to mention your campaign when voters compare policies and search for information about candidates.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Adapt Quickly</h3>
              <p className="text-gray-600 mb-6">
                Political campaigns move fast as voter information behaviours shift.
              </p>
              <p className="text-gray-600 mb-6">
                RankBee supports:
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Rapid updates as policies or messaging evolve</li>
                <li>• Human-supervised optimization to reduce misinformation risk</li>
                <li>• Scalable workflows for local, national, or coalition campaigns</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Our approach prioritises accuracy, consistency, and accountability at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Take Control Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-8">Take Control of Your AI Narrative</h2>
          <p className="text-gray-700 text-lg mb-12 max-w-3xl mx-auto">
            AI assistants are becoming a primary gateway to political information. Campaigns that ignore this shift risk losing control of their message. <span className="font-semibold">RankBee helps you stay visible, accurate, and trusted - where voters are increasingly looking.</span>
          </p>
          <a href="/demo/political" onClick={() => {
            trackEvent('CTA Clicked', {
              button_text: 'Book a Campaign Strategy Call',
              location: 'political_campaigns_cta_section',
              variant: 'primary',
              destination: 'demo/political'
            });
          }} className="inline-block relative overflow-hidden px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" style={{
            background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
            color: 'white'
          }}>
            Book a Campaign Strategy Call
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl mb-8 text-center text-gray-900">FAQ: How Campaigns Use AI to Inform Voters</h3>
            <CampaignFaqSection />
          </div>
        </div>
      </section>

    </div>
  );
}
