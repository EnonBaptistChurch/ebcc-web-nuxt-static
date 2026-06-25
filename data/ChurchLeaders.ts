export type BioLink = {
  label: string
  href: string
}

export type BioParagraph = {
  text: string
  links?: BioLink[]
}

export type Elder = {
  name: string
  elderTitle: string
  photo?: string
  bio?: BioParagraph[]
  testimonyLink?: string
}

export const Elders: Elder[] = [
  {
    name: "Paul Relf",
    elderTitle: "Pastor",
    photo: "/images/leaders/PR-8258.webp",
    bio: [
      {
        text:
          "Paul became our pastor in June 2006, after a period of itinerant preaching."
      },
      {
        text:
          "Before entering pastoral ministry, he worked as a partner in a small firm of Chartered Accountants in London where he dealt with several charities in addition to other clients."
      },
      {
        text:
          "Married to Bridget, they have four grown children and a number of grandchildren. In his free time, he enjoys gardening, watching the news and playing games."
      },
      {
        text:
          "As well as serving as our pastor, he also serves on the board of directors of Grace Baptist Trust Corporation and occasionally writes book reviews for the Evangelical Times.",
        links: [
          {
            label: "Grace Baptist Trust Corporation",
            href: "https://gbtc.org.uk/"
          },
          {
            label: "Evangelical Times",
            href: "https://www.evangelical-times.org/author/paul-relf/"
          }
        ]
      }
    ]
  },
  {
    name: "Graham Trice",
    elderTitle: "Elder",
    photo: "",
    bio: [],
    testimonyLink: "/testimonies/graham-trice"
  }
]