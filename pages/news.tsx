import { SeoHead } from '../src/lib/SeoHead';
import { NewsPage } from '../src/components/NewsPage';

export default function News({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="news" />
      <NewsPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
