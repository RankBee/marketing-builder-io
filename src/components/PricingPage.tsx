import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useEffect } from "react";
import { trackEvent as trackGTMEvent } from "../lib/gtm";
import { trackEvent } from "../lib/posthog";

interface PricingPageProps {
  onPageChange: (page: string) => void;
}

export function PricingPage({ onPageChange }: PricingPageProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Wait for DOM to be ready before loading ChargeBee
    const loadChargeBee = () => {
      const script = document.createElement("script");
      script.src = "https://js.chargebee.com/v2/chargebee.js";
      script.async = true;
      script.onload = async () => {
        try {
          const chargebee = (window as any).Chargebee.init({
            site: "rankbee",
          });
          const pricingTable = await chargebee.pricingTable();
          pricingTable.init();
          
          // Add click tracking to ChargeBee pricing table
          // Use event delegation to catch clicks on dynamically loaded buttons
          setTimeout(() => {
            const pricingContainer = document.getElementById('chargebee-pricing-table');
            if (pricingContainer) {
              pricingContainer.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                // Check if clicked element or parent is a subscribe/buy button
                const button = target.closest('button, a[data-cb-type="checkout"]');
                if (button) {
                  const buttonText = button.textContent?.trim() || 'Subscribe';
                  
                  // Track in both GTM and PostHog
                  trackGTMEvent('Pricing Click on Subscription', {
                    page: 'pricing',
                  });
                  
                  trackEvent('Plan Selected', {
                    location: 'pricing_page',
                    button_text: buttonText,
                    interaction_type: 'chargebee_table'
                  });
                }
              });
            }
          }, 1000); // Wait for ChargeBee to render
        } catch (error) {
          console.error("ChargeBee initialization error:", error);
        }
      };
      script.onerror = () => {
        console.error("Failed to load ChargeBee script");
      };
      document.head.appendChild(script);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadChargeBee);
      return () => {
        document.removeEventListener("DOMContentLoaded", loadChargeBee);
      };
    } else {
      loadChargeBee();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Plans That Fit Your <span className="text-purple-600">Growth</span>, No Surprises
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start small or go big-unlimited users, weekly crawls, and insights that pay off fast. First 14 days free on all.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Whether you're testing waters or scaling content operations, our tiers let you optimize your content for AI and track performance without breaking the bank. Agencies? Hit us up for custom deals.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section> */}

      {/* Pricing Table */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" />

          <div
            id="chargebee-pricing-table"
            data-name="chargebee-pricing-table"
            data-pricing-table-site="01K71J9W9RW0THGY5E90GSH62X"
            data-pricing-table-id="01K7P6EN1ZASANTYMEYW7WY5YJ"
            data-pricing-table-viewport-default-height="1200px"
            data-pricing-table-auto-select-local-currency="true"
            data-pricing-table-show-currency-dropdown="false"
            style={{
              
              display: "block",
              width: "100%"
            }}
          ></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg mb-2 text-gray-900">What's included in the free 14 days?</h4>
                  <p className="text-gray-600">You get a full tracking package to monitor your AI visibility across all platforms, plus 10 content creation credits to start optimizing your content for AI discovery right away.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg mb-2 text-gray-900">What happens if I cancel?</h4>
                  <p className="text-gray-600">We offer pro-rated refunds on cancellations. You'll only pay for the time you've used, making it risk-free to try RankBee.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-6">Not Sure? Book a Demo to Test Drive</h2>
          <p className="text-xl mb-8 text-purple-100">
            See RankBee in action with your own brand data in just 20 minutes.
          </p>
          <a
            href="/demo"
            onClick={(e) => {
              e.preventDefault();
              trackEvent('CTA Clicked', {
                button_text: 'Book Your Demo',
                location: 'pricing_page_footer',
                variant: 'secondary',
                destination: 'demo'
              });
              onPageChange('demo');
            }}
          >
            <Button
              size="lg"
              className="bg-white text-cta hover:bg-gray-100 px-8"
            >
              Book Your Demo
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
