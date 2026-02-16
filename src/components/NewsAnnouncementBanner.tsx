import React, { useState, useEffect } from 'react';
import { X, Radio, MapPin, Mic, Landmark } from 'lucide-react';
import { Button } from './ui/button';
import { trackEvent } from '../lib/posthog';
import { getNextBannerEvent, formatDate, typeLabel } from '../lib/press-events-data';

interface NewsAnnouncementBannerProps {
  onPageChange: (page: string) => void;
}

export function NewsAnnouncementBanner({ onPageChange }: NewsAnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const event = getNextBannerEvent();

  useEffect(() => {
    if (sessionStorage.getItem('banner_dismissed') !== '1') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || !event) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('banner_dismissed', '1');
    trackEvent('News Banner Closed', {
      event_type: event.type,
      event_title: event.title,
    });
  };

  const ctaLabel =
    event.type === 'webinar' ? 'Attend FREE webinar →' : 'Learn more →';

  const ctaHref = '/press-events';
  const isExternal = false;

  const typeIcon = event.type === 'webinar'
    ? <Mic className="w-3 h-3" />
    : <Landmark className="w-3 h-3" />;

  // Build the first speaker name (before any "&" or ",")
  const speakerFirst = event.speaker?.split(/[,&]/)[0]?.trim();

  return (
    <div className="w-full bg-gradient-to-r from-[#9810fa] via-[#7b1bd9] to-[#9810fa] text-white px-4 sm:px-6 lg:px-8" style={{ paddingTop: '14px', paddingBottom: '14px' }}>
      <style>{`
        .banner-mobile { display: none; }
        .banner-desktop { display: flex; }
        @media (max-width: 639px) {
          .banner-mobile { display: flex; }
          .banner-desktop { display: none !important; }
        }
      `}</style>

      {/* ── Desktop: single centered row ── */}
      <div className="banner-desktop items-center justify-center gap-3 sm:gap-4">
          <Radio className="flex-shrink-0 text-white" size={20} />

          {/* Type badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 flex-shrink-0">
            {typeIcon}
            {typeLabel(event.type)}
          </span>

          {/* Main text — venue, location & title baked in so they're always visible */}
          <span className="text-sm sm:text-base font-medium text-white truncate">
            Join us {formatDate(event.date)}
            {event.venue ? ` at ${event.venue}` : ''}
            {event.location ? ` (${event.location})` : ''}
            {' — '}{event.title}
          </span>

          {/* Speaker */}
          {speakerFirst && (
            <span className="hidden md:inline-flex items-center text-white/80 text-sm flex-shrink-0 whitespace-nowrap">
              ft. {speakerFirst}
            </span>
          )}

          {/* CTA */}
          <a
            href={ctaHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-sm text-white font-semibold bg-white/20 hover:bg-white/30 transition-colors rounded-full px-4 py-1.5 flex-shrink-0 whitespace-nowrap"
            onClick={() =>
              trackEvent('News Banner Clicked', {
                event_type: event.type,
                event_title: event.title,
                destination: ctaHref,
              })
            }
          >
            {ctaLabel}
          </a>

          <button
            onClick={handleClose}
            className="flex-shrink-0 inline-flex text-white/70 hover:text-white hover:bg-white/10 transition-colors p-1 rounded"
            aria-label="Close announcement"
          >
            <X size={18} />
          </button>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="banner-mobile flex-col items-center gap-3">
        {/* Top row: icon + text */}
        <div className="flex items-start gap-3">
          <Radio className="flex-shrink-0 text-white mt-0.5" size={20} />
          <span className="text-sm font-medium text-white leading-snug">
            Join us {formatDate(event.date)}
            {event.venue ? ` at ${event.venue}` : ''}
            {event.location ? ` (${event.location})` : ''}
            {' — '}{event.title}
          </span>
        </div>

        {/* Bottom row: two buttons side by side */}
        <div className="flex gap-3 w-full">
          <a
            href={ctaHref}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="flex-1 text-center text-sm font-semibold text-purple-700 bg-white hover:bg-white/90 transition-colors rounded-full px-4"
            style={{ height: '36px', lineHeight: '36px' }}
            onClick={() =>
              trackEvent('News Banner Clicked', {
                event_type: event.type,
                event_title: event.title,
                destination: ctaHref,
              })
            }
          >
            {ctaLabel}
          </a>
          <button
            onClick={handleClose}
            className="flex-1 text-center text-sm font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors rounded-full px-4"
            style={{ height: '36px', lineHeight: '36px' }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
