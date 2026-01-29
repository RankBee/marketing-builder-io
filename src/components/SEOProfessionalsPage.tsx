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
              RankBee for <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Startups</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Perfect for individual entrepreneurs or early-stage startups just beginning to optimize their AI and GPT visibility.
            </p>

            <div className="pt-4 space-y-4 flex flex-col items-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900">£99</p>
                <p className="text-lg text-gray-600">per month</p>
              </div>
              <a
                href="https://rankbee.chargebee.com/pages/v4/nkuoGdRcipppYU0fhrXgCWBmWtgzv12E/details"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('CTA Clicked', {
                    button_text: 'Choose Plan',
                    location: 'startups_hero',
                    variant: 'primary',
                    destination: 'chargebee_pricing'
                  });
                }}
              >
                <button
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                >
                  Choose Plan
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
              What's included
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <ul className="text-lg text-gray-900 space-y-4">
              <li className="flex items-start">
                <span className="font-semibold">Content Writer:</span>
                <span className="ml-2">10 Content Generations per month</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold">Content Recommendation Engine</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold">Existing Content Optimization Engine</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold">500 AI Prompts tracking</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold">1 AI Model (ChatGPT)</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold">1 Brand</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ready to Optimize for AI?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pricing"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'View Pricing',
                    location: 'startups_cta',
                    variant: 'primary',
                    destination: 'pricing'
                  });
                  onPageChange('pricing');
                }}
              >
                <button
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s ease-in-out infinite',
                  }}
                >
                  View Pricing
                </button>
              </a>
              <a
                href="https://rankbee.chargebee.com/pages/v4/nkuoGdRcipppYU0fhrXgCWBmWtgzv12E/details"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('CTA Clicked', {
                    button_text: 'Choose Plan',
                    location: 'startups_cta',
                    variant: 'secondary',
                    destination: 'chargebee_pricing'
                  });
                }}
              >
                <button
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-base font-semibold text-purple-600 border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
                >
                  Choose Plan
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
