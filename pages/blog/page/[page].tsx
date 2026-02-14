import type { GetStaticPaths, GetStaticProps } from 'next';
import { SeoHead } from '../../../src/lib/SeoHead';
import { BlogPage } from '../../../src/components/BlogPage';
import { getSiteUrl } from '../../../src/lib/page-seo';
import { fetchBlogPosts, getPopularTags, type BlogPost } from '../../../src/lib/builder';

interface PaginatedBlogProps {
  onPageChange?: (page: string) => void;
  pageNumber: number;
  posts: BlogPost[];
  totalPages: number;
  filters: string[];
}

const POSTS_PER_PAGE = 12;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Omit<PaginatedBlogProps, 'onPageChange'>> = async ({ params }) => {
  const pageNumber = parseInt(params?.page as string, 10) || 1;
  const allPosts = await fetchBlogPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const priorityTags = ['Political Campaigns', 'AI Search', 'GAIO Optimization'];
  const popularTags = getPopularTags(allPosts, priorityTags, 8);
  const filters = ['All', ...popularTags];

  return {
    props: { pageNumber, posts, totalPages, filters },
    revalidate: 300,
  };
};

export default function PaginatedBlog({ onPageChange, pageNumber, posts, totalPages, filters }: PaginatedBlogProps) {
  const siteUrl = getSiteUrl();

  return (
    <>
      <SeoHead
        pageId="blog"
        title={`Blog - Page ${pageNumber}`}
        description={`Blog posts - page ${pageNumber}.`}
        canonical={`${siteUrl}/blog/page/${pageNumber}`}
      />
      <BlogPage
        onPageChange={onPageChange || (() => {})}
        pageNumber={pageNumber}
        initialPosts={posts}
        totalPages={totalPages}
        initialFilters={filters}
      />
    </>
  );
}
