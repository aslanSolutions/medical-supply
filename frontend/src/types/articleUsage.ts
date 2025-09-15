export interface ArticleUsage {
    usageDate: string;
    used: number;
}

export type TransformedUsage = {
  name: string;
  v1?: number;
  v2?: number;
};