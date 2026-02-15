import '../src/index.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { usePageActive } from '../src/lib/usePageActive';
import { ClerkProvider } from '@clerk/clerk-react';
import { Footer } from '../src/components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Navigation } from '../src/components/Navigation';
import localFont from 'next/font/local';

const inter = localFont({
  src: '../public/fonts/Inter-Variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
});

// Dynamic import for Intercom (uses Clerk hooks, not available during SSR)
const IntercomClient = dynamic(
  () => import('../src/components/IntercomClient').then(mod => ({ default: mod.IntercomClient })),
  { ssr: false }
);

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const signInUrl = process.env.NEXT_PUBLIC_SIGN_IN_URL || '/sign-in';
const signUpUrl = process.env.NEXT_PUBLIC_SIGN_UP_URL || '/sign-up';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
let allowedOrigins: string[] = [];
if (appUrl) {
  try {
    allowedOrigins = [new URL(appUrl).origin];
  } catch {
    // Invalid URL — fall back to empty allow-list
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPageActive = usePageActive();

  // Toggle body class to pause/resume all CSS animations site-wide
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isPageActive) {
      document.body.classList.remove('animations-paused');
    } else {
      document.body.classList.add('animations-paused');
    }
  }, [isPageActive]);

  // Map Next.js path to internal page id for Navigation highlighting
  const currentPage = pathToPage(router.asPath);

  // Navigation handler: use Next.js router instead of window.history
  const onPageChange = (page: string) => {
    const target = page === 'home' ? '/' : `/${page}`;
    router.push(target);
  };

  // Initialize GTM
  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_APP_ENV;
    const gtmId = env === 'production'
      ? process.env.NEXT_PUBLIC_GTM_ID_PROD
      : process.env.NEXT_PUBLIC_GTM_ID_STG;

    if (gtmId && typeof window !== 'undefined') {
      // Avoid injecting duplicate GTM scripts (e.g. React Strict Mode, remounts)
      const alreadyLoaded = document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`);
      if (alreadyLoaded) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    }
  }, []);

  // Initialize PostHog (uses full config from src/lib/posthog.ts)
  useEffect(() => {
    import('../src/lib/posthog').then(({ initPostHog }) => {
      initPostHog();
    }).catch(() => {});
  }, []);

  const appContent = (
    <div className={`min-h-screen bg-white flex flex-col ${inter.variable} ${inter.className}`}>
      <Head>
        <meta name="theme-color" content="#7c3aed" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <IntercomClient />
      <Navigation currentPage={currentPage} onPageChange={onPageChange} />
      <main className="flex-1">
        <Component {...pageProps} onPageChange={onPageChange} />
      </main>
      <Footer onPageChange={onPageChange} />
    </div>
  );

  if (publishableKey) {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        signInUrl={signInUrl}
        signUpUrl={signUpUrl}
        afterSignOutUrl="/"
        allowedRedirectOrigins={allowedOrigins}
        routerPush={(to) => {
          if (to.startsWith('http')) { window.location.href = to; } else { router.push(to); }
        }}
        routerReplace={(to) => {
          if (to.startsWith('http')) { window.location.replace(to); } else { router.replace(to); }
        }}
      >
        {appContent}
      </ClerkProvider>
    );
  }

  return appContent;
}

// Map URL path to internal page id (mirrors App.tsx logic)
function pathToPage(pathname: string): string {
  const path = pathname.split('?')[0].replace(/\/+$/, '') || '/';
  if (path === '/sign-in' || path.startsWith('/sign-in/')) return 'sign-in';
  if (path === '/sign-up' || path.startsWith('/sign-up/')) return 'sign-up';
  if (path.startsWith('/blog/tag/')) return `blog/tag/${path.substring(10)}`;
  if (path.startsWith('/blog/page/')) return `blog/page/${path.substring(11)}`;
  if (path.startsWith('/blog/')) {
    const slug = path.substring(6);
    if (slug && slug !== 'tag' && slug !== 'page') return `blog/${slug}`;
  }
  if (path.startsWith('/knowledge-base/')) return 'knowledge-base';
  if (path === '/press-events' || path.startsWith('/press-events/')) return 'press-events';
  switch (path) {
    case '/about': return 'about';
    case '/pricing': return 'pricing';
    case '/rankbee-api': return 'rankbee-api';
    case '/seo-professionals': return 'seo-professionals';
    case '/growing-business': return 'growing-business';
    case '/agencies': return 'agencies';
    case '/political-campaigns': return 'political-campaigns';
    case '/blog': return 'blog';
    case '/knowledge-base': return 'knowledge-base';
    case '/demo': return 'demo';
    case '/onboarding-meeting': return 'onboarding-meeting';
    case '/contact': return 'contact';
    case '/privacy-policy': return 'privacy-policy';
    case '/terms-of-service': return 'terms-of-service';
    case '/news': return 'news';
    case '/': default: return 'home';
  }
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
