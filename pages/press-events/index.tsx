import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Mic, Trophy, Newspaper, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { SeoHead } from '../../src/lib/SeoHead';
import {
  allEvents,
  buildEventJsonLd,
  formatDate,
  typeLabel,
  accentGradient,
  SPEAKER_LINKS,
  type EventEntry,
} from '../../src/lib/press-events-data';

// ─── Local render helpers (JSX — must stay in the page component file) ───────

function typeIcon(type: EventEntry['type']) {
  switch (type) {
    case 'speaking': return <Mic className="w-4 h-4" />;
    case 'conference': return <Landmark className="w-4 h-4" />;
    case 'award': return <Trophy className="w-4 h-4" />;
    case 'press': return <Newspaper className="w-4 h-4" />;
    case 'webinar': return <Mic className="w-4 h-4" />;
  }
}

function renderSpeaker(speaker: string): React.ReactNode {
  const names = Object.keys(SPEAKER_LINKS);
  if (names.length === 0) return speaker;
  const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
  const segments = speaker.split(pattern);
  const parts = segments.map((seg, i) =>
    SPEAKER_LINKS[seg]
      ? <Link key={i} href={SPEAKER_LINKS[seg]} className="text-purple-600 hover:text-purple-700 hover:underline">{seg}</Link>
      : seg
  );
  return <>{parts}</>;
}

// ─── Server-side date splitting (ISR) ─────────────────────────────────────────

interface PressEventsProps {
  todayISO: string;
}

export const getStaticProps: GetStaticProps<PressEventsProps> = async () => {
  const now = new Date();
  const todayISO = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  return { props: { todayISO }, revalidate: 3600 };
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function PressEventsIndex({ todayISO }: PressEventsProps) {
  const todayMs = new Date(todayISO + 'T00:00:00Z').getTime();

  const upcoming = allEvents
    .filter((e) => new Date(e.date + 'T00:00:00Z').getTime() >= todayMs)
    .sort((a, b) => new Date(a.date + 'T00:00:00Z').getTime() - new Date(b.date + 'T00:00:00Z').getTime());

  const past = allEvents
    .filter((e) => new Date(e.date + 'T00:00:00Z').getTime() < todayMs)
    .sort((a, b) => new Date(b.date + 'T00:00:00Z').getTime() - new Date(a.date + 'T00:00:00Z').getTime());

  return (
    <>
      <SeoHead pageId="press-events" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': buildEventJsonLd([...upcoming, ...past], todayISO),
          }),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="inline-block bg-purple-600 text-white text-sm font-semibold tracking-wider uppercase px-6 py-2 rounded-full mb-8">
                Press & Events
              </div>
              <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
                Where RankBee <span className="text-purple-600">Takes the Stage</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conferences, speaking engagements, awards, and press coverage — see where the RankBee team is sharing insights on AI visibility.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none" />
        </section>

        {/* Upcoming Events — Featured Card (blog "Must Read" style) */}
        {upcoming.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                  Upcoming
                </Badge>
                <h2 className="text-3xl text-gray-900">Don't Miss</h2>
              </div>

              {upcoming.map((event, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow mb-6">
                  <div className="md:flex">
                    {/* Left — image or gradient accent */}
                    <div className="md:w-1/2">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={640}
                          height={400}
                          className="w-full h-64 md:h-full object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          quality={75}
                        />
                      ) : (
                        <div className={`w-full h-64 md:h-full bg-gradient-to-br ${accentGradient(event.type)} flex items-center justify-center`}>
                          <div className="text-center text-white">
                            <div className="text-5xl font-bold mb-1">
                              {new Date(event.date + 'T00:00:00Z').getUTCDate()}
                            </div>
                            <div className="text-lg font-medium uppercase tracking-wider">
                              {new Date(event.date + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}
                            </div>
                            {event.location && (
                              <div className="flex items-center justify-center gap-1.5 mt-3 text-white/80 text-sm">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Right — content */}
                    <div className="md:w-1/2 p-8">
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                        {typeIcon(event.type)}
                        <span className="ml-2">{event.venue || typeLabel(event.type)}</span>
                      </Badge>
                      <h3 className="text-2xl mb-3 text-gray-900 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-4">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(event.date)}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        )}
                      </div>
                      {event.speaker && (
                        <div className="text-sm text-gray-500 mb-4">
                          {renderSpeaker(event.speaker)}
                        </div>
                      )}
                      {event.url && (
                        <a
                          href={event.url}
                          target={event.url.startsWith('http') ? '_blank' : undefined}
                          rel={event.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                            Learn More
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Past Events — 3-column Card Grid (blog style) */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl text-gray-900 mb-4">Past Engagements</h2>
              <p className="text-xl text-gray-600">
                Where we've shared our expertise on AI visibility and the future of search.
              </p>
            </div>

            {past.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {past.map((entry, i) => (
                  <Card
                    key={i}
                    className={`bg-white hover:shadow-lg transition-all duration-300 group overflow-hidden${entry.url ? ' cursor-pointer' : ''}`}
                    role={entry.url ? 'link' : undefined}
                    tabIndex={entry.url ? 0 : undefined}
                    onClick={() => {
                      if (entry.url) window.open(entry.url, '_blank', 'noopener,noreferrer');
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (entry.url && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        window.open(entry.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {/* Event image or colored accent strip */}
                    {entry.image ? (
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={entry.image}
                          alt={entry.title}
                          width={420}
                          height={236}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={75}
                        />
                      </div>
                    ) : (
                      <div className={`h-3 bg-gradient-to-r ${accentGradient(entry.type)}`} />
                    )}

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-sm">
                          {typeIcon(entry.type)}
                          <span className="ml-1">{typeLabel(entry.type)}</span>
                        </Badge>
                        {entry.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{entry.location}</span>
                          </div>
                        )}
                      </div>
                      {entry.venue && (
                        <p className="text-sm font-semibold text-purple-600 uppercase tracking-wider mb-1">
                          {entry.venue}
                        </p>
                      )}
                      <CardTitle className="text-xl leading-tight group-hover:text-purple-600 transition-colors">
                        {entry.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4 text-base line-clamp-5">
                        {entry.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </div>
                        {entry.speaker && (
                          <div className="text-sm text-gray-500" onClick={(e) => e.stopPropagation()}>
                            {renderSpeaker(entry.speaker)}
                          </div>
                        )}
                      </div>
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 mt-4 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Event
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                More speaking engagements, awards, and press mentions coming soon. Stay tuned!
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
