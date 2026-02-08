import { GetServerSideProps } from 'next';
import { SeoHead } from '../../../src/lib/SeoHead';
import { BlogPage } from '../../../src/components/BlogPage';
import { getSiteUrl } from '../../../src/lib/page-seo';

interface TagPageProps {
  onPageChange?: (page: string) => void;
  tag: string;
}

export default function TagPage({ onPageChange, tag }: TagPageProps) {
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
      <BlogPage onPageChange={onPageChange || (() => {})} filterTag={decodedTag} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tag = params?.tag as string;
  return {
    props: { tag },
  };
};
