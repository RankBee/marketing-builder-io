import { SeoHead } from '../src/lib/SeoHead';
import { RankBeeAPIPage } from '../src/components/RankBeeAPIPage';

export default function RankBeeAPI({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="rankbee-api" />
      <RankBeeAPIPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
