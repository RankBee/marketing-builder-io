import { Button } from "./ui/button";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut, SafeUserButton, useSafeUser } from "../lib/clerk-safe";
import { trackEvent } from "../lib/posthog";
import AccountCta from "./AccountCta";
import { signInUrl } from "../lib/clerk-env";

interface NavAuthButtonsProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  variant: 'desktop' | 'mobile';
  onClose?: () => void;
}

export function NavAuthButtons({ currentPage, onPageChange, variant, onClose }: NavAuthButtonsProps) {
  const { user, isLoaded: loaded } = useSafeUser();

  if (variant === 'desktop') {
    return (
      <>
        <SignedOut>
          <a
            href="/demo"
            onClick={(e) => {
              e.preventDefault();
              trackEvent('CTA Clicked', {
                button_text: 'Book Demo',
                location: 'navigation_desktop',
                variant: 'outline',
                destination: 'demo'
              });
              onPageChange('demo');
            }}
          >
            <Button
              variant="outline"
              className="border-cta text-cta hover:bg-cta/10 whitespace-nowrap"
            >
              Book Demo
            </Button>
          </a>
        </SignedOut>

        <SignedOut>
          <a
            href={typeof window !== "undefined" ? `${signInUrl}${signInUrl.startsWith("http") ? `?redirect_url=${encodeURIComponent(window.location.href)}` : ""}` : signInUrl}
            onClick={() => {
              trackEvent('Sign In Clicked', {
                location: 'navigation_desktop',
                current_page: currentPage
              });
            }}
          >
            <Button
              className="bg-cta hover:bg-cta/90 text-cta-foreground whitespace-nowrap"
            >
              Sign In
            </Button>
          </a>
        </SignedOut>

        <SignedIn>
          {loaded ? (
            <div className="flex items-center gap-4">
              <SafeUserButton />
              {user ? (
                <>
                  <span className="hidden lg:inline xl:hidden text-gray-700 font-medium whitespace-nowrap">
                    {user.firstName || (user.fullName?.split(" ")[0] ?? "")}
                  </span>
                  <span className="hidden xl:inline text-gray-700 font-medium whitespace-nowrap">
                    {user.fullName || user.firstName || ""}
                  </span>
                </>
              ) : null}
              <AccountCta
                location="navigation_desktop"
                size="default"
                className=""
                dashboardClassName="bg-gray-900 hover:bg-gray-800 text-white"
                onboardClassName="bg-cta hover:bg-cta/90 text-cta-foreground"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <SafeUserButton />
            </div>
          )}
        </SignedIn>
      </>
    );
  }

  // Mobile variant
  return (
    <div className="pt-2 space-y-2">
      <SignedOut>
        <a
          href="/demo"
          className="block w-full"
          onClick={(e) => {
            e.preventDefault();
            trackEvent('CTA Clicked', {
              button_text: 'Book Demo',
              location: 'navigation_mobile',
              variant: 'outline',
              destination: 'demo'
            });
            onPageChange('demo');
            onClose?.();
          }}
        >
          <Button
            variant="outline"
            className="w-full border-cta text-cta hover:bg-cta/10"
          >
            Book Demo
          </Button>
        </a>
      </SignedOut>

      <SignedOut>
        <a
          href={typeof window !== "undefined" ? `${signInUrl}${signInUrl.startsWith("http") ? `?redirect_url=${encodeURIComponent(window.location.href)}` : ""}` : signInUrl}
          className="block w-full"
          onClick={() => {
            trackEvent('Sign In Clicked', {
              location: 'navigation_mobile',
              current_page: currentPage
            });
            onClose?.();
          }}
        >
          <Button
            className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
          >
            Sign In
          </Button>
        </a>
      </SignedOut>

      <SignedIn>
        {loaded ? (
          <div className="flex items-center gap-4">
            <SafeUserButton />
            <AccountCta
              location="navigation_mobile"
              size="default"
              className="w-full"
              dashboardClassName="w-full bg-gray-900 hover:bg-gray-800 text-white"
              onboardClassName="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <SafeUserButton />
          </div>
        )}
      </SignedIn>
    </div>
  );
}
