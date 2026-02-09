// Clerk environment helpers
// Required env: VITE_CLERK_PUBLISHABLE_KEY / NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
// Optional env: VITE_APP_URL, VITE_SIGN_IN_URL, VITE_ONBOARD_URL

import { ENV } from './env';

const rawPk = ENV.CLERK_PUBLISHABLE_KEY;
export const publishableKey: string | undefined =
  typeof rawPk === 'string' && rawPk.trim().length ? rawPk.trim() : undefined;

export const dashboardUrl: string = ENV.APP_URL;

export const signInUrl: string = ENV.SIGN_IN_URL;

export const signUpUrl: string = ENV.SIGN_UP_URL;

// Where to send users when they need to complete setup (RankBee-marketing /onboard)
// Can be absolute (https://rankbee.ai/onboard) or path (/onboard) depending on deployment routing.
export const onboardRedirectUrl: string = ENV.ONBOARD_URL;

// Safe helpers
/**
 * DEPRECATED: Use useOrgOnboardingState() from src/lib/clerk-safe.tsx.
 * Onboarding state is determined solely from the FIRST organization's publicMetadata.onboarded.
 * This function no longer reads user.publicMetadata and always returns false.
 */
export function isOnboarded(_user: any): boolean {
  if (ENV.DEV) {
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