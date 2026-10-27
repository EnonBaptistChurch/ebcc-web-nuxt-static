export interface BannerNotice {
  /** Optional stable identifier. Falls back to message + dates. */
  id?: string
  message: string
  /** "YYYY-MM-DD". Omit for "no start". */
  startDate?: string
  /** "HH:mm" (24h). Optional; defaults to the start of the day (00:00). Ignored without startDate. */
  startTime?: string
  /** "YYYY-MM-DD". Omit for "no end". */
  endDate?: string
  /** "HH:mm" (24h). Optional; defaults to the end of the day (23:59). Ignored without endDate. */
  endTime?: string
  /** Optional URL or site path. On that same page the notice still shows, but as plain text. */
  link?: string
  /** Set to true to make the notice clickable (requires `link`). Otherwise it is plain text. */
  showLink?: boolean
  /**
   * The part of `message` that becomes the link, e.g. "book here".
   * Leave out to make the whole message the link. Must match the message text exactly
   * (case-sensitive); if it isn't found, the whole message is linked instead.
   */
  linkText?: string
}

export function noticeKey(notice: BannerNotice): string {
  return (
    notice.id ??
    [
      notice.message,
      notice.startDate ?? '',
      notice.startTime ?? '',
      notice.endDate ?? '',
      notice.endTime ?? '',
    ].join('|')
  )
}

/**
 * Builds a local-time timestamp from a date and optional time.
 * - Start with no time → 00:00:00.000
 * - End with no time   → 23:59:59.999
 * - End with "HH:mm"   → inclusive through the end of that minute
 * Returns NaN for malformed input.
 */
function toTimestamp(date: string, time: string | undefined, isEnd: boolean): number {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!dateMatch) return NaN
  const y = Number(dateMatch[1])
  const m = Number(dateMatch[2])
  const d = Number(dateMatch[3])

  let hours = isEnd ? 23 : 0
  let minutes = isEnd ? 59 : 0
  let seconds = isEnd ? 59 : 0
  let ms = isEnd ? 999 : 0

  if (time) {
    const timeMatch = /^(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(time)
    if (!timeMatch) return NaN
    hours = Number(timeMatch[1])
    minutes = Number(timeMatch[2])
    if (timeMatch[3] !== undefined) {
      seconds = Number(timeMatch[3])
      ms = isEnd ? 999 : 0
    } else {
      seconds = isEnd ? 59 : 0
      ms = isEnd ? 999 : 0
    }
  }

  return new Date(y, m - 1, d, hours, minutes, seconds, ms).getTime()
}

export function isNoticeActive(notice: BannerNotice, now: number): boolean {
  const start = notice.startDate
    ? toTimestamp(notice.startDate, notice.startTime, false)
    : -Infinity
  const end = notice.endDate ? toTimestamp(notice.endDate, notice.endTime, true) : Infinity
  if (Number.isNaN(start) || Number.isNaN(end)) return false
  return now >= start && now <= end
}

export function isExternalLink(link: string): boolean {
  return /^https?:\/\//i.test(link)
}

export interface MessageSegment {
  text: string
  /** True for the part that should be the link. */
  link: boolean
}

/**
 * Splits a message around `linkText` so only that part can be linked.
 * No linkText (or not found in the message) → the whole message is the link.
 */
export function splitMessage(message: string, linkText?: string): MessageSegment[] {
  const index = linkText ? message.indexOf(linkText) : -1
  if (!linkText || index === -1) return [{ text: message, link: true }]

  const segments: MessageSegment[] = []
  const before = message.slice(0, index)
  const after = message.slice(index + linkText.length)
  if (before) segments.push({ text: before, link: false })
  segments.push({ text: linkText, link: true })
  if (after) segments.push({ text: after, link: false })
  return segments
}

/** Ignores trailing slashes and letter case, so "/Whats-On/" matches "/whats-on". */
function normalisePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '')
  return (trimmed || '/').toLowerCase()
}

/**
 * True when `link` points at the page the visitor is already on.
 * Query strings and #hashes are ignored; links to other sites never match.
 */
export function linksToCurrentPage(link: string, currentPath: string, origin: string): boolean {
  try {
    const url = new URL(link, origin)
    if (url.origin !== origin) return false
    return normalisePath(url.pathname) === normalisePath(currentPath)
  } catch {
    return false
  }
}

/** Your notices. Edit this list; the banner shows whichever are currently in range. */
export const bannerNotices: BannerNotice[] = [
  {
    message: 'No First Steps this week (29/10/26)',
    startDate: '2026-10-27',
    endDate: '2026-10-29',
    endTime: '11:30', // optional: stops showing at midday on the 29th
    link: '/whats-on/first-steps',
    showLink: true,
    linkText: 'First Steps', // optional: only these words become the link
  },
  //   {
  //     message: 'Carol service tickets now available',
  //     startDate: '2026-11-15',
  //     startTime: '09:00', // optional: appears from 9am
  //     endDate: '2026-12-20',
  //     link: '/events/carols',
  //   },
  //   {
  //     message: 'Please note the church office is closed today',
  //     startDate: '2026-10-27',
  //     endDate: '2026-10-27',
  //   },
]