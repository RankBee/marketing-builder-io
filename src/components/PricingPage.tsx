import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Check, X } from "lucide-react";
import { useState } from "react";

interface PricingPageProps {
  onPageChange: (page: string) => void;
}

export function PricingPage({ onPageChange }: PricingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Essential",
      description: "Perfect if you're just curious—track one category and see quick lifts",
      monthlyPrice: 129,
      annualPrice: 1290, // 10 months
      bestFor: "Solo founders dipping toes in AI",
      features: {
        categories: "1",
        subCategories: "3",
        bots: "12",
        promptsPerBot: "500",
        citationCredits: "250",
        apiAccess: false,
        crawlFrequency: "Weekly",
        support: "Email"
      },
      highlighted: false
    },
    {
      name: "Premium",
      description: "Unlock deeper dives for real strategy",
      monthlyPrice: 469,
      annualPrice: 4690, // 10 months
      bestFor: "Growing teams expanding reach",
      features: {
        categories: "3",
        subCategories: "9",
        bots: "All",
        promptsPerBot: "1,500",
        citationCredits: "500",
        apiAccess: false,
        crawlFrequency: "Weekly",
        support: "Priority Chat"
      },
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "Tailored for you, because one-size doesn't cut it",
      monthlyPrice: null,
      annualPrice: null,
      bestFor: "Big orgs needing bespoke setup",
      features: {
        categories: "Unlimited",
        subCategories: "Unlimited",
        bots: "All",
        promptsPerBot: "Unlimited",
        citationCredits: "Unlimited",
        apiAccess: true,
        crawlFrequency: "Daily/Custom",
        support: "Dedicated Manager"
      },
      highlighted: false
    }
  ];

  const features = [
    "Categories",
    "Sub-Categories",
    "Bots (AI Models)",
    "Prompts per Bot",
    "Citation Credits",
    "API Access",
    "Crawl Frequency",
    "Support"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Plans That Fit Your <span className="text-purple-600">Growth</span>, No Surprises
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start small or go big—unlimited users, weekly crawls, and insights that pay off fast. First month free on all.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Whether you're testing waters or scaling ops, our tiers let you track AI mentions without breaking the bank. Agencies? Hit us up for custom deals.
              </p>
            </div>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 flex-wrap">
              <span className={`text-sm sm:text-base ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className={`text-sm sm:text-base ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Annual</span>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs sm:text-sm">
                Save 2 months
              </Badge>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-gray-900">Find Your Fit</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.highlighted ? 'border-purple-500 shadow-lg lg:scale-105' : 'border-gray-200'}`}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white hover:bg-purple-600 text-xs sm:text-sm">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-6 sm:pb-8">
                  <CardTitle className="text-xl sm:text-2xl text-gray-900">{plan.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4 sm:mt-6">
                    {plan.monthlyPrice ? (
                      <div>
                        <span className="text-3xl sm:text-4xl text-gray-900">
                          ${isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500">/month</span>
                        {isAnnual && (
                          <div className="text-xs sm:text-sm text-green-600 mt-1">
                            Billed annually (${plan.annualPrice})
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xl sm:text-2xl text-gray-900">Custom</div>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600 mt-2">
                    Best for: {plan.bestFor}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Categories</span>
                      <span className="text-gray-900">{plan.features.categories}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sub-Categories</span>
                      <span className="text-gray-900">{plan.features.subCategories}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">AI Models</span>
                      <span className="text-gray-900">{plan.features.bots}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prompts per Bot</span>
                      <span className="text-gray-900">{plan.features.promptsPerBot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Citation Credits</span>
                      <span className="text-gray-900">{plan.features.citationCredits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">API Access</span>
                      {plan.features.apiAccess ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Crawl Frequency</span>
                      <span className="text-gray-900">{plan.features.crawlFrequency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Support</span>
                      <span className="text-gray-900">{plan.features.support}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlighted 
                        ? 'bg-cta hover:bg-cta/90 text-cta-foreground' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {plan.monthlyPrice ? 'Start Free' : 'Contact Sales'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl mb-8 text-center text-gray-900">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg mb-2 text-gray-900">Why no API on lower tiers?</h4>
                  <p className="text-gray-600">We prioritize core insights first. Most users find our dashboard has everything they need to track and improve their AI visibility.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg mb-2 text-gray-900">What's included in the free month?</h4>
                  <p className="text-gray-600">Full access to all features in your chosen plan, including weekly crawls, unlimited users, and all AI model tracking.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg mb-2 text-gray-900">Can I change plans anytime?</h4>
                  <p className="text-gray-600">Absolutely! Upgrade or downgrade with no penalties. Your data stays safe, and changes take effect immediately.</p>
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
          <a href="https://rankbee.ai/meet">
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
