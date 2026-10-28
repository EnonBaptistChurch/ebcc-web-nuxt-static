const WEEKS_BEFORE_EASTER = 40;    // card appears this many weeks before Easter Sunday
const DAYS_AFTER_GOOD_FRIDAY = 4; // 4 = hide after Easter Monday


// Fallback: Easter Sunday via the Anonymous Gregorian algorithm
function easterSunday(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// "YYYY-MM-DD" as a local date (new Date("2026-04-03") would be UTC)
function parseDate(iso: string) {
  const [y = 0, m = 1, d = 1] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function lastSundayOfOctober(year: number) {
  const date = new Date(year, 9, 31); // Oct = 9
  date.setDate(date.getDate() - date.getDay()); // set to last Sunday
  return date;
}

function sundayAfterChristmas(year: number) {
  const christmas = new Date(year, 11, 25); // Dec = 11
  const daysUntilSunday = (7 - christmas.getDay()) % 7;
  christmas.setDate(christmas.getDate() + daysUntilSunday);
  return christmas;
}

export interface ShowContext {
  now: Date | null;       // null on the server / before mount
  goodFridays: string[];  // from runtimeConfig.public
}

function isChristmas(now: Date) {
  const year = now.getFullYear();
  return now > lastSundayOfOctober(year) && now < sundayAfterChristmas(year);
}

function isEaster(now: Date, goodFridays: string[]) {
  const year = now.getFullYear();
  
  // Prefer gov.uk's Good Friday, otherwise calculate (Easter Sunday - 2)
  const goodFriday =
    goodFridays.map(parseDate).find(d => d.getFullYear() === year+1) ??
    addDays(easterSunday(year), -2);

  const start = addDays(goodFriday, -2 - WEEKS_BEFORE_EASTER * 7);
  const end = addDays(goodFriday, DAYS_AFTER_GOOD_FRIDAY);
  const isAfterStart = now >= start;
  const isBeforeEnd = now < end;
  console.log("Hello");
  console.log(isAfterStart, isBeforeEnd);
  return isAfterStart && isBeforeEnd;
}

export interface PromoCard {
  image: string;
  title: string;
  description: string;
  link: string;
  ariaLabel: string;
  buttonText: string;
  show: boolean | ((ctx: ShowContext) => boolean);
}

export const cards: PromoCard[] = [
  {
    image: '/images/christmas-pic-640.webp',
    title: 'Christmas Services',
    description: `Join us this Christmas as we celebrate the birth of Jesus Christ.`,
    link: 'seasonal/christmas-services',
    ariaLabel: 'Christmas Services Image',
    buttonText: 'Find Out More',
    show: ({ now }) => now !== null && isChristmas(now ?? new Date())
  },
  {
    image: '/images/Easter-640.webp',
    title: 'Easter Services',
    description: `Join us for Easter as we celebrate the resurrection of Jesus Christ.`,
    link: '/seasonal/easter',
    ariaLabel: 'Easter Services Image',
    buttonText: 'Find Out More',
    show: ({ now, goodFridays }) => isEaster(now ?? new Date(), goodFridays)
  },
  {
    image: '/images/building/enonOutside-480.webp',
    title: 'I\'m New',
    description: 'Find out more about who we are and what to expect when you visit us',
    link: '/about/',
    ariaLabel: 'I\'m new',
    buttonText: 'Learn More',
    show: false
  },
  {
    image: '/images/bible-320.webp',
    title: 'Sermons',
    description: 'Catch up on all our recent sermons by clicking the link below',
    link: '/sermons',
    ariaLabel: 'Sermons Image',
    buttonText: 'Listen Now',
    show: true
  },
  {
    image: '/images/sunday-club-640.webp',
    title: 'What\'s On',
    description: 'Find out about our regular meetings and what we do.',
    link: '/whats-on',
    ariaLabel: 'What\'s On',
    buttonText: 'See What\'s On',
    show: true
  },
  {
    image: '/images/GMT-MST-640.webp',
    title: 'Testimonies',
    description: 'See the stories of how God has worked in the lives of our members',
    link: '/testimonies',
    ariaLabel: 'Testimonies',
    buttonText: 'See More',
    show: true
  }
];

export function getVisibleCards(ctx: ShowContext) {
  return cards.filter(c => (typeof c.show === 'function' ? c.show(ctx) : c.show));
}