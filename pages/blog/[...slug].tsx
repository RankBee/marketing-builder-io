import { GetServerSideProps } from 'next';
import { SeoHead } from '../../src/lib/SeoHead';
import { ArticleDetailPage } from '../../src/components/ArticleDetailPage';
import { fetchBlogPost, fetchBlogPosts, sanitizeBlogHtml, BlogPost } from '../../src/lib/builder';
import { getSiteUrl } from '../../src/lib/page-seo';

interface BlogPostPageProps {
  onPageChange?: (page: string) => void;
  post: BlogPost | null;
  slug: string;
  allPosts?: BlogPost[];
  error?: string;
}

export default function BlogPostPage({ onPageChange, post, slug, allPosts, error }: BlogPostPageProps) {
  const siteUrl = getSiteUrl();

  if (error) {
    return (
      <>
        <SeoHead pageId="blog" />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Blog Temporarily Unavailable</h1>
          <p className="text-gray-600">
            We're experiencing technical difficulties with our blog. Please try again later.
          </p>
          <p className="text-sm text-gray-500 mt-4">Error: {error}</p>
        </div>
      </>
    );
  }

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
    datePublished: post.isoDate,
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
        publishedTime={post.isoDate}
        jsonLd={jsonLd}
      />
      <ArticleDetailPage onPageChange={onPageChange || (() => {})} slug={slug} initialPost={post} allPosts={allPosts} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const slugArray = params?.slug as string[];
  
  // Handle different URL patterns:
  // /blog/my-post -> ["my-post"]
  // /blog/category/my-post -> ["category", "my-post"] (use last segment)
  const slug = slugArray ? slugArray[slugArray.length - 1] : '';

  if (!slug) {
    return { notFound: true };
  }

  // Set cache headers for performance
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    const [post, allPosts] = await Promise.all([
      fetchBlogPost(slug),
      fetchBlogPosts().catch(() => []), // Don't fail if allPosts fetch fails
    ]);

    if (!post) {
      return { notFound: true };
    }

    // Sanitize HTML content server-side
    if (post.content) {
      post.content = sanitizeBlogHtml(post.content);
    }

    return {
      props: { 
        post, 
        slug, 
        allPosts: allPosts || [] 
      },
    };
  } catch (error) {
    console.error(`[blog] Error fetching post ${slug}:`, error);
    
    // Instead of returning notFound, return an error state
    // This allows the page to render with an error message
    return {
      props: {
        post: null,
        slug,
        allPosts: [],
        error: 'Unable to fetch blog content. Please try again later.'
      },
    };
  }
};
