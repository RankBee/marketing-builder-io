// PostHog Analytics configuration and helpers for Vite app
// Required env: VITE_POSTHOG_KEY, VITE_POSTHOG_HOST

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { useUser, useOrganization } from '@clerk/clerk-react';
import { publishableKey } from './clerk-env';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST as string | undefined;

let isInitialized = false;

// Store current Clerk context for automatic enrichment
let currentClerkUserId: string | undefined;
let currentClerkOrgId: string | undefined;

/**
 * Initialize PostHog with the provided configuration.
 * Only initializes once and only in browser environment with valid credentials.
 */
export function initPostHog(): void {
  // Only initialize in browser environment
  if (typeof window === 'undefined') return;
  
  // Don't initialize if already done
  if (isInitialized) return;
  
  // Don't initialize if credentials are missing
  if (!posthogKey || !posthogHost) {
    if (import.meta.env.DEV) {
      console.warn('[PostHog] Missing VITE_POSTHOG_KEY or VITE_POSTHOG_HOST');
    }
    return;
  }

  try {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: false, // We'll handle this manually for SPA routing
      loaded: (ph) => {
        if (import.meta.env.DEV) {
          console.log('[PostHog] Initialized successfully');
        }
      },
    });
    isInitialized = true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[PostHog] Initialization failed:', error);
    }
  }
}

/**
 * Set the current Clerk user context for automatic enrichment of events
 * @param userId - Clerk user ID
 * @param orgId - Clerk organization ID
 */
export function setClerkContext(userId?: string, orgId?: string): void {
  currentClerkUserId = userId;
  currentClerkOrgId = orgId;
  
  // If we have a user ID, identify them in PostHog
  if (userId && isInitialized) {
    try {
      posthog.identify(userId, {
        clerk_user_id: userId,
        clerk_org_id: orgId,
      });
      
      // Set super properties that will be included with all events
      posthog.register({
        clerk_user_id: userId,
        clerk_org_id: orgId,
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[PostHog] Failed to set Clerk context:', error);
      }
    }
  }
}

/**
 * Track a funnel event in PostHog with automatic Clerk context
 * @param eventName - The name of the event to track
 * @param properties - Optional properties to attach to the event
 */
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  if (!isInitialized || typeof window === 'undefined') return;
  
  try {
    // Automatically enrich events with Clerk context
    const enrichedProperties = {
      ...properties,
      clerk_user_id: currentClerkUserId,
      clerk_org_id: currentClerkOrgId,
    };
    
    posthog.capture(eventName, enrichedProperties);
    
    if (import.meta.env.DEV) {
      console.log('[PostHog] Event tracked:', eventName, enrichedProperties);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[PostHog] Event tracking failed:', error);
    }
  }
}

/**
 * Identify a user in PostHog
 * @param userId - The unique identifier for the user
 * @param properties - Optional properties to attach to the user
 */
export function identifyUser(userId: string, properties?: Record<string, any>): void {
  if (!isInitialized || typeof window === 'undefined') return;
  
  try {
    posthog.identify(userId, properties);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[PostHog] User identification failed:', error);
    }
  }
}

/**
 * React hook to automatically sync Clerk user and org context with PostHog.
 * Call this hook at the app root level (e.g., in App.tsx).
 * It will automatically update PostHog when the user signs in/out or switches orgs.
 */
export function usePostHogClerkSync(): void {
  // Only run if Clerk is configured
  if (!publishableKey) return;
  
  const { user, isSignedIn } = useUser();
  const { organization } = useOrganization();
  
  useEffect(() => {
    if (isSignedIn && user?.id) {
      const userId = user.id;
      const orgId = organization?.id;
      
      // Update PostHog with Clerk context
      setClerkContext(userId, orgId);
      
      if (import.meta.env.DEV) {
        console.log('[PostHog] Clerk context synced:', { userId, orgId });
      }
    } else {
      // User signed out, clear context
      setClerkContext(undefined, undefined);
      
      if (import.meta.env.DEV) {
        console.log('[PostHog] Clerk context cleared (user signed out)');
      }
    }
  }, [isSignedIn, user?.id, organization?.id]);
}

// Export the posthog instance for advanced usage
export { posthog };