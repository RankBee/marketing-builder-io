// Ghost CMS Content API service
// Fetches blog posts from Ghost CMS

const GHOST_API_KEY = '4d7724b1d3ab0bbf970850bf7f';
const GHOST_API_URL = 'https://geo.rankbee.ai/ghost/api/content';

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html?: string;
  comment_id?: string;
  feature_image?: string;
  featured?: boolean;
  visibility?: string;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  custom_excerpt?: string;
  excerpt?: string;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  authors?: Array<{
    id: string;
    name: string;
    profile_image?: string;
  }>;
  primary_author?: {
    id: string;
    name: string;
    profile_image?: string;
  };
  primary_tag?: {
    id: string;
    name: string;
    slug: string;
  };
  reading_time?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  author?: string;
  authorImage?: string;
  content?: string;
  tags?: string[];
}

/**
 * Transform Ghost API response to our BlogPost format
 */
function transformGhostPost(ghostPost: GhostPost): BlogPost {
  const publishDate = ghostPost.published_at ? new Date(ghostPost.published_at) : new Date();
  
  return {
    id: ghostPost.id,
    slug: ghostPost.slug,
    title: ghostPost.title,
    summary: ghostPost.custom_excerpt || ghostPost.excerpt || '',
    date: publishDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    readTime: ghostPost.reading_time ? `${ghostPost.reading_time} min read` : '5 min read',
    category: ghostPost.primary_tag?.name || 'Trends',
    image: ghostPost.feature_image || 'https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400',
    featured: ghostPost.featured || false,
    author: ghostPost.primary_author?.name,
    authorImage: ghostPost.primary_author?.profile_image,
    content: ghostPost.html,
    tags: ghostPost.tags?.map(tag => tag.name) || []
  };
}

/**
 * Fetch all blog posts from Ghost CMS
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!GHOST_API_KEY) {
    console.warn('Ghost API key not configured');
    return [];
  }

  try {
    const url = `${GHOST_API_URL}/posts/?key=${GHOST_API_KEY}&limit=100&include=tags,authors`;
    console.log('Fetching Ghost posts from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const posts = result.posts || [];
    console.log(`Successfully fetched ${posts.length} posts from Ghost`);
    
    return posts.map(transformGhostPost);
  } catch (error) {
    console.error('Error fetching blog posts from Ghost:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
/**
 * Capitalize each word in a string
 */
function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get popular tags from blog posts, ensuring priority tags are always included
 */
export function getPopularTags(posts: BlogPost[], priorityTags: string[] = [], maxTags: number = 8, minCount: number = 2): string[] {
  // Count tag occurrences
  const tagCounts = new Map<string, number>();
  
  posts.forEach(post => {
    if (post.category) {
      const currentCount = tagCounts.get(post.category) || 0;
      tagCounts.set(post.category, currentCount + 1);
    }
  });
  
  // Filter tags that appear at least minCount times
  const qualifyingTags = Array.from(tagCounts.entries())
    .filter(([tag, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
  
  // Normalize priority tags for case-insensitive matching
  const normalizedPriorityTags = priorityTags.map(tag => tag.toLowerCase());
  
  // Ensure priority tags are included (case-insensitive match)
  const priorityTagsToInclude = qualifyingTags.filter((tag: string) => 
    normalizedPriorityTags.includes(tag.toLowerCase())
  );
  
  // Get remaining popular tags
  const remainingTags = qualifyingTags.filter((tag: string) => 
    !normalizedPriorityTags.includes(tag.toLowerCase())
  );
  
  // Combine: priority tags first, then fill with most popular
  const availableSlots = maxTags - priorityTagsToInclude.length;
  const finalTags = [
    ...priorityTagsToInclude,
    ...remainingTags.slice(0, availableSlots)
  ];
  
  // Capitalize all tags for consistent display
  return finalTags.map(tag => capitalizeWords(tag));
}

/**
 * Add a subscriber to Ghost CMS
 */
export async function addGhostSubscriber(email: string, name?: string): Promise<{ success: boolean; error?: string }> {
  if (!GHOST_API_KEY) {
    console.warn('Ghost API key not configured');
    return { success: false, error: 'API key not configured' };
  }

  try {
    const url = `${GHOST_API_URL}/members/?key=${GHOST_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        members: [{
          email: email,
          name: name || '',
          subscribed: true,
          labels: ['newsletter']
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Ghost Members API error:', response.status, errorData);
      return { success: false, error: `Failed to subscribe: ${response.statusText}` };
    }

    const result = await response.json();
    console.log('Successfully added subscriber to Ghost:', result);
    return { success: true };
  } catch (error) {
    console.error('Error adding subscriber to Ghost:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  if (!GHOST_API_KEY) {
    console.warn('Ghost API key not configured');
    return null;
  }

  try {
    const url = `${GHOST_API_URL}/posts/slug/${slug}/?key=${GHOST_API_KEY}&include=tags,authors`;
    console.log('Fetching Ghost post from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Ghost API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();
    const posts = result.posts || [];
    
    if (posts.length === 0) {
      return null;
    }

    return transformGhostPost(posts[0]);
  } catch (error) {
    console.error('Error fetching blog post from Ghost:', error);
    return null;
  }
}
