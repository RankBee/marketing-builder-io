import { useCallback, useState, useEffect } from 'react';
import {
  showIntercomMessenger,
  hideIntercomMessenger,
  updateIntercomUser,
  isWithinBusinessHours,
} from './intercom';

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
