// Debug: verify Vite env at runtime (DEV only)
if (import.meta.env.DEV) {
  // These logs confirm whether Vite is injecting the env var into the browser bundle
  // If "present" is false, the .env wasn't picked up by Vite (wrong cwd, server not restarted, or filename mismatch)
  // The "value" shows the first 12 chars to avoid leaking the full key in logs
  // eslint-disable-next-line no-console
  console.log(
    "[Clerk][DEV] VITE_CLERK_PUBLISHABLE_KEY present:",
    !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  );
  // eslint-disable-next-line no-console
  console.log(
    "[Clerk][DEV] VITE_CLERK_PUBLISHABLE_KEY value (prefix):",
    ((import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string) || "").slice(0, 12)
  );
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { publishableKey, onboardRedirectUrl, signInUrl, signUpUrl } from "./lib/clerk-env";
import { HelmetProvider } from "react-helmet-async";
import { getGTMId } from "./lib/gtm";
import { initPostHog } from "./lib/posthog";

// Early hard redirect for /onboard to VITE_ONBOARD_URL
if (typeof window !== 'undefined') {
  try {
    const loc = window.location;
    const currentPath = (loc.pathname.replace(/\/+$/, '') || '/');
    if (currentPath === '/onboard') {
      const targetRaw = (onboardRedirectUrl || '').trim();
      if (targetRaw) {
        // If absolute URL, redirect if not already there
        if (/^https?:\/\//i.test(targetRaw)) {
          if (loc.href !== targetRaw) window.location.replace(targetRaw);
        } else {
          // Ensure rooted path
          const target = targetRaw.startsWith('/') ? targetRaw : '/' + targetRaw;
          if (target !== currentPath) window.location.replace(target);
        }
      }
    }
  } catch {
    // no-op
  }
}
// Initialize GTM dynamically with the correct ID from environment
if (typeof window !== 'undefined') {
  const gtmId = getGTMId();
  if (gtmId) {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    
    // Inject GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
    
    // Add noscript iframe for fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
    
    if (import.meta.env.DEV) {
      console.log('[GTM] Initialized with ID:', gtmId);
    }
  } else if (import.meta.env.DEV) {
    console.warn('[GTM] No GTM ID found in environment variables');
  }
}

// Initialize PostHog (optional - can be configured via GTM instead)
initPostHog();

const root = document.getElementById("root")!;

const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
let isSameOrigin = false;
try {
  isSameOrigin = new URL(signInUrl, window.location.origin).hostname === currentHostname;
} catch (e) {
  // invalid url or relative path
  isSameOrigin = true;
}

const isExternalAuth = !isSameOrigin && signInUrl.startsWith('http') && typeof window !== "undefined" && window.location.hostname.includes('rankbee.ai');
const satelliteProps = isExternalAuth ? { isSatellite: true, domain: 'rankbee.ai' } : {};

const appTree = publishableKey ? (
  <ClerkProvider
    publishableKey={publishableKey}
    signInUrl={signInUrl}
    signUpUrl={signUpUrl}
    afterSignOutUrl="/"
    routerPush={(to) => { window.location.href = to; }}
    routerReplace={(to) => { window.location.replace(to); }}
    {...satelliteProps}
  >
    <App />
  </ClerkProvider>
) : (
  <App />
);

createRoot(root).render(
  <HelmetProvider>
    {appTree}
  </HelmetProvider>
);

// Register/unregister service worker appropriately
// - Only register in production (for 5-min ISR-like caching)
// - Always unregister in dev to avoid stale caches interfering with env changes
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
} else if (!import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => {});
}