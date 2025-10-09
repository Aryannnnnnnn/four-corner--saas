export function formatPrice(value: number | string): string {
  if (typeof value === "string") {
    value = value.replace(/[$,]/g, "");
  }
  const num = Number(value);
  if (Number.isNaN(num) || num === 0) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date);
}

export function formatPercentage(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return `${num >= 0 ? "+" : ""}${num.toFixed(2)}%`;
}

export function getGradeColor(grade: string): string {
  const gradeColors: Record<string, string> = {
    A: "text-green-500",
    B: "text-blue-500",
    C: "text-indigo-500",
    D: "text-orange-500",
    F: "text-red-500",
  };
  return gradeColors[grade?.charAt(0)] || "text-gray-500";
}

export function getGradeBgColor(grade: string): string {
  const gradeBgColors: Record<string, string> = {
    A: "bg-green-500/10 border-green-500/20",
    B: "bg-blue-500/10 border-blue-500/20",
    C: "bg-indigo-500/10 border-indigo-500/20",
    D: "bg-orange-500/10 border-orange-500/20",
    F: "bg-red-500/10 border-red-500/20",
  };
  return gradeBgColors[grade?.charAt(0)] || "bg-gray-500/10 border-gray-500/20";
}
