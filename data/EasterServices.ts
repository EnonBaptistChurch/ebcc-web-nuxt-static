import { type SeasonalService } from '../types/SeasonalService'
import { addDays, getGoodFriday, toIso } from './EasterDates'

interface ServiceTemplate {
  key: string
  label: string
  title: string
  icon: string
  daysFromGoodFriday: number
  time: string // 24h "HH:mm"
  extraDetail?: string
}

// Edit services here. They're generated for any year automatically.
const templates: ServiceTemplate[] = [
  {
    key: 'good-friday',
    label: 'Good Friday',
    title: 'Good Friday Service',
    icon: '✝',
    daysFromGoodFriday: 0,
    time: '10:00',
  },
  {
    key: 'easter-morning',
    label: 'Easter Sunday',
    title: 'Easter Morning Family Service',
    icon: '☀',
    daysFromGoodFriday: 2,
    time: '11:15',
    // extraDetail: '<p>Sunday club children will present something during the service.</p><p>Sunday club children who are participating will need to be at the church by 11am to help teachers prepare. All children are welcome to attend the service, even if they are not participating.</p>',
  },
  {
    key: 'easter-evening',
    label: 'Easter Sunday',
    title: 'Easter Day Evening Service',
    icon: '✦',
    daysFromGoodFriday: 2,
    time: '18:30',
  },
]

const ordinal = (n: number) => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (suffixes[(v - 20) % 10] ?? suffixes[v] ?? 'th')
}

// "Friday 3rd April"
function formatDisplayDate(date: Date) {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' })
  const month = date.toLocaleDateString('en-GB', { month: 'long' })
  return `${weekday} ${ordinal(date.getDate())} ${month}`
}

// "18:30" -> "6:30pm"
function formatDisplayTime(time: string) {
  const [h = 0, m = 0] = time.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  return `${h % 12 || 12}:${String(m).padStart(2, '0')}${suffix}`
}

export function getEasterServices(year: number, goodFridays: string[] = []): SeasonalService[] {
  const goodFriday = getGoodFriday(year, goodFridays)

  return templates
    .map((t) => {
      const date = addDays(goodFriday, t.daysFromGoodFriday)
      return {
        id: `${year}-${t.key}`,
        label: t.label,
        title: t.title,
        icon: t.icon,
        date: toIso(date),
        time: t.time,
        displayDate: formatDisplayDate(date),
        displayTime: formatDisplayTime(t.time),
        ...(t.extraDetail && { extraDetail: t.extraDetail }),
      }
    })
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
}