import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PricingPage } from "./components/PricingPage";
import { BlogPage } from "./components/BlogPage";
import { ArticleDetailPage } from "./components/ArticleDetailPage";
import { DemoPage } from "./components/DemoPage";
import { MeetPage } from "./components/MeetPage";
import { ContactPage } from "./components/ContactPage";
import { SignInPage, SignUpPage } from "./components/AuthPages";
import { useEnsureActiveOrg } from "./lib/clerk-safe";
import posthog from 'posthog-js';

// Map current location path to our simple page ids
function pathToPage(pathname: string): string {
  const path = pathname.replace(/\/+$/, "");
  switch (path) {
    case "/sign-in":
      return "sign-in";
    case "/sign-up":
      return "sign-up";
    case "/about":
      return "about";
    case "/pricing":
      return "pricing";
    case "/blog":
      return "blog";
    case "/article-detail":
      return "article-detail";
    case "/demo":
      return "demo";
    case "/meet":
      return "meet";
    case "/contact":
      return "contact";
    case "/":
    default:
      return "home";
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  // Ensure an active organization is selected so org-based onboarding logic works
  useEnsureActiveOrg();

  // Push browser history when navigating to sign-in/sign-up; reset to "/" otherwise
  const setPage = (page: string) => {
    setCurrentPage(page);
    try {
      if (typeof window !== "undefined") {
        const target = page === "home" ? "/" : `/${page}`;
        if (window.location.pathname !== target) {
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

  // Track page views with PostHog
  useEffect(() => {
    posthog.capture('page_view', {
      page: currentPage,
      path: window.location.pathname,
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
      case "blog":
        return <BlogPage onPageChange={setPage} />;
      case "article-detail":
        return <ArticleDetailPage onPageChange={setPage} />;
      case "demo":
        // DemoPage does not require onPageChange props in this bundle
        return <DemoPage />;
      case "meet":
        return <MeetPage onPageChange={setPage} />;
      case "contact":
        // ContactPage does not require onPageChange props in this bundle
        return <ContactPage />;
      case "sign-in":
        return <SignInPage />;
      case "sign-up":
        return <SignUpPage />;
      default:
        return <HomePage onPageChange={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={setPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onPageChange={setPage} />
    </div>
  );
}
