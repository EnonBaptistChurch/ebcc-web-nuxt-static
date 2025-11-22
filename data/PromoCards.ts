export const cards = [
  
  {
    image:'/images/christmas-pic-640.webp',
    title: 'Christmas Services',
    description: `Join us this Christmas as we celebrate the birth of Jesus Christ.`,
    link: '/christmas-services',
    ariaLabel: 'Christmas Services Image',
    buttonText: 'Find Out More',
    show: new Date(Date.now()) > new Date('2025-10-26') && new Date(Date.now()) < new Date('2025-12-26')
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
    image: '/images/bible-640.webp',
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

]