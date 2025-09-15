import ArticleList from "@/components/article-list";
import { useArticles } from "@/hooks/useArticles";

export default function Home() {
  const { articles, status, remove, patch } = useArticles();
  if (status === "loading") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6">
        <div className="h-16 w-16 animate-spin rounded-full border-8 border-gray-300 border-t-gray-600" />
        <p className="mt-4 text-lg text-gray-600">Loading…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center p-6 text-red-600 g-3">
        Failed to load articles, try reloading the page.
      </div>
    );
  }

  return (
    <ArticleList
      articles={articles}
      onUse={(a, amount) =>
        patch(a.id, { count: Math.max(0, a.count - amount) })
      }
      onDelete={(a) => remove(a.id)}
    />
  );
}
