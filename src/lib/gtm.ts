// Google Tag Manager utility
// Pushes events to dataLayer for GTM to process

import { useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/clerk-react';
import { publishableKey } from './clerk-env';
import { ENV } from './env';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// Store current Clerk context for automatic enrichment
let currentClerkUserId: string | undefined;
let currentClerkOrgId: string | undefined;
let currentToolId: string | undefined;

/**
 * Get the appropriate GTM ID based on environment
 */
export function getGTMId(): string | undefined {
  const env = ENV.APP_ENV;
  
  // Use production GTM ID for production, staging for everything else
  if (env === 'production') {
    return ENV.GTM_ID_PROD;
  }
  
  return ENV.GTM_ID_STG;
}

/**
 * Set the current Clerk and tool context for automatic enrichment of events
 * @param userId - Clerk user ID
 * @param orgId - Clerk organization ID
 * @param toolId - Tool/product identifier (optional)
 */
export function setClerkContext(userId?: string, orgId?: string, toolId?: string): void {
  currentClerkUserId = userId;
  currentClerkOrgId = orgId;
  currentToolId = toolId;
  
  // Push user properties to dataLayer when context is set
  if (userId) {
    pushToDataLayer('clerk_context_set', {
      clerk_user_id: userId,
      clerk_org_id: orgId,
      tool_id: toolId,
    });
  }
}

/**
 * Push an event to GTM dataLayer with automatic Clerk context enrichment
 * @param event - Event name
 * @param data - Additional event data
 */
export function pushToDataLayer(event: string, data?: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    // Automatically include Clerk context in all events
    clerk_user_id: currentClerkUserId,
    clerk_org_id: currentClerkOrgId,
    tool_id: currentToolId,
    ...data,
  };
  
  window.dataLayer.push(eventData);
  
  if (ENV.DEV) {
    console.log('[GTM] Event pushed to dataLayer:', eventData);
  }
}

/**
 * Set user properties in dataLayer for GTM
 * @param userId - User ID
 * @param properties - Additional user properties
 */
export function setUserProperties(userId: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  window.dataLayer.push({
    event: 'user_properties_set',
    userId,
    clerk_user_id: currentClerkUserId,
    clerk_org_id: currentClerkOrgId,
    tool_id: currentToolId,
    ...properties,
  });
  
  if (ENV.DEV) {
    console.log('[GTM] User properties set:', { userId, ...properties });
  }
}

/**
 * React hook to automatically sync Clerk user and org context with GTM dataLayer.
 * Call this hook at the app root level (e.g., in App.tsx).
 * It will automatically update GTM when the user signs in/out or switches orgs.
 */
export function useGTMClerkSync(): void {
  const isServer = typeof window === 'undefined';
  const clerkEnabled = !isServer && !!publishableKey;

  // Always call hooks unconditionally (Rules of Hooks)
  let userResult: ReturnType<typeof useUser> | null = null;
  let orgResult: ReturnType<typeof useOrganization> | null = null;
  try {
    userResult = useUser();
    orgResult = useOrganization();
  } catch (err) {
    if (clerkEnabled) {
      console.error('[GTM] Clerk hooks failed despite publishableKey being set.', err);
    }
  }

  const user = clerkEnabled && userResult ? userResult.user : undefined;
  const isSignedIn = clerkEnabled && userResult ? userResult.isSignedIn : false;
  const organization = clerkEnabled && orgResult ? orgResult.organization : undefined;

  useEffect(() => {
    // Only sync if Clerk is configured
    if (!clerkEnabled) return;

    if (isSignedIn && user?.id) {
      const userId = user.id;
      const orgId = organization?.id;
      
      // Update GTM with Clerk context
      setClerkContext(userId, orgId);
      
      if (ENV.DEV) {
        console.log('[GTM] Clerk context synced:', { userId, orgId });
      }
    } else {
      // User signed out, clear context
      setClerkContext(undefined, undefined, undefined);
      
      if (ENV.DEV) {
        console.log('[GTM] Clerk context cleared (user signed out)');
      }
    }
  }, [clerkEnabled, isSignedIn, user?.id, organization?.id]);
}

/**
 * Track a page view event
 * @param pageName - Name of the page
 * @param path - URL path
 * @param additionalData - Additional page data
 */
export function trackPageView(pageName: string, path: string, additionalData?: Record<string, any>): void {
  pushToDataLayer('page_view', {
    page_name: pageName,
    page_path: path,
    page_location: window.location.href,
    ...additionalData,
  });
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventData - Event data
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
  pushToDataLayer(eventName, eventData);
}