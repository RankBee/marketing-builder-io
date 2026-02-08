import { SeoHead } from '../src/lib/SeoHead';
import { AgenciesPage } from '../src/components/AgenciesPage';

export default function Agencies({ onPageChange }: { onPageChange?: (page: string) => void }) {
  return (
    <>
      <SeoHead pageId="agencies" />
      <AgenciesPage onPageChange={onPageChange || (() => {})} />
    </>
  );
}
