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
export function isOnboarded(user: any): boolean {
  try {
    // Clerk publicMetadata is a free-form object
    return Boolean(user?.publicMetadata && (user.publicMetadata as any).onboarded);
  } catch {
    return false;
  }
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