import type { ParsedSnippet } from "@/types/SermonPodcasts"
import { getSermonDate } from "@/composables/UseSermonDateConverter";
import { findScripturePassage, parseSermonTitle } from "@/composables/useScriptureParser";
export function parseContentSnippet(snippet: string): ParsedSnippet |null {
  
  
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
  const potentialSpeaker = lines[1] != null? lines[1] : "";
  const speaker = convertToSpeaker(deDupe(potentialSpeaker));
  return {
    title: lines[0] ?? "",
    condensedTitle: parseSermonTitle(lines[0] ?? "").title,
    speaker: speaker,
    date,
    service: lines[3] ?? "",
    series: splitTags(lines[4]) ?? "",
    passage: findScripturePassage(lines.join(" "))?.raw ?? "",
    formattedDate: getSermonDate(date) ?? undefined
  };
}

function convertToSpeaker(speakerStr: string): ParsedSnippet["speaker"] {
  const name = speakerStr.trim();
  if(name.includes("[") || name.includes("]")) {
    const captureInfo = name.match(/^(.*?)\s*\[(.*?)\]$/)
    if(captureInfo) {
      return {
        name: captureInfo[1]?.trim() || name,
        information: extractBracketContent(name) || ""
      };
    }
    return { name, information: "Unusual format detected" };
  }
  return {
    name,
    information: "" // Placeholder for any additional info you might want to extract
  };
}

function extractBracketContent(str: string)  {
  const match = str.match(/\[(.*?)\]/);
  return match ? match[1] : null;
}

function splitTags(input?: string): string[] {
  const tags = (input ?? "")
    .split(";")
    .filter(tag => tag.trim() !== "<br>")
    .map(t => t.trim())
    .filter(Boolean);

  return tags;
}

function deDupe(preacher: string): string {
  if(!preacher) return preacher;
  if(preacher.includes("Relf")) return "Pastor Paul Relf";
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

