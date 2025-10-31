# RankBee Marketing (Builder.io Vite App)

This project is the Builder.io code-gen (Vite/React) app for RankBee marketing pages. It integrates Clerk for client-side auth state, renders Sign In/Sign Up pages inside this Vite app, and shows dynamic CTAs based on the signed-in user’s onboarding status. A service worker provides an ISR-like 5-minute cache for navigations while bypassing dynamic/auth pages.

What’s implemented
- In-app auth pages (Clerk):
  - Sign In: rendered in this app via [SignInPage](src/components/AuthPages.tsx:16)
  - Sign Up: rendered in this app via [SignUpPage](src/components/AuthPages.tsx:39)
  - The app is wrapped with Clerk only when a publishable key is present; safe wrappers keep Builder/Vite previews buildable without Clerk
- Dynamic CTA state after auth:
  - Navbar and hero show the user’s first name and:
    - “Complete Setup” → env-configured URL [onboardRedirectUrl](src/lib/clerk-env.ts:14) (e.g., https://rankbee.ai/onboard)
    - “View Your Dashboard” → VITE_APP_URL
  - Implemented in [Navigation.tsx](src/components/Navigation.tsx:1) and [HomePage.tsx](src/components/HomePage.tsx:1)
- ISR-like caching (5 minutes) for SPA navigations:
  - A service worker caches HTML navigation requests stale-while-revalidate for 5 minutes
  - Dynamic/auth routes (/sign-in, /sign-up) bypass cache
  - Dynamic buttons remain correct because UI is client-driven and Clerk decides SignedIn/SignedOut at runtime
  - See [sw.js](public/sw.js:1) and registration in [main.tsx](src/main.tsx:1)

Key files
- [main.tsx](src/main.tsx:1): Conditionally wraps with ClerkProvider and registers the service worker
- [clerk-env.ts](src/lib/clerk-env.ts:1): Env helpers (publishableKey, dashboardUrl, onboardRedirectUrl)
- [clerk-safe.tsx](src/lib/clerk-safe.tsx:1): Safe SignedIn/SignedOut/useUser and SafeSignIn/SafeSignUp for environments without a publishable key
- [Navigation.tsx](src/components/Navigation.tsx:1): Navbar dynamic CTA and greeting
- [HomePage.tsx](src/components/HomePage.tsx:1): Hero section dynamic CTA and greeting
- [AuthPages.tsx](src/components/AuthPages.tsx:1): In-app Sign In & Sign Up pages (Clerk components)
- [sw.js](public/sw.js:1): Service worker implementing 5-minute navigation caching with bypass for auth pages

Environment variables (Vite)
Create a .env file with the following:

- VITE_CLERK_PUBLISHABLE_KEY: Clerk publishable key for the shared instance
- VITE_APP_URL: Dashboard URL for “View Your Dashboard” (e.g., https://app.rankbee.ai)
- VITE_ONBOARD_URL: Absolute or path URL for “Complete Setup” (e.g., https://rankbee.ai/onboard or /onboard)
- VITE_SIGN_IN_URL (optional): Not required now that Sign In is rendered in this app; keep only if you need custom behavior during local dev

Routing inside the SPA
- App-level routing maps paths to pages in [App.tsx](src/App.tsx:39)
  - /sign-in → in-app Sign In
  - /sign-up → in-app Sign Up
  - Other paths (/, /about, /pricing, etc.) map to corresponding components
- Navigation is handled client-side and history is kept in sync (see [App.tsx](src/App.tsx:39))

Service worker “ISR” behavior
- Cached scope: Only navigation requests (HTML) are cached; assets use the browser/host defaults
- TTL: 5 minutes (config in [sw.js](public/sw.js:6))
- Bypass: /sign-in and /sign-up requests always go to network (fresh)
- Dynamic UI safety: The HTML shell can be cached, but the React app + Clerk evaluate SignedIn/SignedOut on the client, so the greeting and CTA are always current

Local development
1) Install and run:
   - npm i
   - npm run dev
2) Provide env:
   - VITE_CLERK_PUBLISHABLE_KEY, VITE_APP_URL, VITE_ONBOARD_URL
3) Behavior without publishable key:
   - Safe wrappers render SignedOut content and show placeholders for auth pages
   - App remains fully buildable/runnable for Builder previews

Build and deploy
- Build: npm run build
- Static serve (local): npm start (serves build/ on port 8080)
- Ensure your hosting serves public/sw.js and allows service worker registration at the site root

Security
- Do not commit secrets. Only use the Clerk publishable key client-side; Clerk secret keys remain server-side only (not in this repo).
