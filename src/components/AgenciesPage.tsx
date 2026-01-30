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
              RankBee <span className="relative inline-block px-1" style={{
                background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Consulting</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We handle your SEO and AI visibility end-to-end - so you don't have to.
            </p>

            <div className="pt-4 space-y-4 flex flex-col items-center">
              <a
                href="/contact#contact-channels"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Contact Us',
                    location: 'agencies_hero',
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
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">
              Fully Managed Organic Visibility
            </h2>
            <div className="text-base sm:text-lg text-black max-w-3xl mx-auto space-y-4">
              <p>RankBee Consulting is a fully managed organic growth service for companies that want results, not software.</p>
              <p>We combine strategic SEO, AI-first content optimisation, and hands-on execution to help your brand show up when customers ask search engines and AI assistants for answers.</p>
              <p>Behind every engagement is RankBee's Content Optimisation Engine — the same system powering our enterprise automation and self-serve tools — applied with human expertise, quality control, and accountability.</p>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-lg border border-purple-200 p-8 w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">Content Writer</h4>
                    <p className="text-gray-600 text-sm mt-1">300 Content Generations per month</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">Content Recommendation Engine</h4>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">Existing Content Optimization Engine</h4>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">AI Prompts Tracking</h4>
                    <p className="text-gray-600 text-sm mt-1">1500 AI Prompts tracking</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">AI Models</h4>
                    <p className="text-gray-600 text-sm mt-1">2 AI Models (Google AIO, ChatGPT)</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow duration-300 w-full">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">Brands</h4>
                    <p className="text-gray-600 text-sm mt-1">Unlimited Brands</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
