import { SeoHead } from '../src/lib/SeoHead';
import { PrivacyPolicyPage } from '../src/components/PrivacyPolicyPage';

export default function PrivacyPolicy({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="privacy-policy" />
      <PrivacyPolicyPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
