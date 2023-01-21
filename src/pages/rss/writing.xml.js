import { genRssMarkup } from './_htmlGenerator.js'
import { getRssData } from '../../constants/queries.js'

const {
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
      url: article._type === 'article' ? article.link : `${metadata.url}cheep/${article.slug.current}`,
      body: article.body || `Check out <a href="${article.link}">this post</a> from Jhey over on <a href="${article.link}">${article.where}</a>!`,
    }
  }).sort((a, b) => {
    const dateA = new Date(a.publishedAt)
    const dateB = new Date(b.publishedAt)
    return dateB - dateA
  })
  resolve({ body: genRssMarkup(writingPosts, metadata) })
})