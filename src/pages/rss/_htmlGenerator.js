import React from 'react'
import ReactDom from 'react-dom/server'
import sanitizeHtml from 'sanitize-html';
import ContentBlock from '../../components/content-block/content-block.jsx'

const genHtml = children => {
  const content = ReactDom.renderToStaticMarkup(
    React.createElement(ContentBlock, {
      children,
      type: 'rss'
    })
  )
  return sanitizeHtml(content)
}

export default genHtml
