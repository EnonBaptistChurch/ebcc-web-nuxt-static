export interface SeasonalService {
  id: number | string   // was: number
  label: string
  title: string
  icon: string
  date: string
  time: string
  displayDate: string
  displayTime: string
  extraDetail?: string
}