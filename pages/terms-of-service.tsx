import { SeoHead } from '../src/lib/SeoHead';
import { TermsOfServicePage } from '../src/components/TermsOfServicePage';

export default function TermsOfService({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="terms-of-service" />
      <TermsOfServicePage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
