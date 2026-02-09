import type { GetStaticPaths, GetStaticProps } from 'next';
import { SeoHead } from '../../../src/lib/SeoHead';
import { BlogPage } from '../../../src/components/BlogPage';
import { getSiteUrl } from '../../../src/lib/page-seo';
import { fetchBlogPosts, getPopularTags, type BlogPost } from '../../../src/lib/builder';

interface TagPageProps {
  onPageChange?: (page: string) => void;
  tag: string;
  posts: BlogPost[];
  filters: string[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchBlogPosts();
  const allTags = new Set<string>();
  posts.forEach(p => {
    if (p.category) allTags.add(p.category.toLowerCase().replace(/\s+/g, '-'));
    p.tags?.forEach(t => allTags.add(t.toLowerCase().replace(/\s+/g, '-')));
  });

  return {
    paths: Array.from(allTags).map(tag => ({ params: { tag } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Omit<TagPageProps, 'onPageChange'>> = async ({ params }) => {
  const tag = params?.tag as string;
  const posts = await fetchBlogPosts();
  const priorityTags = ['Political Campaigns', 'AI Search', 'GAIO Optimization'];
  const popularTags = getPopularTags(posts, priorityTags, 8);
  const filters = ['All', ...popularTags];

  return {
    props: { tag, posts, filters },
    revalidate: 300,
  };
};

export default function TagPage({ onPageChange, tag, posts, filters }: TagPageProps) {
  const siteUrl = getSiteUrl();
  const decodedTag = decodeURIComponent(tag);

  return (
    <>
      <SeoHead
        pageId="blog"
        title={`${decodedTag} Articles`}
        description={`Blog posts tagged with "${decodedTag}".`}
        canonical={`${siteUrl}/blog/tag/${tag}`}
      />
      <BlogPage
        onPageChange={onPageChange || (() => {})}
        filterTag={decodedTag}
        initialPosts={posts}
        initialFilters={filters}
      />
    </>
  );
}
