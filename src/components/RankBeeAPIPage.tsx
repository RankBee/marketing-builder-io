import { useEffect } from "react";
import { Button } from "./ui/button";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

interface RankBeeAPIPageProps {
  onPageChange: (page: string) => void;
}

export function RankBeeAPIPage({ onPageChange }: RankBeeAPIPageProps) {
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
              }}>API</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The RankBee API helps teams create and update content that AI search tools surface, reference, and trust - at scale and without changing how your team works.
            </p>

            <div className="pt-4">
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Book Demo',
                    location: 'rankbee_api_hero',
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
              Plug Directly Into Your Workflow
            </h2>
            <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
              Designed for SEO and product teams who need results. Build to plug directly into existing CMS and SEO workflows, RankBee makes it easy to scale AI-ready content across thousands of pages, markets, and languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimize at scale</h3>
              <p className="text-gray-600 mb-6">
                Whether you're optimizing product pages, category pages, guides, or localized content, RankBee API helps you:
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Increase visibility in AI-generated answers.</li>
                <li>• Protect traffic and brand presence as clicks decline.</li>
                <li>• Move faster than competitors still optimizing only for Google's blue links.</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Access</h3>
              <p className="text-gray-600 mb-6">
                Our API is available for enterprise customers. Contact our team to discuss integration options and pricing.
              </p>
              <div className="flex justify-center">
                <a href="/contact" onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Contact Us',
                    location: 'rankbee_api_request_access',
                    variant: 'primary',
                    destination: 'contact'
                  });
                  onPageChange('contact');
                }} className="inline-block relative overflow-hidden px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" style={{
                  background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(244, 114, 182), rgb(147, 51, 234))',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s ease-in-out infinite',
                  color: 'white'
                }}>
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
