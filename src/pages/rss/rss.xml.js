import { getRssData } from '../../constants/queries.js'
import { genRssMarkup } from './_htmlGenerator.js'

const { cheeps, writing: allWriting, config: siteConfig } = await getRssData()

const metadata = {
  url: siteConfig?.rss?.url || 'https://jhey.dev/',
  title: siteConfig?.rss?.title || 'Jhey Tompkins',
  subtitle: siteConfig?.rss?.subtitle || 'Posts from Jhey',
  description:
    siteConfig?.rss?.description || 'The RSS feed for posts from Jhey Tompkins',
  author: siteConfig.character,
  email: 'rss@jhey.dev',
}

const cheepPosts = cheeps.map((cheep) => ({
  ...cheep,
  url: `${metadata.url}cheep/${cheep.slug.current}`,
}))
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
})

const posts = [...cheepPosts, ...writingPosts].sort((a, b) => {
  const dateA = new Date(a.publishedAt)
  const dateB = new Date(b.publishedAt)
  return dateB - dateA
})

export const get = () =>
  new Promise((resolve, reject) => {
    resolve({
      body: genRssMarkup(
        posts,
        metadata
      ),
    })
  })