import { getSiteUrl } from './page-seo';

// ─── Data Types ───────────────────────────────────────────────────────────────

export interface EventEntry {
  title: string;
  description: string;
  date: string;
  location?: string;
  venue?: string;
  url?: string;
  image?: string;
  type: 'speaking' | 'award' | 'press' | 'conference' | 'webinar';
  speaker?: string;
  performers?: string[];
}

// ─── All Events ──────────────────────────────────────────────────────────────
// Events are automatically split into "upcoming" and "past" based on the date.

export const allEvents: EventEntry[] = [
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
    speaker: 'Aris Vrakas (Moderator)',
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
    speaker: 'Aris Vrakas',
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
    speaker: 'Aris Vrakas',
    performers: ['Aris Vrakas'],
  },
  // ── Past ────────────────────────────────────────────────────────────────────
  {
    title: 'RankBee Wins 1st Place at iGamingBusiness Executive Pitch',
    description:
      'RankBee.ai won 1st place at the iGamingBusiness Executive Pitch, competing against 9 startups and selected as the winner by a panel of iGaming executive judges including Harmen Brenninkmeijer, Jeffrey Haas, Rohini S. and more. A special thank you to the judges and to Rosie Brewster, iGB and WorldGaming for organising such a fantastic event.',
    date: '2026-01-18',
    venue: 'iGamingBusiness Executive Pitch',
    image: '/images/competition-win.jpeg',
    type: 'award',
  },
  {
    title: 'Visibility at Risk: How AI Search Shapes Your Brand — And How to Take Control',
    description:
      'seoClarity — one of the world\'s largest enterprise SEO platforms, trusted by Fortune 500 brands — brought in Aris Vrakas (CEO, RankBee & former Head of Global SEO at Amazon) and Will Gallahue (Product Lead, RankBee) as expert guests alongside Mark Traphagen (VP of Product Marketing, seoClarity). The webinar shared exclusive insights from joint AI search research, real-world case studies of brands successfully optimizing for AI-driven search, and a clear framework to structure content so AI search engines can recognize and prioritize your brand.',
    date: '2025-12-01',
    venue: 'seoClarity Webinar Series',
    url: 'https://www.seoclarity.net/webinar/ai-search-visibility-and-brand-accuracy/',
    image: '/images/seoclarity-rankbee-ai-search-webinar.png',
    type: 'webinar',
    speaker: 'Aris Vrakas & Will Gallahue',
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
    speaker: 'Yin Noe',
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
    speaker: 'Aris Vrakas',
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
    speaker: 'Aris Vrakas, Yin Noe & Rizwan Khan',
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
    speaker: 'Aris Vrakas',
    performers: ['Aris Vrakas'],
  },
];

// ─── Speaker link lookup ──────────────────────────────────────────────────────

export const SPEAKER_LINKS: Record<string, string> = {
  'Aris Vrakas': '/about#aris-vrakas',
  'Yin Noe': '/about#yin-noe',
  'Rizwan Khan': '/about#rizwan-khan',
};

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
    name: 'Rizwan Khan',
    url: `${SITE_URL}/about#rizwan-khan`,
    jobTitle: 'Chief Revenue Officer',
    worksFor: { '@type': 'Organization', name: 'RankBee', url: SITE_URL },
    sameAs: ['https://www.linkedin.com/in/rizwankhan1986/'],
  },
};

export function buildEventJsonLd(events: EventEntry[], todayISO: string): object[] {
  const todayMs = new Date(todayISO + 'T00:00:00Z').getTime();
  return events.map((e) => {
    const isPast = new Date(e.date + 'T00:00:00Z').getTime() < todayMs;
    const schema: Record<string, any> = {
      '@type': 'Event',
      name: e.title,
      description: e.description,
      startDate: e.date,
      eventAttendanceMode: e.type === 'webinar'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: isPast
        ? 'https://schema.org/EventCompleted'
        : 'https://schema.org/EventScheduled',
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

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function typeLabel(type: EventEntry['type']): string {
  switch (type) {
    case 'speaking': return 'Speaking';
    case 'award': return 'Award';
    case 'press': return 'Press';
    case 'conference': return 'Conference';
    case 'webinar': return 'Webinar';
  }
}

/**
 * Returns the nearest upcoming webinar or conference (by date).
 * Returns `null` when there is no future event of those types.
 */
export function getNextBannerEvent(): EventEntry | null {
  const nowMs = Date.now();
  return (
    allEvents
      .filter(
        (e) =>
          (e.type === 'webinar' || e.type === 'conference') &&
          new Date(e.date + 'T00:00:00Z').getTime() >= nowMs
      )
      .sort(
        (a, b) =>
          new Date(a.date + 'T00:00:00Z').getTime() -
          new Date(b.date + 'T00:00:00Z').getTime()
      )[0] ?? null
  );
}

export function accentGradient(type: EventEntry['type']): string {
  switch (type) {
    case 'conference': return 'from-purple-600 to-purple-400';
    case 'webinar': return 'from-indigo-600 to-indigo-400';
    case 'speaking': return 'from-blue-600 to-blue-400';
    case 'award': return 'from-amber-500 to-amber-400';
    case 'press': return 'from-green-600 to-green-400';
  }
}
