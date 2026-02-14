import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ArticleStub {
  id: number;
  title: string;
}

interface Folder {
  id: number;
  name: string;
  articles: ArticleStub[];
  children: Folder[];
}

interface KnowledgeBaseSidebarProps {
  folders: Folder[];
  activeArticleId?: number;
}

/**
 * Knowledge Base Sidebar — Design Spec
 *
 * Width:       280px (enforced via inline style on <nav> and parent <aside>)
 * Fonts:       text-base (16px) for both folder names and article links
 * Header:      BookOpen icon + "Knowledge Base" label, links to /knowledge-base,
 *              separated from folders by a gray border-bottom
 * Folders:     Bold (font-semibold), ChevronDown when open / ChevronRight when closed,
 *              collapsed by default — only the folder containing the active article expands
 * Alignment:   Both folder buttons and article rows use identical flex layout:
 *              flex items-start gap-2 with a w-4 first element (chevron for folders,
 *              empty div spacer for articles). Identical structure = identical alignment.
 * Articles:    Gray text (gray-500), left-aligned with folder titles via matching flex layout
 * Wrapping:    Long titles wrap to 2–3 lines within 280px (overflowWrap: anywhere)
 * Active:      Purple text + font-medium on the currently viewed article
 */
export function KnowledgeBaseSidebar({ folders, activeArticleId }: KnowledgeBaseSidebarProps) {
  const activeFolderId = findFolderForArticle(folders, activeArticleId);

  return (
    <nav className="w-full overflow-hidden" style={{ width: 280, maxWidth: 280, overflowWrap: 'anywhere' }}>
      {/* Documentation header — links back to KB home */}
      <Link
        href="/knowledge-base"
        className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-200 group"
      >
        <BookOpen className="w-5 h-5 text-purple-600 shrink-0" />
        <span className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
          Knowledge Base
        </span>
      </Link>

      <div className="space-y-1">
        {folders.map((folder) => (
          <FolderSection
            key={folder.id}
            folder={folder}
            activeArticleId={activeArticleId}
            defaultOpen={folder.id === activeFolderId}
          />
        ))}
      </div>
    </nav>
  );
}

function FolderSection({
  folder,
  activeArticleId,
  defaultOpen,
}: {
  folder: Folder;
  activeArticleId?: number;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasArticles = folder.articles.length > 0 || folder.children.length > 0;

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start gap-2 w-full text-left py-2 text-base font-semibold text-gray-900 hover:text-purple-600 transition-colors"
      >
        {hasArticles ? (
          isOpen
            ? <ChevronDown className="w-4 h-4 shrink-0 mt-[4px] text-gray-400" />
            : <ChevronRight className="w-4 h-4 shrink-0 mt-[3px] text-gray-400" />
        ) : (
          <div className="w-4 shrink-0" />
        )}
        <span className="leading-snug break-words min-w-0">{folder.name}</span>
      </button>

      {isOpen && hasArticles && (
        <div className="pb-2 mt-0.5">
          {folder.articles.map((article) => {
            const isActive = article.id === activeArticleId;
            return (
              <div key={article.id} className="flex items-start gap-2 py-1.5">
                <div className="w-4 h-4 shrink-0" />
                <Link
                  href={`/knowledge-base/${article.id}`}
                  className={`text-base leading-relaxed break-words transition-colors ${
                    isActive
                      ? 'text-purple-600 font-medium'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {article.title}
                </Link>
              </div>
            );
          })}

          {folder.children.map((child) => (
            <FolderSection
              key={child.id}
              folder={child}
              activeArticleId={activeArticleId}
              defaultOpen={child.id === findFolderForArticle([child], activeArticleId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function findFolderForArticle(folders: Folder[], articleId?: number): number | null {
  if (!articleId) return null;
  for (const folder of folders) {
    if (folder.articles.some((a) => a.id === articleId)) {
      return folder.id;
    }
    const childResult = findFolderForArticle(folder.children, articleId);
    if (childResult) return childResult;
  }
  return null;
}
