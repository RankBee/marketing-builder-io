export const PRICING = {
  pro: {
    GBP: "99",
    USD: "110",
    EUR: "99",
  },
  contentGrowth: {
    GBP: "199",
    USD: "299",
    EUR: "199",
  },
  agency: {
    GBP: "599",
    USD: "699",
    EUR: "599",
  },
} as const;

export const PRICING_DISPLAY = {
  pro: { symbol: "£", amount: PRICING.pro.GBP, label: "Pro" },
  contentGrowth: { symbol: "£", amount: PRICING.contentGrowth.GBP, label: "Content Growth" },
  agency: { symbol: "£", amount: PRICING.agency.GBP, label: "Agency" },
} as const;
