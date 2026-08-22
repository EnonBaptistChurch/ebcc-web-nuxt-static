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
    photo: "/images/leaders/PR-8258-320.webp",
    bio: [
      {
        text:
          "Paul became our pastor in June 2006, after a period of itinerant preaching and some years of part time theological training."
      },
      {
        text:
          "Before entering pastoral ministry, he worked as a partner in a small firm of Chartered Accountants in London where he dealt with several charities in addition to other clients."
      },
      {
        text:
          "Married to Bridget, they have four married children and a number of grandchildren. In his free time, he enjoys gardening, country walks and playing games."
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
    bio: [
      {
        text: "Graham serves as an elder at Enon Baptist Church."
      },
      {
        text: "Graham previously has worked as a nurse and then served as a missionary in Nigeria, and later pastored Churches in the North and the South East of London."
      },
      {
        text: "Married to MeeSuan, they have 3 grown married children and a number of grandchildren. In his free time, he too enjoys gardening as well as writing."
      },
      {
        text: "He has written books on the Psalms and \"Angels: A Study of God's Special Agents\" "
      }
    ],
    testimonyLink: "/testimonies/graham-trice"
  }
]