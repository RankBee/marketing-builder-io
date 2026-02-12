// Centralized SEO metadata for all pages (used by Next.js pages)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rankbee.ai';

export interface PageSeo {
  title: string;
  fullTitle: string;
  description: string;
  path: string;
  canonical: string;
  noindex?: boolean;
}

const pages: Record<string, { title: string; description: string; path: string; noindex?: boolean }> = {
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
    title: "RankBee for Growth",
    description: "Ideal for growing businesses ready to scale their content creation. Get 50 content generations, 2 AI models, and advanced optimization tools.",
    path: "/growing-business"
  },
  agencies: {
    title: "For Consulting",
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
  },
  "knowledge-base": {
    title: "Knowledge Base",
    description: "Learn how to use RankBee AI to optimize your brand's visibility in generative AI search. Step-by-step guides, tutorials, and best practices.",
    path: "/knowledge-base"
  },
  builder: {
    title: "Page",
    description: "RankBee — AI Visibility for ChatGPT, Claude, Gemini.",
    path: "/builder",
    noindex: false
  }
};

export function getPageSeo(pageId: string): PageSeo {
  const page = pages[pageId] || pages.home;
  const baseTitle = "RankBee";
  return {
    title: page.title,
    fullTitle: `${page.title} | ${baseTitle}`,
    description: page.description,
    path: page.path,
    canonical: `${SITE_URL.replace(/\/+$/, '')}${page.path}`,
    noindex: page.noindex,
  };
}

export function getSiteUrl(): string {
  return SITE_URL.replace(/\/+$/, '');
}
