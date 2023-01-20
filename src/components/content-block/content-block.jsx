import React from 'react'
import slugify from 'slugify'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

import remarkToc from './remarkToc.js'

import defaultComponents from './default-components.jsx'
import articleComponents from './article-components.jsx'
import aboutComponents from './about-components.jsx'
import linksComponents from './links-components.jsx'
import cardComponents from './card-components.jsx'
import bioComponents from './bio-components.jsx'
import footerComponents from './footer-components.jsx'
import rssComponents from './rss-components.jsx'

const remarkPlugins = [[remarkGfm, { singleTilde: false }]]
const rehypePlugins = [rehypeRaw]

const ContentBlock = ({ type, children }) => {
  let components = { ...defaultComponents }
  if (type === 'card' || type === 'cheep')
    components = { ...defaultComponents, ...cardComponents }
  if (type === 'bio') components = { ...defaultComponents, ...bioComponents }
  if (type === 'article')
    components = { ...defaultComponents, ...articleComponents }
  if (type === 'footer')
    components = { ...defaultComponents, ...footerComponents }
  if (type === 'rss')
    components = rssComponents
  if (type === 'links')
    components = { ...defaultComponents, ...linksComponents }
  if (type === 'about')
    components = { ...defaultComponents, ...aboutComponents }

  return (
    <Markdown
      remarkPlugins={
        type === 'article' ? [...remarkPlugins, remarkToc] : [...remarkPlugins]
      }
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {children}
    </Markdown>
  )
}

export default ContentBlock