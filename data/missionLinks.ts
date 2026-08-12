export interface MissionLink {
  name: string;
  link: string;
  description: string;
  prayer?: boolean;
  imgSrc?: string | string[];
  bgColor?: string;
}


const missionLinks: MissionLink[] = [
  {
    name: "African Pastors' Conference",
    link: "https://africanpastorsconferences.org/",
    description: "African Pastors’ Conferences exists to glorify God through Jesus Christ in enabling Pastors to lead Christ-exalting Biblical churches as Christ-like servant leaders through the faithful ministry of God’s word in preaching and leading Bible-studies. ",
    prayer: true,
    imgSrc: "https://africanpastorsconferences.org/Graphics/logo.jpg"
  },
  {
    name: "CCM (Philippines)",
    link: "https://www.ccmmanila.org/",
    description: "Christian Compassion Ministries serves poor communities in the Philippines through church-based outreach, providing education, discipleship, and practical support to children and families.",
    prayer: true,
    imgSrc:"https://www.ccmmanila.org/wp-content/uploads/2018/01/FINAL-CROPPED-white.png",
    bgColor: "#2d5c88"
  },
  {
    name: "Grace Baptist Mission",
    link: "https://www.gbm.org.uk/",
    description: "Grace Baptist Mission exists to help churches support their missionaries worldwide.  We also support GBM Radio's ministry, broadcasting in French and English to hard-to-reach places around the world.",
    prayer: true,
    imgSrc:"https://www.gbm.org.uk/wp-content/uploads/2020/12/GBM-2020-updated-logo_-CMYK-100x100.jpg"
  },
  {
    name: "Morning Star (South Africa)",
    link: "https://www.livinghope.co.za/where-we-work/free-state-morning-star/",
    description: "Morning Star Mission works in South Africa to reach and disciple communities through church planting, education, and practical care, with a focus on gospel transformation. It began in 2000 as a ministry for children affected by AIDS and is now transitioning into supporting those same children as teenagers and young adults, under the oversight of the charity Living Hope.",
    prayer: true,
    imgSrc: ["/images/mission/morning-star-logo-320.webp","https://www.livinghope.co.za/wp-content/uploads/2018/07/main-logo-1.png"],
  },
  {
    name: "Open Doors",
    link: "https://www.opendoorsuk.org",
    description: "Supporting persecuted Christians in over 70 countries, providing Bibles, training, and advocacy for those who suffer for their faith. We often pray for our persecuted brothers and sisters in Christ, and Open Doors provides us with updates and prayer points to guide our prayers.",
    prayer: true,
    imgSrc:"https://www.opendoorsuk.org/wp-content/uploads/2022/05/logo.svg"
  },
  {
    name: "Rosie Crowter – UFM",
    link: "https://www.ufm.org.uk/member/rosie-crowter/",
    description: "Rosie Crowter has served in Papua New Guinea for over 35 years. Over that time, she has witnessed enormous change – in the culture, the church, and the country itself – and remains passionate about seeing God’s Word take deep root in the lives of believers across PNG.",
    prayer: true,
    imgSrc: "https://www.ufm.org.uk/ufm/wp-content/uploads/2022/06/Crowter_Rosie_1920px.jpg"
  },
  {
    name: "Vuyiroli",
    link: "https://vuyiroli.org/en-gb/",
    description: "Vuyiroli is a non-profit organization that serves the abandoned elderly in need, regardless of caste, creed, religion, or language. Providing homes for the elderly who have no one else to care for them.",
    imgSrc: "https://vuyiroli.org/wp-content/uploads/2015/01/vuyiroli-combined1.png"
  }
];

export default missionLinks;