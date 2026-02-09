import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { SeoHead } from '../../src/lib/SeoHead';
import { BlogPage } from '../../src/components/BlogPage';
import { fetchBlogPosts, getPopularTags, type BlogPost } from '../../src/lib/builder';

interface BlogIndexProps {
  onPageChange?: (page: string) => void;
  posts: BlogPost[];
  filters: string[];
}

export const getStaticProps: GetStaticProps<{ posts: BlogPost[]; filters: string[] }> = async () => {
  const posts = await fetchBlogPosts();
  const priorityTags = ['Political Campaigns', 'AI Search', 'GAIO Optimization'];
  const popularTags = getPopularTags(posts, priorityTags, 8);
  const filters = ['All', ...popularTags];

  return {
    props: { posts, filters },
    revalidate: 300, // ISR: regenerate every 5 minutes
  };
};

export default function BlogIndex({ onPageChange, posts, filters }: BlogIndexProps) {
  return (
    <>
      <SeoHead pageId="blog" />
      <BlogPage
        onPageChange={onPageChange || (() => {})}
        initialPosts={posts}
        initialFilters={filters}
      />
    </>
  );
}
