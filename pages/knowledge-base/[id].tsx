import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
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
import { kbArticleStyles } from '../../src/lib/kb-styles';

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

    // Also include root-level articles (not inside any folder)
    for (const article of structureRes.structure.rootArticles || []) {
      paths.push({ params: { id: String(article.id) } });
    }

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
              className={`shrink-0 ${
                sidebarOpen ? 'block' : 'hidden lg:block'
              }`}
              style={{ width: 280, maxWidth: 280 }}
            >
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto rounded-xl p-5 lg:p-0">
                <KnowledgeBaseSidebar
                  folders={folders}
                  activeArticleId={article.id}
                />
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <Head>
                <style dangerouslySetInnerHTML={{ __html: kbArticleStyles }} />
              </Head>
              <div className="prose prose-lg max-w-none">
                <div
                  className="kb-article-content"
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{ __html: article.html }}
                />
              </div>
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
