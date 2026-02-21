import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { Clock, Search, TrendingUp, Users, Target } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { fetchBlogPosts, getPopularTags, type BlogPost, addGhostSubscriber } from "../lib/builder";
import { trackEvent } from "../lib/posthog";

interface BlogPageProps {
  onPageChange: (page: string) => void;
  filterTag?: string;
  pageNumber?: number;
  initialPosts?: BlogPost[];
  initialFilters?: string[];
  totalPages?: number;
}

export function BlogPage({ onPageChange, filterTag, pageNumber = 1, initialPosts, initialFilters, totalPages: totalPagesProp }: BlogPageProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialPosts || []);
  const [filters, setFilters] = useState<string[]>(initialFilters || ["All"]);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
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
          location: 'blog_page',
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
  
  // Convert URL slug back to original tag name by finding matching tag
  const findTagBySlug = (slug: string): string => {
    if (!slug || slug === "All") return "All";
    const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ');
    const matchingFilter = filters.find(f => 
      f.toLowerCase() === normalizedSlug
    );
    return matchingFilter || slug;
  };
  
  const activeFilter = filterTag ? findTagBySlug(filterTag) : "All";
  const postsPerPage = 12;
  const currentPage = pageNumber;

  useEffect(() => {
    // Skip client-side fetch if posts were provided via SSR/SSG
    if (initialPosts && initialPosts.length > 0) return;

    async function loadBlogPosts() {
      try {
        setLoading(true);
        setError(null);
        const posts = await fetchBlogPosts();
        
        if (posts.length === 0) {
          setError("No blog posts available at the moment.");
        } else {
          setBlogPosts(posts);
          
          // Get popular tags with priority tags always included
          const priorityTags = ["Political Campaigns", "AI Search", "GAIO Optimization"];
          const popularTags = getPopularTags(posts, priorityTags, 8);
          setFilters(["All", ...popularTags]);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadBlogPosts();
  }, [initialPosts]);



  const matchesFilter = (post: BlogPost, filter: string): boolean => {
    const f = filter.toLowerCase();
    if (post.category?.toLowerCase() === f) return true;
    if (post.tags?.some(t => t.toLowerCase() === f)) return true;
    return false;
  };

  // When totalPagesProp is set, posts arrive pre-filtered and pre-sliced from SSR/SSG
  const filteredPosts = totalPagesProp != null
    ? blogPosts
    : activeFilter === "All" 
      ? blogPosts 
      : blogPosts.filter(post => matchesFilter(post, activeFilter));

  const totalPages = totalPagesProp ?? Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = totalPagesProp != null
    ? filteredPosts
    : filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const featuredPost = currentPage === 1 ? filteredPosts.find(post => post.featured) : null;

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-block bg-purple-600 text-white text-sm font-semibold tracking-wider uppercase px-6 py-2 rounded-full mb-8">
              Blog
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
              Fresh Takes on <span className="text-purple-600">AI Search</span> and Brand Magic
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From prompt hacks to visibility trends-tips from our team to keep you ahead.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto mb-8 border border-purple-200">
              <p className="text-gray-700 leading-relaxed">
                We share what works because we've lived it. Dive in for stories, strategies, and the occasional AI mishap we all laugh about.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  className="bg-cta hover:bg-cta/90 text-cta-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe for Weekly Wins"}
                </Button>
              </form>
              {subscribeSuccess && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ Successfully subscribed! Check your email to confirm.
                </p>
              )}
              {subscribeError && (
                <p className="text-red-600 text-sm mt-2">
                  {subscribeError}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                Featured Post
              </Badge>
              <h2 className="text-3xl text-gray-900">Must Read</h2>
            </div>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={640}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
                    {getCategoryIcon(featuredPost.category)}
                    <span className="ml-2">{featuredPost.category}</span>
                  </Badge>
                  <h3 className="text-2xl mb-4 text-gray-900 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span>{featuredPost.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    onClick={() => onPageChange(`blog/${featuredPost.slug}`)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 py-2"
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 mb-8">Latest Reads</h2>
            <p className="text-xl text-gray-600 mb-8">
              Actionable insights to help you win in the AI conversation.
            </p>
            
            {/* Active Filter Indicator */}
            {activeFilter !== "All" && (
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-gray-600">Showing posts tagged with:</span>
                <Badge className="bg-purple-600 text-white px-4 py-2 text-sm">
                  {activeFilter}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  asChild
                >
                  <Link href="/blog" onClick={() => onPageChange("blog")}>Clear filter</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => {
              const filterHref = filter === "All" ? "/blog" : `/blog/tag/${filter.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={activeFilter === filter 
                    ? "bg-purple-600 hover:bg-purple-700 text-white" 
                    : "border-purple-600 text-purple-600 hover:bg-purple-50"
                  }
                  asChild
                >
                  <Link
                    href={filterHref}
                    onClick={() => onPageChange(filter === "All" ? "blog" : `blog/tag/${filter.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    {filter}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Loading blog posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={() => onPageChange(`blog/${post.slug}`)}
                className="block group"
              >
                <Card className="bg-white hover:shadow-lg transition-all duration-300 h-full">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={420}
                      height={236}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs">
                        {getCategoryIcon(post.category)}
                        <span className="ml-1">{post.category}</span>
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed mb-4">
                      {post.summary}
                    </CardDescription>
                    <div className="text-sm text-gray-500">
                      {post.date}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {currentPage > 1 && (() => {
                const prevPage = currentPage - 1;
                const prevHref = activeFilter === "All"
                  ? (prevPage === 1 ? "/blog" : `/blog/page/${prevPage}`)
                  : `/blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${prevPage}`;
                const prevPage_ = activeFilter === "All"
                  ? (prevPage === 1 ? "blog" : `blog/page/${prevPage}`)
                  : `blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${prevPage}`;
                return (
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    asChild
                  >
                    <Link href={prevHref} onClick={() => onPageChange(prevPage_)}>Previous</Link>
                  </Button>
                );
              })()}
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const pageHref = activeFilter === "All"
                    ? (page === 1 ? "/blog" : `/blog/page/${page}`)
                    : `/blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${page}`;
                  const pagePage = activeFilter === "All"
                    ? (page === 1 ? "blog" : `blog/page/${page}`)
                    : `blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${page}`;
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      className={page === currentPage
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border-purple-600 text-purple-600 hover:bg-purple-50"
                      }
                      asChild
                    >
                      <Link href={pageHref} onClick={() => onPageChange(pagePage)}>{page}</Link>
                    </Button>
                  );
                })}
              </div>
              
              {currentPage < totalPages && (() => {
                const nextPage = currentPage + 1;
                const nextHref = activeFilter === "All"
                  ? `/blog/page/${nextPage}`
                  : `/blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${nextPage}`;
                const nextPage_ = activeFilter === "All"
                  ? `blog/page/${nextPage}`
                  : `blog/tag/${activeFilter.toLowerCase().replace(/\s+/g, '-')}/page/${nextPage}`;
                return (
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    asChild
                  >
                    <Link href={nextHref} onClick={() => onPageChange(nextPage_)}>Next</Link>
                  </Button>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl mb-6">Never Miss a Win</h2>
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
          <div className="mt-8">
            <Button 
              variant="ghost" 
              className="text-purple-100 hover:text-white hover:bg-purple-600/50"
            >
              Got a Topic Idea? Drop Us a Line
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
