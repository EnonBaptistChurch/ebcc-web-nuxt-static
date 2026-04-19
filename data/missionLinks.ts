export interface MissionLink {
  name: string;
  link: string;
  description: string;
  prayer?: boolean;
  imgSrc?: string
}

const missionLinks: MissionLink[] = [
  {
    name: "Vuyiroli",
    link: "https://vuyiroli.org/en-gb/",
    description: "Vuyiroli is a non-profit organization that serves the abandoned elderly in need, regardless of caste, creed, religion, or language. Providing homes for the elderly who have no one else to care for them.",
    imgSrc: "https://vuyiroli.org/wp-content/uploads/2015/01/vuyiroli-combined1.png"

  },
  {
    name: "Grace Baptist Mission",
    link: "https://www.gbm.org.uk/",
    description: "Grace Baptist Mission exists to help churches support their missionaries worldwide.",
    prayer: true,
    imgSrc:"https://www.gbm.org.uk/wp-content/uploads/2020/12/GBM-2020-updated-logo_-CMYK-100x100.jpg"
  },
  {
    name: "Open Doors",
    link: "https://www.opendoors.org.uk",
    description: "Supporting persecuted Christians in over 70 countries, providing Bibles, training, and advocacy for those who suffer for their faith.",
    prayer: true,
    imgSrc:"https://www.opendoorsuk.org/wp-content/uploads/2022/05/logo.svg"
  },
  {
    name: "Rosie Crowter – UFM",
    link: "https://www.ufm.org.uk",
    description: "Serving with UFM Worldwide in cross-cultural gospel mission.",
    prayer: true,
  },
  {
    name: "African Pastors' Conference",
    link: "https://africanpastorsconferences.org/",
    description: "African Pastors’ Conferences exists to glorify God through Jesus Christ in enabling Pastors to lead Christ-exalting Biblical churches as Christ-like servant leaders through the faithful ministry of God’s word in preaching and leading Bible-studies.",
    prayer: true,
    imgSrc: "https://africanpastorsconferences.org/Graphics/logo.jpg"
  }
];

export default missionLinks;