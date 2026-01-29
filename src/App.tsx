import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PricingPage } from "./components/PricingPage";
import { RankBeeAPIPage } from "./components/RankBeeAPIPage";
import { SEOProfessionalsPage } from "./components/SEOProfessionalsPage";
import { GrowingBusinessPage } from "./components/GrowingBusinessPage";
import { AgenciesPage } from "./components/AgenciesPage";
import { PoliticalCampaignsPage } from "./components/PoliticalCampaignsPage";
import { BlogPage } from "./components/BlogPage";
import { ArticleDetailPage } from "./components/ArticleDetailPage";
import { NewsPage } from "./components/NewsPage";
import { DemoPage } from "./components/DemoPage";
import { OnboardingMeetingPage } from "./components/OnboardingMeetingPage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { SignInPage, SignUpPage } from "./components/AuthPages";
import { useEnsureActiveOrg } from "./lib/clerk-safe";
import { Seo } from "./lib/seo";
import { IntercomClient } from "./components/IntercomClinet";
import { useGTMClerkSync, trackEvent } from "./lib/gtm";
import { useUser, useAuth } from '@clerk/clerk-react';
import { identifyPostHogUser } from './lib/posthog';

// Map current location path to our simple page ids
function pathToPage(pathname: string): string {
  const path = pathname.replace(/\/+$/, "");
  // Treat nested Clerk routes (e.g., /sign-up/sso-callback) as auth pages
  if (path === "/sign-in" || path.startsWith("/sign-in/")) return "sign-in";
  if (path === "/sign-up" || path.startsWith("/sign-up/")) return "sign-up";
  switch (path) {
    case "/about":
      return "about";
    case "/pricing":
      return "pricing";
    case "/rankbee-api":
      return "rankbee-api";
    case "/seo-professionals":
      return "seo-professionals";
    case "/growing-business":
      return "growing-business";
    case "/agencies":
      return "agencies";
    case "/political-campaigns":
      return "political-campaigns";
    case "/blog":
      return "blog";
    case "/article-detail":
      return "article-detail";
    case "/news":
      return "news";
    case "/demo":
      return "demo";
    case "/onboarding-meeting":
      return "onboarding-meeting";
    case "/contact":
      return "contact";
    case "/privacy-policy":
      return "privacy-policy";
    case "/terms-of-service":
      return "terms-of-service";
    case "/":
    default:
      return "home";
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    try {
      return pathToPage(window.location.pathname);
    } catch {
      return "home";
    }
  });
  
  // Ensure an active organization is selected so org-based onboarding logic works
  useEnsureActiveOrg();

  // Sync Clerk user and org context with GTM dataLayer for automatic event enrichment
  useGTMClerkSync();
  
  // Sync Clerk user context with PostHog for user identification
  const { user } = useUser();
  const { actor } = useAuth();

useEffect(() => {
  if (user && !actor) {
    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
    const emailDomain = user.emailAddresses?.[0]?.emailAddress?.split('@')[1] || '';
    
    identifyPostHogUser(user.id, {
      email: email,
      emailDomain: emailDomain,
      name: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt?.toISOString(),
    });
  }
}, [user, actor]);

  // Push browser history when navigating to sign-in/sign-up; include redirect_to back to current page when not home
  const setPage = (page: string) => {
    setCurrentPage(page);
    try {
      if (typeof window !== "undefined") {
        let target = page === "home" ? "/" : `/${page}`;

        // For auth pages, append redirect_to with current location if not at plain home
        if (page === "sign-in" || page === "sign-up") {
          const current = window.location.pathname + window.location.search + window.location.hash;
          const isHome = window.location.pathname === "/" && !window.location.search && !window.location.hash;
          if (!isHome) {
            try {
              const url = new URL(target, window.location.origin);
              url.searchParams.set("redirect_to", current);
              target = url.pathname + url.search;
            } catch {
              // ignore URL build errors
            }
          }
        }

        const currentPathWithQuery = window.location.pathname + window.location.search;
        if (currentPathWithQuery !== target) {
          window.history.pushState({}, "", target);
        }
      }
    } catch {
      // no-op in non-browser environments
    }
  };

  // Initialize from URL and listen to back/forward
  useEffect(() => {
    try {
      setCurrentPage(pathToPage(window.location.pathname));
      const onPop = () => setCurrentPage(pathToPage(window.location.pathname));
      window.addEventListener("popstate", onPop);
      return () => window.removeEventListener("popstate", onPop);
    } catch {
      // ignore
      return;
    }
  }, []);
  
  // Global page view tracking - tracks all page changes in one place via GTM
  useEffect(() => {
    // Map internal page IDs to readable event names
    const pageEventNames: Record<string, string> = {
      'home': 'Homepage View',
      'pricing': 'Pricing View',
      'rankbee-api': 'Enterprise View',
      'seo-professionals': 'Startups View',
      'growing-business': 'Growing Business View',
      'agencies': 'Agencies View',
      'political-campaigns': 'Political Campaigns View',
      'demo': 'Demo View',
      'onboarding-meeting': 'Onboarding Meeting View',
      'sign-up': 'Sign Up View',
      'sign-in': 'Sign In View',
      'about': 'About View',
      'blog': 'Blog View',
      'article-detail': 'Article Detail View',
      'news': 'News View',
      'contact': 'Contact View',
      'privacy-policy': 'Privacy Policy View',
      'terms-of-service': 'Terms of Service View',
    };
    
    const eventName = pageEventNames[currentPage] || `${currentPage} View`;
    
    trackEvent(eventName, {
      page: currentPage,
      page_path: window.location.pathname,
    });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setPage} />;
      case "about":
        return <AboutPage onPageChange={setPage} />;
      case "pricing":
        return <PricingPage onPageChange={setPage} />;
      case "rankbee-api":
        return <RankBeeAPIPage onPageChange={setPage} />;
      case "seo-professionals":
        return <SEOProfessionalsPage onPageChange={setPage} />;
      case "growing-business":
        return <GrowingBusinessPage onPageChange={setPage} />;
      case "agencies":
        return <AgenciesPage onPageChange={setPage} />;
      case "political-campaigns":
        return <PoliticalCampaignsPage onPageChange={setPage} />;
      case "blog":
        return <BlogPage onPageChange={setPage} />;
      case "article-detail":
        return <ArticleDetailPage onPageChange={setPage} />;
      case "news":
        return <NewsPage onPageChange={setPage} />;
      case "demo":
        // DemoPage does not require onPageChange props in this bundle
        return <DemoPage />;
      case "onboarding-meeting":
        return <OnboardingMeetingPage />;
      case "contact":
        // ContactPage does not require onPageChange props in this bundle
        return <ContactPage />;
      case "privacy-policy":
        return <PrivacyPolicyPage onPageChange={setPage} />;
      case "terms-of-service":
        return <TermsOfServicePage onPageChange={setPage} />;
      case "sign-in":
        return <SignInPage />;
      case "sign-up":
        return <SignUpPage />;
      default:
        return <HomePage onPageChange={setPage} />;
    }
  };

  // SEO: per-route meta and canonical
  const metaByPage: Record<string, { title?: string; description?: string; path: string; noindex?: boolean }> = {
    home: {
      title: "AI Visibility for ChatGPT, Claude, Gemini",
      description: "Optimize your site so AI assistants actually mention your brand. Track rankings, citations, and competitive share-of-voice across models.",
      path: "/"
    },
    about: {
      title: "About RankBee",
      description: "Why we built RankBee and how we help teams win AI visibility.",
      path: "/about"
    },
    pricing: {
      title: "Pricing",
      description: "Simple pricing to start improving AI visibility.",
      path: "/pricing"
    },
    "rankbee-api": {
      title: "Enterprise",
      description: "Enterprise solutions to automate content analysis, optimization, and testing at scale.",
      path: "/rankbee-api"
    },
    "seo-professionals": {
      title: "RankBee for Startups",
      description: "Get full AI visibility tracking, monthly content credits, and everything you need to optimize for ChatGPT, Claude, Gemini, and beyond. First 14 days free.",
      path: "/seo-professionals"
    },
    "growing-business": {
      title: "RankBee for Growing Business",
      description: "Ideal for growing businesses ready to scale their content creation. Get 50 content generations, 2 AI models, and advanced optimization tools.",
      path: "/growing-business"
    },
    agencies: {
      title: "For Agencies",
      description: "Scale AI optimization across your client portfolio. Offer AI visibility services to your clients.",
      path: "/agencies"
    },
    "political-campaigns": {
      title: "For Political Campaigns",
      description: "Ensure your message reaches voters through AI search assistants. Amplify your campaign's voice across ChatGPT, Claude, Gemini, and other AI platforms.",
      path: "/political-campaigns"
    },
    blog: {
      title: "Blog",
      description: "Insights on AI search optimization and LLM-era marketing.",
      path: "/blog"
    },
    news: {
      title: "News: Aris Vrakas Speaking at Politics Meets Technology 2026",
      description: "Join Aris Vrakas, Founder & CEO of RankBee, at Politics Meets Technology 2026 in Berlin on January 24. Learn how political voices get seen—or silenced—in the age of LLMs.",
      path: "/news"
    },
    demo: {
      title: "Free Visibility Test",
      description: "Run a free AI visibility test across ChatGPT, Claude, and Gemini.",
      path: "/demo"
    },
    "onboarding-meeting": {
      title: "Schedule a meeting to setup your brand",
      description: "Schedule an onboarding meeting with the RankBee team.",
      path: "/onboarding-meeting",
      noindex: true
    },
    contact: {
      title: "Contact",
      description: "Get in touch with the RankBee team.",
      path: "/contact"
    },
    "privacy-policy": {
      title: "Privacy Policy",
      description: "Privacy Policy for RankBee.",
      path: "/privacy-policy"
    },
    "terms-of-service": {
      title: "Terms of Service",
      description: "Terms of Service for RankBee.",
      path: "/terms-of-service"
    },
    "sign-in": {
      title: "Sign In",
      description: "Access your RankBee account.",
      path: "/sign-in",
      noindex: true
    },
    "sign-up": {
      title: "Sign Up",
      description: "Create your RankBee account.",
      path: "/sign-up",
      noindex: true
    }
  };
  const seo = metaByPage[currentPage] || metaByPage.home;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Seo title={seo.title} description={seo.description} path={seo.path} noindex={!!seo.noindex} />
      <IntercomClient />
      <Navigation currentPage={currentPage} onPageChange={setPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onPageChange={setPage} />
    </div>
  );
}
