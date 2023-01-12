import { genRssMarkup } from './_htmlGenerator.js'
import { getRssData } from '../../constants/queries.js'

const { posts, config: siteConfig, tags: allTags } = await getRssData()

export function getStaticPaths() {
  const tagPaths = allTags.map((tag) => {
    return { params: { tag: tag.title.toLowerCase() } }
  })
  return tagPaths
}

export const get = ({ params, request }) =>
  new Promise((resolve, reject) => {
    const metadata = {
      url: siteConfig?.rss?.url || 'https://jhey.dev/',
      title: siteConfig?.rss?.title || 'https://jhey.dev/',
      subtitle: siteConfig?.rss?.subtitle || 'Posts from Jhey',
      description: `The RSS feed for ${params.tag} posts from Jhey Tompkins`,
      author: siteConfig.character,
      email: 'rss@jhey.dev',
      tag: params.tag,
    }
    resolve({
      body: genRssMarkup(
        posts.map((post) => ({
          ...post,
          url: `${metadata.url}post/${post.slug.current}`,
        })),
        metadata
      ),
    })
  })