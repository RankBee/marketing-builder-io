import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE_TIMEOUT_MS = 15_000; // 15 seconds of no mouse/keyboard/touch → idle

/**
 * Returns `true` when the page is actively being viewed and interacted with.
 * Returns `false` when:
 *  - The browser tab is hidden (Page Visibility API)
 *  - The user has been idle (no mouse/keyboard/touch) for IDLE_TIMEOUT_MS
 *
 * Use this to gate expensive animations so they consume zero GPU when not needed.
 */
export function usePageActive(): boolean {
  const [isActive, setIsActive] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    // If tab is hidden, don't reactivate on stray events
    if (typeof document !== 'undefined' && document.hidden) return;

    setIsActive(true);

    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsActive(false), IDLE_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Page Visibility API
    const handleVisibility = () => {
      if (document.hidden) {
        setIsActive(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      } else {
        resetIdleTimer();
      }
    };

    // User interaction events (passive for performance)
    const interactionEvents = ['mousemove', 'keydown', 'touchstart', 'scroll'] as const;

    document.addEventListener('visibilitychange', handleVisibility);
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, resetIdleTimer, { passive: true }),
    );

    // Start the idle timer
    resetIdleTimer();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, resetIdleTimer),
      );
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdleTimer]);

  return isActive;
}
