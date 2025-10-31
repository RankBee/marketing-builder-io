// Debug: verify Vite env at runtime (DEV only)
if (import.meta.env.DEV) {
  // These logs confirm whether Vite is injecting the env var into the browser bundle
  // If "present" is false, the .env wasn't picked up by Vite (wrong cwd, server not restarted, or filename mismatch)
  // The "value" shows the first 12 chars to avoid leaking the full key in logs
  // eslint-disable-next-line no-console
  console.log(
    "[Clerk][DEV] VITE_CLERK_PUBLISHABLE_KEY present:",
    !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  );
  // eslint-disable-next-line no-console
  console.log(
    "[Clerk][DEV] VITE_CLERK_PUBLISHABLE_KEY value (prefix):",
    ((import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string) || "").slice(0, 12)
  );
}
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { publishableKey } from "./lib/clerk-env";

const root = document.getElementById("root")!;

createRoot(root).render(
  publishableKey ? (
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  ) : (
    <App />
  )
);

// Register service worker for 5-min navigation caching (ISR-like)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
// Register/unregister service worker appropriately
// - Only register in production (for 5-min ISR-like caching)
// - Always unregister in dev to avoid stale caches interfering with env changes
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
} else if (!import.meta.env.PROD && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => r.unregister()))
    .catch(() => {});
}