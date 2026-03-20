import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SeoAiStrategyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/knowledge-base/13721');
  }, [router]);

  return null;
}
