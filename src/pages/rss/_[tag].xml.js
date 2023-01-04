import remark from 'remark'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rss from '@astrojs/rss'

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_PROJECT_DATASET } = import.meta.env

const CONFIG_QUERY = encodeURIComponent('*[_type == "config"]{...,character->{"avatar": image.asset->url, ...}}');
const CONFIG_URL = `https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_STUDIO_PROJECT_DATASET}?query=${CONFIG_QUERY}`;

const POSTS_QUERY = encodeURIComponent('*[_type == "cheep"||_type == "article"]{..., author->{"avatar": image.asset->url, ...}, tags[]->{...}}')
const POSTS_URL = `https://${SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_STUDIO_PROJECT_DATASET}?query=${POSTS_QUERY}`;

// Grab the posts && config
const posts = await (await (await fetch(POSTS_URL)).json()).result
const siteConfig = await (await (await fetch(CONFIG_URL)).json()).result[0]

async function main(post) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process('# Hello, Neptune!')

  console.log(String(file))
}
main(posts[0].body)
console.info({ params: Astro.params })

const metadata = {
  url: siteConfig?.rss?.url || 'https://jhey.dev/',
  title: siteConfig?.rss?.title || 'https://jhey.dev/',
  subtitle: siteConfig?.rss?.subtitle || 'jheys cool posts',
  description: siteConfig?.rss?.description || 'The RSS feed for posts from Jhey Tompkins',
  author: siteConfig.character,
  email: 'Nice',
}

export const get = () => new Promise((resolve, reject) => {
  resolve(`
    <?xml version="1.0" encoding="utf-8"?>
    <rss version="2.0">
      <channel>
        <title>${metadata.title}</title>
        <link>${metadata.url}</link>
        <description>${metadata.description}</description>
        <language>en-us</language>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <managingEditor>${metadata.email} (${metadata.author.name})</managingEditor>
        <webMaster>${metadata.email} (${metadata.author.name})</webMaster>
      </channel>
    </rss>
  `)
})