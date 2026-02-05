import Parser from 'rss-parser';

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  content?: string;
  author?: string;
  authorImage?: string;
  guid?: string;
  link?: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'fullContent'],
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ]
  }
});

const RSS_FEED_URL = 'https://geo.rankbee.ai/rss/';

// Cache for feed data
let cachedFeed: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchRSSFeed(): Promise<BlogPost[]> {
  // Return cached data if still valid
  if (cachedFeed && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedFeed;
  }

  try {
    const feed = await parser.parseURL(RSS_FEED_URL);
    
    const posts: BlogPost[] = (feed.items || []).map((item, index) => {
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
      const dateString = pubDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      // Extract text content from HTML
      const textContent = item.content || item.summary || '';
      const plainText = textContent.replace(/<[^>]*>/g, '');
      const summary = plainText.substring(0, 150).trim() + (plainText.length > 150 ? '...' : '');
      
      // Estimate read time (rough estimate: 200 words per minute)
      const wordCount = plainText.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      
      // Extract image from media content or use placeholder
      let image = 'https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400';
      
      if (item.mediaContent && Array.isArray(item.mediaContent)) {
        const mediaItem = item.mediaContent[0];
        if (mediaItem && typeof mediaItem === 'object' && 'url' in mediaItem) {
          image = (mediaItem as any).url || image;
        }
      }
      
      // Determine category based on content or default
      const content = (item.content || item.summary || '').toLowerCase();
      let category = 'Trends';
      if (content.includes('tutorial') || content.includes('guide') || content.includes('how to')) {
        category = 'Tutorials';
      } else if (content.includes('case study') || content.includes('study') || content.includes('results')) {
        category = 'Case Studies';
      }
      
      return {
        id: item.guid || item.link || `post-${index}`,
        title: item.title || 'Untitled',
        summary: summary,
        date: dateString,
        readTime: `${readTime} min read`,
        category: category,
        image: image,
        featured: index === 0, // First item is featured
        content: item.content || item.summary,
        author: item.creator || 'RankBee Team',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400',
        link: item.link,
      };
    });

    cachedFeed = posts;
    cacheTimestamp = Date.now();
    return posts;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    // Return empty array on error instead of throwing
    return [];
  }
}

export async function getRSSPostById(id: string): Promise<BlogPost | null> {
  try {
    const posts = await fetchRSSFeed();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error('Error getting RSS post by ID:', error);
    return null;
  }
}
