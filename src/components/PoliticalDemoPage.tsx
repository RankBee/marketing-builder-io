import { Clock, Video, Shield, Target } from "lucide-react";
import { useCalendly } from "../lib/useCalendly";
import { trackEvent } from "../lib/posthog";
import { useEffect } from "react";

interface PoliticalDemoPageProps {
  onPageChange?: (page: string) => void;
}

export function PoliticalDemoPage({ onPageChange }: PoliticalDemoPageProps) {
  const calendlyUrl = useCalendly({
    hideHeaders: true,
    primaryColor: "#7C3AED",
    textColor: "#1F2937",
    backgroundColor: "#FFFFFF",
    hideCookieSettings: true,
    overrideUrl: "https://calendly.com/rankbee/political-campaigns"
  }, 'political_demo_page');

  useEffect(() => {
    trackEvent('Political Demo Page Viewed');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100/30 to-purple-50">
      <section className="pb-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-0 lg:px-8">
          <style>{`
            .demo-content-wrapper {
              background-color: white;
              backdrop-filter: blur(8px);
              padding: 1.5rem;
              border-top: 1px solid var(--color-purple-100);
              border-bottom: 1px solid var(--color-purple-100);
            }
            @media (min-width: 640px) {
              .demo-content-wrapper {
                padding: 2rem;
              }
            }
            @media (min-width: 1024px) {
              .demo-content-wrapper {
                border-radius: 1rem;
                box-shadow: 0 5px 5px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                padding: 2.5rem;
                border: 1px solid var(--color-purple-100);
              }
            }
          `}</style>
          <div className="demo-content-wrapper">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left Side: Content */}
              <div className="flex-1 lg:max-w-xl">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  <Shield className="w-4 h-4" />
                  For Political Campaigns
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 leading-tight">
                  Book Your <span className="text-purple-600">Campaign Strategy Call</span>
                </h1>

                <div className="description-box bg backdrop-blur-sm p-4 sm:p-6 rounded-lg mb-8 border border-purple-200">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    In this 30-minute call, our election team will show you exactly how your campaign appears across AI platforms like ChatGPT, Claude, and Gemini — and what it takes to control that narrative before your opponents do.
                  </p>
                </div>

                {/* What to expect */}
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">What we'll cover</p>
                  <div className="flex flex-col gap-2">
                    {[
                      "Your campaign's current AI visibility score",
                      "Where voters are finding political info via AI",
                      "A tailored strategy to own your AI narrative",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Boxes */}
                <div className="flex flex-col gap-3 items-start w-full">
                  <div className="detail-box bg-purple-100 rounded-md px-8 py-3 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-700 flex-shrink-0" />
                    <p className="text-purple-700 font-semibold text-base">Duration: 30 Min</p>
                  </div>
                  <div className="detail-box bg-purple-100 rounded-md px-8 py-3 flex items-center gap-3">
                    <Video className="w-6 h-6 text-purple-700 flex-shrink-0" />
                    <p className="text-purple-700 font-semibold text-base">Web conferencing details <br/>provided upon confirmation</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Calendly Embed */}
              <div className="calendly-container w-[400px]">
                {calendlyUrl && (
                  <>
                    <style>{`
                      @media (max-width: 1023px) {
                        .calendly-container {
                          width: 100% !important;
                        }
                        .calendly-container .calendly-inline-widget {
                          width: 100% !important;
                        }
                        .detail-box {
                          width: 100% !important;
                        }
                        .description-box {
                          display: none !important;
                        }
                      }
                      @media (min-width: 1024px) {
                        .detail-box {
                          width: 320px;
                        }
                      }
                    `}</style>
                    <div
                      className="calendly-inline-widget rounded-2xl border border-purple-200 bg-white"
                      data-url={calendlyUrl}
                      style={{
                        width: "400px",
                        minHeight: "600px",
                        height: "610px",
                        overflow: "hidden"
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
