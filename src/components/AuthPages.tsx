import React from "react";
import { useEffect } from "react";
import { signInUrl, signUpUrl } from "../lib/clerk-env";

/**
 * Redirects to the external RankBee-marketing application for authentication.
 */
 
export function SignInPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = signInUrl;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-2">Redirecting to Sign In...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
}

export function SignUpPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = signUpUrl;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="p-6 text-center">
        <p className="text-gray-600 mb-2">Redirecting to Sign Up...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
}