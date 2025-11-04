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
      <div className="bg-brand-800 text-white p-6 sm:p-8 lg:p-12 min-h-44 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Privacy Policy</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
