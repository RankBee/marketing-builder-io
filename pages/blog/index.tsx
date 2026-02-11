import type { GetStaticProps } from 'next';
import { SeoHead } from '../../src/lib/SeoHead';
import { BlogPage } from '../../src/components/BlogPage';
import { fetchBlogPosts, getPopularTags, type BlogPost } from '../../src/lib/builder';

const POSTS_PER_PAGE = 12;

interface BlogIndexProps {
  onPageChange?: (page: string) => void;
  posts: BlogPost[];
  totalPages: number;
  filters: string[];
}

export const getStaticProps: GetStaticProps<{ posts: BlogPost[]; totalPages: number; filters: string[] }> = async () => {
  const allPosts = await fetchBlogPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);
  const priorityTags = ['Political Campaigns', 'AI Search', 'GAIO Optimization'];
  const popularTags = getPopularTags(allPosts, priorityTags, 8);
  const filters = ['All', ...popularTags];

  return {
    props: { posts, totalPages, filters },
    revalidate: 300, // ISR: regenerate every 5 minutes
  };
};

export default function BlogIndex({ onPageChange, posts, totalPages, filters }: BlogIndexProps) {
  return (
    <>
      <SeoHead pageId="blog" />
      <BlogPage
        onPageChange={onPageChange || (() => {})}
        initialPosts={posts}
        totalPages={totalPages}
        initialFilters={filters}
      />
    </>
  );
}
