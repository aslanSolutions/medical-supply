import { useEffect, useRef, useState } from "react";
import {
  listArticles,
  createArticle,
  patchArticle,
  deleteArticle,
  getArticleById,
} from "@/api/articles";
import { getArticleUsage } from "@/api/articleUsage";
import type { Article } from "@/types/article";
import type { ArticleUsage } from "@/types/articleUsage";

type Status = "idle" | "loading" | "success" | "error";

const memCache = {
  list: null as Article[] | null,
  byId: new Map<string | number, Article>(),
};

export function useArticles() {
  const [data, setData] = useState<Article[] | null>(memCache.list);
  const [status, setStatus] = useState<Status>(
    memCache.list ? "success" : "idle"
  );
  const inFlight = useRef(false);

  useEffect(() => {
    if (data || inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    listArticles()
      .then((res) => {
        memCache.list = res;
        res.forEach((a) => memCache.byId.set(a.id, a));
        setData(res);
        setStatus("success");
      })
      .catch(() => setStatus("error"))
      .finally(() => {
        inFlight.current = false;
      });
  }, [data]);

  const create = async (payload: Omit<Article, "id">) => {
    const created = await createArticle(payload);
    memCache.list = (memCache.list ?? []).concat(created);
    memCache.byId.set(created.id, created);
    setData(memCache.list);
    return created;
  };

  const getArticle = async (id: Article["id"]): Promise<Article | null> => {
    const res = await getArticleById(id);
    return res ?? null;
  };

  const patch = async (id: Article["id"], payload: Partial<Article>) => {
    const prev = memCache.byId.get(id);
    if (prev) {
      const optimistic = { ...prev, ...payload };
      memCache.byId.set(id, optimistic);
      memCache.list = (memCache.list ?? []).map((a) =>
        a.id === id ? optimistic : a
      );
      setData(memCache.list);
    }
    const updated = await patchArticle(id, payload);
    memCache.byId.set(id, updated);
    memCache.list = (memCache.list ?? []).map((a) =>
      a.id === id ? updated : a
    );
    setData(memCache.list);
    return updated;
  };

  const remove = async (id: Article["id"]) => {
    const prevList = memCache.list ?? [];
    memCache.list = prevList.filter((a) => a.id !== id);
    memCache.byId.delete(id);
    setData(memCache.list);
    try {
      await deleteArticle(id);
    } catch (e) {
      // rollback on error
      memCache.list = prevList;
      if (!prevList.find((a) => a.id === id)) memCache.byId.delete(id);
      setData(memCache.list);
      throw e;
    }
  };

  const getArticleStatistic = async (
    id: Article["id"]
  ): Promise<ArticleUsage[] | null> => {
    const res = await getArticleUsage(id);
    return res ?? null;
  };

  return {
    articles: data ?? [],
    status,
    refresh: () => ((memCache.list = null), setData(null)),
    create,
    patch,
    remove,
    getArticle,
    getArticleStatistic,
  };
}
