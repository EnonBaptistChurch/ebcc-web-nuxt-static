export interface Church {
  name: string;
  url: string;
  pastor: string;
  description: string;
  location: string;
  imgSrc?: string;
}

export const localChurches: Church[] = [
  {
    name: 'Granary Evangelical Church',
    url: 'https://granarychurch.org.uk/',
    pastor: 'Danny Hawkes',
    description: 'A small, friendly, Evangelical church meeting to worship God in Rainham, Kent',
    location: 'Rainham Community Centre, Granary Close, Rainham, Kent, ME8 7SG',
    imgSrc: "https://granarychurch.org.uk/wp-content/uploads/2024/12/oast-home-pic-1.jpg"
    
  },
  {
    name: 'Halling Baptist Church',
    url: 'https://hallingbaptist.org.uk/',
    pastor: 'Kevin Félix Hollington',
    description: 'A Grace Baptist Partnership Church in Halling.',
    location: 'The Old Fire Station, Vicarage Road, Halling, Rochester, Kent ME2 1BE',
    imgSrc: "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/326542226_871998017215478_1603233835229363714_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=u8-ItcE7FO4Q7kNvwE2146Q&_nc_oc=AdrrKwXUZyFKW4ImaP_HM-x-4hy7O-BGZF11f7FKkesFADQsXt3Lx7l3sWBeuZW7Bgg&_nc_zt=23&_nc_ht=scontent-lhr8-2.xx&_nc_gid=XSXQRDxyTVXsTNPv69J_Xg&_nc_ss=7a2a8&oh=00_Af3ieIr_D5NCEDp_FJACR32GTDuTx8i_PzRCh8vbiB5vBg&oe=69F2E453"
  },
  {
    name: 'Waterford House Evangelical Free Church',
    url: 'https://whefc.co.uk/',
    pastor: 'Adrian Tribe',
    description: 'An Independent Evangelical Church in Strood.',
    location: '101 Rede Ct Rd, Rochester ME2 3TE',
    imgSrc:"https://whefc.co.uk/wp-content/uploads/2015/12/church-sm.jpg"
  },
  {
    name: 'Wigmore Evangelical Free Church',
    url: 'https://www.wigmorefreechurch.org.uk/',
    pastor: 'Timothy Wood',
    description: 'An FIEC church based in Wigmore, Gillingham.',
    location: 'Durham Road, Rainham, Kent, ME8 0JN',
    imgSrc: "https://www.wigmorefreechurch.org.uk/uploads/5/6/4/4/56449325/editor/sideonoutsidejpg.jpg?1643644378"
  },
];
