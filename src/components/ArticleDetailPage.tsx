import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, ArrowLeft, Share2, BookmarkIcon, Target, TrendingUp, Search, Users } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
  content: string;
}

interface ArticleDetailPageProps {
  onPageChange: (page: string) => void;
  article?: Article;
}

const defaultArticles: Record<string, Article> = {
  "how-geo-tactics-boosted": {
    id: "how-geo-tactics-boosted",
    title: "How GEO Tactics Boosted a Startup's AI Rankings 40% in 2 Weeks",
    summary: "Ex-Amazon SEO tips on prompts that stick. Learn the exact strategies we used to help a fintech startup dominate AI responses.",
    date: "Oct 1, 2025",
    readTime: "8 min read",
    category: "Case Studies",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "Sarah Chen",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>The Challenge</h2>
      <p>When a fintech startup approached us in August 2025, they were invisible in AI search results. Their competitors dominated the conversation when users asked ChatGPT and Claude about payment solutions. Despite having solid products and competitive pricing, they couldn't get mentioned first.</p>
      
      <h2>Our Approach: GEO Tactics</h2>
      <p>We implemented a comprehensive strategy focused on three core pillars:</p>
      
      <h3>1. Prompt Optimization</h3>
      <p>The first step was understanding how their target audience formulated questions to AI systems. We analyzed search patterns and crafted content that naturally aligned with the prompts users typically ask. By structuring their messaging around these queries, we increased the likelihood of their brand appearing in top responses.</p>
      
      <h3>2. Entity Recognition</h3>
      <p>We ensured their brand was properly recognized by AI models by building thought leadership content that established clear associations with key industry concepts. This helped AI systems understand their position in the competitive landscape.</p>
      
      <h3>3. Visibility Optimization</h3>
      <p>We optimized their online presence across multiple channels to ensure consistent messaging and maximum discoverability. This included website optimization, content strategy, and strategic partnerships.</p>
      
      <h2>The Results</h2>
      <p>Within two weeks of implementation:</p>
      <ul>
        <li>40% increase in AI search mentions</li>
        <li>First-page appearance in 89% of relevant AI conversations</li>
        <li>3.2x increase in qualified leads from AI sources</li>
        <li>Brand recognition scores up 156% in target demographic</li>
      </ul>
      
      <h2>Key Takeaways</h2>
      <p>The most important lesson from this case study is that AI search requires a fundamentally different approach than traditional SEO. AI systems are looking for authority, relevance, and clear positioning. By aligning your brand message with how people actually ask AI systems questions, you can dramatically improve your visibility.</p>
      
      <p>The startup we worked with understood that the future of search is conversational. They invested in the right strategies at the right time, and the results speak for themselves.</p>
      
      <h2>Ready to Transform Your AI Presence?</h2>
      <p>If you're looking to improve your visibility in AI search results, we're here to help. Our team has the strategies, the experience, and the track record to drive real results.</p>
    `
  },
  "ai-search-revolution": {
    id: "ai-search-revolution",
    title: "The AI Search Revolution: What Marketers Need to Know",
    summary: "ChatGPT and Claude are changing how customers discover brands. Here's your survival guide for the AI-first world.",
    date: "Sep 28, 2025",
    readTime: "12 min read",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "Marcus Johnson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>The Shift Is Real</h2>
      <p>For decades, Google has been the undisputed king of search. But something fundamental is changing. More users are turning to AI-powered conversational tools like ChatGPT, Claude, and others to discover information, find products, and make decisions.</p>
      
      <p>This isn't just a passing trend. This is a structural shift in how humans interact with information. And marketers who don't adapt will be left behind.</p>
      
      <h2>Why AI Search Is Different</h2>
      <p>Traditional search is about keywords and links. AI search is about understanding intent, context, and authority. When someone asks ChatGPT for a product recommendation, the AI doesn't just match keywords. It evaluates trustworthiness, relevance, and positioning.</p>
      
      <h2>The New Rules of Visibility</h2>
      <p>In the AI era, visibility depends on:</p>
      <ul>
        <li><strong>Thought Leadership:</strong> Being recognized as an expert in your space</li>
        <li><strong>Clear Positioning:</strong> Having a distinct, understandable market position</li>
        <li><strong>Authority Signals:</strong> Demonstrated expertise and track record</li>
        <li><strong>Relevance:</strong> Alignment with how people actually ask questions</li>
      </ul>
      
      <h2>What Marketers Need to Do</h2>
      <p>The path forward is clear: You need a dual strategy. Don't abandon traditional SEO, but simultaneously build your AI search presence.</p>
      
      <p>This means optimizing for conversational queries, building thought leadership content, and ensuring your brand is visible to AI systems as a trustworthy authority.</p>
      
      <h2>The Bottom Line</h2>
      <p>The AI search revolution isn't coming. It's here. The question isn't whether to adapt, but how quickly you can move. Those who move fastest will capture disproportionate share of attention and revenue in this new era.</p>
    `
  },
  "5-prompt-hacks": {
    id: "5-prompt-hacks",
    title: "5 Prompt Hacks That Made Our Client #1 in AI Responses",
    summary: "Step-by-step tutorial on crafting prompts that get your brand mentioned first. Includes templates you can use today.",
    date: "Sep 25, 2025",
    readTime: "6 min read",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "Alex Rivera",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>The Psychology of AI Responses</h2>
      <p>AI systems like ChatGPT don't randomly order their responses. They rank suggestions based on relevance, authority, and training data patterns. By understanding these patterns, we can craft our brand presence in ways that naturally position us first in the consideration set.</p>
      
      <h2>Hack #1: The Authority Hook</h2>
      <p>Start your content with clear, authoritative statements about your unique position. AI systems recognize and prioritize content that establishes expertise. Instead of "We offer payment solutions," say "We pioneered the subscription payment model for B2B SaaS."</p>
      
      <h2>Hack #2: The Problem-Solution Structure</h2>
      <p>When AI systems process information, they look for clear problem-solution relationships. Structure your content to explicitly address specific problems your ideal customer faces. This increases the likelihood of being mentioned when users ask about those problems.</p>
      
      <h2>Hack #3: The Specificity Strategy</h2>
      <p>Generic claims get lost. Specific claims stand out. Instead of "Improve your visibility," say "Improve your AI search visibility by 40% in 2 weeks." Specificity signals credibility to both users and AI systems.</p>
      
      <h2>Hack #4: The Social Proof Technique</h2>
      <p>Include concrete results from real clients. AI systems weight social proof heavily when ranking recommendations. Third-party validation is the strongest signal you can send.</p>
      
      <h2>Hack #5: The Consistency Method</h2>
      <p>Build your authority across multiple platforms with consistent messaging. When AI systems see the same positioning across different sources, it reinforces your credibility and increases the likelihood of being mentioned.</p>
      
      <h2>Implementation Checklist</h2>
      <p>Ready to implement these hacks? Here's your step-by-step checklist to get started today.</p>
    `
  },
  "traditional-seo-dead": {
    id: "traditional-seo-dead",
    title: "Why Traditional SEO Is Dead (And What Replaces It)",
    summary: "The uncomfortable truth about Google's declining influence and how AI search is reshaping discovery.",
    date: "Sep 22, 2025",
    readTime: "10 min read",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "Emma Wilson",
    authorImage: "https://images.unsplash.com/photo-1517841905240-1c028dd4c5f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>The Decline of Google's Monopoly</h2>
      <p>For the first time in its 25-year history, Google's dominance in search is being challenged. Not by another search engine, but by conversational AI. Users are increasingly turning to ChatGPT and Claude instead of Google for answers, recommendations, and research.</p>
      
      <h2>What's Changing</h2>
      <p>Traditional SEO focuses on ranking for keywords in search results. But in the AI-first world, there are no search results. There's a single authoritative answer delivered conversationally. You either get mentioned in that answer or you don't.</p>
      
      <h2>The New Ranking Factors</h2>
      <p>Instead of backlinks and keyword density, AI systems evaluate:</p>
      <ul>
        <li>Authority and expertise signals</li>
        <li>Alignment with user intent</li>
        <li>Consistency of positioning across sources</li>
        <li>Clarity and credibility of claims</li>
      </ul>
      
      <h2>Does This Mean Abandon SEO?</h2>
      <p>Not entirely. A balanced approach considers both. But the weight is shifting. Smart marketers are already building their AI visibility strategy in parallel to their SEO efforts.</p>
      
      <h2>The Future of Discovery</h2>
      <p>The future isn't a search engine that returns a list of results. The future is a conversational AI that directly answers your question with the most relevant, trustworthy information available. Being in that answer is everything.</p>
    `
  },
  "restaurant-chain-visibility": {
    id: "restaurant-chain-visibility",
    title: "Restaurant Chain Sees 200% Visibility Boost Using GAIO",
    summary: "How a regional Italian chain went from invisible to indispensable in AI recommendations. The strategy that changed everything.",
    date: "Sep 18, 2025",
    readTime: "7 min read",
    category: "Case Studies",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "David Martinez",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>A Restaurant Chain's Invisible Problem</h2>
      <p>Vittorio's Italian Kitchen had been serving authentic Italian cuisine for over 20 years. With 14 locations across the Midwest, they had loyal customers and decent foot traffic. But when people asked AI assistants for restaurant recommendations, Vittorio's wasn't mentioned.</p>
      
      <h2>The Implementation</h2>
      <p>We worked with Vittorio's to implement a comprehensive GAIO (Generative AI Optimization) strategy focused on getting them mentioned in AI recommendations for Italian restaurants, fine dining, and special occasions.</p>
      
      <h2>Key Strategies</h2>
      <ul>
        <li>Structured data optimization for consistent AI recognition</li>
        <li>Thought leadership content from the head chef</li>
        <li>Strategic partnerships with food influencers</li>
        <li>Review generation and management</li>
        <li>Brand positioning across multiple platforms</li>
      </ul>
      
      <h2>The Results</h2>
      <p>After 90 days of implementation:</p>
      <ul>
        <li>200% increase in mentions in AI restaurant recommendations</li>
        <li>Featured in top 3 suggestions for Italian cuisine in their region</li>
        <li>85% increase in reservations through AI referrals</li>
        <li>Customer acquisition cost dropped 34%</li>
      </ul>
      
      <h2>The Lesson</h2>
      <p>Even traditional businesses in competitive local markets can dominate AI recommendations. The key is strategic positioning and consistent execution.</p>
    `
  },
  "building-ai-strategy": {
    id: "building-ai-strategy",
    title: "Building Your First AI Optimization Strategy",
    summary: "Complete beginner's guide to GAIO. Everything you need to know to start tracking and improving your AI presence.",
    date: "Sep 15, 2025",
    readTime: "15 min read",
    category: "Tutorials",
    image: "https://images.unsplash.com/photo-1638342863994-ae4eee256688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxibG9nJTIwd3JpdGluZyUyMGNvbnRlbnR8ZW58MXx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    author: "Lisa Park",
    authorImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fHwxNzU5ODQyNDg1fDA&ixlib=rb-4.1.0&q=80&w=400",
    content: `
      <h2>Why You Need an AI Strategy</h2>
      <p>If you haven't started thinking about how to position your brand for AI discovery, you're already behind. The good news? It's not too late. This guide will walk you through everything you need to know to build your first AI optimization strategy.</p>
      
      <h2>Step 1: Audit Your Current Visibility</h2>
      <p>Start by understanding where you stand. Ask ChatGPT and Claude questions that customers might ask about your products or services. Are you mentioned? If so, how? This baseline will help you measure progress.</p>
      
      <h2>Step 2: Identify Your Target Queries</h2>
      <p>Which questions do you want to be mentioned in? Create a list of 10-20 questions your ideal customers might ask AI systems. These become your target opportunities.</p>
      
      <h2>Step 3: Build Your Authority</h2>
      <p>AI systems respect authority. Build yours through:</p>
      <ul>
        <li>Thought leadership content</li>
        <li>Case studies with quantified results</li>
        <li>Expert positioning</li>
        <li>Third-party validation</li>
      </ul>
      
      <h2>Step 4: Optimize Your Positioning</h2>
      <p>Make sure your brand message is clear, specific, and aligned with how you want to be positioned in AI recommendations. Consistency across platforms is key.</p>
      
      <h2>Step 5: Measure and Iterate</h2>
      <p>Track your progress over time. Monitor which queries mention you, how you're positioned, and what's working. Adjust your strategy based on real data.</p>
      
      <h2>Your First Week Checklist</h2>
      <p>Here's what you should complete in your first week to get started on the right path.</p>
    `
  }
};

export function ArticleDetailPage({ onPageChange, article }: ArticleDetailPageProps) {
  const [email, setEmail] = useState("");
  
  const displayArticle = article || (Object.values(defaultArticles)[0] as Article);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Tutorials": return <Target className="w-4 h-4" />;
      case "Case Studies": return <TrendingUp className="w-4 h-4" />;
      case "Trends": return <Search className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const relatedArticles = Object.values(defaultArticles)
    .filter(a => a.id !== displayArticle.id && a.category === displayArticle.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Back */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onPageChange("blog")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
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
            {getCategoryIcon(displayArticle.category)}
            <span className="ml-2">{displayArticle.category}</span>
          </Badge>
          
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900 leading-tight">
            {displayArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <img
                src={displayArticle.authorImage}
                alt={displayArticle.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{displayArticle.author}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span>{displayArticle.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{displayArticle.readTime}</span>
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
            src={displayArticle.image}
            alt={displayArticle.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="text-gray-700 leading-relaxed">
            <p className="text-xl text-gray-600 mb-8 italic">
              {displayArticle.summary}
            </p>
            
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: displayArticle.content
                  .split('\n')
                  .filter(line => line.trim())
                  .map(line => {
                    if (line.startsWith('<h2>')) return line;
                    if (line.startsWith('<h3>')) return line;
                    if (line.startsWith('<p>')) return line;
                    if (line.startsWith('<ul>')) return line;
                    if (line.startsWith('<li>')) return line;
                    return `<p>${line}</p>`;
                  })
                  .join('')
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
              src={displayArticle.authorImage}
              alt={displayArticle.author}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
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
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <Card
                  key={article.id}
                  className="bg-white hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => window.location.hash = `#/article/${article.id}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
