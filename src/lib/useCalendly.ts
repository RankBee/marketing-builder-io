import { useState, useEffect } from "react";
import { trackEvent } from "../lib/posthog";

interface CalendlyConfig {
  primaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  hideHeaders?: boolean;
  hideCookieSettings?: boolean;
}

const normalizeHex = (color: string): string => {
  if (!color) return "";
  const hex = color.replace(/^#/, "");
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return hex;
  }
  return "";
};

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLE_ID = "rankbee-calendly-styles";

export function useCalendly(config: CalendlyConfig = {}, pageName: string = 'unknown_page') {
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");

  const {
    primaryColor = "#7C3AED",
    textColor = "#1F2937",
    backgroundColor = "#FFFFFF",
    hideHeaders = true,
    hideCookieSettings = true,
  } = config;

  useEffect(() => {
    // 1. Script Injection Guard
    const loadCalendly = () => {
      // Check if script is already present
      if (document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) {
        return;
      }

      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        trackEvent('Calendly Widget Loaded', {
          location: pageName
        });
      };
      document.body.appendChild(script);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadCalendly);
    } else {
      loadCalendly();
    }

    return () => {
      if (document.readyState === "loading") {
        document.removeEventListener("DOMContentLoaded", loadCalendly);
      }
    };
  }, [pageName]);

  useEffect(() => {
    // 2. Style Injection Guard
    if (document.getElementById(CALENDLY_STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = CALENDLY_STYLE_ID;
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

    // No cleanup: we leave the styles once injected to avoid FOUC on re-navigation
    // or complex ref-counting logic, since these styles are scoped/global for calendly.
  }, []);

  useEffect(() => {
    const detectLocation = () => {
      try {
        // Detect if user is from EU/UK
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const euTimeZones = [
          "Europe/London", "Europe/Dublin", "Europe/Paris", "Europe/Berlin",
          "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Stockholm",
          "Europe/Copenhagen", "Europe/Oslo", "Europe/Helsinki", "Europe/Warsaw",
          "Europe/Prague"
        ];
        
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
          page: pageName
        });
      } catch (error) {
        console.error("Location detection error:", error);
        // Default to OTHERS if detection fails
        const defaultUrl = import.meta.env.VITE_CALENDLY_OTHERS || "https://calendly.com/rankbee/onboarding";
        setCalendlyUrl(defaultUrl);
      }
    };

    detectLocation();
  }, [pageName, primaryColor, textColor, backgroundColor, hideHeaders, hideCookieSettings]);

  return calendlyUrl;
}
