import Parser from "rss-parser"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type { PodcastItem } from "../types/SermonPodcasts"
import { parseContentSnippet, parseDateString } from "../utils/sermonUtils"

const FEED_URL = process.env.SERMON_RSS_FEED_URL
const OUT_FILE = path.resolve("data/sermons.json")

async function main() {
  if (!FEED_URL) throw new Error("SERMON_RSS_FEED_URL is not set")

  const parser = new Parser<PodcastItem>()
  const rawFeed = await parser.parseURL(FEED_URL)

  const items = rawFeed.items.map(item => ({
    ...item,
    parsedSnippet: parseContentSnippet(item.content || "", item.itunes.duration || ""),
  }))

  // Newest first; same date: evening before morning
  items.sort((a, b) => {
    const dateA = parseDateString(a.parsedSnippet?.date ?? a.pubDate!)
    const dateB = parseDateString(b.parsedSnippet?.date ?? b.pubDate!)
    if (dateB !== dateA) return dateB - dateA
    if (!a.parsedSnippet || !b.parsedSnippet) return 0
    const serviceA = a.parsedSnippet.service?.toLowerCase() || ""
    const serviceB = b.parsedSnippet.service?.toLowerCase() || ""
    if (serviceA.includes("evening") && serviceB.includes("morning")) return -1
    if (serviceA.includes("morning") && serviceB.includes("evening")) return 1
    return 0
  })

  if (items.length === 0) throw new Error("Feed returned no items")

  await mkdir(path.dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify({ ...rawFeed, items }, null, 2))
  console.log(`Fetched ${items.length} sermons`)
}

main().catch(async err => {
  // Fail soft: keep the last good file so the deploy still has sermons
  console.warn(`Sermon fetch failed: ${err.message}`)
  try {
    await readFile(OUT_FILE)
    console.warn("Using existing data/sermons.json")
  } catch {
    await mkdir(path.dirname(OUT_FILE), { recursive: true })
    await writeFile(OUT_FILE, JSON.stringify({ items: [] }))
    console.warn("No previous file, wrote an empty list")
  }
})