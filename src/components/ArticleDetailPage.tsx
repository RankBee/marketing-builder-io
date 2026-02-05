import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, ArrowLeft, Share2, BookmarkIcon, Target, TrendingUp, Search, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchRSSFeed, getRSSPostById, type BlogPost } from "../lib/rssService";

interface ArticleDetailPageProps {
  onPageChange: (page: string) => void;
}

export function ArticleDetailPage({ onPageChange }: ArticleDetailPageProps) {
  const [email, setEmail] = useState("");
  const [article, setArticle] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);

        // Get the article ID from URL params
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get('id');

        // Fetch all posts to get the articles
        const posts = await fetchRSSFeed();
        setAllPosts(posts);

        // Find the specific article
        if (articleId) {
          const foundArticle = await getRSSPostById(articleId);
          setArticle(foundArticle);
        } else if (posts.length > 0) {
          // Default to first post if no ID provided
          setArticle(posts[0]);
        }
      } catch (error) {
        console.error("Failed to load article:", error);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Tutorials": return <Target className="w-4 h-4" />;
      case "Case Studies": return <TrendingUp className="w-4 h-4" />;
      case "Trends": return <Search className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const relatedArticles = allPosts
    .filter(a => a.id !== article?.id && a.category === article?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Back */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onPageChange("blog")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Information */}
        <div className="mb-8">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">
            {getCategoryIcon(article.category)}
            <span className="ml-2">{article.category}</span>
          </Badge>

          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <img
                src={article.authorImage}
                alt={article.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{article.author}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed">
            <p className="text-xl text-gray-600 mb-8 italic">
              {article.summary}
            </p>

            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: article.content || '<p>No content available</p>'
              }}
            />
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
          `}</style>
        </div>

        {/* Author Bio */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <img
              src={article.authorImage}
              alt={article.author}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {article.author}
              </h3>
              <p className="text-gray-600">
                {article.author} is a seasoned expert in AI marketing and digital strategy. With years of experience helping businesses adapt to the AI-first landscape, they bring practical insights and proven methodologies to every project.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card
                  key={relatedArticle.id}
                  className="bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => {
                    window.history.pushState({}, "", `/article?id=${encodeURIComponent(relatedArticle.id)}`);
                    window.location.reload();
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-xs w-fit mb-2">
                      {getCategoryIcon(relatedArticle.category)}
                      <span className="ml-1">{relatedArticle.category}</span>
                    </Badge>
                    <CardTitle className="text-lg leading-tight group-hover:text-purple-600 transition-colors">
                      {relatedArticle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      {relatedArticle.date}
                    </div>
                  </CardContent>
                </Card>
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
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
