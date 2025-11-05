import React from "react";
import { Button } from "./ui/button";
import { useOrgOnboardingState } from "../lib/clerk-safe";
import { dashboardUrl, onboardRedirectUrl } from "../lib/clerk-env";
import { trackEvent } from "../lib/posthog";

type Size = "default" | "sm" | "lg" | "icon";

export interface AccountCtaProps {
  location: string;
  size?: Size;
  className?: string;
  dashboardClassName?: string;
  onboardClassName?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  labelDashboard?: string;
  labelOnboard?: string;
}

export function AccountCta({
  location,
  size = "lg",
  className = "bg-cta hover:bg-cta/90 text-cta-foreground",
  dashboardClassName,
  onboardClassName,
  buttonProps,
  labelDashboard = "View Your Dashboard",
  labelOnboard = "Complete Setup",
}: AccountCtaProps) {
  const { onboarded, loaded } = useOrgOnboardingState();

  if (!loaded) return null;

  if (onboarded) {
    return (
      <a
        href={dashboardUrl}
        onClick={() =>
          trackEvent("Dashboard Link Clicked", {
            location,
            user_onboarded: true,
          })
        }
      >
        <Button size={size} className={`${className} ${dashboardClassName ?? ""}`} {...buttonProps}>
          {labelDashboard}
        </Button>
      </a>
    );
  }

  return (
    <a
      href={onboardRedirectUrl}
      onClick={() =>
        trackEvent("Onboarding Link Clicked", {
          location,
          action: "complete_setup",
        })
      }
    >
      <Button size={size} className={`${className} ${onboardClassName ?? ""}`} {...buttonProps}>
        {labelOnboard}
      </Button>
    </a>
  );
}

export default AccountCta;