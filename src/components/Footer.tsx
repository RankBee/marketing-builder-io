import { Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { trackEvent } from "../lib/posthog";

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  const mainNavItems = [
    { name: "About", id: "about" },
    { name: "Pricing", id: "pricing" },
    { name: "Blog", id: "blog" },
    { name: "Knowledge Base", id: "knowledge-base" },
    { name: "Press & Events", id: "press-events" },
    { name: "Contact", id: "contact" },
    { name: "Demo", id: "demo" }
  ];

  const legalNavItems = [
    { name: "Privacy Policy", id: "privacy-policy" },
    { name: "Terms of Service", id: "terms-of-service" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/rankbee/", name: "LinkedIn" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center space-y-8 sm:space-y-12">
          
          {/* Brand Logo */}
          <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onPageChange("home"); }}
              className="transition-opacity hover:opacity-80"
            >
              <Logo className="h-10" />
            </a>
            
            {/* Main Navigation Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
              {mainNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id === 'home' ? '/' : `/${item.id}`}
                  className="text-sm sm:text-base text-gray-600 hover:text-primary hover:underline transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    trackEvent('Navigation Click', {
                      destination: item.id,
                      location: 'footer_nav'
                    });
                    onPageChange(item.id);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Legal Links - Smaller, Subdued */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 border-t border-gray-200">
              {legalNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`/${item.id}`}
                  onClick={(e) => { e.preventDefault(); onPageChange(item.id); }}
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links and Copyright */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} RankBee. All rights reserved
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
