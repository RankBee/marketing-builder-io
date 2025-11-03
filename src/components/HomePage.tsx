import { useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import dashboardImage from "figma:asset/d4a12367347ed2aa1674106dece510531cd8cb06.png";
import { CaseStudySection } from "./CaseStudySection";
import CtaBlocks from "../imports/CtaBlocks";
import HowItWorks from "../imports/HowItWorks";
import GptPanel from "../imports/GptPanel";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut, SafeUserButton, useOrgOnboardingState } from "../lib/clerk-safe";
import { dashboardUrl, onboardRedirectUrl } from "../lib/clerk-env";
import { trackHomepageViewed } from "../lib/analytics";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { onboarded, loaded } = useOrgOnboardingState();

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
      quote: "RankBee turned our AI blind spot into a spotlight—leads up 25%.",
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8 mb-12">
            {/* Badge */}
            <div className="inline-block bg-purple-100 rounded-lg px-4 py-2">
              <p className="text-purple-600 text-sm font-medium">
                Proven in pilot — 10x in 14 days
              </p>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-5xl mx-auto">
              10x Improvement in <span className="text-purple-600">ChatGPT</span> Visibility in 14 Days
            </h1>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your content might be invisible to AI. We fix that. Our optimization engine rewrites and tests your pages so ChatGPT, Claude, and Gemini are more likely to mention your brand when customers ask.
            </p>
            
            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SignedOut>
                <Button
                  onClick={() => onPageChange("demo")}
                  size="lg"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-3 text-lg"
                >
                  Run Free Visibility Test
                </Button>
                <a href="https://rankbee.ai/meet">
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
                {loaded ? (
                  <div className="flex items-center gap-3">
                    <SafeUserButton showName />
                    {onboarded ? (
                      <a href={dashboardUrl}>
                        <Button
                          size="lg"
                          className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-3 text-lg"
                        >
                          View Your Dashboard
                        </Button>
                      </a>
                    ) : (
                      <a href={onboardRedirectUrl}>
                        <Button
                          size="lg"
                          className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-3 text-lg"
                        >
                          Complete Setup
                        </Button>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <SafeUserButton showName />
                  </div>
                )}
              </SignedIn>
            </div>
          </div>
          
          {/* Dashboard Preview Image */}
          <div className="mt-12">
            <img 
              src={dashboardImage} 
              alt="RankBee Dashboard Interface showing coverage metrics, competitive analysis, and brand rankings" 
              className="w-full max-w-[1200px] mx-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Panel */}
      <div className="w-full">
        <CtaBlocks />
      </div>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />
        </div>
      </section>

      {/* GPT Panel Section */}
      <GptPanel />

      {/* Case Study Section */}
      <CaseStudySection />

      {/* Footer CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">Get Your AI Visibility Score Today</h2>
          <p className="text-lg sm:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Discover how your brand performs in ChatGPT, Gemini, and Claude — and exactly how to improve it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-cta hover:bg-gray-100 px-6 sm:px-8 text-base sm:text-lg"
            >
              Run Free Visibility Test
            </Button>
            
          </div>
        </div>
      </section>
    </div>
  );
}
