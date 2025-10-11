import type { ParsedSnippet } from "@/types/SermonPodcasts"
export function parseContentSnippet(snippet: string): ParsedSnippet |null {
  const lines = snippet
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
    if(lines.length < 3) return null;
    const hasValidDate = parseDateString(lines[2]!) !== 0;
    if(!hasValidDate) return null;
  return {
    title: lines[0] || "",
    speaker: lines[1] || "",
    date: lines[2] || "",
    service: lines[3] || "",
  }
}

/**
 * Convert DD-MM-YYYY (or other) to a valid timestamp
 */
export function parseDateString(dateStr: string): number {
  if (!dateStr) return 0

  // Match DD-MM-YYYY pattern
  const match = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (match) {
    const [, dd, mm, yyyy] = match
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).getTime()
  }

  // Fallback: try native Date parsing
  const native = new Date(dateStr).getTime()
  return isNaN(native) ? 0 : native
}