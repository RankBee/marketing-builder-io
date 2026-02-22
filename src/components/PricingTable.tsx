import { Fragment, useEffect, useState } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/16/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  PRICING_TIERS,
  PRICING_SECTIONS,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  type Currency,
  type BillingCycle,
} from "../lib/pricing-data";
import { trackEvent as trackGTMEvent } from "../lib/gtm";
import { trackEvent } from "../lib/posthog";

type BillingFrequency = { value: BillingCycle; label: string };
const FREQUENCIES: BillingFrequency[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annually" },
];

const LOGOS = [
  { name: "Growcreate", src: "/images/logos/growcreate.svg", url: "https://growcreate.co.uk", height: 28, invert: false, pill: false },
  { name: "Alpha Bank", src: "/images/logos/alphabank.svg", url: "https://www.alpha.gr", height: 36, invert: false, pill: true },
  { name: "DJ Studio", src: "/images/logos/djstudio.svg", url: "https://dj.studio", height: 26, invert: false, pill: false },
  { name: "Sagacity", src: "/images/logos/sagacity.svg", url: "https://www.sagacitysolutions.co.uk", height: 44, invert: true, pill: false },
  { name: "Carv", src: "/images/logos/carv.png", url: "https://www.carv.com", height: 28, invert: false, pill: false },
];

function detectCurrency(): Currency {
  if (typeof window === "undefined") return "GBP";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.startsWith("America/") || tz.startsWith("US/") || tz === "Pacific/Honolulu") return "USD";
    const euTZ = ["Europe/Berlin","Europe/Paris","Europe/Madrid","Europe/Rome","Europe/Amsterdam","Europe/Brussels","Europe/Vienna","Europe/Warsaw","Europe/Prague","Europe/Budapest","Europe/Bucharest","Europe/Sofia","Europe/Athens","Europe/Helsinki","Europe/Stockholm","Europe/Oslo","Europe/Copenhagen","Europe/Lisbon","Europe/Dublin","Europe/Luxembourg","Europe/Riga","Europe/Tallinn","Europe/Vilnius","Europe/Nicosia","Europe/Valletta","Europe/Bratislava","Europe/Ljubljana","Europe/Skopje","Europe/Zagreb","Atlantic/Azores","Atlantic/Madeira"];
    if (euTZ.includes(tz)) return "EUR";
  } catch { /* fallback */ }
  return "GBP";
}

function handlePricingClick(tierName: string, ctaLabel: string) {
  trackGTMEvent("Pricing Click on Subscription", { page: "pricing", plan: tierName });
  trackEvent("Plan Selected", { location: "pricing_page", plan: tierName, button_text: ctaLabel, interaction_type: "pricing_table" });
}

export function PricingTable() {
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  useEffect(() => { setCurrency(detectCurrency()); }, []);

  const symbol = CURRENCY_SYMBOLS[currency];
  const currencyLabel = CURRENCY_LABELS[currency];

  return (
    <div className="bg-white">
      <style>{`
        @keyframes pricing-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .pcta:hover { animation: pricing-shimmer 1.5s ease-in-out infinite !important; box-shadow: 0 4px 15px rgba(147,51,234,0.4) !important; }
        .pricing-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .pricing-purple-bg { position: absolute; left: 0; right: 0; bottom: 0; top: 192px; background: radial-gradient(circle at center, #9810fa, #6d1cb5, #030712 70%); }
        .pt-desktop-table { display: table; }
        .pt-mobile-tabs { display: none; }
        .pt-tab[data-selected] { border-bottom: 2px solid #9333ea !important; }
        .pt-tab:focus { outline: none; }
        .pt-table-container { padding-top: 3rem; }
        .pricing-cards-wrap { margin: 2rem auto 4rem; }
        .pricing-hero { padding-top: 0; padding-bottom: 1rem; }
        @media (max-width: 640px) {
          .pricing-cards-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .pricing-purple-bg { top: 0; }
          .pricing-logos { gap: 1.5rem; padding: 2rem 0; }
          .pt-desktop-table { display: none; }
          .pt-mobile-tabs { display: block; }
          .pt-table-container { padding-top: 1rem; }
          .pricing-cards-wrap { margin: 0 auto; }
          .pricing-hero { padding-top: 0; padding-bottom: 1rem; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="pricing-hero">
        <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.025em", color: "#111827", margin: 0 }}>
            Plans That Fit Your Growth, No Surprises
          </h2>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#4b5563", lineHeight: 1.6, marginBottom: 0 }}>
            Start small or go big—unlimited users, weekly crawls, and insights that pay off fast. First month free on all.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
            <fieldset style={{ border: "none", padding: 0, margin: 0 }} aria-label="Billing frequency">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", borderRadius: "9999px", padding: "4px", border: "1px solid #e5e7eb" }}>
                {FREQUENCIES.map((freq) => (
                  <label key={freq.value} style={{ position: "relative", borderRadius: "9999px", padding: "6px 20px", cursor: "pointer", textAlign: "center", fontSize: "0.75rem", fontWeight: 600, backgroundColor: billing === freq.value ? "#9333ea" : "transparent", transition: "background-color 0.15s" }}>
                    <input value={freq.value} checked={billing === freq.value} onChange={() => setBilling(freq.value)} name="frequency" type="radio" style={{ position: "absolute", inset: 0, appearance: "none", borderRadius: "9999px", margin: 0, cursor: "pointer" }} />
                    <span style={{ color: billing === freq.value ? "#fff" : "#6b7280", position: "relative" }}>{freq.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          {billing === "annual" && (
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#6b7280", marginBottom: 0 }}>Prices shown per month, billed annually (~20% off)</p>
          )}
        </div>
      </div>

      {/* ── Cards + Logos ──
          Reference pattern: relative wrapper with pt-16, absolute purple bg starting at top-48,
          cards grid sits in the relative flow on top of the split background. */}
      <div style={{ position: "relative", paddingTop: "2rem" }}>
        {/* Purple bg — starts 192px from top on desktop, 0 on mobile */}
        <div className="pricing-purple-bg" />

        {/* Relative content: cards + logos */}
        <div style={{ position: "relative", maxWidth: "80rem", padding: "0 2rem", boxSizing: "border-box" }} className="pricing-cards-wrap">

          {/* Cards grid */}
          <div className="pricing-cards-grid">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.name} style={{ borderRadius: "2rem", background: "rgba(255,255,255,0.025)", boxShadow: "inset 0 0 2px 1px rgba(255,255,255,0.3)", display: "grid", gridTemplateColumns: "1fr", backgroundColor: "#fff" }}>
                <div style={{ borderRadius: "2rem", padding: "8px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1fr" }}>
                  <div style={{ position: "relative", overflow: "hidden", borderRadius: "1.75rem", backgroundColor: "#fff", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column" }}>
                    {tier.badge && (
                      <div style={{ position: "absolute", top: "45px", right: "-45px", backgroundColor: "#111827", color: "#fff", fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "6px 48px", transform: "rotate(45deg)", whiteSpace: "nowrap", zIndex: 1 }}>
                        {tier.badge}
                      </div>
                    )}
                    <div style={{ minHeight: "7rem" }}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#9333ea", margin: 0 }}>{tier.name}</p>
                      <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.6, marginBottom: 0 }}>{tier.description}</p>
                    </div>
                    <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontSize: "3rem", fontWeight: 600, color: "#030712", lineHeight: 1 }}>{symbol}{tier.prices[billing][currency]}</span>
                      <div style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                        <p style={{ margin: 0 }}>{currencyLabel}</p>
                        <p style={{ margin: 0 }}>per month</p>
                      </div>
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                      <a href={tier.href} onClick={() => handlePricingClick(tier.name, tier.ctaLabel)} className="pcta"
                        style={{ display: "inline-block", borderRadius: "0.5rem", padding: "0.625rem 1rem", fontSize: "0.875rem", fontWeight: 600, color: "#fff", textDecoration: "none", background: "linear-gradient(to right, rgb(147,51,234), rgb(244,114,182), rgb(147,51,234))", backgroundSize: "200% 100%", backgroundPosition: "0% 0" }}>
                        {tier.ctaLabel}
                      </a>
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                      <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#030712", margin: 0 }}>What&apos;s included</h3>
                      <ul style={{ marginTop: "0.75rem", listStyle: "none", padding: 0, margin: "0.75rem 0 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {tier.highlights.map((h) => (
                          <li key={h.description} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", fontSize: "0.875rem", color: "#4b5563" }}>
                            <span style={{ display: "inline-flex", height: "1.5rem", alignItems: "center" }}>
                              <CheckIcon aria-hidden="true" style={{ width: "1rem", height: "1rem", flexShrink: 0, fill: "#9333ea" }} />
                            </span>
                            {h.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logos strip */}
          <div className="pricing-logos" style={{ display: "flex", justifyContent: "center", padding: "4rem 0", opacity: 0.7, flexWrap: "wrap", gap: "2rem" }}>
            {LOGOS.map((client) => (
              <a key={client.name} href={client.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", textDecoration: "none", ...(client.pill ? { backgroundColor: "#fff", borderRadius: "8px", padding: "6px 12px" } : {}) }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
              >
                <img src={client.src} alt={client.name} style={{ height: `${client.height}px`, width: "auto", display: "block", filter: client.invert ? "brightness(0) invert(1)" : "none" }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Comparison table ── */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem 4rem', boxSizing: 'border-box' }} className="pt-table-container">

        {/* Desktop table — hidden on mobile */}
        <table style={{ width: '100%', textAlign: 'left' }} className="pt-desktop-table">
          <caption className="sr-only">Pricing plan comparison</caption>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr>
              <td style={{ padding: 0 }} />
              {PRICING_TIERS.map((tier) => (
                <th key={tier.name} scope="col" style={{ padding: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#9333ea' }}>{tier.name}</div>
                </th>
              ))}
            </tr>
            <tr>
              <th style={{ padding: 0 }} />
              {PRICING_TIERS.map((tier) => (
                <td key={tier.name} style={{ padding: '0.75rem 0 0 0' }}>
                  <a href={tier.href} onClick={() => handlePricingClick(tier.name, tier.ctaLabel)}
                    style={{ display: 'inline-block', borderRadius: '6px', padding: '6px 14px', fontSize: '0.875rem', fontWeight: 600, color: '#111827', textDecoration: 'none', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.05), inset 0 0 0 1px #d1d5db' }}
                  >{tier.ctaLabel}</a>
                </td>
              ))}
            </tr>
          </thead>
          {PRICING_SECTIONS.map((section) => (
            <tbody key={section.name}>
              <tr>
                <th colSpan={4} scope="colgroup" style={{ padding: '2.5rem 0 0 0' }}>
                  <div style={{ borderRadius: '8px', backgroundColor: '#f9fafb', padding: '10px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#030712', marginLeft: '-1rem', marginRight: '-1rem' }}>{section.name}</div>
                </th>
              </tr>
              {section.features.map((feature) => (
                <tr key={feature.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <th scope="row" style={{ padding: '1rem 0', fontSize: '0.875rem', fontWeight: 400, color: '#4b5563' }}>{feature.name}</th>
                  {PRICING_TIERS.map((tier) => {
                    const value = feature.tiers[tier.name];
                    return (
                      <td key={tier.name} style={{ padding: '1rem' }}>
                        {typeof value === 'string' ? (
                          <span style={{ fontSize: '0.875rem', color: '#030712' }}>{value}</span>
                        ) : value === true ? (
                          <CheckIcon aria-hidden="true" style={{ display: 'inline-block', width: '1rem', height: '1rem', fill: '#16a34a' }} />
                        ) : (
                          <MinusIcon aria-hidden="true" style={{ display: 'inline-block', width: '1rem', height: '1rem', fill: '#9ca3af' }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>

        {/* Mobile tabs — hidden on desktop */}
        <TabGroup className="pt-mobile-tabs">
          <TabList style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {PRICING_TIERS.map((tier) => (
              <Tab key={tier.name}
                style={{ flex: 1, padding: '1rem 0', fontSize: '0.875rem', fontWeight: 500, color: '#9333ea', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '2px solid transparent' }}
                className="pt-tab"
              >
                {tier.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels as={Fragment}>
            {PRICING_TIERS.map((tier) => (
              <TabPanel key={tier.name}>
                <a href={tier.href} onClick={() => handlePricingClick(tier.name, tier.ctaLabel)}
                  style={{ display: 'block', marginTop: '1.5rem', borderRadius: '8px', padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600, color: '#111827', textDecoration: 'none', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.05), inset 0 0 0 1px #d1d5db' }}
                >{tier.ctaLabel}</a>
                {PRICING_SECTIONS.map((section) => (
                  <Fragment key={section.name}>
                    <div style={{ borderRadius: '8px', backgroundColor: '#f9fafb', padding: '10px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#030712', margin: '1.5rem -0.5rem 0' }}>{section.name}</div>
                    <dl>
                      {section.features.map((feature) => (
                        <div key={feature.name} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #f3f4f6', padding: '1rem 0' }}>
                          <dt style={{ fontSize: '0.875rem', fontWeight: 400, color: '#4b5563' }}>{feature.name}</dt>
                          <dd style={{ textAlign: 'right' }}>
                            {typeof feature.tiers[tier.name] === 'string' ? (
                              <span style={{ fontSize: '0.875rem', color: '#030712' }}>{feature.tiers[tier.name] as string}</span>
                            ) : feature.tiers[tier.name] === true ? (
                              <CheckIcon aria-hidden="true" style={{ display: 'inline-block', width: '1rem', height: '1rem', fill: '#16a34a' }} />
                            ) : (
                              <MinusIcon aria-hidden="true" style={{ display: 'inline-block', width: '1rem', height: '1rem', fill: '#9ca3af' }} />
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Fragment>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
