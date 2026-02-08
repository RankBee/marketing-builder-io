import { SeoHead } from '../src/lib/SeoHead';
import { HomePage } from '../src/components/HomePage';

export default function Home({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="home" />
      <HomePage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
