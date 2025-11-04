import { Clock, Video } from "lucide-react";
import { useEffect, useState } from "react";

interface DemoPageProps {
  onPageChange?: (page: string) => void;
}

export function DemoPage({ onPageChange }: DemoPageProps) {
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");

  useEffect(() => {
    const loadCalendly = () => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadCalendly);
      return () => {
        document.removeEventListener("DOMContentLoaded", loadCalendly);
      };
    } else {
      loadCalendly();
    }
  }, []);

  useEffect(() => {
    const detectLocation = () => {
      try {
        // Detect if user is from EU/UK
        const euCountries = ["GB", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "SE", "DK", "NO", "FI", "PL", "CZ", "IE"];
        
        // Try to get user's timezone or use a basic IP-based detection fallback
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const euTimeZones = ["Europe/London", "Europe/Dublin", "Europe/Paris", "Europe/Berlin", "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Stockholm", "Europe/Copenhagen", "Europe/Oslo", "Europe/Helsinki", "Europe/Warsaw", "Europe/Prague"];
        
        const isEU = euTimeZones.some(tz => timezone.includes(tz.split("/")[1])) || timezone.startsWith("Europe/");
        
        const euUrl = import.meta.env.VITE_CALENDLY_EU || "https://calendly.com/rankbee/demo-onboarding-clone";
        const othersUrl = import.meta.env.VITE_CALENDLY_OTHERS || "https://calendly.com/rankbee/onboarding";
        
        setCalendlyUrl(isEU ? euUrl : othersUrl);
      } catch (error) {
        console.error("Location detection error:", error);
        // Default to OTHERS if detection fails
        setCalendlyUrl(import.meta.env.VITE_CALENDLY_OTHERS || "https://calendly.com/rankbee/onboarding");
      }
    };

    detectLocation();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Book a Demo and Learn How to Improve <span className="text-purple-600">What AI Says About Your Brand</span>
            </h1>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Demo Booking Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Side: Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Book a demo with RankBee Team. We will demonstrate how your brand tracks across GenAI platforms and how to optimise on-site content and product feed for AI discovery.
                </p>

                {/* Details Box */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Duration: 30 Min</h3>
                      <p className="text-sm text-gray-600">A quick session tailored to your needs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                      <Video className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Web conferencing details provided upon confirmation</h3>
                      <p className="text-sm text-gray-600">You'll receive meeting details after booking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Calendly Embed */}
            <div className="flex-1 flex justify-center">
              {calendlyUrl && (
                <div
                  className="calendly-inline-widget w-full"
                  data-url={calendlyUrl}
                  style={{
                    minHeight: "700px"
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
