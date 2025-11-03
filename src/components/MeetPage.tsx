import { useEffect, useState } from "react";

interface MeetPageProps {
  onPageChange: (page: string) => void;
}

// EU and UK country codes
const EU_UK_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
  "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "UK"
];

function getRegionFromLocale(): string {
  try {
    // Get the user's locale
    const locale = navigator.language || navigator.languages?.[0] || "";
    
    // Extract country code from locale (e.g., "de-DE" -> "DE")
    const countryCode = locale.split("-")[1]?.toUpperCase() || locale.toUpperCase();
    
    return countryCode;
  } catch {
    return "";
  }
}

function isEUorUK(countryCode: string): boolean {
  return EU_UK_COUNTRIES.includes(countryCode);
}

export function MeetPage({ onPageChange }: MeetPageProps) {
  const [calendlyUrl, setCalendlyUrl] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Determine which Calendly URL to use
    const countryCode = getRegionFromLocale();
    const isEU = isEUorUK(countryCode);
    
    const euUrl = import.meta.env.VITE_CALENDLY_EU || "";
    const othersUrl = import.meta.env.VITE_CALENDLY_OTHERS || "";
    
    const selectedUrl = isEU ? euUrl : othersUrl;
    setCalendlyUrl(selectedUrl);
    setLoaded(true);

    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script
      document.body.removeChild(script);
    };
  }, []);

  if (!loaded || !calendlyUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Let's Meet
            </h1>
            <p className="text-lg text-gray-600">
              Schedule a demo with our team to see RankBee in action
            </p>
          </div>
          
          <div 
            className="calendly-inline-widget"
            data-url={calendlyUrl}
            style={{ minHeight: "700px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
