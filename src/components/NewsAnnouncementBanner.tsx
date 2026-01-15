import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { trackEvent } from '../lib/posthog';

interface NewsAnnouncementBannerProps {
  onPageChange: (page: string) => void;
}

export function NewsAnnouncementBanner({ onPageChange }: NewsAnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('News Banner Closed', {
      event_type: 'speaking_event'
    });
  };

  const handleNewsClick = () => {
    trackEvent('News Banner Clicked', {
      event_type: 'speaking_event',
      destination: 'news_page'
    });
    onPageChange('news');
  };

  return (
    <div className="announcement-banner bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <span className="text-sm sm:text-base font-semibold">📢</span>
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium">
                Join us at the AI Marketing Summit 2026! Discover how to dominate AI search rankings.
              </p>
              <button
                onClick={handleNewsClick}
                className="text-xs sm:text-sm text-blue-100 hover:text-white underline font-medium transition-colors mt-1"
              >
                Learn more about the event →
              </button>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 inline-flex text-blue-100 hover:text-white transition-colors p-1"
            aria-label="Close announcement"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
