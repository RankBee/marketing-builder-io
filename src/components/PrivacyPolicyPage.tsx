import { useEffect } from "react";

interface PrivacyPolicyPageProps {
  onPageChange?: (page: string) => void;
}

export function PrivacyPolicyPage({ onPageChange }: PrivacyPolicyPageProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/_next/static/chunks/app/(policies)/privacy-policy/page-21db69e8564b2740.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div id="privacy-policy-content">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-600">Loading privacy policy content...</p>
        </div>
      </div>
    </div>
  );
}
