import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink, Mic, Trophy, Newspaper, Landmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { SeoHead } from '../../src/lib/SeoHead';
import { getSiteUrl } from '../../src/lib/page-seo';

// ─── Data Types ───────────────────────────────────────────────────────────────

interface EventEntry {
  title: string;
  description: string;
  date: string;
  location?: string;
  venue?: string;
  url?: string;
  image?: string;
  type: 'speaking' | 'award' | 'press' | 'conference' | 'webinar';
  speaker?: React.ReactNode;
  performers?: string[];
}

// ─── All Events ──────────────────────────────────────────────────────────────
// Events are automatically split into "upcoming" and "past" based on the date.

const allEvents: EventEntry[] = [
  // ── Upcoming / Future ──────────────────────────────────────────────────────
  {
    title: 'State of Search: The Unfiltered Edition',
    description:
      'Aris Vrakas moderates a panel with Lily Ray (Amsive), Dan Taylor (SALT.agency), and John Campbell (ROAST) at Athens SEO — Greece\'s flagship search conference. Leading voices in SEO and AI discuss what\'s really happening in search right now: the wins, the challenges, and what\'s actually working in today\'s rapidly evolving landscape.',
    date: '2026-05-23',
    location: 'Athens, Greece',
    venue: 'Athens SEO 2026',
    url: 'https://athenseo.com/speakers/aris-vrakas/',
    image: '/images/athens-seo-conference-2026.png',
    type: 'conference',
    speaker: <><Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>{' (Moderator)'}</>,
    performers: ['Aris Vrakas'],
  },
  {
    title: 'Winning with AEO: How to Succeed in SEO for AI',
    description:
      'Aris Vrakas will speak at AffPapa Conference Madrid — one of the largest iGaming affiliate conferences in Europe, bringing together over 1,500 affiliates, operators, and B2B providers across two full days. The talk will cover how to succeed with Answer Engine Optimization (AEO) and Generative AI Optimization (GAIO) in the new era of AI-powered search.',
    date: '2026-05-19',
    location: 'Madrid, Spain',
    venue: 'AffPapa Conference Madrid 2026',
    url: 'https://affpapaconf.com/madrid-2026/',
    image: '/images/affpapa-conference-madrid-2026.png',
    type: 'conference',
    speaker: <Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>,
    performers: ['Aris Vrakas'],
  },
  {
    title: 'How to Win with AI Content',
    description:
      'Aris Vrakas joins a panel at NEXT.io Summit New York — North America\'s foremost iGaming and sports betting summit, hosted at Convene Brookfield Place. The panel will explore strategies for winning with AI-generated content in an increasingly competitive landscape. Exact topic to be confirmed.',
    date: '2026-03-10',
    location: 'New York, USA',
    venue: 'NEXT.io Summit NYC 2026',
    url: 'https://next.io/summits/newyork/',
    image: '/images/nextio-nyc-conference-2025.webp',
    type: 'conference',
    speaker: <Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>,
    performers: ['Aris Vrakas'],
  },
  // ── Past ────────────────────────────────────────────────────────────────────
  {
    title: 'Visibility at Risk: How AI Search Shapes Your Brand — And How to Take Control',
    description:
      'seoClarity — one of the world\'s largest enterprise SEO platforms, trusted by Fortune 500 brands — brought in Aris Vrakas (CEO, RankBee & former Head of Global SEO at Amazon) and Will Gallahue (Product Lead, RankBee) as expert guests alongside Mark Traphagen (VP of Product Marketing, seoClarity). The webinar shared exclusive insights from joint AI search research, real-world case studies of brands successfully optimizing for AI-driven search, and a clear framework to structure content so AI search engines can recognize and prioritize your brand.',
    date: '2025-12-01',
    venue: 'seoClarity Webinar Series',
    url: 'https://www.seoclarity.net/webinar/ai-search-visibility-and-brand-accuracy/',
    image: '/images/seoclarity-rankbee-ai-search-webinar.png',
    type: 'webinar',
    speaker: <><Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>{' & Will Gallahue'}</>,
    performers: ['Aris Vrakas', 'Will Gallahue'],
  },
  {
    title: 'Female Founders Forum Launch at the UK House of Lords',
    description:
      'Yin Noe, COO of RankBee, attended the launch of the Female Founders Forum by Barclays and The Entrepreneurs Network at the UK House of Lords. The event focused on how female-led spinouts are created and what barriers hold them back — highlighting the need for more funding, visibility, and real institutional support to widen pathways for women in innovation.',
    date: '2026-02-08',
    location: 'London, UK',
    venue: 'UK House of Lords',
    image: '/images/yin-parliament.png',
    type: 'conference',
    speaker: <Link href="/about#yin-noe" className="text-purple-600 hover:text-purple-700 hover:underline">Yin Noe</Link>,
    performers: ['Yin Noe'],
  },
  {
    title: 'AEO & AI Visibility: The New SEO Playbook — Live AMA with Minuttia & RankBee',
    description:
      'Aris Vrakas joined Minuttia — a leading SEO and content strategy consultancy trusted by high-growth SaaS companies — for a live AMA on the new era of AI visibility. The session unpacked what "ranking" means in the age of generative AI, the emerging AEO (Answer Engine Optimization) tech stack, and a practical playbook for turning AI visibility gaps into an actionable roadmap for modern SEO and content teams.',
    date: '2026-02-04',
    url: 'https://www.linkedin.com/events/7414981604428800000/',
    image: '/images/minuttia-rankbee-aeo-webinar-2026.png',
    type: 'webinar',
    speaker: <Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>,
    performers: ['Aris Vrakas'],
  },
  {
    title: 'Winning the AI Vote: How Political Voices Get Seen (or Silenced) in the Age of LLMs',
    description:
      'Aris Vrakas, Yin Noe, and Rizwan Khan from RankBee delivered a deep-dive workshop at the Political Tech Summit — Europe\'s premier conference at the intersection of politics and technology, bringing together political strategists, technologists, and policymakers from across the continent. The session explored how large language models are rapidly reshaping political discovery, influence, and trust, and equipped participants with actionable frameworks for securing visibility in AI-generated answers.',
    date: '2026-01-24',
    location: 'Berlin, Germany',
    venue: 'Political Tech Summit 2026',
    url: 'https://www.politicaltech.eu/events/winning-the-ai-vote-how-political-voices-get-seen-(or-silenced)-in-the-age-of-llms',
    image: '/images/political-tech-summit-berlin-2026.png',
    type: 'conference',
    speaker: <><Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>{', '}<Link href="/about#yin-noe" className="text-purple-600 hover:text-purple-700 hover:underline">Yin Noe</Link>{' & '}<Link href="/about#riz-kahn" className="text-purple-600 hover:text-purple-700 hover:underline">Rizwan Khan</Link></>,
    performers: ['Aris Vrakas', 'Yin Noe', 'Rizwan Khan'],
  },
  {
    title: 'Beyond Keywords: Redefining Search Intent in the Age of LLMs',
    description:
      'Aris Vrakas closed the Athens SEO 2025 stage with a lightning session exploring how prompt engineering, corpus shaping, and vector-based optimisation are changing everything we know about keyword strategies. The talk challenged the audience to rethink search in the age of LLMs — a glimpse into the future of SEO.',
    date: '2025-05-24',
    location: 'Athens, Greece',
    venue: 'Athens SEO 2025',
    url: 'https://athenseo.com/speakers/aris-vrakas/',
    image: '/images/collage-athens-seo-2025.png',
    type: 'conference',
    speaker: <Link href="/about#aris-vrakas" className="text-purple-600 hover:text-purple-700 hover:underline">Aris Vrakas</Link>,
    performers: ['Aris Vrakas'],
  },
];

// ─── Person schema lookup (for JSON-LD) ──────────────────────────────────────

const SITE_URL = getSiteUrl();

const PERSON_SCHEMA: Record<string, object> = {
  'Aris Vrakas': {
    '@type': 'Person',
    name: 'Aris Vrakas',
    url: `${SITE_URL}/about#aris-vrakas`,
    jobTitle: 'Founder/CEO/CTO',
    worksFor: { '@type': 'Organization', name: 'RankBee', url: SITE_URL },
    sameAs: ['https://www.linkedin.com/in/arisvrakas/'],
  },
  'Yin Noe': {
    '@type': 'Person',
    name: 'Yin Noe',
    url: `${SITE_URL}/about#yin-noe`,
    jobTitle: 'Chief Operations Officer',
    worksFor: { '@type': 'Organization', name: 'RankBee', url: SITE_URL },
    sameAs: ['https://www.linkedin.com/in/yinnoe'],
  },
  'Rizwan Khan': {
    '@type': 'Person',
    name: 'Riz Kahn',
    url: `${SITE_URL}/about#riz-kahn`,
    jobTitle: 'Chief Revenue Officer',
    worksFor: { '@type': 'Organization', name: 'RankBee', url: SITE_URL },
    sameAs: ['https://www.linkedin.com/in/rizwankhan1986/'],
  },
};

function buildEventJsonLd(events: EventEntry[]): object {
  return events.map((e) => {
    const schema: Record<string, any> = {
      '@type': 'Event',
      name: e.title,
      description: e.description,
      startDate: e.date,
      eventAttendanceMode: e.type === 'webinar'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
    };
    if (e.location || e.venue) {
      schema.location = e.type === 'webinar'
        ? { '@type': 'VirtualLocation', url: e.url || '' }
        : { '@type': 'Place', name: e.venue || '', address: e.location || '' };
    }
    if (e.url) schema.url = e.url;
    if (e.image) schema.image = `${SITE_URL}${e.image}`;
    if (e.performers?.length) {
      schema.performer = e.performers.map((name) => PERSON_SCHEMA[name] || { '@type': 'Person', name });
    }
    schema.organizer = { '@type': 'Organization', name: 'RankBee', url: SITE_URL };
    return schema;
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function typeLabel(type: EventEntry['type']): string {
  switch (type) {
    case 'speaking': return 'Speaking';
    case 'award': return 'Award';
    case 'press': return 'Press';
    case 'conference': return 'Conference';
    case 'webinar': return 'Webinar';
  }
}

function typeIcon(type: EventEntry['type']) {
  switch (type) {
    case 'speaking': return <Mic className="w-4 h-4" />;
    case 'conference': return <Landmark className="w-4 h-4" />;
    case 'award': return <Trophy className="w-4 h-4" />;
    case 'press': return <Newspaper className="w-4 h-4" />;
    case 'webinar': return <Mic className="w-4 h-4" />;
  }
}

function accentGradient(type: EventEntry['type']): string {
  switch (type) {
    case 'conference': return 'from-purple-600 to-purple-400';
    case 'webinar': return 'from-indigo-600 to-indigo-400';
    case 'speaking': return 'from-blue-600 to-blue-400';
    case 'award': return 'from-amber-500 to-amber-400';
    case 'press': return 'from-green-600 to-green-400';
  }
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
            '@graph': buildEventJsonLd([...upcoming, ...past]),
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
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-64 md:h-full bg-gradient-to-br ${accentGradient(event.type)} flex items-center justify-center`}>
                          <div className="text-center text-white">
                            <div className="text-5xl font-bold mb-1">
                              {new Date(event.date + 'T00:00:00').getDate()}
                            </div>
                            <div className="text-lg font-medium uppercase tracking-wider">
                              {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
                          {event.speaker}
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
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={entry.image}
                          alt={entry.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                            {entry.speaker}
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
