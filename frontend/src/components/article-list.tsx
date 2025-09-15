import { useEffect, useMemo, useState } from "react";
import type { Article } from "@/types/article";
import alarm from "@/assets/alarm.gif";
import { computeStatus, getStatusClass } from "@/util/article-status-mapper";
import { getArticlelIcon } from "@/util/icon-mapper";
import Glyph from "@/components/common/glyph";
import { useNavigate } from "react-router-dom";

interface ArticleListProps {
  articles: Article[];
  onUse?: (article: Article, amount: number) => void;
  onDelete?: (article: Article) => void;
}

export default function ArticleList({
  articles,
  onUse,
  onDelete,
}: ArticleListProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<keyof Article>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null);
  const [amount, setAmount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  const openUseModal = (article: Article) => {
    setSelectedArticle(article);
    setAmount(1);
    setIsModalOpen(true);
  };

  const closeUseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const confirmUse = () => {
    if (!selectedArticle) return;
    onUse?.(selectedArticle, amount);
    closeUseModal();
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeUseModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  const filtered = useMemo(() => {
    let rows = articles.filter((p) =>
      `${p.name} ${p.unit}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sortDir) {
      const dir = sortDir === "asc" ? 1 : -1;
      rows = [...rows].sort((a, b) => {
        const va = a[sortBy];
        const vb = b[sortBy];
        if (typeof va === "number" && typeof vb === "number")
          return (va - vb) * dir;
        return String(va).localeCompare(String(vb)) * dir;
      });
    }
    return rows;
  }, [articles, query, sortBy, sortDir]);

  const toggleSort = (col: keyof Article) => {
    if (sortBy !== col) {
      setSortBy(col);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
    }
  };

  const renderSortIcon = (col: keyof Article) => {
    const isActive = sortBy === col && sortDir !== null;
    const icon =
      sortBy === col && sortDir === "desc"
        ? "fi fi-br-sort-amount-down-alt"
        : "fi fi-br-sort-amount-up-alt";

    const color = isActive ? "text-blue-600" : "text-gray-300";

    return <i className={`${icon} ${color}`} aria-hidden="true" />;
  };

  const SortableTh = ({
    col,
    children,
  }: {
    col: keyof Article;
    children: React.ReactNode;
  }) => (
    <th
      className="px-6 py-3 cursor-pointer select-none"
      onClick={() => toggleSort(col)}
      aria-sort={
        sortBy === col
          ? sortDir === "asc"
            ? "ascending"
            : sortDir === "desc"
            ? "descending"
            : "none"
          : "none"
      }
      scope="col"
    >
      <span className="inline-flex items-center gap-2">
        {children}
        {renderSortIcon(col)}
      </span>
    </th>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20">
      <div className="pt-6 pb-4">
        <div className="relative w-full">
          <i className="fi fi-br-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 "></i>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or unit..."
            className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/*mobile view*/}
      <div className="space-y-3 md:hidden">
        {filtered.map((p) => {
          const status = computeStatus(p.count);
          return (
            <article
              key={p.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Glyph>{getArticlelIcon(p.icon)}</Glyph>
                  <h3 className="truncate font-semibold text-gray-900">
                    {p.name}
                  </h3>
                </div>

                <span
                  className={`gap-1 justify-center inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${getStatusClass(
                    status
                  )}`}
                >
                  {status === "Critical" && (
                    <img src={alarm} alt="" width={14} height={14} />
                  )}
                  {status}
                </span>
              </header>

              {/* Stats */}
              <section className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-center">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500">
                    Stock
                  </div>
                  <div className="mt-0.5 text-base font-semibold text-gray-900">
                    {p.count}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-center">
                  <div className="text-[10px] uppercase tracking-wide text-gray-500">
                    Unit
                  </div>
                  <div className="mt-0.5 text-base font-semibold text-gray-900">
                    {p.unit}
                  </div>
                </div>
              </section>

              <footer className="mt-3 flex gap-2">
                <button
                  className="flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white bg-[#13a4ec] hover:bg-[#1e6d94] active:bg-blue-800"
                  onClick={() => openUseModal(p)}
                >
                  Use
                </button>

                <button
                  className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 active:bg-red-100"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      onDelete?.(p);
                    }
                  }}
                >
                  <i className="fi fi-br-trash"></i>
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center rounded-md w-12 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => navigate(`/articles/${p.id}`)}
                >
                  <i className="fi fi-br-arrow-small-right"></i>
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      {/*desktop view*/}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
              <tr>
                <SortableTh col="name">Name</SortableTh>
                <SortableTh col="count">Stock</SortableTh>
                <SortableTh col="unit">Unit</SortableTh>
                <th className="px-6 py-3 text-center">Stock status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, idx) => {
                const status = computeStatus(p.count);
                return (
                  <tr
                    key={p.id}
                    className={idx % 2 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center">
                        <Glyph>{getArticlelIcon(p.icon)}</Glyph>
                        <span className="font-medium text-gray-900">
                          {p.name}
                        </span>
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center text-gray-700">
                      {p.count}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {p.unit}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`gap-1 justify-center inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${getStatusClass(
                          status
                        )}`}
                      >
                        {status === "Critical" && (
                          <img src={alarm} alt="" width={16} />
                        )}
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="cursor-pointer flex items-center justify-center rounded-md h-8 w-8 bg-[#13a4ec] hover:bg-[#1e6d94] text-white  transition-colors"
                          onClick={() => openUseModal(p)}
                        >
                          Use
                        </button>
                        <button
                          className="cursor-pointer flex items-center justify-center rounded-md h-8 w-8 bg-gray-100 hover:bg-gray-200 transition-colors"
                          onClick={() => navigate(`/articles/${p.id}`)}
                        >
                          <i className="fi fi-br-arrow-small-right"></i>
                        </button>

                        <button
                          className=" cursor-pointer flex items-center justify-center rounded-md h-8 w-8 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this item?"
                              )
                            ) {
                              onDelete?.(p);
                            }
                          }}
                        >
                          <i className="fi fi-br-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No items match your search.
          </div>
        )}
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeUseModal}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="w-full max-w-sm md:max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Use {selectedArticle?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Choose the amount to deduct from stock.
                </p>
              </header>
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  className="flex items-center justify-center rounded-md w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors text-xl font-bold leading-[1] cursor-pointer"
                  onClick={() => {
                    setWarning("");
                    setAmount((a) => Math.max(1, a - 1));
                  }}
                >
                  <i className="fi fi-br-minus-small"></i>
                </button>

                <input
                  min={1}
                  max={selectedArticle?.count}
                  value={amount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (selectedArticle && value > selectedArticle.count) {
                      setAmount(selectedArticle.count);
                      setWarning("Not enough in stock");
                    } else {
                      setAmount(Math.max(1, value));
                      setWarning("");
                    }
                  }}
                  className="w-16 h-9 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-0"
                />

                <button
                  className="flex items-center justify-center rounded-md w-8 h-8 bg-gray-100 hover:bg-gray-200 transition-colors text-xl font-bold leading-[1] cursor-pointer"
                  onClick={() => {
                    if (selectedArticle && amount >= selectedArticle.count) {
                      setWarning("Not enough in stock");
                      setAmount(selectedArticle.count);
                    } else {
                      setAmount((a) => a + 1);
                      setWarning("");
                    }
                  }}
                >
                  <i className="fi fi-br-plus-small"></i>
                </button>
              </div>
              {warning && (
                <p className="text-sm text-red-600 text-center">{warning}</p>
              )}
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  className="cursor-pointer px-4 h-9 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  onClick={closeUseModal}
                >
                  Cancel
                </button>

                <button
                  className="cursor-pointer flex items-center gap-2 px-4 h-9 rounded-md bg-[#13a4ec] hover:bg-[#1e6d94] text-white transition-colors disabled:bg-gray-300
                          disabled:text-gray-500
                            disabled:cursor-not-allowed
                          disabled:hover:bg-gray-300"
                  onClick={confirmUse}
                  disabled={
                    !!(selectedArticle && amount > selectedArticle.count)
                  }
                >
                  <i className="fi fi-rr-checkbox"></i>
                  Use
                </button>
              </div>{" "}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
