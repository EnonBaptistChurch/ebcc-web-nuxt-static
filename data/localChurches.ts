export interface Church {
  name: string;
  url: string;
  pastor: string;
  description: string;
  location: string;
}

export const localChurches: Church[] = [
  {
    name: 'Granary Evangelical Church',
    url: 'https://granarychurch.org.uk/',
    pastor: 'Danny Hawkes',
    description: 'A small, friendly, Evangelical church meeting to worship God in Rainham, Kent',
    location: 'Rainham Community Centre, Granary Close, Rainham, Kent, ME8 7SG',
  },
  {
    name: 'Halling Baptist Church',
    url: 'https://hallingbaptist.org.uk/',
    pastor: 'Kevin Félix Hollington',
    description: 'A Grace Baptist Partnership Church in Halling.',
    location: 'The Old Fire Station, Vicarage Road, Halling, Rochester, Kent ME2 1BE',
  },
  {
    name: 'Waterford House Evangelical Free Church',
    url: 'https://whefc.co.uk/',
    pastor: 'Adrian Tribe',
    description: 'An Independent Evangelical Church in Strood.',
    location: '101 Rede Ct Rd, Rochester ME2 3TE',
  },
  {
    name: 'Wigmore Evangelical Free Church',
    url: 'https://www.wigmorefreechurch.org.uk/',
    pastor: 'Timothy Wood',
    description: 'An FIEC church based in Wigmore, Gillingham.',
    location: 'Durham Road, Rainham, Kent, ME8 0JN',
  },
];
