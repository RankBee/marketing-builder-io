# Copilot Instructions — RankBee Marketing Site

## Project Overview

This is the **RankBee marketing website** — a Next.js 15 application with optional Clerk authentication, Builder.io visual CMS integration, Ghost CMS for the blog, Hinto AI for the knowledge base, and a Service Worker that applies ISR-like 5-minute stale-while-revalidate caching to HTML navigations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript 5 — **strict mode enabled** |
| Styling | Tailwind CSS v4 (entry: `src/index.css`) |
| UI Components | Radix UI primitives wrapped by shadcn/ui (`src/components/ui/`) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Forms | React Hook Form |
| Auth | Clerk (optional — conditional on env key) |
| Visual CMS | Builder.io (auto-generated code in `src/imports/` — **do not edit**) |
| Blog / Newsletter | Ghost CMS Content + Admin APIs (`src/lib/builder.ts` — note: Ghost module, not Builder.io) |
| Knowledge Base | Hinto AI API (`src/lib/hinto.ts`) |
| Analytics | Google Tag Manager (`src/lib/gtm.ts`) |
| Product Analytics | PostHog (`src/lib/posthog.ts`, optional) |
| Support Widget | Intercom (`src/lib/intercom.ts`, optional) |
| Notifications | Sonner toasts |
| Charts | Recharts |

---

## Commands

```bash
npm run dev          # Start dev server on port 3000
npm run build        # Next.js production build
npm run build:ssg    # Same as build (alias)
npm run start        # Serve production build on port 8080
npm run lint         # Run Next.js ESLint
```

There is **no test framework** in this project — no unit or integration tests exist.

---

## Directory Layout

```
pages/               Next.js routes (28+ pages + API routes)
  _app.tsx           App wrapper: GTM/PostHog init, Clerk provider, SW registration
  _document.tsx
  api/
    robots.ts        Dynamic robots.txt
    sitemap.ts       Dynamic sitemap.xml
    subscribe.ts     Newsletter signup (Ghost Admin API)
  blog/[slug].tsx    Blog post detail (getStaticProps + getStaticPaths)
  ...

src/
  components/        Hand-written React components (PascalCase .tsx files)
    ui/              shadcn/ui component wrappers (do not modify Radix primitives)
  lib/               Utility modules and services
    env.ts           Environment variable access layer (use ENV.* for client vars)
    gtm.ts           Google Tag Manager helpers
    posthog.ts       PostHog analytics (optional)
    intercom.ts      Intercom widget (optional)
    builder.ts       Ghost CMS API (server-only; note: file named before Builder.io integration)
    hinto.ts         Hinto AI knowledge base API (server-only)
    builder-io.ts    Builder.io SDK config
    clerk-env.ts     Clerk config
    clerk-safe.tsx   Safe Clerk wrappers for SSR / keyless builds
    SeoHead.tsx      SEO <head> component
    page-seo.ts      Per-route SEO metadata map
    sanitize-config.ts  Shared sanitize-html options
  imports/           Auto-generated Builder.io components — **DO NOT EDIT**
  types/             Custom TypeScript type definitions
  assets/            Static images and media
  index.css          Tailwind CSS entry point

public/
  sw.js              Service Worker (ISR-like 5-minute HTML navigation cache)
  fonts/             Inter variable font
  images/            Public raster/WebP images

scripts/
  create-version-aliases.js  Webpack versioned-package alias setup (Builder.io)
```

---

## Code Style & Naming Conventions

- **TypeScript strict mode** is enabled — always provide types; avoid `any`.
- **Components**: PascalCase files and exports (`HomePage.tsx`, `Navigation.tsx`).
- **Utility functions**: camelCase exports (`trackEvent()`, `initPostHog()`).
- **Constants**: UPPER_SNAKE_CASE (`PRICING_TIERS`, `TTL_MS`, `CACHE_NAME`).
- **Interfaces/Types**: PascalCase (`GhostPost`, `BlogPost`, `HomePageProps`).
- **Custom hooks**: prefixed with `use` (`useIntercom`, `usePageActive`).
- **No default exports** for components — use named exports.
- **`console.log`** is stripped in production builds; use `console.warn` or `console.error` for messages that must survive production.
- Match the surrounding file's style when editing an existing file.

---

## Environment Variables

Client-side variables must use the `NEXT_PUBLIC_` prefix. **Do not access them dynamically** — Next.js inlines them as literal string references at compile time.

Use `ENV.*` from `src/lib/env.ts` for all client-side variable access:

```ts
import { ENV } from '@/lib/env';
ENV.APP_ENV   // process.env.NEXT_PUBLIC_APP_ENV
ENV.SITE_URL  // process.env.NEXT_PUBLIC_SITE_URL
```

Server-only variables (no `NEXT_PUBLIC_` prefix) — use inside `getStaticProps`, `getServerSideProps`, or API routes only:

| Variable | Purpose |
|---|---|
| `GHOST_CONTENT_API_KEY` | Ghost CMS read-only key |
| `GHOST_ADMIN_API_KEY` | Ghost Admin API key (newsletter subscribe) |
| `HINTO_API_KEY` | Hinto AI knowledge base key |

See `.env.example` for the full list of variables.

---

## Security Rules

- **Never log API keys or secrets.** Ghost Content API URLs contain `?key=…` — log only the redacted path/URL without the query string.
- **Never add `NEXT_PUBLIC_` to secret keys** — they would be bundled into the browser build.
- **Never commit secrets** — only publishable/public keys belong in env files or source code.
- Use `sanitize-html` (with `sharedSanitizeOptions` from `src/lib/sanitize-config.ts`) when rendering any user-supplied or CMS HTML to prevent XSS.

---

## Files That Must Never Be Edited

- **`src/imports/`** — Auto-generated by Builder.io. These files are overwritten on every designer PR. Wrap behaviour in hand-written components under `src/components/` instead.

---

## Adding a New Page

1. Create the page component in `src/components/MyPage.tsx` (named export).
2. Create the Next.js route file in `pages/my-page.tsx`, importing the component.
3. Add SEO metadata to `src/lib/page-seo.ts`.
4. Add a `<link rel="canonical">` entry via `SeoHead` if needed.
5. Add the route to the sitemap in `pages/api/sitemap.ts`.

---

## Optional Features (Conditional on Env Keys)

These features are entirely optional and are disabled when their keys are absent:

| Feature | Key | Safe wrapper |
|---|---|---|
| Clerk auth | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `src/lib/clerk-safe.tsx` |
| PostHog | `NEXT_PUBLIC_POSTHOG_KEY` | `initPostHog()` in `src/lib/posthog.ts` |
| Intercom | `NEXT_PUBLIC_INTERCOM_APP_ID` | Gated by `APP_ENV ∈ {production, preprod}` |
| Calendly | `NEXT_PUBLIC_CALENDLY_EU` / `_OTHERS` | — |

Never assume these are present. Use the safe wrappers (`SafeSignedIn`, `SafeSignedOut`) for any Clerk-dependent rendering.

---

## Analytics Patterns

- Push events to GTM via `trackEvent(eventName, payload)` from `src/lib/gtm.ts`.
- Track page views via `trackPageView(url)` from `src/lib/gtm.ts`.
- PostHog events via `trackEvent()` from `src/lib/posthog.ts`.
- GTM container ID is chosen at runtime based on `NEXT_PUBLIC_APP_ENV`: `production` → `GTM_ID_PROD`, anything else → `GTM_ID_STG`.

---

## Service Worker (ISR-like Caching)

- Only HTML navigation requests are cached (`public/sw.js`).
- Cache TTL is 5 minutes (`TTL_MS`); stale-while-revalidate strategy.
- `/sign-in` and `/sign-up` bypass the SW cache (`DYNAMIC_BYPASS`).
- SW is **never active in development** — it is unregistered in dev builds.
- If SW caching logic changes, bump `CACHE_NAME` in `public/sw.js`.

---

## Image Guidelines

- Place new images in `public/images/` as **WebP** (max 200 KB) or raster PNG/JPEG (max 500 KB).
- A dev-time warning is emitted for oversized images (see `next.config.js`).
- External image domains must be added to the `remotePatterns` list in `next.config.js`.
- Static images are imported as URL strings (webpack `asset/resource` rule) — use `<img src={logoUrl} />`, not Next.js `<Image>`.

---

## Builder.io Codegen Workflow

1. Designers work in Builder.io; PRs land in `src/imports/`.
2. On review: `npm i && npm run dev`, smoke-test navigation and Builder components.
3. If new pages are added: update `pages/api/sitemap.ts` and `src/lib/page-seo.ts`.
4. **Never hand-edit** files in `src/imports/`.
