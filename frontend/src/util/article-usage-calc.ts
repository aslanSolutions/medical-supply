import type { TransformedUsage } from "@/types/articleUsage";


export function calculateWeekChange(data: TransformedUsage[]): number {
  if (!data || data.length === 0) return 0;

  const currentWeekTotal = data.reduce((sum, d) => sum + (d.v1 ?? 0), 0);
  const previousWeekTotal = data.reduce((sum, d) => sum + (d.v2 ?? 0), 0);

  if (previousWeekTotal === 0) return 100; 

  const change = ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  return Math.round(change); 
}
