import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut, SafeUserButton, useOrgOnboarded, useSafeUser } from "../lib/clerk-safe";
import { dashboardUrl, onboardRedirectUrl } from "../lib/clerk-env";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onboarded = useOrgOnboarded();
  const { isLoaded: orgLoaded } = useOrganization();
  const { isLoaded: listLoaded } = useOrganizationList({ userMemberships: { limit: 50 } });
  const loaded = orgLoaded || listLoaded;
  const { user } = useSafeUser();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Pricing", id: "pricing" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" }
  ];

  const handleNavClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("home")}
              className="transition-opacity hover:opacity-80"
            >
              <Logo className="h-10" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                item.id === "blog" ? (
                  <a
                    key={item.id}
                    href="https://geo.rankbee.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md transition-colors text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md transition-colors ${
                      currentPage === item.id
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Button
                variant="outline"
                className="border-cta text-cta hover:bg-cta/10"
                onClick={() => onPageChange("demo")}
              >
                Book Demo
              </Button>
            </SignedOut>

            <SignedOut>
              <Button
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
                onClick={() => onPageChange("sign-in")}
              >
                Sign In
              </Button>
            </SignedOut>

            <SignedIn>
              {loaded ? (
                <div className="flex items-center gap-4">
                  <SafeUserButton />
                  {user ? (
                    <>
                      <span className="hidden md:inline xl:hidden text-gray-700 font-medium">
                        {user.firstName || (user.fullName?.split(" ")[0] ?? "")}
                      </span>
                      <span className="hidden xl:inline text-gray-700 font-medium">
                        {user.fullName || user.firstName || ""}
                      </span>
                    </>
                  ) : null}
                  {onboarded ? (
                    <a href={dashboardUrl}>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                        View Your Dashboard
                      </Button>
                    </a>
                  ) : (
                    <a href={onboardRedirectUrl}>
                      <Button className="bg-cta hover:bg-cta/90 text-cta-foreground">
                        Complete Setup
                      </Button>
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <SafeUserButton />
                </div>
              )}
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.id === "blog" ? (
                  <a
                    key={item.id}
                    href="https://geo.rankbee.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === item.id
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="pt-2 space-y-2">
                <SignedOut>
                  <Button
                    variant="outline"
                    className="w-full border-cta text-cta hover:bg-cta/10"
                    onClick={() => onPageChange("demo")}
                  >
                    Book Demo
                  </Button>
                </SignedOut>

                <SignedOut>
                  <Button
                    className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                    onClick={() => onPageChange("sign-in")}
                  >
                    Sign In
                  </Button>
                </SignedOut>

                <SignedIn>
                  {loaded ? (
                    <div className="flex items-center gap-4">
                      <SafeUserButton />
                      {onboarded ? (
                        <a href={dashboardUrl} className="block">
                          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                            View Your Dashboard
                          </Button>
                        </a>
                      ) : (
                        <a href={onboardRedirectUrl} className="block">
                          <Button className="w-full bg-cta hover:bg-cta/90 text-cta-foreground">
                            Complete Setup
                          </Button>
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <SafeUserButton />
                    </div>
                  )}
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
