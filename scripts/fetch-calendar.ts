// scripts/fetch-calendar.ts
//
// Runs at build time (like fetch-sermons). Downloads the church's public Google Calendar
// (ICS feed), expands repeating events into individual dates, and saves the next ~13 months
// to data/calendar-events.json, which the "What's on" layout reads.
//
//   npm run fetch-calendar
//
// - Handles repeating events (RRULE), removed dates (EXDATE), edited/moved
//   occurrences and cancelled events, so the calendar is the one place to edit.
// - If the download fails, the last saved JSON is kept so the build never breaks.
// - For testing without the network:  CALENDAR_ICS_FILE=./sample.ics npm run fetch-calendar
// - Needs:  npm i -D node-ical

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import ical from 'node-ical';

const CALENDAR_URL =
  'https://calendar.google.com/calendar/ical/enonbcwebsite%40gmail.com/public/basic.ics';
// npm scripts run from the project root
const OUT_FILE = resolve(process.cwd(), 'data/calendar-events.json');
const DAYS_AHEAD = 400;

interface CalendarEvent {
  title: string;
  /** 'YYYY-MM-DD' (UK calendar day) */
  date: string;
  /** 'HH:MM' (UK time); left out for all-day events */
  time?: string;
}

const londonDay = (d: Date): string =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(d);
const londonTime = (d: Date): string =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(d);

// node-ical sometimes gives text fields as { val, params } rather than a string
const text = (v: any): string => (typeof v === 'string' ? v : (v?.val ?? ''));
const cancelled = (ev: any): boolean => text(ev.status).toUpperCase() === 'CANCELLED';

const expandEvents = (icsText: string, now: Date = new Date()): CalendarEvent[] => {
  const today = londonDay(now);
  const rangeStart = new Date(now.getTime() - 36 * 3600 * 1000);
  const rangeEnd = new Date(now.getTime() + DAYS_AHEAD * 24 * 3600 * 1000);
  const found = new Map<string, CalendarEvent>();

  const add = (start: Date, ev: any, dateOnly: boolean) => {
    const date = dateOnly ? start.toISOString().slice(0, 10) : londonDay(start);
    const title = text(ev.summary).trim();
    if (!title || date < today) return;
    const key = `${date}|${title.toLowerCase()}`;
    if (found.has(key)) return;
    found.set(key, { title, date, ...(dateOnly ? {} : { time: londonTime(start) }) });
  };

  for (const item of Object.values(ical.sync.parseICS(icsText)) as any[]) {
    if (!item || item.type !== 'VEVENT') continue;
    const dateOnly = item.datetype === 'date';

    if (item.rrule) {
      for (const occ of item.rrule.between(rangeStart, rangeEnd, true)) {
        const key = occ.toISOString().slice(0, 10);
        const override = item.recurrences?.[key];
        if (!override && item.exdate?.[key]) continue; // this date was removed
        const ev = override ?? item;
        if (cancelled(ev)) continue;
        add(override?.start ?? occ, ev, dateOnly);
      }
    } else if (item.start && !cancelled(item)) {
      if (item.start >= rangeStart && item.start <= rangeEnd) add(item.start, item, dateOnly);
    }
  }

  return [...found.values()].sort(
    (a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '')
  );
};

const main = async () => {
  try {
    const file = process.env.CALENDAR_ICS_FILE;
    let icsText: string;
    if (file) {
      icsText = await readFile(file, 'utf8');
    } else {
      const res = await fetch(CALENDAR_URL);
      if (!res.ok) throw new Error(`Calendar responded ${res.status}`);
      icsText = await res.text();
    }
    const events = expandEvents(icsText);
    await mkdir(dirname(OUT_FILE), { recursive: true });
    await writeFile(
      OUT_FILE,
      JSON.stringify({ generatedAt: new Date().toISOString(), events }, null, 2) + '\n'
    );
    console.log(`[calendar] saved ${events.length} upcoming events to data/calendar-events.json`);
  } catch (err) {
    console.warn(`[calendar] WARNING: could not update the calendar (${(err as Error).message}).`);
    if (existsSync(OUT_FILE)) {
      console.warn('[calendar] Keeping the previously saved data/calendar-events.json.');
    } else {
      await mkdir(dirname(OUT_FILE), { recursive: true });
      await writeFile(OUT_FILE, JSON.stringify({ generatedAt: null, events: [] }, null, 2) + '\n');
      console.warn('[calendar] No earlier file found, wrote an empty one.');
    }
  }
};

main();