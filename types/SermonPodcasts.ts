export interface PodcastFeed {
  rss: {
    channel: PodcastChannel
  }
}

export interface PodcastChannel {
  title: string
  description: string
  link: string
  generator?: string
  lastBuildDate?: string
  author?: string
  copyright?: string
  language?: string
  itunesAuthor?: string
  itunesSummary?: string
  itunesType?: string
  itunesOwner?: ItunesOwner
  itunesExplicit?: string | boolean
  itunesCategory?: ItunesCategory
  itunesImage?: { href: string }
  items: PodcastItem[]
}

export interface ParsedSnippet {
  title: string
  speaker: string
  date: string
  service?: string
}

export interface ItunesOwner {
  name: string
  email?: string
}

export interface ItunesCategory {
  text: string
  subcategory?: ItunesCategory
}

export interface PodcastItem {
  title: string
  description: string
  link: string
  guid: string
  dcCreator?: string
  pubDate: string
  enclosure: Enclosure
  itunes: Itunes,
  itunesSummary?: string
  itunesExplicit?: string | boolean
  itunesDuration?: string
  itunesImage?: { href: string }
  itunesSeason?: string | number
  itunesEpisode?: string | number
  itunesEpisodeType?: string,
  parsedSnippet: ParsedSnippet | null
}

interface Itunes {
  summary?: string
  explicit?: string | boolean
  duration?: string
  image?: string 
  season?: string | number
  episode?: string | number
  episodeType?: string,
}

export interface Enclosure {
  url: string
  length: string | number
  type: string
}