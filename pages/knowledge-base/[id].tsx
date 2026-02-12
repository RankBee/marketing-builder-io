import type { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SeoHead } from '../../src/lib/SeoHead';
import { KnowledgeBaseSidebar } from '../../src/components/KnowledgeBaseSidebar';
import { getSiteUrl } from '../../src/lib/page-seo';
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

interface KBArticleProps {
  onPageChange?: (page: string) => void;
  folders: HintoFolder[];
  article: {
    id: number;
    title: string;
    html: string;
    description: string;
    updatedAt: string;
    folderName: string;
  } | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const structureRes = await fetchStructure();
    const paths: { params: { id: string } }[] = [];

    function collectIds(folders: HintoFolder[]) {
      for (const folder of folders) {
        for (const article of folder.articles) {
          paths.push({ params: { id: String(article.id) } });
        }
        collectIds(folder.children);
      }
    }

    collectIds(structureRes.structure.folders);

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('[knowledge-base] Error fetching paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<KBArticleProps> = async ({ params }) => {
  const id = parseInt(params?.id as string, 10);

  if (isNaN(id)) {
    return { notFound: true };
  }

  try {
    const [structureRes, articlesRes] = await Promise.all([
      fetchStructure(),
      fetchAllArticles(),
    ]);

    const { structure } = structureRes;
    const articleMap = buildArticleMap(structure);
    const fullArticle = articlesRes.articles.find((a) => a.id === id);

    if (!fullArticle) {
      return { notFound: true };
    }

    return {
      props: {
        folders: structure.folders,
        article: {
          id: fullArticle.id,
          title: fullArticle.title,
          html: processArticleHtml(fullArticle.content.html, articleMap),
          description: extractDescription(fullArticle.content.html),
          updatedAt: fullArticle.updated_at,
          folderName: fullArticle.folder_name,
        },
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error(`[knowledge-base] Error fetching article ${id}:`, error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

export default function KnowledgeBaseArticle({ folders, article }: KBArticleProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const siteUrl = getSiteUrl();

  if (!article) {
    return (
      <>
        <SeoHead pageId="knowledge-base" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600">This article could not be found.</p>
        </div>
      </>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "RankBee" },
    publisher: {
      "@type": "Organization",
      name: "RankBee",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/bee-logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/knowledge-base/${article.id}`,
    },
  };

  return (
    <>
      <SeoHead
        pageId="knowledge-base"
        title={article.title}
        description={article.description}
        canonical={`${siteUrl}/knowledge-base/${article.id}`}
        jsonLd={jsonLd}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center">
              {/* Breadcrumb */}
              <nav className="mb-6 text-sm text-gray-500">
                <a href="/knowledge-base" className="hover:text-purple-600 transition-colors">
                  Knowledge Base
                </a>
                <span className="mx-2">/</span>
                <span className="text-purple-600 font-medium">{article.folderName}</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 text-gray-900 max-w-4xl mx-auto leading-tight font-bold">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {article.description}
              </p>
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
                  activeArticleId={article.id}
                />
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <div className="prose prose-lg max-w-none">
                <div
                  className="kb-article-content"
                  dangerouslySetInnerHTML={{ __html: article.html }}
                />
                <style>{kbArticleStyles}</style>
              </div>
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
