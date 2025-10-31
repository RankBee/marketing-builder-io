import React, { PropsWithChildren, useEffect } from "react";
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

type ChildrenProp = PropsWithChildren<{}>;
type ClerkSignInProps = React.ComponentProps<typeof ClerkSignIn>;
type ClerkSignUpProps = React.ComponentProps<typeof ClerkSignUp>;

/**
 * Safe wrappers so the Vite/Builder app remains buildable without Clerk env.
 * - If VITE_CLERK_PUBLISHABLE_KEY is missing:
 *   - SafeSignedIn renders nothing
 *   - SafeSignedOut renders children (treat as signed-out UX)
 *   - useSafeUser returns a stub unsigned state
 *   - SafeSignIn / SafeSignUp render a friendly placeholder
 *   - SafeUserButton renders nothing
 *   - useOrgOnboarded assumes false
 */

export function SafeSignedIn({ children }: ChildrenProp) {
  if (!publishableKey) {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn("[Clerk] publishableKey is missing in SafeSignedIn (DEV)");
    }
    return null;
  }
  return <ClerkSignedIn>{children}</ClerkSignedIn>;
}

export function SafeSignedOut({ children }: ChildrenProp) {
  if (!publishableKey) {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Clerk] publishableKey is missing in SafeSignedOut (DEV) - rendering children as signed-out"
      );
    }
    return <>{children}</>;
  }
  return <ClerkSignedOut>{children}</ClerkSignedOut>;
}

export function useSafeUser() {
  if (!publishableKey) {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Clerk] publishableKey is missing in useSafeUser (DEV) - returning unsigned stub"
      );
    }
    return {
      user: undefined as any,
      isSignedIn: false,
      isLoaded: true,
    };
  }
  return clerkUseUser();
}

/**
 * Returns true if the active (or any listed) organization has publicMetadata.onboarded === true.
 * Priority:
 * 1) Active organization (useOrganization)
 * 2) Any membership's organization (useOrganizationList.userMemberships)
 * 3) Fallbacks for older Clerk clients:
 *    - user.organizationMemberships[*].organization.publicMetadata.onboarded
 *    - user.publicMetadata.onboarded (last-resort, for legacy mirroring)
 * Notes:
 * - Coerces string/number values ("true"/"1") to boolean true
 * - Avoids relying on fields not present in all Clerk versions
 */
/**
 * Safe org onboarding state accessor for components that must also run without ClerkProvider
 * (e.g., Builder preview without VITE_CLERK_PUBLISHABLE_KEY).
 * Returns both the computed boolean and whether Clerk data has loaded.
 */
export function useOrgOnboardingState(): { onboarded: boolean; loaded: boolean } {
  if (!publishableKey) {
    return { onboarded: false, loaded: false };
  }

  const { isLoaded: orgLoaded, organization } = useOrganization();
  const { isLoaded: listLoaded, userMemberships } = useOrganizationList({ userMemberships: { limit: 50 } });
  const { user, isLoaded: userLoaded } = clerkUseUser();

  const asBool = (v: any) => {
    if (v === true || v === 1) return true;
    if (v === '1') return true;
    if (typeof v === 'string') {
      const s = v.trim().toLowerCase();
      return s === 'true' || s === '1' || s === 'yes' || s === 'on';
    }
    return false;
  };

  // 1) Active org publicMetadata.onboarded
  const activeOnboarded = asBool((organization as any)?.publicMetadata?.onboarded);

  // 2) Any membership's org publicMetadata.onboarded (supports both array and paginated shapes)
  const membershipsAny: any = userMemberships as any;
  const memberships: any[] =
    Array.isArray(membershipsAny)
      ? membershipsAny
      : (Array.isArray(membershipsAny?.data) ? membershipsAny.data : []);

  const memberOnboarded = memberships.some(
    (m: any) => asBool(m?.organization?.publicMetadata?.onboarded)
  );

  // 3a) Fallback: some Clerk versions expose user.organizationMemberships on the client
  const uAny: any = user as any;
  const uMems: any[] = Array.isArray(uAny?.organizationMemberships) ? uAny.organizationMemberships : [];
  const userMemsOnboarded = uMems.some(
    (m: any) => asBool(m?.organization?.publicMetadata?.onboarded)
  );

  // 3b) Last-resort fallback: legacy mirroring put onboarded under user.publicMetadata
  const userMirrorOnboarded = asBool(uAny?.publicMetadata?.onboarded);

  const loaded = Boolean(orgLoaded || listLoaded || userLoaded);
  const onboarded = Boolean(activeOnboarded || memberOnboarded || userMemsOnboarded || userMirrorOnboarded);

  if ((import.meta as any)?.env?.DEV) {
    // eslint-disable-next-line no-console
    console.log("[OrgCTA][DEV]", {
      orgLoaded,
      listLoaded,
      userLoaded,
      activeOrgId: (organization as any)?.id,
      activeOnboarded,
      memberOnboarded,
      userMemsOnboarded,
      userMirrorOnboarded,
      onboarded,
      loaded,
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
  if (!publishableKey) {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Clerk] VITE_CLERK_PUBLISHABLE_KEY not visible at runtime in SafeSignIn. Check .env and restart dev server."
      );
    }
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Authentication unavailable</h2>
          <p className="text-gray-600 mb-4">
            Set VITE_CLERK_PUBLISHABLE_KEY to enable Sign In in this environment.
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
  if (!publishableKey) {
    if ((import.meta as any)?.env?.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        "[Clerk] VITE_CLERK_PUBLISHABLE_KEY not visible at runtime in SafeSignUp. Check .env and restart dev server."
      );
    }
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="p-6 rounded-xl border border-gray-200 shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Authentication unavailable</h2>
          <p className="text-gray-600 mb-4">
            Set VITE_CLERK_PUBLISHABLE_KEY to enable Sign Up in this environment.
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
  if (!publishableKey) return;

  const { organization } = useOrganization();
  const { isLoaded, userMemberships, setActive } = useOrganizationList({
    userMemberships: { limit: 50 },
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (organization) return;

    const memAny: any = userMemberships as any;
    const memberships: any[] =
      Array.isArray(memAny) ? memAny : (Array.isArray(memAny?.data) ? memAny.data : []);

    const firstOrgId: string | undefined =
      memberships?.[0]?.organization?.id || memberships?.[0]?.id;

    if (firstOrgId && typeof setActive === "function") {
      try {
        // Clerk accepts an object like { organization: orgId }
        (setActive as any)({ organization: firstOrgId });
      } catch {
        // Older signatures may accept different shapes
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
  }, [isLoaded, organization, userMemberships, setActive]);
}

/**
 * Safe UserButton that hides when publishableKey is not configured.
 * You can pass showName or other Clerk UserButton props if desired.
 */
export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  if (!publishableKey) return null;
  return <UserButton {...props} />;
}