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

// Use local Netlify function to fetch from Builder.io API
const BLOG_FEED_URL = '/.netlify/functions/rss-feed';

// Cache for feed data
let cachedFeed: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseBuilderioBlogPosts(data: any): BlogPost[] {
  try {
    const results = data.results || [];
    
    const posts: BlogPost[] = results.map((item: any, index: number) => {
      const data = item.data || {};
      
      // Extract fields from Builder.io content model
      const title = data.title || item.name || 'Untitled';
      const content = data.content || data.body || '';
      const description = data.description || data.summary || '';
      const author = data.author || 'RankBee Team';
      const category = data.category || 'Trends';
      const image = data.image || 'https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400';

      // Parse date
      const createdDate = new Date(item.createdDate || item.publishedDate || new Date());
      const dateString = createdDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });

      // Extract text content
      const textContent = content || description;
      const plainText = typeof textContent === 'string' 
        ? textContent.replace(/<[^>]*>/g, '')
        : '';
      const summary = plainText.substring(0, 150).trim() + (plainText.length > 150 ? '...' : '');

      // Estimate read time
      const wordCount = plainText.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);

      return {
        id: item.id || `post-${index}`,
        title: title,
        summary: summary,
        date: dateString,
        readTime: `${readTime} min read`,
        category: category,
        image: image,
        featured: index === 0, // First item is featured
        content: textContent,
        author: author,
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400',
        link: item.url,
        guid: item.id,
      };
    });

    return posts;
  } catch (error) {
    console.error('Error parsing Builder.io blog posts:', error);
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
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    const posts = parseBuilderioBlogPosts(data);

    cachedFeed = posts;
    cacheTimestamp = Date.now();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty array on error instead of throwing
    return [];
  }
}

export async function getRSSPostById(id: string): Promise<BlogPost | null> {
  try {
    const posts = await fetchRSSFeed();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    return null;
  }
}
