import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PricingPage } from "./components/PricingPage";
import { BlogPage } from "./components/BlogPage";
import { ArticleDetailPage } from "./components/ArticleDetailPage";
import { DemoPage } from "./components/DemoPage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { SignInPage, SignUpPage } from "./components/AuthPages";
import { useEnsureActiveOrg } from "./lib/clerk-safe";
import { Seo } from "./lib/seo";
import { IntercomClient } from "./components/IntercomClinet";

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
    case "/contact":
      return "contact";
    case "/privacy-policy":
      return "privacy-policy";
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
      case "contact":
        // ContactPage does not require onPageChange props in this bundle
        return <ContactPage />;
      case "privacy-policy":
        return <PrivacyPolicyPage onPageChange={setPage} />;
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
    blog: {
      title: "Blog",
      description: "Insights on AI search optimization and LLM-era marketing.",
      path: "/blog"
    },
    demo: {
      title: "Free Visibility Test",
      description: "Run a free AI visibility test across ChatGPT, Claude, and Gemini.",
      path: "/demo"
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
