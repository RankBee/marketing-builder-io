import { useEffect } from "react";

interface PrivacyPolicyPageProps {
  onPageChange?: (page: string) => void;
}

export function PrivacyPolicyPage({ onPageChange }: PrivacyPolicyPageProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://app.termly.io/embed-policy.min.js";
    script.async = true;
    script.id = "embed-policy";
    document.head.appendChild(script);

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
              Your Privacy Matters to <span className="text-purple-600">RankBee</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're transparent about how we collect, use, and protect your data. Read our privacy policy to understand your rights and our commitment to your privacy.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div
          // @ts-expect-error Termly embed element
          name="termly-embed"
          data-id="170d09f1-22b5-4444-bcf7-a340d1c6b17b"
          className="min-h-[70vh]"
        />
      </div>
    </div>
  );
}
