<template>
  <div class="page">
    <div class="bg-texture"></div>

    <div class="container">
      <!-- Left on desktop, top on mobile -->
      <header class="intro">
        <div class="cross-ornament">✦</div>
        <p class="eyebrow">Join Us This</p>
        <h1>Easter</h1>
        <div class="divider">
          <span class="line"></span>
          <span class="diamond">◆</span>
          <span class="line"></span>
        </div>

        <div v-if="mounted && countdown" class="countdown">
          <p class="countdown-label">{{ countdown.live ? 'Happening now' : 'Next service in' }}</p>
          <div v-if="!countdown.live" class="countdown-grid">
            <div v-for="unit in countdownUnits" :key="unit.label" class="countdown-unit">
              <span class="countdown-num">{{ unit.value }}</span>
              <span class="countdown-text">{{ unit.label }}</span>
            </div>
          </div>
          <p class="countdown-service">{{ countdown.title }}</p>
        </div>
        <p class="footer-text">All are welcome</p>
      </header>

      <!-- Right on desktop, below on mobile -->
      <main class="main">
        <div v-if="days.length > 0" class="timeline">
          <section
            v-for="(day, dayIndex) in days"
            :key="day.date"
            class="day"
            :class="day.theme"
            :style="{ '--delay': `${dayIndex * 0.2 + 0.2}s` }"
          >
            <div class="day-marker" aria-hidden="true">{{ day.icon }}</div>

            <div class="day-body">
              <p class="day-label">{{ day.label }}</p>
              <h2 class="day-date">{{ day.displayDate }}</h2>

              <!-- <blockquote class="verse">
                <p>“{{ day.verse.text }}”</p>
                <cite>{{ day.verse.ref }}</cite>
              </blockquote> -->

              <article v-for="service in day.services" :key="service.id" class="service">
                <div class="service-time">{{ service.displayTime }}</div>
                <div class="service-info">
                  <h3 class="service-title">{{ service.title }}</h3>
                  <p v-if="service.extraDetail" class="service-extra-detail" v-html="service.extraDetail"></p>
                </div>
              </article>
            </div>
          </section>
        </div>

        <div v-else class="no-services">
          <p class="no-services-text">There are no upcoming services at this time.</p>
        </div>

        
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getEasterServices } from '../../data/EasterServices'
import { type SeasonalService } from '../../types/SeasonalService'

// How long after a service starts before it disappears from the page
const HIDE_AFTER_START_MINUTES = 120
// Length used for calendar events (adjust to suit)
const SERVICE_DURATION_MINUTES = 60

const MINUTE = 60_000

const config = useRuntimeConfig()
const goodFridays = (config.public.goodFridays as string[] | undefined) ?? []

const now = ref(new Date())
const mounted = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  mounted.value = true
  now.value = new Date()
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onBeforeUnmount(() => clearInterval(timer))

function startOf(service: SeasonalService) {
  const [y = 0, m = 1, d = 1] = service.date.split('-').map(Number)
  const [h = 0, min = 0] = service.time.split(':').map(Number)
  return new Date(y, m - 1, d, h, min)
}

// This year's and next year's services, then only the next Easter that hasn't finished
const upcomingServices = computed(() => {
  const year = now.value.getFullYear()
  const upcoming = [year, year + 1]
    .flatMap(y => getEasterServices(y, goodFridays))
    .filter(s => startOf(s).getTime() + HIDE_AFTER_START_MINUTES * MINUTE > now.value.getTime())

  const nextYear = upcoming[0]?.date.slice(0, 4)
  return upcoming.filter(s => s.date.startsWith(nextYear ?? ''))
})

// ---- Grouping into days for the timeline ----
type Verse = { text: string; ref: string }
const dayMeta: Record<string, { theme: 'dusk' | 'dawn'; icon: string; verse: Verse }> = {
  'Good Friday': {
    theme: 'dusk',
    icon: '✝',
    // verse: { text: 'It is finished.', ref: 'John 19:30' },
  },
  'Easter Sunday': {
    theme: 'dawn',
    icon: '☀',
    // verse: { text: 'He is not here: for he is risen, as he said.', ref: 'Matthew 28:6' },
  },
}
const defaultMeta = dayMeta['Easter Sunday']!

interface DayGroup {
  date: string
  label: string
  displayDate: string
  theme: 'dusk' | 'dawn'
  icon: string
  verse: Verse
  services: SeasonalService[]
}

const days = computed(() => {
  const groups: DayGroup[] = []
  for (const service of upcomingServices.value) {
    let group = groups.find(g => g.date === service.date)
    if (!group) {
      const meta = dayMeta[service.label] ?? defaultMeta
      group = {
        date: service.date,
        label: service.label,
        displayDate: service.displayDate,
        ...meta,
        services: [],
      }
      groups.push(group)
    }
    group.services.push(service)
  }
  return groups
})

// ---- Countdown ----
const countdown = computed(() => {
  const next = upcomingServices.value[0]
  if (!next) return null

  const diff = startOf(next).getTime() - now.value.getTime()
  if (diff <= 0) return { live: true, title: next.title, days: 0, hours: 0, minutes: 0, seconds: 0 }

  const total = Math.floor(diff / 1000)
  return {
    live: false,
    title: next.title,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
})

const countdownUnits = computed(() => {
  const c = countdown.value
  if (!c) return []
  const pad = (n: number) => String(n).padStart(2, '0')
  return [
    { label: 'Days', value: c.days },
    { label: 'Hours', value: pad(c.hours) },
    { label: 'Mins', value: pad(c.minutes) },
    { label: 'Secs', value: pad(c.seconds) },
  ]
})

// ---- Add to calendar (.ics download) ----
// function addToCalendar(service: SeasonalService) {
//   const pad = (n: number) => String(n).padStart(2, '0')
//   const local = (d: Date) =>
//     `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

//   const start = startOf(service)
//   const end = new Date(start.getTime() + SERVICE_DURATION_MINUTES * MINUTE)
//   const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

//   const ics = [
//     'BEGIN:VCALENDAR',
//     'VERSION:2.0',
//     'PRODID:-//Easter Services//EN',
//     'BEGIN:VEVENT',
//     `UID:${service.id}@easter-services`,
//     `DTSTAMP:${stamp}`,
//     `DTSTART:${local(start)}`,
//     `DTEND:${local(end)}`,
//     `SUMMARY:${service.title}`,
//     'END:VEVENT',
//     'END:VCALENDAR',
//   ].join('\r\n')

//   const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
//   const a = document.createElement('a')
//   a.href = url
//   a.download = `${service.id}.ics`
//   a.click()
//   URL.revokeObjectURL(url)
// }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page {
  
  background: linear-gradient(to bottom, #f1e4cd 0%, #fdf6ec 40%, #fff9e6 100%);
  padding: 2rem 1.25rem calc(2.5rem + env(safe-area-inset-bottom));
  position: relative;
  /* clip (not hidden) so the sticky intro still works on desktop */
  overflow-x: clip;
}

.bg-texture {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212, 175, 100, 0.14) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 80% 100%, rgba(240, 213, 138, 0.18) 0%, transparent 60%);
  pointer-events: none;
}

/* Mobile: one column, everything flows down */
.container {
  --gap: 1.5rem;
  max-width: 1040px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.25rem;
  animation: fadeUp 0.8s ease both;
}

/* ---------- Intro ---------- */
.intro {
  text-align: center;
}

.cross-ornament {
  font-size: 1rem;
  color: #b8922a;
  letter-spacing: 0.3em;
  margin-bottom: 0.75rem;
  display: block;
  animation: fadeUp 0.6s ease both;
}

.eyebrow {
  font-family: 'Cinzel', serif;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--nav-bg-color);
  margin-bottom: 0.5rem;
  animation: fadeUp 0.6s 0.05s ease both;
}

h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3.5rem, 16vw, 5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.05;
  letter-spacing: -0.02em;
  background: linear-gradient(100deg, #2c1e0f 0%, #2c1e0f 35%, #b8922a 50%, #2c1e0f 65%, #2c1e0f 100%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* room for the italic descender so background-clip doesn't crop it */
  padding-bottom: 0.1em;
  animation: fadeUp 0.6s 0.1s ease both, shimmer 6s 1.2s ease-in-out infinite;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  animation: fadeUp 0.6s 0.15s ease both;
}

.line {
  display: block;
  width: 60px;
  height: 1px;
  background: linear-gradient(to right, transparent, #c9a84c, transparent);
}

.diamond {
  color: #c9a84c;
  font-size: 0.5rem;
}

/* ---------- Countdown ---------- */
.countdown {
  margin-top: 1.75rem;
  animation: fadeUp 0.6s 0.25s ease both;
}

.countdown-label {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--nav-bg-color);
  margin-bottom: 0.75rem;
}

.countdown-grid {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.countdown-unit {
  flex: 0 1 4.2rem;
  min-width: 0;
  padding: 0.6rem 0.3rem;
  background: rgba(255, 252, 245, 0.85);
  border: 1px solid rgba(201, 168, 76, 0.35);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1;
  color: #2c1e0f;
  font-variant-numeric: tabular-nums;
}

.countdown-text {
  font-family: 'Cinzel', serif;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--nav-bg-color);
  margin-top: 0.35rem;
}

.countdown-service {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.1rem;
  color: var(--nav-bg-color);
  margin-top: 0.75rem;
}

/* ---------- Vertical timeline ---------- */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding-left: 2.75rem;
}

.day {
  position: relative;
  animation: fadeUp 0.7s var(--delay, 0s) ease both;
}

.day-marker {
  position: absolute;
  left: -2.75rem;
  top: 1.25rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.9rem;
  z-index: 1;
}

/* Line from this marker down to the next one */
.day:not(:last-child)::before {
  content: '';
  position: absolute;
  left: calc(-2.75rem + 1rem - 1px); /* centre of the marker */
  top: calc(1.25rem + 1rem);
  bottom: calc((var(--gap) + 1.25rem + 1rem) * -1);
  width: 2px;
  background: linear-gradient(to bottom, #5a3f22, #c9a84c);
}

.dusk .day-marker {
  background: #2c1e0f;
  color: #e7c76a;
  border: 2px solid #7a5c30;
}

.dawn .day-marker {
  background: radial-gradient(circle, #fff6d6, #f0d58a);
  color: #8a6410;
  border: 2px solid #c9a84c;
  animation: glow 3.5s ease-in-out infinite;
}

.day-body {
  border-radius: 12px;
  padding: 1.4rem 1.25rem 0.1rem;
  border: 1px solid rgba(201, 168, 76, 0.4);
  transition: transform 0.25s ease;
}

@media (hover: hover) {
  .day-body:hover { transform: translateY(-2px); }
}

.dusk .day-body {
  background: linear-gradient(160deg, #2c1e0f, #402c19);
  color: #f3e3bf;
  box-shadow: 0 8px 30px rgba(44, 30, 15, 0.25);
}

.dawn .day-body {
  background: linear-gradient(160deg, rgba(255, 252, 245, 0.95), rgba(255, 241, 200, 0.9));
  color: #2c1e0f;
  box-shadow: 0 8px 36px rgba(201, 168, 76, 0.28);
}

.day-label {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #b8922a;
  margin-bottom: 0.4rem;
}

.dusk .day-label { color: #d9b657; }

.day-date {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.15;
}

.verse {
  margin: 0.9rem 0 1.1rem;
  padding-left: 0.9rem;
  border-left: 2px solid rgba(201, 168, 76, 0.6);
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.4;
  opacity: 0.9;
}

.verse cite {
  display: block;
  margin-top: 0.25rem;
  font-family: 'Cinzel', serif;
  font-style: normal;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #b8922a;
}

.dusk .verse cite { color: #d9b657; }

/* Services inside a day: time above title on mobile */
.service {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.15rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(201, 168, 76, 0.3);
}

.service-time {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #b8922a;
  line-height: 1.2;
}

.dusk .service-time { color: #e7c76a; }

.service-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.25;
}

.service-extra-detail {
  margin-top: 0.5rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  line-height: 1.4;
  opacity: 0.85;
}

.calendar-btn {
  margin-top: 0.7rem;
  min-height: 44px; /* comfortable touch target */
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid rgba(201, 168, 76, 0.6);
  border-radius: 999px;
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #8a6410;
  cursor: pointer;
  touch-action: manipulation;
  transition: background 0.2s ease, color 0.2s ease;
}

.calendar-btn:hover,
.calendar-btn:focus-visible {
  background: #c9a84c;
  color: #fff;
}

.dusk .calendar-btn { color: #e7c76a; }
.dusk .calendar-btn:hover,
.dusk .calendar-btn:focus-visible { background: #e7c76a; color: #2c1e0f; }

/* ---------- No services / footer ---------- */
.no-services {
  animation: fadeUp 0.6s 0.1s ease both;
}

.no-services-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-style: italic;
  color: #7a5c30;
  text-align: center;
  padding: 2rem;
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-radius: 4px;
}

.footer-text {
  font-family: 'Cormorant Garamond', serif;
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--nav-bg-color);
  letter-spacing: 0.15em;
  margin-top: 2rem;
  opacity: 0.8;
  animation: fadeUp 0.6s 0.55s ease both;
}

/* ---------- Small phones ---------- */
@media (max-width: 360px) {
  .page { padding-inline: 1rem; }
  .countdown-num { font-size: 1.5rem; }
  .countdown-unit { flex-basis: 3.4rem; }
  .day-body { padding-inline: 1rem; }
}

/* ---------- Larger phones / small tablets: time beside title ---------- */
@media (min-width: 520px) {
  .service {
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 1rem;
  }
}

/* ---------- Desktop: intro left (sticky), services right ---------- */
@media (min-width: 900px) {
  .page {
    padding: 4rem 2rem;
    display: flex;
    align-items: flex-start;
  }

  .container {
    width: 100%;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    column-gap: 5rem;
    align-items: start;
  }

  .intro {
    position: sticky;
    top: 4rem;
    text-align: left;
  }

  h1 { font-size: clamp(5rem, 8vw, 7rem); }
  .divider { justify-content: flex-start; }
  .line:first-child { display: none; } /* left-aligned: only the trailing line */
  .countdown-grid { justify-content: flex-start; }
  .countdown-unit { flex-basis: 4.6rem; }

  .timeline {
    --gap: 2rem;
    padding-left: 3.25rem;
  }

  .day-marker {
    left: -3.25rem;
    width: 2.2rem;
    height: 2.2rem;
    font-size: 1rem;
  }

  .day:not(:last-child)::before {
    left: calc(-3.25rem + 1.1rem - 1px);
    top: calc(1.25rem + 1.1rem);
    bottom: calc((var(--gap) + 1.25rem + 1.1rem) * -1);
  }

  .day-body { padding: 1.25rem 1.25rem 0.25rem; }
  .day-date { font-size: 1.9rem; }
  .service-title { font-size: 1.3rem; }

  .footer-text { text-align: left;  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%, 100% { background-position: 100% 0; }
  50% { background-position: 0% 0; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 0 4px rgba(240, 213, 138, 0.2), 0 0 16px rgba(240, 213, 138, 0.5); }
  50% { box-shadow: 0 0 0 8px rgba(240, 213, 138, 0.25), 0 0 30px rgba(240, 213, 138, 0.85); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
</style>