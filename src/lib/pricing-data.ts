export const PRICING = {
  pro: {
    monthly: { GBP: "99", USD: "110", EUR: "99" },
    annual: { GBP: "79", USD: "88", EUR: "79" },
  },
  contentGrowth: {
    monthly: { GBP: "199", USD: "299", EUR: "199" },
    annual: { GBP: "159", USD: "239", EUR: "159" },
  },
  agency: {
    monthly: { GBP: "599", USD: "699", EUR: "599" },
    annual: { GBP: "479", USD: "559", EUR: "479" },
  },
} as const;

export type BillingCycle = "monthly" | "annual";

export const PRICING_DISPLAY = {
  pro: { symbol: "£", amount: PRICING.pro.monthly.GBP, label: "Pro" },
  contentGrowth: { symbol: "£", amount: PRICING.contentGrowth.monthly.GBP, label: "Content Growth" },
  agency: { symbol: "£", amount: PRICING.agency.monthly.GBP, label: "Agency" },
} as const;

export type Currency = "GBP" | "USD" | "EUR";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: "£",
  USD: "$",
  EUR: "€",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  GBP: "GBP",
  USD: "USD",
  EUR: "EUR",
};

export const CHARGEBEE_URLS = {
  pro: "/en/register",
  contentGrowth: "/en/register",
  agency: "/demo",
} as const;

export interface PricingHighlight {
  description: string;
  disabled?: boolean;
  bold?: boolean;
}

export interface PricingTier {
  key: "pro" | "contentGrowth" | "agency";
  name: string;
  description: string;
  badge?: string;
  prices: { monthly: Record<Currency, string>; annual: Record<Currency, string> };
  href: string;
  ctaLabel: string;
  highlights: PricingHighlight[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    key: "pro",
    name: "Pro",
    description: "Perfect for individual entrepreneurs or early-stage startups just beginning to optimize their AIO and GPT visibility.",
    badge: "14 DAY FREE TRIAL",
    prices: PRICING.pro,
    href: CHARGEBEE_URLS.pro,
    ctaLabel: "Start Free Trial",
    highlights: [
      { description: "Content Writer: 10 Content Generations per month" },
      { description: "Content Recommendation Engine" },
      { description: "Existing Content Optimization Engine" },
      { description: "500 AI Prompts tracking" },
      { description: "1 AI Model (ChatGPT)" },
      { description: "1 Brand" },
    ],
  },
  {
    key: "contentGrowth",
    name: "Content Growth",
    description: "Ideal for growing businesses ready to scale their content creation.",
    prices: PRICING.contentGrowth,
    href: CHARGEBEE_URLS.contentGrowth,
    ctaLabel: "Choose Plan",
    highlights: [
      { description: "Content Writer: 50 Content Generations per month" },
      { description: "Content Recommendation Engine" },
      { description: "Existing Content Optimization Engine" },
      { description: "500 AI Prompts tracking" },
      { description: "2 AI Models (Google AIO, ChatGPT)" },
      { description: "1 Brand" },
    ],
  },
  {
    key: "agency",
    name: "For agencies",
    description: "Unlimited Brands, and 300 content generations to enable content growth for multiple clients.",
    prices: PRICING.agency,
    href: CHARGEBEE_URLS.agency,
    ctaLabel: "Setup a call",
    highlights: [
      { description: "Content Writer: 300 Content Generations per month" },
      { description: "Content Recommendation Engine" },
      { description: "Existing Content Optimization Engine" },
      { description: "1500 AI Prompts tracking", bold: true },
      { description: "2 AI Models (Google AIO, ChatGPT)" },
      { description: "Unlimited Brands", bold: true },
      { description: "API access for content generation", bold: true },
      { description: "API access for content performance simulation", bold: true },
    ],
  },
];

export interface FeatureRow {
  name: string;
  tiers: Record<string, string | boolean>;
}

export interface FeatureSection {
  name: string;
  features: FeatureRow[];
}

export const PRICING_SECTIONS: FeatureSection[] = [
  {
    name: "Content",
    features: [
      {
        name: "Content Generations per month",
        tiers: { Pro: "10", "Content Growth": "50", "For agencies": "300" },
      },
      {
        name: "Content Writer",
        tiers: { Pro: true, "Content Growth": true, "For agencies": true },
      },
      {
        name: "Content Recommendation Engine",
        tiers: { Pro: true, "Content Growth": true, "For agencies": true },
      },
      {
        name: "Existing Content Optimization Engine",
        tiers: { Pro: true, "Content Growth": true, "For agencies": true },
      },
    ],
  },
  {
    name: "AI Visibility Tracking",
    features: [
      {
        name: "AI Prompts tracking",
        tiers: { Pro: "500", "Content Growth": "500", "For agencies": "1500" },
      },
      {
        name: "ChatGPT (1 AI Model)",
        tiers: { Pro: true, "Content Growth": true, "For agencies": true },
      },
      {
        name: "Google AIO (2 AI Models)",
        tiers: { Pro: false, "Content Growth": true, "For agencies": true },
      },
    ],
  },
  {
    name: "Account & Support",
    features: [
      {
        name: "Brands",
        tiers: { Pro: "1", "Content Growth": "1", "For agencies": "Unlimited" },
      },
      {
        name: "14-day free trial",
        tiers: { Pro: true, "Content Growth": true, "For agencies": false },
      },
    ],
  },
];
