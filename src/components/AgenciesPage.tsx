import { useEffect } from "react";
import { Button } from "./ui/button";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

interface AgenciesPageProps {
  onPageChange: (page: string) => void;
}

export function AgenciesPage({ onPageChange }: AgenciesPageProps) {
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
              Solutions for <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Agencies</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Scale AI optimization across your entire client portfolio. Offer new AI visibility services and help your clients dominate AI search rankings.
            </p>

            <div className="pt-4">
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Book Demo',
                    location: 'agencies_hero',
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

      {/* What's Included Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              What's Included
            </h2>
          </div>

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
                <p className="text-gray-600 text-sm mt-1">300 Content Generations per month</p>
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
                <h3 className="text-lg font-semibold text-gray-900">Content Recommendation Engine</h3>
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
                <h3 className="text-lg font-semibold text-gray-900">Existing Content Optimization Engine</h3>
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
                <p className="text-gray-600 text-sm mt-1">1500 AI Prompts tracking</p>
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
                <h3 className="text-lg font-semibold text-gray-900">AI Models</h3>
                <p className="text-gray-600 text-sm mt-1">2 AI Models (Google AIO, ChatGPT)</p>
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
                <h3 className="text-lg font-semibold text-gray-900">Brands</h3>
                <p className="text-gray-600 text-sm mt-1">Unlimited Brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
