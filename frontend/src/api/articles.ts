import { http } from "./client";
import type { Article } from "@/types/article";

export type CreateArticleDto = Omit<Article, "id">;
export type UpdateArticleDto = Partial<Omit<Article, "id">>;

export async function listArticles(): Promise<Article[]> {
  const { data } = await http.get<Article[]>("/articles");
  return data;
}

export async function getArticleById(id: string | number): Promise<Article> {
  const { data } = await http.get<Article>(`/articles/${id}`);
  return data;
}

export async function createArticle(
  payload: CreateArticleDto
): Promise<Article> {
  const { data } = await http.post<Article>("/articles", payload);
  return data;
}

export async function patchArticle(
  id: string | number,
  payload: UpdateArticleDto
): Promise<Article> {
  const { data } = await http.patch<Article>(`/articles/${id}`, payload);
  return data;
}

export async function deleteArticle(id: string | number): Promise<void> {
  await http.delete(`/articles/${id}`);
}
