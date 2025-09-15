export interface Article {
  id: string;
  name: string;
  unit: string;
  count: number;
  icon?: string;
  description?: string;
  price?: number;
  category?: string;
  supplier?: string;
}

export type Status = "High" | "Low" | "Critical";
