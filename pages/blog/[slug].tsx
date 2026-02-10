import { GetStaticProps, GetStaticPaths } from 'next';
import { SeoHead } from '../../src/lib/SeoHead';
import { ArticleDetailPage } from '../../src/components/ArticleDetailPage';
import { fetchBlogPost, fetchBlogPosts, BlogPost } from '../../src/lib/builder';
import { getSiteUrl } from '../../src/lib/page-seo';

interface BlogPostPageProps {
  onPageChange?: (page: string) => void;
  post: BlogPost | null;
  slug: string;
}

export default function BlogPostPage({ onPageChange, post, slug }: BlogPostPageProps) {
  const siteUrl = getSiteUrl();

  if (!post) {
    return (
      <>
        <SeoHead pageId="blog" />
        <ArticleDetailPage onPageChange={onPageChange || (() => {})} slug={slug} initialPost={null} />
      </>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "RankBee" },
    publisher: {
      "@type": "Organization",
      name: "RankBee",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/bee-logo.png` }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` }
  };

  return (
    <>
      <SeoHead
        pageId="blog"
        title={post.title}
        description={post.summary}
        canonical={`${siteUrl}/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={post.date}
        jsonLd={jsonLd}
      />
      <ArticleDetailPage onPageChange={onPageChange || (() => {})} slug={slug} initialPost={post} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await fetchBlogPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    return {
      paths,
      fallback: 'blocking', // Generate new pages on-demand
    };
  } catch (error) {
    console.error('[blog] Error fetching paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    const post = await fetchBlogPost(slug);
    if (!post) {
      return { notFound: true };
    }
    return {
      props: { post, slug },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error(`[blog] Error fetching post ${slug}:`, error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};
