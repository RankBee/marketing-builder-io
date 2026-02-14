import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  SignedIn as ClerkSignedIn,
  SignedOut as ClerkSignedOut,
  useUser as clerkUseUser,
  SignIn as ClerkSignIn,
  SignUp as ClerkSignUp,
  useOrganization,
  useOrganizationList,
  UserButton,
} from "@clerk/clerk-react";
import { publishableKey } from "./clerk-env";

// SSR guard: Clerk hooks/components require ClerkProvider which is only available client-side
const isServer = typeof window === 'undefined';

type ChildrenProp = PropsWithChildren<{}>;
type ClerkSignInProps = React.ComponentProps<typeof ClerkSignIn>;
type ClerkSignUpProps = React.ComponentProps<typeof ClerkSignUp>;

/**
 * Safe wrappers so the app remains buildable without Clerk env.
 * - If NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing:
 *   - SafeSignedIn renders nothing
 *   - SafeSignedOut renders children (treat as signed-out UX)
 *   - useSafeUser returns a stub unsigned state
 *   - SafeSignIn / SafeSignUp render a friendly placeholder
 *   - SafeUserButton renders nothing
 *   - useOrgOnboarded assumes false
 */

export function SafeSignedIn({ children }: ChildrenProp) {
  if (isServer || !publishableKey) {
    return null;
  }
  return <ClerkSignedIn>{children}</ClerkSignedIn>;
}

export function SafeSignedOut({ children }: ChildrenProp) {
  if (isServer) {
    // During SSR, render nothing to avoid hydration mismatch
    // (server doesn't know auth state; client will hydrate correctly)
    return null;
  }
  if (!publishableKey) {
    return <>{children}</>;
  }
  return (
    <ClerkSignedOut>
      <SignedOutCleanup />
      {children}
    </ClerkSignedOut>
  );
}

// Clears any rb_o_onboarded_${orgId} cache entries when the app is in a signed-out state.
function SignedOutCleanup() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const ls = window.localStorage;
      const prefix = 'rb_o_onboarded_';
      // snapshot keys since removing during iteration mutates indices
      const keysToRemove: string[] = [];
      for (let i = 0; i < ls.length; i++) {
        const key = ls.key(i);
        if (key && key.startsWith(prefix)) keysToRemove.push(key);
      }
      keysToRemove.forEach((k) => ls.removeItem(k));
    } catch {
      // ignore storage errors
    }
  }, []);
  return null;
}

export function useSafeUser() {
  const clerkEnabled = !isServer && !!publishableKey;
  let clerkResult: ReturnType<typeof clerkUseUser> | null = null;
  try {
    // Always call the hook unconditionally (Rules of Hooks)
    clerkResult = clerkUseUser();
  } catch (err) {
    if (clerkEnabled) {
      console.error('[RankBee] CRITICAL: Clerk useUser() failed despite publishableKey being set. Auth is unavailable.', err);
    }
  }
  if (!clerkEnabled || !clerkResult) {
    return {
      user: undefined as any,
      isSignedIn: false,
      isLoaded: !isServer,
    };
  }
  return clerkResult;
}

/**
 * Safe org onboarding state accessor for components that must also run without ClerkProvider
 * (e.g., Builder preview without NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).
 * Returns both the computed boolean and whether Clerk data has loaded.
 */
export function useOrgOnboardingState(): { onboarded: boolean; loaded: boolean } {
  // Always call hooks unconditionally (Rules of Hooks)
  const clerkEnabled = !isServer && !!publishableKey;
  let orgListResult: ReturnType<typeof useOrganizationList> | null = null;
  let orgResult: ReturnType<typeof useOrganization> | null = null;
  try {
    orgListResult = useOrganizationList({ userMemberships: { limit: 50 } });
    orgResult = useOrganization();
  } catch (err) {
    if (clerkEnabled) {
      console.error('[RankBee] CRITICAL: Clerk org hooks failed despite publishableKey being set. Auth is unavailable.', err);
    }
  }

  const listLoaded = clerkEnabled && orgListResult ? (orgListResult.isLoaded ?? false) : false;
  const userMemberships = clerkEnabled && orgListResult ? (orgListResult.userMemberships ?? null) : null;
  const activeOrg = clerkEnabled && orgResult ? (orgResult.organization ?? null) : null;

  const asBool = (v: any) => {
    if (v === true) return true;
    if (typeof v === 'string') {
      const s = v.trim().toLowerCase();
      return s === 'true';
    }
    return false;
  };

  // FIRST membership org publicMetadata.onboarded (supports both array and paginated shapes)
  const memAny: any = userMemberships as any;
  const memberships: any[] =
    Array.isArray(memAny)
      ? memAny
      : (Array.isArray(memAny?.data) ? memAny.data : []);

  const firstMembership: any = memberships?.[0];
  // Prefer activeOrg (safe in impersonation) over list's first org (incomplete metadata in impersonation)
  const firstOrg: any = activeOrg ?? firstMembership?.organization ?? undefined;

  // Inspect org metadata
  const orgPublicMeta: any = firstOrg?.publicMetadata;
  const hasOnboardedKey: boolean =
    !!orgPublicMeta && Object.prototype.hasOwnProperty.call(orgPublicMeta, 'onboarded');
  const firstOrgOnboardedRaw = orgPublicMeta?.onboarded;
  const firstOrgOnboarded = asBool(firstOrgOnboardedRaw);

  // Cache: once we ever observe onboarded === true for this org, remember it to avoid future flicker.
  const orgId: string | undefined = firstOrg?.id;
  const cachedTrueRef = useRef(false);
  // Sync ref from localStorage on every render (cheap read)
  if (typeof window !== 'undefined' && orgId) {
    try {
      cachedTrueRef.current = window.localStorage.getItem(`rb_o_onboarded_${orgId}`) === '1';
    } catch {
      // ignore storage errors
    }
  } else {
    cachedTrueRef.current = false;
  }

  const [loadedStable, setLoadedStable] = useState(false);
  const FALSE_STABLE_DELAY_MS = 1500;
  const ZERO_MEMBERSHIP_DELAY_MS = 1000;

  // Persist positive onboarding once observed
  useEffect(() => {
    if (!clerkEnabled) return;
    if (typeof window === 'undefined') return;
    if (!orgId) return;
    if (firstOrgOnboarded === true) {
      try {
        window.localStorage.setItem(`rb_o_onboarded_${orgId}`, '1');
        cachedTrueRef.current = true;
      } catch {
        // ignore
      }
    } else if (firstOrgOnboarded === false && cachedTrueRef.current) {
      try {
        window.localStorage.removeItem(`rb_o_onboarded_${orgId}`);
        cachedTrueRef.current = false;
      } catch {
        // ignore
      }
    }
  }, [clerkEnabled, orgId, firstOrgOnboarded]);

  useEffect(() => {
    if (!clerkEnabled) return;
    // Reset when list not loaded
    if (!listLoaded) {
      setLoadedStable(false);
      return;
    }

    // No orgs: avoid premature resolution; wait briefly to confirm truly zero
    if (memberships.length === 0) {
      const t = setTimeout(() => setLoadedStable(true), ZERO_MEMBERSHIP_DELAY_MS);
      return () => clearTimeout(t);
    }

    // Known onboarded via cache or live flag: resolve immediately
    if ((!!orgId && cachedTrueRef.current && firstOrgOnboarded !== false) || (!!firstOrg?.id && firstOrgOnboarded === true)) {
      setLoadedStable(true);
      return;
    }

    // Explicit false (or missing key): wait briefly to avoid transient false -> true flips
    if (!!firstOrg?.id && firstOrgOnboarded !== true) {
      const t = setTimeout(() => setLoadedStable(true), FALSE_STABLE_DELAY_MS);
      return () => clearTimeout(t);
    }

    // Otherwise unresolved
    setLoadedStable(false);
  }, [clerkEnabled, listLoaded, memberships.length, orgId, firstOrg?.id, hasOnboardedKey, firstOrgOnboarded]);

  if (!clerkEnabled) {
    return { onboarded: false, loaded: false };
  }

  const canResolve =
    (!!firstOrg?.id && (firstOrgOnboarded === true || hasOnboardedKey)) ||
    (!!orgId && cachedTrueRef.current);

  const loaded = Boolean(loadedStable);
  const onboarded = Boolean(firstOrgOnboarded || cachedTrueRef.current);

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log("[OrgCTA][DEV]", {
      listLoaded,
      firstOrgId: firstOrg?.id,
      membershipsLength: memberships.length,
      hasOnboardedKey,
      firstOrgOnboarded,
      cachedTrue: cachedTrueRef.current,
      onboarded,
      loaded,
      canResolve,
    });
  }

  return { onboarded, loaded };
}

/** Backwards-compat wrapper */
export function useOrgOnboarded(): boolean {
  const { onboarded } = useOrgOnboardingState();
  return onboarded;
}

export function SafeSignIn(props: ClerkSignInProps) {
  if (isServer) return null;
  if (!publishableKey) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Authentication unavailable</h2>
          <p className="text-gray-600 mb-4">
            Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to enable Sign In in this environment.
          </p>
          <a href="/" className="text-purple-600 underline">
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  return <ClerkSignIn {...props} />;
}

export function SafeSignUp(props: ClerkSignUpProps) {
  if (isServer) return null;
  if (!publishableKey) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Authentication unavailable</h2>
          <p className="text-gray-600 mb-4">
            Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to enable Sign Up in this environment.
          </p>
          <a href="/" className="text-purple-600 underline">
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  return <ClerkSignUp {...props} />;
}

/**
 * Ensure an active organization is set for the session:
 * - If no active org is selected and memberships are loaded, activate the first membership.
 * This mirrors how many apps default to the first org so org-dependent UI (like onboarded) works.
 */
export function useEnsureActiveOrg() {
  const clerkEnabled = !isServer && !!publishableKey;
  let orgResult: ReturnType<typeof useOrganization> | null = null;
  let orgListResult: ReturnType<typeof useOrganizationList> | null = null;
  try {
    orgResult = useOrganization();
    orgListResult = useOrganizationList({ userMemberships: { limit: 50 } });
  } catch (err) {
    if (clerkEnabled) {
      console.error('[RankBee] CRITICAL: Clerk org hooks failed despite publishableKey being set. Auth is unavailable.', err);
    }
  }

  const organization = clerkEnabled && orgResult ? (orgResult.organization ?? null) : null;
  const isLoaded = clerkEnabled && orgListResult ? (orgListResult.isLoaded ?? false) : false;
  const userMemberships = clerkEnabled && orgListResult ? (orgListResult.userMemberships ?? null) : null;
  const setActive = clerkEnabled && orgListResult ? (orgListResult.setActive ?? null) : null;

  useEffect(() => {
    if (!clerkEnabled) return;
    if (!isLoaded) return;
    if (organization) return;

    const memAny: any = userMemberships as any;
    const memberships: any[] =
      Array.isArray(memAny) ? memAny : (Array.isArray(memAny?.data) ? memAny.data : []);

    const firstOrgId: string | undefined =
      memberships?.[0]?.organization?.id || memberships?.[0]?.id;

    if (firstOrgId && typeof setActive === "function") {
      try {
        (setActive as any)({ organization: firstOrgId });
      } catch {
        try {
          (setActive as any)({ organizationId: firstOrgId });
        } catch {
          try {
            (setActive as any)(firstOrgId);
          } catch {
            // ignore
          }
        }
      }
    }
  }, [clerkEnabled, isLoaded, organization, userMemberships, setActive]);
}

/**
 * Safe UserButton that hides when publishableKey is not configured.
 * You can pass showName or other Clerk UserButton props if desired.
 */
export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  if (isServer || !publishableKey) return null;
  return <UserButton {...props} />;
}