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

export default genHtml