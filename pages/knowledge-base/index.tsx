import type { GetStaticProps } from 'next';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SeoHead } from '../../src/lib/SeoHead';
import { KnowledgeBaseSidebar } from '../../src/components/KnowledgeBaseSidebar';
import {
  fetchStructure,
  fetchAllArticles,
  buildArticleMap,
  processArticleHtml,
  extractDescription,
  type HintoFolder,
} from '../../src/lib/hinto';

const kbArticleStyles = `
  .kb-article-content h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #111827;
    line-height: 1.2;
  }

  .kb-article-content h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    color: #111827;
    line-height: 1.2;
  }

  .kb-article-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: #1f2937;
  }

  .kb-article-content p {
    margin-bottom: 1.25rem;
    line-height: 1.8;
    color: #374151;
    font-size: 1.125rem;
  }

  .kb-article-content ul,
  .kb-article-content ol {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .kb-article-content ul {
    list-style-type: disc;
  }

  .kb-article-content ol {
    list-style-type: decimal;
  }

  .kb-article-content li {
    margin-bottom: 0.625rem;
    color: #374151;
    line-height: 1.8;
    font-size: 1.125rem;
  }

  .kb-article-content strong,
  .kb-article-content b {
    font-weight: 600;
    color: #111827;
  }

  .kb-article-content a {
    color: #2563eb;
    text-decoration: none;
  }

  .kb-article-content a:hover {
    text-decoration: underline;
  }

  .kb-article-content .article-link {
    color: #2563eb;
    text-decoration: none;
    background: #ede9fe;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .kb-article-content .article-link:hover {
    background: #ddd6fe;
    text-decoration: none;
  }

  .kb-article-content .ce-article-link {
    color: #2563eb;
    text-decoration: none;
    background: #ede9fe;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    transition: background 0.2s;
  }

  .kb-article-content .ce-article-link:hover {
    background: #ddd6fe;
    text-decoration: none;
  }

  .kb-article-content img {
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
  }

  .kb-article-content .video-timestamp {
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  }
`;

interface KBIndexProps {
  onPageChange?: (page: string) => void;
  folders: HintoFolder[];
  firstArticle: {
    id: number;
    title: string;
    html: string;
    description: string;
  } | null;
}

export const getStaticProps: GetStaticProps<KBIndexProps> = async () => {
  try {
    const [structureRes, articlesRes] = await Promise.all([
      fetchStructure(),
      fetchAllArticles(),
    ]);

    const { structure } = structureRes;
    const articleMap = buildArticleMap(structure);

    // Find the first article to display by default
    let firstArticle: KBIndexProps['firstArticle'] = null;
    const firstFolder = structure.folders[0];
    if (firstFolder?.articles[0]) {
      const firstStub = firstFolder.articles[0];
      const fullArticle = articlesRes.articles.find((a) => a.id === firstStub.id);
      if (fullArticle) {
        firstArticle = {
          id: fullArticle.id,
          title: fullArticle.title,
          html: processArticleHtml(fullArticle.content.html, articleMap),
          description: extractDescription(fullArticle.content.html),
        };
      }
    }

    return {
      props: {
        folders: structure.folders,
        firstArticle,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error('[knowledge-base] Error fetching data:', error);
    return {
      props: {
        folders: [],
        firstArticle: null,
      },
      revalidate: 60,
    };
  }
};

export default function KnowledgeBaseIndex({ folders, firstArticle }: KBIndexProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SeoHead
        pageId="knowledge-base"
        title={firstArticle ? firstArticle.title : undefined}
        description={firstArticle ? firstArticle.description : undefined}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
                Learn How to <span className="text-purple-600">Master AI</span> Visibility
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Step-by-step guides, tutorials, and best practices to help you optimize your brand's presence in generative AI search.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg max-w-2xl mx-auto border border-purple-200">
                <p className="text-gray-700 leading-relaxed">
                  From onboarding your brand to generating optimized content — everything you need to get started with RankBee.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              {sidebarOpen ? 'Close Menu' : 'Browse Articles'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Sidebar */}
            <aside
              className={`lg:w-72 xl:w-80 shrink-0 ${
                sidebarOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4 bg-gray-50 rounded-xl p-5 lg:bg-transparent lg:p-0">
                <KnowledgeBaseSidebar
                  folders={folders}
                  activeArticleId={firstArticle?.id}
                />
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              {firstArticle ? (
                <div className="prose prose-lg max-w-none">
                  <div
                    className="kb-article-content"
                    dangerouslySetInnerHTML={{ __html: firstArticle.html }}
                  />
                  <style>{kbArticleStyles}</style>
                </div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Knowledge Base
                  </h2>
                  <p className="text-gray-600">
                    No articles available at the moment. Please check back later.
                  </p>
                </div>
              )}
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
