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

// Use local Netlify function to bypass CORS
const BLOG_FEED_URL = '/.netlify/functions/rss-feed';

// Cache for feed data
let cachedFeed: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseRSSFeed(xmlString: string): BlogPost[] {
  try {
    // Check if response looks like HTML (error page)
    if (xmlString.includes('<!DOCTYPE') || xmlString.includes('<html')) {
      console.error('Received HTML instead of XML. Response:', xmlString.substring(0, 500));
      return [];
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Check for parsing errors
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      console.error('XML parsing error. Response:', xmlString.substring(0, 500));
      return [];
    }

    const items = xmlDoc.getElementsByTagName('item');
    const posts: BlogPost[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Get basic fields
      const titleEl = item.getElementsByTagName('title')[0];
      const linkEl = item.getElementsByTagName('link')[0];
      const descriptionEl = item.getElementsByTagName('description')[0];
      const contentEl = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0];
      const guidEl = item.getElementsByTagName('guid')[0];
      const pubDateEl = item.getElementsByTagName('pubDate')[0];
      const creatorEl = item.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'creator')[0];
      const imageEl = item.getElementsByTagName('image')[0];

      const title = titleEl?.textContent || 'Untitled';
      const link = linkEl?.textContent || '';
      const guid = guidEl?.textContent || link || `post-${i}`;
      const description = descriptionEl?.textContent || '';
      const fullContent = contentEl?.textContent || description;
      const author = creatorEl?.textContent || 'RankBee Team';
      const pubDate = pubDateEl?.textContent || new Date().toISOString();

      // Parse date
      const pubDateObj = new Date(pubDate);
      const dateString = pubDateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });

      // Extract text content from HTML
      const plainText = fullContent.replace(/<[^>]*>/g, '');
      const summary = plainText.substring(0, 150).trim() + (plainText.length > 150 ? '...' : '');

      // Estimate read time (rough estimate: 200 words per minute)
      const wordCount = plainText.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      // Extract image from description or use placeholder
      let image = 'https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400';
      
      // Try to extract image from img tag in description or content
      const imgMatch = fullContent.match(/<img[^>]+src=["']([^"']+)["']/);
      if (imgMatch && imgMatch[1]) {
        image = imgMatch[1];
      } else if (imageEl?.textContent) {
        image = imageEl.textContent;
      }

      // Determine category based on content
      const contentLower = fullContent.toLowerCase();
      let category = 'Trends';
      if (contentLower.includes('tutorial') || contentLower.includes('guide') || contentLower.includes('how to')) {
        category = 'Tutorials';
      } else if (contentLower.includes('case study') || contentLower.includes('study') || contentLower.includes('results')) {
        category = 'Case Studies';
      }

      posts.push({
        id: guid,
        title: title,
        summary: summary,
        date: dateString,
        readTime: `${readTime} min read`,
        category: category,
        image: image,
        featured: i === 0, // First item is featured
        content: fullContent,
        author: author,
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400',
        link: link,
        guid: guid,
      });
    }

    return posts;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

export async function fetchRSSFeed(): Promise<BlogPost[]> {
  // Return cached data if still valid
  if (cachedFeed && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedFeed;
  }

  try {
    const response = await fetch(BLOG_FEED_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    const posts = parseRSSFeed(xmlText);

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
