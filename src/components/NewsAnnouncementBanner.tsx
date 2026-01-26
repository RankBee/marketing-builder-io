import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
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
    <div className="announcement-banner w-full bg-gradient-to-r from-[#9810fa] via-[#7b1bd9] to-[#9810fa] text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 flex items-start gap-3">
            <Megaphone className="flex-shrink-0 mt-1 text-white" size={24} />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold leading-snug text-white mb-1">
                Join us Feb 4: RankBee & Minuttia on mastering AI visibility and winning AI search
              </h3>
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7415000487760052224"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white font-medium hover:underline inline-block"
              >
                Attend webinar →
              </a>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 inline-flex text-white hover:bg-purple-700 transition-colors p-2 rounded"
            aria-label="Close announcement"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
