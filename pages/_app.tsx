import '../src/index.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { Footer } from '../src/components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Navigation } from '../src/components/Navigation';

// Dynamic import for Intercom (uses Clerk hooks, not available during SSR)
const IntercomClient = dynamic(
  () => import('../src/components/IntercomClinet').then(mod => ({ default: mod.IntercomClient })),
  { ssr: false }
);

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const signInUrl = process.env.NEXT_PUBLIC_SIGN_IN_URL || '/sign-in';
const signUpUrl = process.env.NEXT_PUBLIC_SIGN_UP_URL || '/sign-up';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
    <div className="min-h-screen bg-white flex flex-col">
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
        routerPush={(to) => router.push(to)}
        routerReplace={(to) => router.replace(to)}
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
  switch (path) {
    case '/about': return 'about';
    case '/pricing': return 'pricing';
    case '/rankbee-api': return 'rankbee-api';
    case '/seo-professionals': return 'seo-professionals';
    case '/growing-business': return 'growing-business';
    case '/agencies': return 'agencies';
    case '/political-campaigns': return 'political-campaigns';
    case '/blog': return 'blog';
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
