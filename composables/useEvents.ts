import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import raw from '../data/calendar-events.json' // adjust to wherever your build writes the file

export interface EventOccurrence {
    key: string
    title: string
    detail?: string // e.g. the speaker, from "Morning Service - Pastor Paul Relf"
    audience?: string // e.g. "Ages 4–15"
    href?: string
    date: string // YYYY-MM-DD, UK date
    time: string // HH:mm, UK time
    end?: string // calendar-events.json has no end times yet; supported if you add them
}

interface CalendarEvent {
    title: string
    date: string
    time: string
    end?: string
}

/*
 * Optional extras, matched on the start of the title, so each event can link
 * to its page and show who it's for. Titles not listed here just show as-is.
 */
const EXTRAS: { match: string; audience?: string; href?: string }[] = [
    { match: 'Sunday Club', audience: 'Ages 4–15', href: '/whats-on/sunday-club/' },
    { match: 'First Steps', audience: 'Toddler group', href: '/whats-on/first-steps/' },
    { match: 'Discoverers', audience: 'Ages 11–16', href: '/whats-on/youth/' },
    { match: 'Morning Service', href: '/whats-on/sunday-services/' },
    { match: 'Evening Service', href: '/whats-on/sunday-services/' },
    { match: "Lord's Supper", href: '/whats-on/sunday-services/' },
    { match: 'Christmas', href: '/seasonal/christmas-services' },
    { match: 'Bible Study', href: '/whats-on/bible-study/' },
    { match: 'Small Groups', href: '/whats-on/monthly-small-groups/' },
    { match: 'Ladies Meeting', href: '/whats-on/ladies-meetings/' },
    { match: 'Ladies Bible Study', href: '/whats-on/ladies-meetings/' },
    { match: 'Coffee Morning', href: '/whats-on/coffee-morning/' },
]

const ZONE = 'Europe/London'

// Prepared once from the build-time file
const events: EventOccurrence[] = (raw.events as CalendarEvent[])
    .map((e) => {
        const [title = e.title, ...rest] = e.title.split(' - ')
        const extra = EXTRAS.find((x) => title.startsWith(x.match))
        return {
            key: `${e.date}-${e.time}-${e.title}`,
            title: title.trim(),
            detail: rest.join(' - ').trim() || undefined,
            audience: extra?.audience,
            href: extra?.href,
            date: e.date,
            time: e.time,
            end: e.end,
        }
    })
// Current UK date and time, whatever timezone the visitor's device is in
function londonNow(at: Date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(at)
    const get = (type: string) => parts.find((p) => p.type === type)!.value
    return {
        date: `${get('year')}-${get('month')}-${get('day')}`,
        time: `${get('hour')}:${get('minute')}`,
    }
}

// When the calendar file was generated. It is baked into the file, so the
// server render and the browser's first render start from the same moment.
const BUILD_NOW = londonNow(new Date(raw.generatedAt as string))

// Date maths is done in UTC on plain dates, so clock changes never shift a day
const toUTC = (date: string) => new Date(`${date}T00:00:00Z`)

function addDays(date: string, n: number) {
    const d = toUTC(date)
    d.setUTCDate(d.getUTCDate() + n)
    return d.toISOString().slice(0, 10)
}

export function formatTime(t: string) {
    const [h, m] = t.split(':').map(Number)
    const suffix = h! >= 12 ? 'pm' : 'am'
    const h12 = h! % 12 || 12
    return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`
}

export function formatDay(date: string, today: string) {
    if (date === today) return 'Today'
    if (date === addDays(today, 1)) return 'Tomorrow'
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
    }).format(toUTC(date))
}

/*
 * Build time: `now` starts at the file's `generatedAt`, so the static HTML
 * contains everything that was still to come when the calendar was built,
 * and the browser's first render matches it (no hydration warning).
 * Page load: onMounted swaps in the real UK time, so anything that has
 * already started disappears, then re-checks every minute.
 */
export function useEvents() {
    const now = ref(BUILD_NOW)

    let timer: ReturnType<typeof setInterval> | undefined
    onMounted(() => {
        now.value = londonNow()
        timer = setInterval(() => {
            now.value = londonNow()
        }, 60_000)
    })
    onBeforeUnmount(() => clearInterval(timer))

    // Events from now onwards, by date and time
    const upcoming = computed(() => {
        const stamp = `${now.value.date}T${now.value.time}`
        return events.filter((e) => `${e.date}T${e.end ?? e.time}` >= stamp)
    })

    // Upcoming events in the next `days` days (today included)
    const within = (days: number) => {
        const limit = addDays(now.value.date, days)
        return upcoming.value.filter((e) => e.date < limit)
    }

    return { now, upcoming, within }
}