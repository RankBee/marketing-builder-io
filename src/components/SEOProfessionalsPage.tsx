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
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              What's included
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Content Writer</h3>
                  <p className="text-gray-600 text-sm mt-1">10 Content Generations per month</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Content Recommendation</h3>
                  <p className="text-gray-600 text-sm mt-1">AI-powered suggestions</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">Content Optimization</h3>
                  <p className="text-gray-600 text-sm mt-1">Optimize existing content</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">AI Prompts Tracking</h3>
                  <p className="text-gray-600 text-sm mt-1">500 prompts tracked</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">AI Model Access</h3>
                  <p className="text-gray-600 text-sm mt-1">ChatGPT integration</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">1 Brand</h3>
                  <p className="text-gray-600 text-sm mt-1">Single brand management</p>
                </div>
              </div>
            </div>
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
