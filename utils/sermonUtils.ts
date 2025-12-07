import type { ParsedSnippet } from "@/types/SermonPodcasts"
import { getSermonDate } from "@/composables/UseSermonDateConverter";
export function parseContentSnippet(snippet: string): ParsedSnippet |null {
  // const lines = snippet
  //   .split("\n")
  //   .map(line => line.trim())
  //   .filter(Boolean);
  //   if(lines.length < 3) return null;
  //   const hasValidDate = parseDateString(lines[2]!) !== 0;
  //   if(!hasValidDate) return null;
    
  // return {
  //   title: lines[0] || "",
  //   speaker: lines[1] || "",
  //   date: lines[2] || "",
  //   service: lines[3] || "",
  //   series: lines[4] || "",
  //   formattedDate: getSermonDate(lines[2]!) || undefined
  // 
  
  const lines = [...snippet.matchAll(/<p>(.*?)<\/p>/gi)]
  .map(m => (m[1]?.trim() || "").replace(/&amp;/g, "&"));
  

  // Ensure we have at least 3 lines (title, speaker, date)
  if (lines.length < 3) return null;

  const date = lines[2];
  if (!date || parseDateString(date) === 0) return null;

  if(lines.length>4 && lines.findIndex(l=>l.toLowerCase().includes('reference'))>-1){
    console.log(snippet, 'invalid snippet');
    console.log(lines[5], 'invalid snippet');
  }

  const speaker = deDupeGT(lines[1] != null? lines[1] : "")
  return {
    title: lines[0] ?? "",
    speaker: speaker,
    date,
    service: lines[3] ?? "",
    series: lines[4] ?? "",
    formattedDate: getSermonDate(date) ?? undefined
  };
}

function deDupeGT(preacher: string): string {
  if(!preacher) return preacher;
  if(preacher.includes("Trice")) return "Graham Trice";
  return preacher;
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