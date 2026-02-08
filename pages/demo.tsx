import { SeoHead } from '../src/lib/SeoHead';
import { DemoPage } from '../src/components/DemoPage';

export default function Demo({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="demo" />
      <DemoPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
