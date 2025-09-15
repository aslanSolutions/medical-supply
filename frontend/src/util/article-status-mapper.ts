import type { Status } from "@/types/article";

const CRITICAL = 30;
const LOW = 150;

export function computeStatus(count: number): Status {
  if (count <= CRITICAL) return "Critical";
  if (count <= LOW) return "Low";
  return "High";
}

export function getStatusClass(s: Status) {
  switch (s) {
    case "High":
      return "bg-green-100 w-20 h-6 text-green-700 ring-green-200";
    case "Low":
      return "bg-yellow-100 w-20 h-6 text-yellow-700 ring-yellow-200";
    case "Critical":
      return "bg-red-100 w-20 h-6 text-red-700 ring-red-200";
  }
}
