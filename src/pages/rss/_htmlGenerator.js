import React from 'react'
import ReactDom from 'react-dom/server'
import sanitizeHtml from 'sanitize-html'
import ContentBlock from '../../components/content-block/content-block.jsx'

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
  'hr',
  'audio',
  'video',
  'blockquote',
]

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  audio: ['src', 'controls'],
}

const genHtml = (children) => {
  const content = ReactDom.renderToStaticMarkup(
    React.createElement(ContentBlock, {
      children,
      type: 'rss',
    })
  )

  return sanitizeHtml(content, {
    allowedTags,
    allowedAttributes,
  })
}

export const generatePosts = (posts, metadata) => posts.map(post => {
    if (post.excludeFromRss) return null
    let tags = post.tags ? [...post?.tags.filter(t => t !== null)] : []
    if (post._type === 'cheep' && post.article) {
      for (const article of post.article) {
        if (article.tags) {
          for (const tag of article.tags) {
            if(!tags.find(t => t._id === tag._id)) tags.push(tag)
          }
        }
      }
    }

    if (metadata.tag && metadata.tag !== 'writing' && tags.length !== 0 && !tags.find(tag => tag.title.toLowerCase() === metadata.tag.toLowerCase())) return null

    return (`
      <item>
        <title>${post.title}</title>
        <link>${post.url}</link>
        <author>${metadata.email} (${post.author.name})</author>
        ${post.body || post.cheep ?
          `<description><![CDATA[${genHtml(post.body || post.cheep)}]]></description>`
          :
          ''
        }
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <guid isPermaLink="true">${post.url}</guid>
        <source url="${metadata.url}rss/${metadata.tag ? `${metadata.tag}` : 'rss'}.xml">Jhey Tompkins${metadata.tag ? ` ${metadata.tag}` : ''} RSS feed</source>
        ${tags !== undefined && tags.length > 0 ? tags.map(tag => (`
          <category>${tag.title}</category>
        `)).join('') : ''}
      </item>
    `)
  }).join('')

export const genRssMarkup = (posts, metadata) => `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
    xmlns:georss="http://www.georss.org/georss"
    xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
  >
    <channel>
      <title>${metadata.title}</title>
      <link>${metadata.url}</link>
      <atom:link href="${metadata.url}rss/${metadata.tag ? metadata.tag : 'rss'}.xml" rel="self" type="application/rss+xml" />
      <description>${metadata.description}</description>
      <language>en-us</language>
      <copyright>Jhey Tompkins ${new Date().getFullYear()}</copyright>
      <docs>https://www.rssboard.org/rss-specification</docs>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <managingEditor>${metadata.email} (${metadata.author.name})</managingEditor>
      <webMaster>${metadata.email} (${metadata.author.name})</webMaster>
      <image>
        <url>${metadata.url}${metadata.author.avatar.slice(1)}</url>
        <title>${metadata.title}</title>
        <link>${metadata.url}</link>
      </image>
      ${posts.length > 0 ? generatePosts(posts, metadata) : ''}
    </channel>
  </rss>
`