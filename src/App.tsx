import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { PricingPage } from "./components/PricingPage";
import { BlogPage } from "./components/BlogPage";
import { ArticleDetailPage } from "./components/ArticleDetailPage";
import { DemoPage } from "./components/DemoPage";
import { ContactPage } from "./components/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />;
      case "about":
        return <AboutPage onPageChange={setCurrentPage} />;
      case "pricing":
        return <PricingPage onPageChange={setCurrentPage} />;
      case "blog":
        return <BlogPage onPageChange={setCurrentPage} onSelectArticle={setSelectedArticleId} />;
      case "article-detail":
        return <ArticleDetailPage onPageChange={setCurrentPage} />;
      case "demo":
        return <DemoPage onPageChange={setCurrentPage} />;
      case "contact":
        return <ContactPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onPageChange={setCurrentPage} />
    </div>
  );
}
