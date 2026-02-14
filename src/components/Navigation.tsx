import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { trackEvent } from "../lib/posthog";
import dynamic from "next/dynamic";

const NavAuthButtons = dynamic(
  () => import('./NavAuthButtons').then(mod => ({ default: mod.NavAuthButtons })),
  { ssr: false }
);

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

  const navItems: NavItem[] = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    {
      name: "Solutions",
      id: "solutions",
      submenu: [
        { name: "RankBee Toolkit", id: "pricing" },
        { name: "Consulting", id: "agencies" },
        { name: "Political Campaigns", id: "political-campaigns" }
      ]
    },
    { name: "Enterprise", id: "rankbee-api" },
    {
      name: "Learn",
      id: "learn",
      submenu: [
        { name: "Blog", id: "blog" },
        { name: "Knowledge Base", id: "knowledge-base" }
      ]
    },
    { name: "Contact", id: "contact" }
  ];

  const pageToHref = (id: string): string => {
    if (id === 'home') return '/';
    return `/${id}`;
  };

  const handleNavClick = (e: React.MouseEvent, page: string, isMobile: boolean = false) => {
    e.preventDefault();
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
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "home")}
              className="transition-opacity hover:opacity-80"
            >
              <Logo className="h-10" />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-baseline gap-1 xl:gap-4">
              {navItems.map((item) => (
                item.submenu ? (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setDesktopSubmenuOpen(item.id)}
                    onMouseLeave={() => setDesktopSubmenuOpen(null)}
                  >
                    <span
                      className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap flex items-center gap-1 cursor-default ${
                        currentPage === item.id || currentPage.startsWith(item.id + '/') || item.submenu?.some(sub => currentPage === sub.id || currentPage.startsWith(sub.id + '/'))
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </span>

                    {/* Desktop Dropdown — always rendered for crawlers, visually hidden until hover */}
                    <div className={`absolute left-0 mt-0 w-72 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10 ${
                      desktopSubmenuOpen === item.id ? '' : 'sr-only'
                    }`}>
                      {item.submenu.map((subitem) => (
                        <a
                          key={subitem.id}
                          href={pageToHref(subitem.id)}
                          onClick={(e) => {
                            handleNavClick(e, subitem.id, false);
                            setDesktopSubmenuOpen(null);
                          }}
                          className={`block w-full text-left px-4 py-2 transition-colors whitespace-nowrap ${
                            currentPage === subitem.id
                              ? "text-purple-600 bg-purple-50"
                              : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                          }`}
                        >
                          {subitem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.id}
                    href={pageToHref(item.id)}
                    onClick={(e) => handleNavClick(e, item.id, false)}
                    className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                      currentPage === item.id || currentPage.startsWith(item.id + '/')
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center justify-end space-x-4 shrink-0" style={{ width: '300px' }}>
            <NavAuthButtons currentPage={currentPage} onPageChange={onPageChange} variant="desktop" />
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
                item.submenu ? (
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
                          <a
                            key={subitem.id}
                            href={pageToHref(subitem.id)}
                            onClick={(e) => {
                              handleNavClick(e, subitem.id, true);
                              setOpenSubmenu(null);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                              currentPage === subitem.id
                                ? "text-purple-600 bg-white"
                                : "text-gray-700 hover:text-purple-600 hover:bg-white"
                            }`}
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.id}
                    href={pageToHref(item.id)}
                    onClick={(e) => handleNavClick(e, item.id, true)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      currentPage === item.id || currentPage.startsWith(item.id + '/')
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <NavAuthButtons
                currentPage={currentPage}
                onPageChange={onPageChange}
                variant="mobile"
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
