import { type SeasonalService } from '../types/SeasonalService'

const easterServices: SeasonalService[] = [
  {
    id: 1,
    label: 'Good Friday',
    title: 'Good Friday Service',
    icon: '✝',
    date: '2026-04-18',
    time: '10:00',
    displayDate: 'Friday 18th April',
    displayTime: '10:00am',
  },
  {
    id: 2,
    label: 'Easter Sunday',
    title: 'Easter Morning Service',
    icon: '☀',
    date: '2026-04-20',
    time: '11:15',
    displayDate: 'Sunday 20th April',
    displayTime: '11:15am',
  },
  {
    id: 3,
    label: 'Easter Sunday',
    title: 'Easter Day Evening Service',
    icon: '✦',
    date: '2026-04-20',
    time: '18:30',
    displayDate: 'Sunday 20th April',
    displayTime: '6:30pm',
  },
]

export default easterServices