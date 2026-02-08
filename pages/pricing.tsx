import { SeoHead } from '../src/lib/SeoHead';
import { PricingPage } from '../src/components/PricingPage';

export default function Pricing({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="pricing" />
      <PricingPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
