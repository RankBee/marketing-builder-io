import { useEffect } from 'react';
import { onboardRedirectUrl, dashboardUrl } from '../src/lib/clerk-env';

/**
 * Hard redirect to NEXT_PUBLIC_ONBOARD_URL (or fallback to dashboard).
 * Mirrors the /onboard catch from the Vite-based main branch.
 * Signup links use ?redirect_url=/onboard so Clerk redirects here
 * (same origin), then we bounce to the external onboard app.
 */
export default function OnboardRedirect() {
  useEffect(() => {
    const target = onboardRedirectUrl || dashboardUrl || '/';
    window.location.replace(target);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-2">Redirecting to onboarding...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
}
