import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { SafeSignedIn as SignedIn, SafeSignedOut as SignedOut, SafeUserButton, useSafeUser } from "../lib/clerk-safe";
import { useOrganization, useOrganizationList } from "@clerk/clerk-react";
import { trackEvent } from "../lib/posthog";
import AccountCta from "./AccountCta";
import { signInUrl } from "../lib/clerk-env";

interface NavItem {
  name: string;
  id: string;
  submenu?: { name: string; id: string }[];
}

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState<string | null>(null);
  const { isLoaded: orgLoaded } = useOrganization();
  const { isLoaded: listLoaded } = useOrganizationList({ userMemberships: { limit: 50 } });
  const loaded = orgLoaded || listLoaded;
  const { user } = useSafeUser();

  const navItems: NavItem[] = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    {
      name: "Solutions",
      id: "solutions",
      submenu: [
        { name: "Startups", id: "seo-professionals" },
        { name: "SMB", id: "growing-business" },
        { name: "Agencies", id: "agencies" },
        { name: "Political Campaigns", id: "political-campaigns" }
      ]
    },
    { name: "Enterprise", id: "rankbee-api" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" }
  ];

  const handleNavClick = (page: string, isMobile: boolean = false) => {
    trackEvent('Navigation Click', {
      destination: page,
      location: isMobile ? 'mobile_menu' : 'desktop_menu',
      current_page: currentPage
    });
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => handleNavClick("home")}
              className="transition-opacity hover:opacity-80"
            >
              <Logo className="h-10" />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-baseline gap-1 xl:gap-4">
              {navItems.map((item) => (
                item.id === "blog" ? (
                  <a
                    key={item.id}
                    href="https://geo.rankbee.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md transition-colors text-gray-700 hover:text-purple-600 hover:bg-gray-50 whitespace-nowrap"
                    onClick={() => {
                      trackEvent('External Link Clicked', {
                        link_text: 'Blog',
                        destination_url: 'https://geo.rankbee.ai/',
                        location: 'desktop_menu'
                      });
                    }}
                  >
                    {item.name}
                  </a>
                ) : item.submenu ? (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setDesktopSubmenuOpen(item.id)}
                    onMouseLeave={() => setDesktopSubmenuOpen(null)}
                  >
                    <button
                      className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
                        currentPage === item.id || item.submenu?.some(sub => currentPage === sub.id)
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Desktop Dropdown */}
                    {desktopSubmenuOpen === item.id && (
                      <div className="absolute left-0 mt-0 w-72 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.id}
                            onClick={() => {
                              trackEvent('Navigation Click', {
                                destination: subitem.id,
                                location: 'desktop_submenu',
                                current_page: currentPage
                              });
                              handleNavClick(subitem.id, false);
                              setDesktopSubmenuOpen(null);
                            }}
                            className={`block w-full text-left px-4 py-2 transition-colors whitespace-nowrap ${
                              currentPage === subitem.id
                                ? "text-purple-600 bg-purple-50"
                                : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                            }`}
                          >
                            {subitem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, false)}
                    className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
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
          <div className="hidden lg:flex items-center justify-end space-x-4 shrink-0" style={{ width: '300px' }}>
            <SignedOut>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('CTA Clicked', {
                    button_text: 'Contact Us',
                    location: 'navigation_desktop',
                    variant: 'outline',
                    destination: 'contact'
                  });
                  onPageChange('contact');
                }}
              >
                <Button
                  variant="outline"
                  className="border-cta text-cta hover:bg-cta/10 whitespace-nowrap"
                >
                  Contact Us
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
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.id === "blog" ? (
                  <a
                    key={item.id}
                    href="https://geo.rankbee.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    onClick={() => {
                      trackEvent('External Link Clicked', {
                        link_text: 'Blog',
                        destination_url: 'https://geo.rankbee.ai/',
                        location: 'mobile_menu'
                      });
                    }}
                  >
                    {item.name}
                  </a>
                ) : item.submenu ? (
                  <div key={item.id}>
                    <button
                      onClick={() => setOpenSubmenu(openSubmenu === item.id ? null : item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                        item.submenu?.some(sub => currentPage === sub.id)
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${openSubmenu === item.id ? 'transform rotate-180' : ''}`}
                      />
                    </button>

                    {/* Mobile Submenu */}
                    {openSubmenu === item.id && (
                      <div className="bg-purple-50 pl-4 space-y-1">
                        {item.submenu.map((subitem) => (
                          <button
                            key={subitem.id}
                            onClick={() => {
                              trackEvent('Navigation Click', {
                                destination: subitem.id,
                                location: 'mobile_submenu',
                                current_page: currentPage
                              });
                              handleNavClick(subitem.id, true);
                              setOpenSubmenu(null);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                              currentPage === subitem.id
                                ? "text-purple-600 bg-white"
                                : "text-gray-700 hover:text-purple-600 hover:bg-white"
                            }`}
                          >
                            {subitem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, true)}
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
                  <a
                    href="/contact"
                    className="block w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent('CTA Clicked', {
                        button_text: 'Contact Us',
                        location: 'navigation_mobile',
                        variant: 'outline',
                        destination: 'contact'
                      });
                      onPageChange('contact');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-cta text-cta hover:bg-cta/10"
                    >
                      Contact Us
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
                      setIsMobileMenuOpen(false);
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
