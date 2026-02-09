import { SeoHead } from '../src/lib/SeoHead';
import { SEOProfessionalsPage } from '../src/components/SEOProfessionalsPage';

export default function SEOProfessionals({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="seo-professionals" />
      <SEOProfessionalsPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
