export interface EventLink {
  text: string;
  url: string;
}

export interface EventCardItem {
  id: string;
  day: string;
  time: string;
  title: string;
  url?: string;
  description?: string;
  note?: string;
  additionalLinks?: EventLink[];
}

export const eventCardsData: EventCardItem[] = [
  {
    id: 'sunday-club',
    day: 'Sunday',
    time: '9.45am',
    title: 'Sunday Club',
    url: '/whats-on/sunday-club/',
    note: 'for children aged 4 to 15'
  },
  {
    id: 'morning-worship',
    day: 'Sunday',
    time: '11.15am',
    title: 'Morning Worship',
    url: '/whats-on/sunday-morning/'
  },
  {
    id: 'sunday-prayer',
    day: 'Sunday',
    time: '6.00pm',
    title: 'Prayer Time',
    url: '/whats-on/sunday-prayer/',
    note: 'Every Sunday other than First Sunday of the month'
  },
  {
    id: 'evening-worship',
    day: 'Sunday',
    time: '6.30pm',
    title: 'Evening Worship',
    url: '/whats-on/sunday-evening/'
  },
  {
    id: 'bible-study',
    day: 'Wednesday',
    time: '7.30pm',
    title: 'Bible Study and Prayer Meeting',
    url: '/whats-on/bible-study/'
  },
  {
    id: 'small-groups',
    day: 'Wednesday',
    time: '10.00am & 7.45pm',
    title: 'Monthly Small Groups',
    url: '/whats-on/small-groups',
    note: 'Last Wednesday of Month'
  },
  {
    id: 'first-steps',
    day: 'Thursday',
    time: '9.00am',
    title: 'First Steps – Toddler Group',
    url: '/whats-on/first-steps/',
    note: 'term-time',
    description: 'For parents, carers, and pre-school children. Parents/Carers need to stay with their children.'
  },
  {
    id: 'ladies-meeting',
    day: 'Thursday',
    time: '1.45pm',
    title: 'Ladies Meeting',
    url: '/whats-on/womens-meetings/',
    note: '1st and 3rd Thursday each month'
  },
  {
    id: 'coffee-morning',
    day: 'Friday',
    time: '10.00am – 11.30am',
    title: 'Coffee Morning',
    note: 'every fortnight',
    additionalLinks: [{ text: 'Contact us for details', url: '/contact-us' }]
  },
  {
    id: 'discoverers',
    day: 'Friday',
    time: '7.30pm',
    title: 'Discoverers',
    url: '/whats-on/youth/',
    note: 'term-time - fortnightly',
    description: 'Youth meeting for 11-16 year olds',
    additionalLinks: [{ text: 'Contact us for details', url: '/contact-us' }]
  }
];