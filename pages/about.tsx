import { SeoHead } from '../src/lib/SeoHead';
import { AboutPage } from '../src/components/AboutPage';

export default function About({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="about" />
      <AboutPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
