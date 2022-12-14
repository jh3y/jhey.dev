import { genRssMarkup } from './_htmlGenerator.js'
import { getRssData } from '../../constants/queries.js'

const {
  posts,
  config: siteConfig,
  tags: allTags,
  writing: allWriting,
} = await getRssData()

export const get = () => new Promise((resolve, reject) => {
  const metadata = {
    url: siteConfig?.rss?.url || 'https://jhey.dev/',
    title: siteConfig?.rss?.title || 'https://jhey.dev/',
    subtitle: siteConfig?.rss?.subtitle || 'Posts from Jhey',
    description: `The RSS feed for all writing from Jhey Tompkins`,
    author: siteConfig.character,
    email: 'rss@jhey.dev',
    tag: 'writing'
  }
  const writingPosts = allWriting.writing.map(article => {
    return {
      ...article,
      author: {
        name: 'Jhey Tompkins',
      },
      publishedAt: article.publishedAt || article.when,
      url: article.hasOwnProperty('category') ? article.links[0].link : `${metadata.url}post/${article.slug.current}`
    }
  })
  resolve({ body: genRssMarkup(writingPosts, metadata) })
})