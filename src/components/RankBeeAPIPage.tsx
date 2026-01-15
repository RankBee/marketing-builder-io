import { Button } from "./ui/button";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

interface RankBeeAPIPageProps {
  onPageChange: (page: string) => void;
}

export function RankBeeAPIPage({ onPageChange }: RankBeeAPIPageProps) {
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
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={typeof window !== "undefined" ? `${signUpUrl}?redirect_url=${encodeURIComponent(window.location.href)}` : signUpUrl}
                onClick={() => {
                  trackEvent('CTA Clicked', {
                    button_text: 'Start Free Trial',
                    location: 'rankbee_api_hero',
                    variant: 'primary',
                    destination: 'sign-up'
                  });
                }}
              >
                <Button
                  size="lg"
                  className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                    location: 'rankbee_api_hero',
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
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Plug Directly Into Your Workflow
            </h2>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto">
              Designed for SEO and product teams who need results. Build to plug directly into existing CMS and SEO workflows, RankBee makes it easy to scale AI-ready content across thousands of pages, markets, and languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimize at scale</h3>
              <p className="text-gray-600 mb-6">
                Whether you're optimising product pages, category pages, guides, or localised content, RankBee API helps you:
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start gap-3 p-4 rounded-lg bg-purple-100 border-l-4 border-purple-600">
                  <span className="text-purple-600 font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-900 font-semibold">Increase visibility in AI-generated answers</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-lg bg-purple-100 border-l-4 border-purple-600">
                  <span className="text-purple-600 font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-900 font-semibold">Protect traffic and brand presence as clicks decline</span>
                </li>
                <li className="flex items-start gap-3 p-4 rounded-lg bg-purple-100 border-l-4 border-purple-600">
                  <span className="text-purple-600 font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-900 font-semibold">Move faster than competitors still optimising only for Google's blue links</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Access</h3>
              <p className="text-gray-600 mb-6">
                Our API is available for enterprise customers. Contact our team to discuss integration options and pricing.
              </p>
              <a href="/demo" onClick={(e) => {
                e.preventDefault();
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
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join teams who are already optimizing content for AI visibility at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={typeof window !== "undefined" ? `${signUpUrl}?redirect_url=${encodeURIComponent(window.location.href)}` : signUpUrl}
              onClick={() => {
                trackEvent('CTA Clicked', {
                  button_text: 'Start Free Trial',
                  location: 'rankbee_api_footer',
                  variant: 'primary',
                  destination: 'sign-up'
                });
              }}
            >
              <Button
                size="lg"
                className="cursor-pointer rounded-md relative overflow-hidden px-8 py-2 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
            <a
              href="/demo"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('CTA Clicked', {
                  button_text: 'Book Demo',
                  location: 'rankbee_api_footer',
                  variant: 'secondary',
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
  );
}
