import { useEffect } from "react";

interface TermsOfServicePageProps {
  onPageChange?: (page: string) => void;
}

export function TermsOfServicePage({ onPageChange }: TermsOfServicePageProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://app.termly.io/embed-policy.min.js";
      script.async = true;
      script.id = "embed-policy";
      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      const existingScript = document.getElementById("embed-policy");
      if (existingScript && document.head.contains(existingScript)) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Terms of Service for <span className="text-purple-600">RankBee</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using our service.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <div
            // @ts-expect-error Termly embed element
            name="termly-embed"
            data-id="e052567f-d36c-47cc-95ba-e439f0f16763"
            className="min-h-[70vh] bg-white border border-gray-200 rounded-lg p-8 sm:p-10 lg:p-12 shadow-sm"
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>
    </div>
  );
}