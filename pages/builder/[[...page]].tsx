import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Content, fetchOneEntry } from '@builder.io/sdk-react';
import { SeoHead } from '../../src/lib/SeoHead';

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';
const MODEL_NAME = 'page';

export const getStaticPaths: GetStaticPaths = async () => {
  // Let all paths be generated on-demand via fallback: 'blocking'
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!BUILDER_API_KEY) {
    return { notFound: true };
  }

  const segments = (params?.page as string[]) || [];
  const urlPath = '/builder/' + segments.join('/');

  const content = await fetchOneEntry({
    model: MODEL_NAME,
    apiKey: BUILDER_API_KEY,
    userAttributes: { urlPath },
  });

  if (!content) {
    return { notFound: true };
  }

  return {
    props: { content },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
};

export default function BuilderPage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = content?.data?.title || 'Page';
  const description = content?.data?.description || '';

  return (
    <>
      <SeoHead
        pageId="builder"
        title={title}
        description={description}
      />
      <Content
        model={MODEL_NAME}
        apiKey={BUILDER_API_KEY}
        content={content}
      />
    </>
  );
}
