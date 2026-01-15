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
        <div className="py-6 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <span className="text-xl sm:text-2xl font-semibold flex-shrink-0">📢</span>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold leading-tight mb-2">
                Aris Vrakas, Founder and CEO of RankBee speaking at "Politics Meets Technology", on 24 January 2026, Berlin
              </h3>
              <a
                href="https://www.politicaltech.eu/events/winning-the-ai-vote-how-political-voices-get-seen-(or-silenced)-in-the-age-of-llms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-100 hover:text-white underline font-medium transition-colors inline-block"
              >
                View event details →
              </a>
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
