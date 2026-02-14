// Environment variable compatibility layer for Vite → Next.js migration
// IMPORTANT: Next.js only inlines process.env.NEXT_PUBLIC_* when accessed
// as LITERAL strings at compile time. Dynamic access like process.env[key]
// does NOT work on the client side. Each variable must be a literal reference.

export const ENV = {
  get CLERK_PUBLISHABLE_KEY() { return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''; },
  get APP_URL() { return process.env.NEXT_PUBLIC_APP_URL || 'https://app.rankbee.ai'; },
  get SIGN_IN_URL() { return process.env.NEXT_PUBLIC_SIGN_IN_URL || '/sign-in'; },
  get SIGN_UP_URL() { return process.env.NEXT_PUBLIC_SIGN_UP_URL || '/sign-up'; },
  get ONBOARD_URL() { return process.env.NEXT_PUBLIC_ONBOARD_URL || ''; },
  get APP_ENV() { return process.env.NEXT_PUBLIC_APP_ENV || 'development'; },
  get SITE_URL() { return process.env.NEXT_PUBLIC_SITE_URL || 'https://rankbee.ai'; },
  get INTERCOM_APP_ID() { return process.env.NEXT_PUBLIC_INTERCOM_APP_ID || ''; },
  get GTM_ID_STG() { return process.env.NEXT_PUBLIC_GTM_ID_STG || ''; },
  get GTM_ID_PROD() { return process.env.NEXT_PUBLIC_GTM_ID_PROD || ''; },
  get POSTHOG_KEY() { return process.env.NEXT_PUBLIC_POSTHOG_KEY || ''; },
  get POSTHOG_HOST() { return process.env.NEXT_PUBLIC_POSTHOG_HOST || ''; },
  get DEV() { return process.env.NODE_ENV === 'development'; },
  get PROD() { return process.env.NODE_ENV === 'production'; },
};
