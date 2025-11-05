// Clerk environment helpers for Vite app
// Required env: VITE_CLERK_PUBLISHABLE_KEY
// Optional env: VITE_APP_URL, VITE_SIGN_IN_URL, VITE_ONBOARD_URL

// Use Vite's import.meta.env directly and sanitize/trim the value
const rawPk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
export const publishableKey: string | undefined =
  typeof rawPk === 'string' && rawPk.trim().length ? rawPk.trim() : undefined;

export const dashboardUrl: string =
  (import.meta.env.VITE_APP_URL as string) || 'https://app.rankbee.ai';

export const signInUrl: string =
  (import.meta.env.VITE_SIGN_IN_URL as string) || '/sign-in';

// Where to send users when they need to complete setup (RankBee-marketing /onboard)
// Can be absolute (https://rankbee.ai/onboard) or path (/onboard) depending on deployment routing.
export const onboardRedirectUrl: string =
  (import.meta.env.VITE_ONBOARD_URL as string) || '/onboard';

// Safe helpers
/**
 * DEPRECATED: Use useOrgOnboardingState() from src/lib/clerk-safe.tsx.
 * Onboarding state is determined solely from the FIRST organization’s publicMetadata.onboarded.
 * This function no longer reads user.publicMetadata and always returns false.
 */
export function isOnboarded(_user: any): boolean {
  if ((import.meta as any)?.env?.DEV) {
    // eslint-disable-next-line no-console
    console.warn(
      "[Deprecated] isOnboarded(user) is deprecated. Use useOrgOnboardingState() for org-based onboarding."
    );
  }
  return false;
}

export function displayName(user: any): string {
  if (!user) return '';
  return (
    (user.firstName as string) ||
    (user.username as string) ||
    (user.fullName as string) ||
    ''
  );
}