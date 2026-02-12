import { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
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

export function KnowledgeBaseSidebar({ folders, activeArticleId }: KnowledgeBaseSidebarProps) {
  // Determine which folder contains the active article so it starts expanded
  const activeFolderId = findFolderForArticle(folders, activeArticleId);

  return (
    <nav className="w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Articles</h2>
      <div className="space-y-1">
        {folders.map((folder) => (
          <FolderSection
            key={folder.id}
            folder={folder}
            activeArticleId={activeArticleId}
            defaultOpen={folder.id === activeFolderId || !activeArticleId}
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

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left px-2 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
      >
        <span className="flex-1 pr-2">{folder.name}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="ml-2 border-l border-gray-200 pl-2 space-y-0.5 mt-0.5">
          {folder.articles.map((article) => {
            const isActive = article.id === activeArticleId;
            return (
              <Link
                key={article.id}
                href={`/knowledge-base/${article.id}`}
                className={`flex items-start gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-purple-700 bg-purple-50 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{article.title}</span>
              </Link>
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
