import type { SeasonalService } from "@/types/SeasonalService"

const services: SeasonalService[] = [
  {
    id: 1,
    icon: '🕯',
    label: 'Carol Service',
    title: 'Carol Service',
    date: '2026-12-13',
    time: '17:00',
    displayDate: 'Sunday 13th December',
    displayTime: '5:00pm',
    extraDetail: 'There will be mince pies and refreshments following the end of the service.'
  },
  {
    id: 2,
    icon: '🎄',
    label: 'Family Service',
    title: 'Christmas Family Service',
    date: '2026-12-20',
    time: '11:15',
    displayDate: 'Sunday 20th December',
    displayTime: '11:15am',
    extraDetail: 'The Sunday Club children will present something during this service. There will be mince pies and refreshments following the end of the service.'
  },
  {
    id: 3,
    icon: '✦',
    label: 'Christmas Day',
    title: 'Christmas Day Service',
    date: '2026-12-25',
    time: '10:00',
    displayDate: 'Friday 25th December',
    displayTime: '10:00am'
  }
]

export default services