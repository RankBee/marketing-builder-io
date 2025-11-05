// Intercom utility functions for interacting with the Intercom messenger
// Note: Intercom SDK is loaded dynamically in IntercomClient component

/**
 * Opens the Intercom messenger
 */
export const showIntercomMessenger = (): void => {
  if (typeof window === 'undefined' || !window.Intercom) {
    console.warn('Intercom is not available yet');
    return;
  }
  window.Intercom('show');
};

/**
 * Hides the Intercom messenger
 */
export const hideIntercomMessenger = (): void => {
  if (typeof window === 'undefined' || !window.Intercom) {
    console.warn('Intercom is not available yet');
    return;
  }
  window.Intercom('hide');
};

/**
 * Updates the Intercom user with custom attributes
 */
export const updateIntercomUser = (customFields: Record<string, any> = {}): void => {
  if (typeof window === 'undefined' || !window.Intercom) {
    console.warn('Intercom is not available yet');
    return;
  }
  window.Intercom('update', customFields);
};

/**
 * Shows a specific Intercom message
 */
export const showIntercomMessage = (messageId: string): void => {
  if (typeof window === 'undefined' || !window.Intercom) {
    console.warn('Intercom is not available yet');
    return;
  }
  window.Intercom('showMessages', messageId);
};

/**
 * Custom hook for interacting with Intercom messenger
 * Provides functions to show, hide, and update the Intercom messenger
 */
import { useCallback, useState, useEffect } from 'react';

/**
 * Checks if the current time is within business hours (9 AM - 6 PM GMT)
 */
export const isWithinBusinessHours = (): boolean => {
  const now = new Date();
  const gmtHours = now.getUTCHours();
  return gmtHours >= 9 && gmtHours < 18;
};

/**
 * Custom hook to track team availability status in real-time
 */
export function useTeamAvailability() {
  const [isAvailable, setIsAvailable] = useState(isWithinBusinessHours());

  useEffect(() => {
    // Check availability immediately
    setIsAvailable(isWithinBusinessHours());

    // Update every minute
    const interval = setInterval(() => {
      setIsAvailable(isWithinBusinessHours());
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return isAvailable;
}

export function useIntercom() {
  const showMessenger = useCallback(() => {
    showIntercomMessenger();
  }, []);

  const hideMessenger = useCallback(() => {
    hideIntercomMessenger();
  }, []);

  const updateUser = useCallback((customFields: Record<string, any>) => {
    updateIntercomUser(customFields);
  }, []);

  return {
    showMessenger,
    hideMessenger,
    updateUser,
  };
}