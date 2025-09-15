import { http } from "./client";
import type { ArticleUsage } from "@/types/articleUsage";

export async function getArticleUsage(
  id: string | number
): Promise<ArticleUsage[]> {
  const { data } = await http.get<ArticleUsage[]>(`/usage?articleId=${id}`);
  return data;
}
