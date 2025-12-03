import posthog from 'posthog-js'
import { isImpersonated } from './check-impersonated'

const isPostHogEnabled = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }
  
  const env = import.meta.env.VITE_APP_ENV
  return env === 'production' || env === 'preprod' || env === 'development'
}

export const initPostHog = () => {
  try {
    if (!isPostHogEnabled()) {
      return
    }
    
    // Check if PostHog is already initialized
    if (posthog.__loaded) {
      return
    }

    // Only initialize if we have the required config
    if (!import.meta.env.VITE_POSTHOG_KEY || !import.meta.env.VITE_POSTHOG_HOST) {
      return
    }

    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_HOST,
      person_profiles: 'always',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      session_recording: {
        recordCrossOriginIframes: true,
        maskAllInputs: false,
        maskTextSelector: '[data-private]',
        disable_session_recording: isImpersonated(),
      },
      loaded: (ph) => {
        // Force start session recording if it's lazy loading
        if (ph.sessionRecording?.status === 'lazy_loading' && !isImpersonated()) {
          ph.startSessionRecording()
        }
      },
      disable_external_dependency_loading: false,
    })
  } catch (error) {
    console.error('❌ PostHog initialization failed:', error)
  }
}

export const identifyPostHogUser = (userId: string, properties?: Record<string, any>) => {
  try {
    if (!isPostHogEnabled()) {
      return
    }
    
    // Skip identification during impersonation
    if (isImpersonated()) {
      return
    }
    
    posthog.identify(userId, properties)
  } catch (error) {
    console.error('❌ PostHog: Error identifying user', error)
  }
}

export const capturePostHogEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (!isPostHogEnabled()) {
      return
    }
    
    posthog.capture(eventName, properties)
  } catch (error) {
    console.error('Error capturing PostHog event', error)
  }
}

export { posthog }