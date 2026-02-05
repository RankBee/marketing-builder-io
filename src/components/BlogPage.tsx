import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, Search, TrendingUp, Users, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchRSSFeed, type BlogPost } from "../lib/rssService";

interface BlogPageProps {
  onPageChange: (page: string) => void;
}

export function BlogPage({ onPageChange }: BlogPageProps) {
  const [email, setEmail] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ["All", "Tutorials", "Case Studies", "Trends"];

  useEffect(() => {
    const loadRSSFeed = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchRSSFeed();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Failed to load RSS feed:", error);
        setBlogPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRSSFeed();
  }, []);

  const filteredPosts = activeFilter === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Tutorials": return <Target className="w-4 h-4" />;
      case "Case Studies": return <TrendingUp className="w-4 h-4" />;
      case "Trends": return <Search className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
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
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-cta hover:bg-cta/90 text-cta-foreground">
                  Subscribe for Weekly Wins
                </Button>
              </div>
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
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
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
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => onPageChange("article-detail")}
                  >
                    Read Full Article
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">Latest Reads</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Actionable insights to help you win in the AI conversation.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter 
                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                  : "border-purple-600 text-purple-600 hover:bg-purple-50"
                }
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, 6).map((post, index) => (
              <Card
                key={index}
                className="bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
                onClick={() => onPageChange("article-detail")}
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            ))}
          </div>

          {filteredPosts.length > 6 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                Load More Posts
              </Button>
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
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
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
