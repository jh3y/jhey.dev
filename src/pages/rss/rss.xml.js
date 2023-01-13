import { getRssData } from '../../constants/queries.js'
import { genRssMarkup } from './_htmlGenerator.js'

const { cheeps, config: siteConfig } = await getRssData()

const metadata = {
  url: siteConfig?.rss?.url || 'https://jhey.dev/',
  title: siteConfig?.rss?.title || 'Jhey Tompkins',
  subtitle: siteConfig?.rss?.subtitle || 'Posts from Jhey',
  description:
    siteConfig?.rss?.description || 'The RSS feed for posts from Jhey Tompkins',
  author: siteConfig.character,
  email: 'rss@jhey.dev',
}

export const get = () =>
  new Promise((resolve, reject) => {
    resolve({
      body: genRssMarkup(
        cheeps.map((cheep) => ({
          ...cheep,
          url: `${metadata.url}cheep/${cheep.slug.current}`,
        })),
        metadata
      ),
    })
  })