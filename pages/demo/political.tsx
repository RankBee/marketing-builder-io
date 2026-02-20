import { SeoHead } from '../../src/lib/SeoHead';
import { PoliticalDemoPage } from '../../src/components/PoliticalDemoPage';

export default function PoliticalDemo({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="demo/political" />
      <PoliticalDemoPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
