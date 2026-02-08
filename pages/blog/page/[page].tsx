import { GetServerSideProps } from 'next';
import { SeoHead } from '../../../src/lib/SeoHead';
import { BlogPage } from '../../../src/components/BlogPage';
import { getSiteUrl } from '../../../src/lib/page-seo';

interface PaginatedBlogProps {
  onPageChange?: (page: string) => void;
  pageNumber: number;
}

export default function PaginatedBlog({ onPageChange, pageNumber }: PaginatedBlogProps) {
  const siteUrl = getSiteUrl();

  return (
    <>
      <SeoHead
        pageId="blog"
        title={`Blog - Page ${pageNumber}`}
        description={`Blog posts - page ${pageNumber}.`}
        canonical={`${siteUrl}/blog/page/${pageNumber}`}
      />
      <BlogPage onPageChange={onPageChange || (() => {})} pageNumber={pageNumber} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const pageNumber = parseInt(params?.page as string, 10) || 1;
  return {
    props: { pageNumber },
  };
};
