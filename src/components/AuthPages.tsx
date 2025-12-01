import React from "react";
import { SafeSignIn, SafeSignUp } from "../lib/clerk-safe";
import { onboardRedirectUrl } from "../lib/clerk-env";

/**
 * Standalone Sign In and Sign Up pages for the Vite marketing app.
 * These are rendered within this Vite app so auth happens here (no Next.js redirect).
 *
 * Notes:
 * - After Sign In, we return to "/" so the navbar/home can reflect session state.
 * - After Sign Up, we redirect to the onboarding flow using VITE_ONBOARD_URL (e.g., https://rankbee.ai/onboard).
 */
 
export function SignInPage() {
  return (
    <div id="singin-wrapper" className="flex items-center justify-center min-h-[100svh] mt-12 sm:mt-16 lg:mt-24 mb-12 sm:mb-16 lg:mb-24">
      <div className="my-12 sm:my-16 lg:my-24">
        <SafeSignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
}

export function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[100svh] mt-12 sm:mt-16 lg:mt-24 mb-12 sm:mb-16 lg:mb-24">
      <div className="my-12 sm:my-16 lg:my-24">
        <SafeSignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl={onboardRedirectUrl}
        />
      </div>
    </div>
  );
}