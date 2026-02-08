import { SeoHead } from '../src/lib/SeoHead';
import { GrowingBusinessPage } from '../src/components/GrowingBusinessPage';

export default function GrowingBusiness({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="growing-business" />
      <GrowingBusinessPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
