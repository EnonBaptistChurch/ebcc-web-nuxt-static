// Easter Sunday via the Anonymous Gregorian algorithm
export function easterSunday(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

// "YYYY-MM-DD" as a local date (new Date("2026-04-03") would be UTC)
export function parseDate(iso: string) {
  const [y = 0, m = 1, d = 1] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

// Local "YYYY-MM-DD" (toISOString would shift the day in some timezones)
export function toIso(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Prefer gov.uk's Good Friday, otherwise calculate (Easter Sunday - 2)
export function getGoodFriday(year: number, goodFridays: string[] = []) {
  return (
    goodFridays.map(parseDate).find(d => d.getFullYear() === year) ??
    addDays(easterSunday(year), -2)
  )
}