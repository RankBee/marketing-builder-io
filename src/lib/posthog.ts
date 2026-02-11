import posthog from 'posthog-js'
import { isImpersonated } from './check-impersonated'
import { ENV } from './env'

const isPostHogEnabled = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }
  
  const env = ENV.APP_ENV
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
    if (!ENV.POSTHOG_KEY || !ENV.POSTHOG_HOST) {
      return
    }

    const impersonated = isImpersonated();

    posthog.init(ENV.POSTHOG_KEY!, {
      api_host: ENV.POSTHOG_HOST,
      person_profiles: 'always',
      capture_pageview: !impersonated,
      capture_pageleave: !impersonated,
      autocapture: !impersonated,
      opt_out_capturing_by_default: impersonated,
      disable_session_recording: impersonated,
      session_recording: {
        recordCrossOriginIframes: true,
        maskAllInputs: false,
        maskTextSelector: '[data-private]',
      },
      loaded: (ph) => {
        if (!impersonated && ph.sessionRecording?.status === 'lazy_loading') {
          ph.startSessionRecording();
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

// Backward compatibility: export capturePostHogEvent as trackEvent
export { capturePostHogEvent as trackEvent }

export { posthog }