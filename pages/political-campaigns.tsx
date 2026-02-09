import { SeoHead } from '../src/lib/SeoHead';
import { PoliticalCampaignsPage } from '../src/components/PoliticalCampaignsPage';

export default function PoliticalCampaigns({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="political-campaigns" />
      <PoliticalCampaignsPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
