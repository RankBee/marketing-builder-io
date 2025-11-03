import posthog from 'posthog-js';

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  posthog.capture(eventName, properties);
}

export function trackCTAClick(buttonName: string, page?: string) {
  trackEvent('cta_click', {
    button_name: buttonName,
    page: page || window.location.pathname,
  });
}

export function trackSignUp() {
  trackEvent('sign_up');
}

export function trackSignIn() {
  trackEvent('sign_in');
}

export function trackDemoRequest() {
  trackEvent('demo_request');
}

export function trackHomepageViewed() {
  trackEvent('homepage_viewed');
}

export function trackMarketingPricingView() {
  trackEvent('marketing_pricing_view');
}
