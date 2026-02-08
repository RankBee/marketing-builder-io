import { SeoHead } from '../../src/lib/SeoHead';
import { BlogPage } from '../../src/components/BlogPage';

export default function BlogIndex({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="blog" />
      <BlogPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
