import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft, Share2, Target, TrendingUp, Search, Users } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { fetchBlogPost, fetchBlogPosts, type BlogPost, addGhostSubscriber } from "../lib/builder";
import { trackEvent } from "../lib/posthog";
import { getSiteUrl } from "../lib/page-seo";

interface ArticleDetailPageProps {
  onPageChange: (page: string) => void;
  slug?: string;
  allPosts?: BlogPost[];
  initialPost?: BlogPost | null;
}

export function ArticleDetailPage({ onPageChange, slug, allPosts, initialPost }: ArticleDetailPageProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [article, setArticle] = useState<BlogPost | null>(initialPost || null);
  const [relatedArticles, setRelatedArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState<string | null>(null);
  const [tagCounts, setTagCounts] = useState<Map<string, number>>(new Map());
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    setSubscribeError(null);
    setSubscribeSuccess(false);
    
    try {
      const result = await addGhostSubscriber(email);
      
      if (result.success) {
        trackEvent('Newsletter Subscribed', {
          email,
          location: 'article_detail_page',
          article_slug: slug,
        });
        setSubscribeSuccess(true);
        setEmail(""); // Clear the input
        // Reset success message after 5 seconds
        successTimeoutRef.current = setTimeout(() => setSubscribeSuccess(false), 5000);
      } else {
        setSubscribeError(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setSubscribeError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function loadArticle() {
      if (!slug) {
        setError("No article specified");
        setLoading(false);
        return;
      }

      try {
        // Use initialPost if it matches the current slug, otherwise fetch
        let post = (initialPost && initialPost.slug === slug) ? initialPost
                 : (article && article.slug === slug) ? article
                 : null;
        if (!post) {
          setLoading(true);
          setError(null);
          post = await fetchBlogPost(slug);
        }
        
        if (!post) {
          setError("Article not found");
        } else {
          setArticle(post);
          
          // Fetch all posts if not provided (for related articles + tag counts)
          const posts = allPosts || await fetchBlogPosts();
          
          // Count tag occurrences across all posts
          const counts = new Map<string, number>();
          posts.forEach(p => {
            p.tags?.forEach(tag => {
              counts.set(tag, (counts.get(tag) || 0) + 1);
            });
          });
          setTagCounts(counts);
          
          // Fetch related articles
          const related = posts
            .filter(p => p.id !== post!.id && p.category === post!.category)
            .slice(0, 3);
          setRelatedArticles(related);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadArticle();
  }, [slug, allPosts, initialPost]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Article not found"}</p>
          <Button
            onClick={() => onPageChange("blog")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const displayArticle = article;

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Tutorials": return <Target className="w-4 h-4" />;
      case "Case Studies": return <TrendingUp className="w-4 h-4" />;
      case "Trends": return <Search className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Back */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            onClick={() => onPageChange("blog")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Information */}
        <div className="mb-8">
          {(() => {
            const allTags = displayArticle.tags && displayArticle.tags.length > 0
              ? displayArticle.tags
              : [displayArticle.category];
            const rarestTag = allTags.reduce((rarest, tag) => {
              const currentCount = tagCounts.get(tag) || 0;
              const rarestCount = tagCounts.get(rarest) || 0;
              return currentCount < rarestCount ? tag : rarest;
            }, allTags[0]);
            const count = tagCounts.get(rarestTag) || 0;
            const isClickable = count >= 2;
            if (isClickable) {
              const tagSlug = rarestTag.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  href={`/blog/tag/${tagSlug}`}
                  onClick={() => onPageChange(`blog/tag/${tagSlug}`)}
                  className="inline-flex mb-4"
                >
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer transition-colors">
                    {getCategoryIcon(rarestTag)}
                    <span className="ml-2">{rarestTag}</span>
                  </Badge>
                </Link>
              );
            }
            return (
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                {getCategoryIcon(rarestTag)}
                <span className="ml-2">{rarestTag}</span>
              </Badge>
            );
          })()}
          
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900 leading-tight">
            {displayArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            {displayArticle.author && displayArticle.authorImage && (
              <div className="flex items-center gap-2">
                <Image
                  src={displayArticle.authorImage}
                  alt={displayArticle.author}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                  quality={75}
                />
                <div>
                  <div className="font-medium text-gray-900">{displayArticle.author}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>{displayArticle.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{displayArticle.readTime}</span>
            </div>
          </div>

          {/* Tags — sorted most popular to least popular, excluding the rarest tag shown above */}
          {displayArticle.tags && displayArticle.tags.length > 1 && (() => {
            const allTags = displayArticle.tags!;
            const rarestTag = allTags.reduce((rarest, tag) => {
              const currentCount = tagCounts.get(tag) || 0;
              const rarestCount = tagCounts.get(rarest) || 0;
              return currentCount < rarestCount ? tag : rarest;
            }, allTags[0]);
            const sortedTags = [...allTags]
              .filter(tag => tag !== rarestTag)
              .sort((a, b) => (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0));
            if (sortedTags.length === 0) return null;
            return (
              <div className="flex flex-wrap gap-2 mb-8">
                {sortedTags.map((tag) => {
                  const count = tagCounts.get(tag) || 0;
                  const isClickable = count >= 2;
                  
                  if (isClickable) {
                    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tagSlug}`}
                        onClick={() => onPageChange(`blog/tag/${tagSlug}`)}
                      >
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 cursor-pointer transition-colors">
                          {tag}
                        </Badge>
                      </Link>
                    );
                  }
                  return (
                    <Badge
                      key={tag}
                      className="bg-gray-100 text-gray-600 cursor-default"
                    >
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            );
          })()}

          {/* Share Button */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={() => {
                const url = `${getSiteUrl()}/blog/${displayArticle.slug}`;
                const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedInUrl, '_blank', 'width=600,height=600');
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-lg overflow-hidden">
          <Image
            src={displayArticle.image}
            alt={displayArticle.title}
            width={896}
            height={384}
            className="w-full h-96 object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            quality={75}
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed">
            <p className="text-xl text-gray-600 mb-8 italic">
              {displayArticle.summary}
            </p>
            
            {displayArticle.content && (
              <div
                className="article-content"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: displayArticle.content
                }}
              />
            )}
          </div>

          <style>{`
            .article-content h2 {
              font-size: 1.875rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #111827;
              line-height: 1.2;
            }
            
            .article-content h3 {
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #1f2937;
            }
            
            .article-content p {
              margin-bottom: 1.25rem;
              line-height: 1.75;
              color: #374151;
            }
            
            .article-content ul {
              list-style-type: disc;
              margin-left: 1.5rem;
              margin-bottom: 1.25rem;
            }
            
            .article-content li {
              margin-bottom: 0.5rem;
              color: #374151;
              line-height: 1.75;
            }
            
            .article-content strong {
              font-weight: 600;
              color: #111827;
            }

            .article-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.75rem 0;
              font-size: 0.9375rem;
              line-height: 1.6;
              overflow-x: auto;
              display: block;
              border-radius: 0.5rem;
              box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
            }

            .article-content thead {
              background-color: #f3f0ff;
            }

            .article-content th {
              padding: 0.75rem 1rem;
              text-align: left;
              font-weight: 600;
              font-size: 0.875rem;
              color: #4c1d95;
              border: 1px solid #e5e7eb;
              white-space: nowrap;
            }

            .article-content td {
              padding: 0.75rem 1rem;
              text-align: left;
              color: #374151;
              border: 1px solid #e5e7eb;
              vertical-align: top;
            }

            .article-content tbody tr:nth-child(even) {
              background-color: #fafafa;
            }

            .article-content tbody tr:hover {
              background-color: #f5f3ff;
            }
          `}</style>
        </div>

        {/* Author Bio */}
        {displayArticle.author && displayArticle.authorImage && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <Image
                src={displayArticle.authorImage}
                alt={displayArticle.author}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                quality={75}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {displayArticle.author}
                </h3>
                <p className="text-gray-600">
                  {displayArticle.author} is a seasoned expert in AI marketing and digital strategy. With years of experience helping businesses adapt to the AI-first landscape, they bring practical insights and proven methodologies to every project.
                </p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  onClick={() => onPageChange(`blog/${article.slug}`)}
                  className="block group"
                >
                  <Card className="bg-white hover:shadow-lg transition-all duration-300 h-full">
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={420}
                        height={236}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={75}
                      />
                    </div>
                    <CardHeader>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs w-fit mb-2">
                        {getCategoryIcon(article.category)}
                        <span className="ml-1">{article.category}</span>
                      </Badge>
                      <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-500">
                        {article.date}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-6">Never Miss an Article</h2>
          <p className="text-xl mb-8 text-purple-100">
            Get weekly tips, case studies, and AI insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-gray-900"
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                className="bg-white text-purple-600 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {subscribeSuccess && (
              <p className="text-green-100 text-sm mt-2">
                ✓ Successfully subscribed! Check your email to confirm.
              </p>
            )}
            {subscribeError && (
              <p className="text-red-200 text-sm mt-2">
                {subscribeError}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
