import { useEffect } from "react";
import { Button } from "./ui/button";
import { trackEvent } from "../lib/posthog";
import { signUpUrl } from "../lib/clerk-env";

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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600">
              Connect With Voters Where They Search
            </h2>
            <p className="text-lg sm:text-xl text-black max-w-3xl mx-auto">
              Voters increasingly turn to AI assistants for political information. RankBee helps campaigns ensure their message is visible, accurate, and consistent across AI-driven search platforms like ChatGPT, Claude, and Gemini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitor Your Presence</h3>
              <p className="text-gray-600 mb-6">
                RankBee allows campaigns to understand how they currently appear across AI platforms and identify gaps or risks early.
              </p>
              <p className="text-gray-600 mb-6">
                Our visibility audit enables rapid response, message correction, and proactive optimisation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect with Voters</h3>
              <p className="text-gray-600 mb-6">
                Reach voters where they get their information about your campaign and position on key issues.
              </p>
              <div className="flex justify-center">
                <a href="/contact" onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Contact Us',
                    location: 'political_campaigns_cta',
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
