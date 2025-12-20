import { Clock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "../lib/posthog";

interface OnboardingMeetingPageProps {
  heading?: string;
  description?: string;
}

export function OnboardingMeetingPage({
  heading = "Your brand is special.",
  description = `We’ve identified that your brand falls into a category that demands extra attention.
The complexity of your business and the way customers find it means that your Rankbee onboarding needs to be hand-tuned by our expert team. Choose a time from the calendar to the right to speak with an onboarding specialist. This personal service costs you nothing extra and will dramatically improve performance compared to "once-size-fits-all" approaches.`
}: OnboardingMeetingPageProps) {
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");

  // Calendar customization options
  const hideHeaders = true;
  const primaryColor = "#7C3AED"; // Purple-600
  const textColor = "#1F2937"; // Gray-800
  const backgroundColor = "#FFFFFF"; // White
  const hideCookieSettings = true;

  const normalizeHex = (color: string): string => {
    if (!color) return "";
    // Remove # if present
    const hex = color.replace(/^#/, "");
    // Validate hex color
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return hex;
    }
    return "";
  };

  useEffect(() => {
    const loadCalendly = () => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        trackEvent('Calendly Widget Loaded', {
          location: 'onboarding_meeting_page'
        });
      };
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

    // Add custom CSS for Calendly styling
    const style = document.createElement("style");
    style.textContent = `
      /* Calendar container styling */
      .calendly-inline-widget iframe {
        border-radius: 1rem !important;
      }

      /* Style the calendar dates */
      .calendly-inline-widget {
        --calendly-primary-color: #7C3AED !important;
        --calendly-hover-color: #EDE9FE !important;
      }

      /* Custom calendar styling - these selectors target Calendly's internal structure */
      [data-container="calendar"] {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      }

      /* Calendar header */
      [data-container="calendar-header"] h2 {
        color: #1e3a8a !important;
        font-weight: 600 !important;
        font-size: 1.5rem !important;
      }

      /* Month/Year text */
      [data-container="calendar-month"] {
        color: #1e3a8a !important;
        font-weight: 600 !important;
        font-size: 1.125rem !important;
      }

      /* Navigation arrows */
      [data-container="calendar-nav"] button {
        color: #7C3AED !important;
      }

      /* Day labels (MON, TUE, etc) */
      [data-container="days-header"] span {
        color: #4B5563 !important;
        font-weight: 600 !important;
        font-size: 0.875rem !important;
        text-transform: uppercase !important;
      }

      /* Available dates - purple with light background */
      [data-container="calendar"] button[data-is-available="true"] {
        background-color: #EDE9FE !important;
        color: #7C3AED !important;
        font-weight: 600 !important;
        border-radius: 50% !important;
      }

      /* Hover state for available dates */
      [data-container="calendar"] button[data-is-available="true"]:hover {
        background-color: #DDD6FE !important;
        color: #6D28D9 !important;
      }

      /* Unavailable dates */
      [data-container="calendar"] button[data-is-available="false"] {
        color: #D1D5DB !important;
      }

      /* Selected date */
      [data-container="calendar"] button[aria-pressed="true"] {
        background-color: #7C3AED !important;
        color: white !important;
      }

      /* Time zone section */
      [data-container="timezone"] {
        margin-top: 1.5rem !important;
      }

      [data-container="timezone"] label {
        color: #1e3a8a !important;
        font-weight: 600 !important;
        font-size: 1rem !important;
      }

      /* Time zone dropdown */
      [data-container="timezone"] select {
        border: 1px solid #E5E7EB !important;
        border-radius: 0.5rem !important;
        padding: 0.5rem !important;
        color: #1F2937 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const detectLocation = () => {
      try {
        // Detect if user is from EU/UK
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const euTimeZones = ["Europe/London", "Europe/Dublin", "Europe/Paris", "Europe/Berlin", "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Stockholm", "Europe/Copenhagen", "Europe/Oslo", "Europe/Helsinki", "Europe/Warsaw", "Europe/Prague"];
        
        const isEU = euTimeZones.some(tz => timezone.includes(tz.split("/")[1])) || timezone.startsWith("Europe/");
        
        let baseUrl = isEU 
          ? (import.meta.env.VITE_CALENDLY_EU || "https://calendly.com/rankbee/demo-onboarding-clone")
          : (import.meta.env.VITE_CALENDLY_OTHERS || "https://calendly.com/rankbee/onboarding");
        
        // Apply customization options
        const embedUrl = (() => {
          if (!baseUrl) return "";
          try {
            const u = new URL(baseUrl);
            if (hideHeaders) {
              u.searchParams.set("hide_event_type_details", "1");
            }
            const pc = normalizeHex(primaryColor);
            if (pc) u.searchParams.set("primary_color", pc);
            const tc = normalizeHex(textColor);
            if (tc) u.searchParams.set("text_color", tc);
            const bc = normalizeHex(backgroundColor);
            if (bc) u.searchParams.set("background_color", bc);
            if (hideCookieSettings) {
              u.searchParams.set("hide_gdpr_banner", "1");
            }
            return u.toString();
          } catch {
            // Fallback if URL constructor fails (e.g., relative URL)
            const params: string[] = [];
            if (hideHeaders) params.push("hide_event_type_details=1");
            const pc = normalizeHex(primaryColor);
            if (pc) params.push(`primary_color=${pc}`);
            const tc = normalizeHex(textColor);
            if (tc) params.push(`text_color=${tc}`);
            const bc = normalizeHex(backgroundColor);
            if (bc) params.push(`background_color=${bc}`);
            if (hideCookieSettings) params.push("hide_gdpr_banner=1");
            if (!params.length) return baseUrl;
            const sep = baseUrl.includes("?") ? "&" : "?";
            return `${baseUrl}${sep}${params.join("&")}`;
          }
        })();
        
        setCalendlyUrl(embedUrl);
        
        // Track which calendly variant user is seeing
        trackEvent('Calendly Region Detected', {
          region: isEU ? 'EU' : 'Other',
          timezone: timezone,
          calendly_url: baseUrl,
          page: 'onboarding_meeting'
        });
      } catch (error) {
        console.error("Location detection error:", error);
        // Default to OTHERS if detection fails
        const defaultUrl = import.meta.env.VITE_CALENDLY_OTHERS || "https://calendly.com/rankbee/onboarding";
        setCalendlyUrl(defaultUrl);
      }
    };

    detectLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100/30 to-purple-50">
      {/* Main Content Section */}
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start" >
              {/* Left Side: Content */}
              <div className="flex-1 lg:max-w-xl" >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 leading-tight">
                  {heading}
                </h1>
                
                <div className="description-box bg backdrop-blur-sm p-4 sm:p-6 rounded-lg mb-8 border border-purple-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">We've identified that your brand falls into a category that demands extra attention.</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                    {description}
                  </p>
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
