import type { Handler } from "@netlify/functions"
import Parser from "rss-parser"
import type { PodcastItem } from "../../types/SermonPodcasts"

const parser = new Parser<PodcastItem>()
const FEED_URL = process.env.SERMON_RSS_FEED_URL || ""

// Optional in-memory cache
let cache: { data: any; expiry: number } | null = null
const CACHE_DURATION_MS = 30 * 60 * 1000 // 30 minutes

// Define structured snippet
interface ParsedSnippet {
  title: string
  speaker: string
  date: string
  service?: string
}

function parseContentSnippet(snippet: string): ParsedSnippet {
  const lines = snippet
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)

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
function parseDateString(dateStr: string): number {
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

export const handler: Handler = async () => {
  const now = Date.now()

  // Return cached data if available
  if (cache && cache.expiry > now) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=0, s-maxage=1800, stale-while-revalidate=60",
      },
      body: JSON.stringify(cache.data),
    }
  }

  if (!FEED_URL) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
      body: "RSS_FEED_URL is not set",
    }
  }

  try {
    const rawFeed = await parser.parseURL(FEED_URL)

    // Map over items to add parsedSnippet
    const itemsWithSnippet = rawFeed.items.map(item => ({
      ...item,
      parsedSnippet: parseContentSnippet(item.contentSnippet || ""),
    }))

    // Sort by parsedSnippet.date (newest first)
    // and for same date, "Evening Service" before "Morning Service"
    itemsWithSnippet.sort((a, b) => {
      const dateA = parseDateString(a.parsedSnippet.date)
      const dateB = parseDateString(b.parsedSnippet.date)

      if (dateB !== dateA) return dateB - dateA

      const serviceA = a.parsedSnippet.service?.toLowerCase() || ""
      const serviceB = b.parsedSnippet.service?.toLowerCase() || ""

      if (serviceA.includes("evening") && serviceB.includes("morning")) return -1
      if (serviceA.includes("morning") && serviceB.includes("evening")) return 1
      return 0
    })

    const feedWithParsedItems = {
      ...rawFeed,
      items: itemsWithSnippet,
    }

    // Cache in memory
    cache = { data: feedWithParsedItems, expiry: now + CACHE_DURATION_MS }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, max-age=0, s-maxage=1800, stale-while-revalidate=60",
      },
      body: JSON.stringify(feedWithParsedItems),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
      body: `Failed to fetch RSS: ${err.message}`,
    }
  }
}
