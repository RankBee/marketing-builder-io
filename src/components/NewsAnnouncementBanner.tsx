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
    <div className="announcement-banner w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 mt-1">📢</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold leading-snug text-white mb-1">
                Aris Vrakas, Founder and CEO of RankBee speaking at "Politics Meets Technology", on 24 January 2026, Berlin
              </h3>
              <a
                href="https://www.politicaltech.eu/events/winning-the-ai-vote-how-political-voices-get-seen-(or-silenced)-in-the-age-of-llms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white font-medium hover:underline inline-block"
              >
                View event details →
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
