export interface MissionLink {
  name: string;
  link: string;
  description: string;
  prayer?: boolean;
}

const missionLinks: MissionLink[] = [
  {
    name: "Vuyiroli",
    link: "https://vuyiroli.org/en-gb/",
    description: "Vuyiroli is a non-profit organization that serves the abandoned elderly in need, regardless of caste, creed, religion, or language. Providing homes for the elderly who have no one else to care for them.",
  },
  {
    name: "Grace Baptist Mission",
    link: "https://www.gbm.org.uk/",
    description: "Grace Baptist Mission exists to help churches support their missionaries worldwide.",
  },
  {
    name: "Open Doors",
    link: "https://www.opendoors.org.uk",
    description: "Supporting persecuted Christians in over 70 countries, providing Bibles, training, and advocacy for those who suffer for their faith.",
    prayer: true,
  },
  {
    name: "Rosie Crowter – UFM",
    link: "https://www.ufm.org.uk",
    description: "Serving with UFM Worldwide in cross-cultural gospel mission.",
    prayer: true,
  },
];

export default missionLinks;