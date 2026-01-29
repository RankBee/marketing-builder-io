import { useEffect } from "react";
import { Button } from "./ui/button";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

interface SEOProfessionalsPageProps {
  onPageChange: (page: string) => void;
}

export function SEOProfessionalsPage({ onPageChange }: SEOProfessionalsPageProps) {
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
              RankBee <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Pro</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The perfect plan for SEO and brand professionals. Get full AI visibility tracking, 10 monthly content credits, and everything you need to optimize for ChatGPT, Claude, Gemini, and beyond. First 14 days free.
            </p>

            <div className="pt-4">
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Book Demo',
                    location: 'seo_professionals_hero',
                    variant: 'primary',
                    destination: 'demo'
                  });
                  onPageChange('demo');
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
                  Book Demo
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">
              Optimize for the AI Era
            </h2>
            <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
              As AI assistants become the primary search interface, RankBee helps SEO and brand professionals maintain visibility and control their narrative across emerging platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track AI Visibility</h3>
              <p className="text-gray-600 mb-6">
                Monitor your brand's appearance in AI-generated answers across:
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• ChatGPT and OpenAI integrations</li>
                <li>• Google Gemini and extended AI platforms</li>
                <li>• Claude and other enterprise AI models</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h3>
              <p className="text-gray-600 mb-6">
                Join leading brands optimizing for AI visibility. Start tracking your citations and competitive position today.
              </p>
              <div className="flex justify-center">
                <a href="/demo" onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Book Demo',
                    location: 'seo_professionals_cta',
                    variant: 'primary',
                    destination: 'demo'
                  });
                  onPageChange('demo');
                }} className="inline-block relative overflow-hidden px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" style={{
                  background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s ease-in-out infinite',
                  color: 'white'
                }}>
                  Book Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
