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

// Use Netlify function as proxy to Ghost CMS (avoids CORS issues)
const BLOG_API_URL = '/.netlify/functions/rss-feed';

// Cache for feed data
let cachedFeed: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function parseGhostBlogPosts(data: any): BlogPost[] {
  try {
    const posts = data.posts || [];

    console.log(`Parsing ${posts.length} posts from Ghost API`);

    if (posts.length === 0) {
      console.warn('No blog posts found in Ghost API response');
      return [];
    }

    return posts.map((post: any, index: number) => {
      // Extract fields from Ghost post object
      const title = post.title || 'Untitled';
      const content = post.html || '';
      const excerpt = post.excerpt || '';
      const featuredImage = post.feature_image || 'https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400';

      // Get author from authors array
      let author = 'RankBee Team';
      let authorImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400';
      if (post.authors && Array.isArray(post.authors) && post.authors.length > 0) {
        author = post.authors[0].name || author;
        authorImage = post.authors[0].profile_image || authorImage;
      }

      // Get category from tags (primary_tag or first tag)
      let category = 'Trends';
      if (post.primary_tag) {
        const tagName = post.primary_tag.name?.toLowerCase() || '';
        if (tagName.includes('tutorial') || tagName.includes('guide')) {
          category = 'Tutorials';
        } else if (tagName.includes('case study') || tagName.includes('case-study')) {
          category = 'Case Studies';
        } else if (tagName.includes('trend')) {
          category = 'Trends';
        } else {
          category = post.primary_tag.name || category;
        }
      } else if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
        const tagName = post.tags[0].name?.toLowerCase() || '';
        if (tagName.includes('tutorial') || tagName.includes('guide')) {
          category = 'Tutorials';
        } else if (tagName.includes('case study') || tagName.includes('case-study')) {
          category = 'Case Studies';
        } else if (tagName.includes('trend')) {
          category = 'Trends';
        } else {
          category = post.tags[0].name || category;
        }
      }

      // Parse date - Ghost uses published_at
      const publishedDate = new Date(post.published_at || post.created_at || new Date());
      const dateString = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Extract text content
      const textContent = content || excerpt;
      const plainText = textContent.replace(/<[^>]*>/g, '');
      const summary = plainText.substring(0, 150).trim() + (plainText.length > 150 ? '...' : '');

      // Estimate read time (rough estimate: 200 words per minute)
      const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        id: post.id || post.slug || `post-${index}`,
        title: title,
        summary: summary,
        date: dateString,
        readTime: `${readTime} min read`,
        category: category,
        image: featuredImage,
        featured: index === 0, // First item is featured
        content: textContent,
        author: author,
        authorImage: authorImage,
        guid: post.id,
        link: post.url || `/article?id=${encodeURIComponent(post.id || post.slug)}`,
      };
    });
  } catch (error) {
    console.error('Error parsing Ghost blog posts:', error);
    return [];
  }
}

export async function fetchRSSFeed(): Promise<BlogPost[]> {
  // Return cached data if still valid
  if (cachedFeed && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedFeed;
  }

  try {
    const response = await fetch(BLOG_API_URL);
    const text = await response.text();

    console.log(`Blog API returned status ${response.status}, first 200 chars:`, text.substring(0, 200));

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse blog API response as JSON. Response head:', text.substring(0, 500));
      throw new Error(`Blog API returned non-JSON. Status ${response.status}. Body head: ${text.slice(0, 120)}`);
    }

    if (!response.ok) {
      console.error('Blog API error response:', data);
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    // Check if it's an error response
    if (data.error) {
      console.error('API Error:', data.error);
      return [];
    }

    const posts = parseGhostBlogPosts(data);

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
