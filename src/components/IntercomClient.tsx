import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useSafeUser } from '../lib/clerk-safe';
import { publishableKey } from '../lib/clerk-env';
import { ENV } from '../lib/env';

export function IntercomClient() {
  const { user } = useSafeUser();
  const authResult = useAuth();
  const getToken = (publishableKey && authResult?.getToken) ? authResult.getToken : null;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Skip if not in production/preprod or if already loaded
    if (isLoaded) return;
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev && process.env.NEXT_PUBLIC_ENABLE_INTERCOM_IN_DEV !== '1') {
      console.log('Intercom: Skipping load (development mode)');
      // Intentional: mark as loaded to prevent this effect from re-running on
      // every render cycle in development (avoids infinite loop / log spam).
      // To enable Intercom in dev, set NEXT_PUBLIC_ENABLE_INTERCOM_IN_DEV=1
      // and do a full page reload.
      setIsLoaded(true);
      return;
    }

    if (!(ENV.APP_ENV === 'production' || ENV.APP_ENV === 'preprod')) {
      console.log('Intercom: Skipping load (not production/preprod environment)');
      return;
    }

    const appId = ENV.INTERCOM_APP_ID;
    if (!appId) {
      console.warn('Intercom: NEXT_PUBLIC_INTERCOM_APP_ID not configured');
      return;
    }

    const initializeIntercom = async () => {
      try {
        console.log('Intercom: Dynamically importing SDK...');
        // Dynamic import of Intercom SDK
        const { default: Intercom } = await import('@intercom/messenger-js-sdk');

        // Initialize for signed-in users with JWT
        if (user) {
          const token = getToken ? await getToken({ template: 'Intercom-session-key' }) : null;
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
