import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, FileText, Menu, X } from 'lucide-react';
import { SeoHead } from '../../src/lib/SeoHead';
import { KnowledgeBaseSidebar } from '../../src/components/KnowledgeBaseSidebar';
import {
  fetchStructure,
  type HintoFolder,
  type HintoArticleStub,
} from '../../src/lib/hinto';

const MAX_VISIBLE_ARTICLES = 5;

interface KBIndexProps {
  onPageChange?: (page: string) => void;
  folders: HintoFolder[];
  rootArticles: HintoArticleStub[];
}

export const getStaticProps: GetStaticProps<KBIndexProps> = async () => {
  try {
    const structureRes = await fetchStructure();

    return {
      props: {
        folders: structureRes.structure.folders,
        rootArticles: structureRes.structure.rootArticles || [],
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error('[knowledge-base] Error fetching data:', error);
    return {
      props: {
        folders: [],
        rootArticles: [],
      },
      revalidate: 60,
    };
  }
};

function countArticles(folder: HintoFolder): number {
  let count = folder.articles.length;
  for (const child of folder.children) {
    count += countArticles(child);
  }
  return count;
}

function collectAllArticles(folder: HintoFolder): HintoArticleStub[] {
  const articles: HintoArticleStub[] = [...folder.articles];
  for (const child of folder.children) {
    articles.push(...collectAllArticles(child));
  }
  return articles;
}

export default function KnowledgeBaseIndex({ folders, rootArticles }: KBIndexProps) {
  // Build the display list: real folders + a virtual folder for root-level articles
  const allFolders: HintoFolder[] = rootArticles.length > 0
    ? [...folders, { id: -1, name: 'General', articles: rootArticles, children: [] }]
    : folders;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SeoHead pageId="knowledge-base" />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center">
              <div className="inline-block bg-purple-600 text-white text-sm font-semibold tracking-wider uppercase px-6 py-2 rounded-full mb-8">
                Knowledge Base
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6 text-gray-900 max-w-4xl mx-auto leading-tight font-bold">
                Learn How to <span className="text-purple-600">Master AI</span> Visibility
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Step-by-step guides, tutorials, and best practices to help you optimize your brand's presence in generative AI search.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-400/20 pointer-events-none"></div>
        </section>

        {/* Main Content with Sidebar + Card Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Mobile sidebar toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              {sidebarOpen ? 'Close Menu' : 'Browse Topics'}
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
                <KnowledgeBaseSidebar folders={folders} />
              </div>
            </aside>

            {/* Card Grid */}
            <main className="flex-1 min-w-0">
              {allFolders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allFolders.map((folder) => (
                    <FolderCard key={folder.id} folder={folder} />
                  ))}
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

/**
 * FolderCard — Design Spec
 *
 * Inspired by the blog card design (shadow, generous padding, rounded-2xl)
 * combined with Hinto's docs content layout (spaced article rows, subtle icons).
 * Typography matches the blog: bold 18px titles, 14px article links.
 * Cards use items-start grid so they don't stretch to match row height.
 */
function FolderCard({ folder }: { folder: HintoFolder }) {
  const [expanded, setExpanded] = useState(false);
  const totalArticles = collectAllArticles(folder);
  const visibleArticles = expanded ? totalArticles : totalArticles.slice(0, MAX_VISIBLE_ARTICLES);
  const hiddenCount = totalArticles.length - MAX_VISIBLE_ARTICLES;
  const articleCount = countArticles(folder);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Card header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-semibold text-gray-900 leading-snug" style={{ fontWeight: 600 }}>
          {folder.name}
        </h2>
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full whitespace-nowrap ml-3">
          {articleCount} {articleCount === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" style={{ marginBottom: 40 }} />

      {/* Article list */}
      <ul className="space-y-6">
        {visibleArticles.map((article) => (
          <li key={article.id}>
            <Link
              href={`/knowledge-base/${article.id}`}
              className="flex items-start gap-3 text-base text-gray-600 hover:text-purple-700 transition-colors group"
            >
              <FileText className="w-[18px] h-[18px] shrink-0 mt-[3px] text-gray-300 group-hover:text-purple-500 transition-colors" />
              <span className="leading-snug">{article.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {!expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-6 flex items-center gap-1.5 text-base font-medium text-purple-600 hover:text-purple-700 transition-colors"
        >
          Show {hiddenCount} more
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
