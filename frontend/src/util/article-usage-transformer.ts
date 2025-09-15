import type { TransformedUsage, ArticleUsage } from "@/types/articleUsage";

export function transformUsageData(data: ArticleUsage[]): TransformedUsage[] {
  if (!data || data.length === 0) return [];

  const sorted = [...data].sort(
    (a, b) => new Date(a.usageDate).getTime() - new Date(b.usageDate).getTime()
  );

  const currentWeek = sorted.slice(-7); // last 7 days
  const previousWeek = sorted.slice(-14, -7); // the 7 days before last week (might be less than 7)

  const result: TransformedUsage[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = currentWeek[i];
    const prevDay = previousWeek[i];

    // If currentDay exists, get its date; else skip
    if (!currentDay) continue;

    const date = new Date(currentDay.usageDate + "T00:00:00");
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    result.push({
      name: dayName,
      v1: currentDay.used,
      v2: prevDay?.used,
    });
  }

  return result;
}
