import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

export function IntercomClient() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Skip if not in production/preprod or if already loaded
    if (isLoaded) return;
    if (!(import.meta.env.VITE_APP_ENV === 'production' || import.meta.env.VITE_APP_ENV === 'preprod')) {
      console.log('Intercom: Skipping load (not production/preprod environment)');
      return;
    }

    const appId = import.meta.env.VITE_INTERCOM_APP_ID;
    if (!appId) {
      console.warn('Intercom: VITE_INTERCOM_APP_ID not configured');
      return;
    }

    const initializeIntercom = async () => {
      try {
        console.log('Intercom: Dynamically importing SDK...');
        // Dynamic import of Intercom SDK
        const { default: Intercom } = await import('@intercom/messenger-js-sdk');

        // Initialize for signed-in users with JWT
        if (user) {
          const token = await getToken({ template: 'Intercom-session-key' });
          Intercom({
            app_id: appId,
            user_id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            email: user.primaryEmailAddress?.emailAddress,
            created_at: user.createdAt ? Math.floor(new Date(user.createdAt).getTime() / 1000) : undefined,
            user_hash: token ? (token.startsWith('"') ? JSON.parse(token) : token) : undefined,
          });
          console.log('Intercom: Initialized for authenticated user');
        } else {
          // Initialize for visitors
          Intercom({
            app_id: appId,
          });
          console.log('Intercom: Initialized for visitor');
        }

        setIsLoaded(true);
      } catch (error) {
        console.error('Intercom: Error initializing:', error);
      }
    };

    // Delay initialization slightly to let the page render first
    const timer = setTimeout(() => {
      initializeIntercom();
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, getToken, isLoaded]);

  return null;
}