import React, { useEffect } from "react";
import { signInUrl, signUpUrl, onboardRedirectUrl } from "../lib/clerk-env";
import { SafeSignIn, SafeSignUp } from "../lib/clerk-safe";

/**
 * Redirects to the external RankBee-marketing application for authentication
 * OR renders the local SafeSignIn if no external URL is configured.
 */
 
export function SignInPage() {
  const isExternal = signInUrl.startsWith("http");

  useEffect(() => {
    if (typeof window !== "undefined" && isExternal) {
      window.location.href = signInUrl;
    }
  }, [isExternal]);

  if (isExternal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-2">Redirecting to Sign In...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

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
  const isExternal = signUpUrl.startsWith("http");

  useEffect(() => {
    if (typeof window !== "undefined" && isExternal) {
      window.location.href = signUpUrl;
    }
  }, [isExternal]);

  if (isExternal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-2">Redirecting to Sign Up...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[100svh] mt-12 sm:mt-16 lg:mt-24 mb-12 sm:mb-16 lg:mb-24">
      <div className="my-12 sm:my-16 lg:my-24">
        <SafeSignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/onboard"
        />
      </div>
    </div>
  );
}