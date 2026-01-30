import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CaseStudySection } from "./CaseStudySection";
import CtaBlocks from "../imports/CtaBlocks";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut } from "../lib/clerk-safe";
import AccountCta from "./AccountCta";
import { signUpUrl } from "../lib/clerk-env";
import { trackEvent } from "../lib/posthog";
import { NewsAnnouncementBanner } from "./NewsAnnouncementBanner";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {

  const features = [
    {
      title: "Brand Comparisons",
      description: "See how you stack up against competitors in AI responses"
    },
    {
      title: "Prompt Rankings",
      description: "Track your visibility across different AI queries"
    },
    {
      title: "Citation Analysis",
      description: "Understand what sources AI models are using"
    },
    {
      title: "Real-time Alerts",
      description: "Get notified when your brand ranking changes"
    }
  ];

  const testimonials = [
    {
      quote: "RankBee turned our AI blind spot into a spotlight-leads up 25%.",
      author: "Sarah Chen",
      role: "Startup Founder"
    },
    {
      quote: "Finally, a tool that makes AI optimization feel doable, not overwhelming.",
      author: "Marcus Rodriguez",
      role: "Marketing Director"
    },
    {
      quote: "We spotted our competitor advantage in week one. Game changer.",
      author: "Emma Thompson",
      role: "Agency Owner"
    }
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes borderShimmer {
          0% { box-shadow: inset 0 0 0 2px rgb(147, 51, 234); }
          50% { box-shadow: inset 0 0 0 2px rgb(244, 114, 182); }
          100% { box-shadow: inset 0 0 0 2px rgb(147, 51, 234); }
        }
      `}</style>
      <NewsAnnouncementBanner onPageChange={onPageChange} />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 mb-12">
            {/* Badge */}
            <div className="inline-block bg-purple-100 rounded-lg px-4 py-2">
              <p className="text-purple-600 text-sm font-medium">
                Proven in pilot - 10x improvement in ChatGPT visibility in 14 days
                <br />
              </p>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-5xl mx-auto">
              <p>
                <p>
                  Proven to Win in{" "}
                  <span style={{ color: "rgb(144, 19, 254)" }}>
                    AI Search
                  </span>
                </p>
              </p>
              <div><span></span></div>
            </h1>
            
            {/* Description */}
            <div className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              <p>We help companies grow organic visibility using AI-powered content and SEO.</p>
              <p>Whether you need fully managed growth, enterprise-scale automation, or self-serve tools - we meet you where you are.</p>
            </div>
            
            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedOut>
                <a
                  href={typeof window !== "undefined" ? `${signUpUrl}?redirect_url=${encodeURIComponent(window.location.href)}` : signUpUrl}
                  onClick={() => {
                    trackEvent('CTA Clicked', {
                      button_text: 'Start Free Trial',
                      location: 'homepage_hero',
                      variant: 'primary',
                      destination: 'sign-up'
                    });
                  }}
                >
                  <Button
                    size="lg"
                    className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 [animation:shimmer_2s_ease-in-out_infinite] hover:[animation-play-state:paused]"
                    style={{
                      background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s ease-in-out infinite',
                    }}
                  >
                    Start Free Trial
                  </Button>
                </a>
                <a
                  href="/demo"
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent('CTA Clicked', {
                      button_text: 'Book Demo',
                      location: 'homepage_hero',
                      variant: 'secondary',
                      destination: 'demo'
                    });
                    onPageChange('demo');
                  }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
                  >
                    Book Demo
                  </Button>
                </a>
              </SignedOut>

              <SignedIn>
                <AccountCta
                  location="homepage_hero"
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-3 text-lg"
                />
              </SignedIn>
            </div>
          </div>
          
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* RankBee Toolkit */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300" style={{animation: 'borderShimmer 2s ease-in-out infinite', boxShadow: 'inset 0 0 0 2px rgb(147, 51, 234)'}}>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">RankBee Toolkit</h3>
              <p className="text-gray-700 leading-relaxed">Self-serve content optimisation tools for teams and individual entrepreneurs who want speed and control. Create and optimise AI-ready, SEO-aware content to improve visibility across search engines and AI assistants.</p>
            </div>

            {/* RankBee Consulting */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300" style={{animation: 'borderShimmer 2s ease-in-out infinite', boxShadow: 'inset 0 0 0 2px rgb(147, 51, 234)'}}>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">Consulting</h3>
              <p className="text-gray-700 leading-relaxed">A fully managed SEO and AI visibility service for teams that want organic growth without managing tools or workflows. We handle content strategy, creation, and optimisation with human-supervised quality control. Built for businesses, agencies, SaaS platforms, and campaigns without in-house SEO or AI search expertise.</p>
            </div>

            {/* RankBee Enterprise */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 sm:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300" style={{animation: 'borderShimmer 2s ease-in-out infinite', boxShadow: 'inset 0 0 0 2px rgb(147, 51, 234)'}}>
              <h3 className="text-xl sm:text-2xl font-bold text-purple-600">Enterprise</h3>
              <p className="text-gray-700 leading-relaxed">An enterprise-grade content optimisation and automation solution for organisations operating at scale. Designed for teams that need programmatic content creation, multilingual optimisation, and AI visibility integrated directly into their existing systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Panel */}
      <div className="w-full">
        <CtaBlocks />
      </div>

      {/* Tagline Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Perfect for SEO and brand professionals, SMB and enterprises
          </h2>
        </div>
      </section>

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Footer CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">Get Your AI Visibility Score Today</h2>
          <p className="text-lg sm:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Discover how your brand performs in ChatGPT, Gemini, and Claude - and exactly how to improve it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignedOut>
              <a href={typeof window !== "undefined" ? `${signUpUrl}?redirect_url=${encodeURIComponent(window.location.href)}` : signUpUrl} onClick={() => {
                trackEvent('CTA Clicked', {
                  button_text: 'Start Free Trial',
                  location: 'homepage_footer',
                  variant: 'primary',
                  destination: 'sign-up'
                });
              }}>
                <Button
                  size="lg"
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style={{
                    background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(244, 217, 255), rgb(255, 255, 255))',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                    color: 'Purple',
                  }}
                >
                  Start Free Trial
                </Button>
              </a>
            </SignedOut>
            <SignedIn>
              <AccountCta
                location="homepage_footer"
                size="lg"
                className="bg-white text-cta hover:bg-gray-100 px-8"
              />
            </SignedIn>
            <a
              href="/demo"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('CTA Clicked', {
                  button_text: 'Book Demo',
                  location: 'homepage_footer',
                  variant: 'outline',
                  destination: 'demo'
                });
                onPageChange('demo');
              }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 text-base sm:text-lg py-2"
              >
                Book Demo
              </Button>
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
