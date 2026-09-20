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

function showChristmasCard() {
  const now = new Date();
  const year = now.getFullYear();

  const lastSunday = lastSundayOfOctober(year);
  const sundayAfter = sundayAfterChristmas(year);

  return now > lastSunday && now < sundayAfter;
}

export const cards = [
  {
    image:'/images/christmas-pic-640.webp',
    title: 'Christmas Services',
    description: `Join us this Christmas as we celebrate the birth of Jesus Christ.`,
    link: 'seasonal/christmas-services',
    ariaLabel: 'Christmas Services Image',
    buttonText: 'Find Out More',
    show: showChristmasCard()
  },
  {
    image:'/images/Easter-640.webp',
    title: 'Easter Services',
    description: `Join us for Easter as we celebrate the resurrection of Jesus Christ.`,
    link: '/seasonal/easter',
    ariaLabel: 'Easter Services Image',
    buttonText: 'Find Out More',
    show: false
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
    image: '/images/events/SCP-2026-07-12/4-640.webp',
    title: 'What\'s On',
    description: 'Find out about our regular meetings and what we do.',
    link: '/whats-on',
    ariaLabel: 'What\'s On',
    buttonText: 'See What\'s On',
    show: true
  },
  {
    image: '/images/people/testimonyCard-640.webp',
    title: 'Testimonies',
    description: 'See the stories of how God has worked in the lives of our members',
    link: '/testimonies',
    ariaLabel: 'Testimonies',
    buttonText: 'See More',
    show: true
  },
  {
    image: '/images/mission/globe-480.webp',
    title: 'Mission',
    description: 'We believe the Gospel is meant for everyone. Find out those who we support.',
    link: '/links/mission',
    ariaLabel: 'Mission',
    buttonText: 'Find out More',
    show: true
  }

]