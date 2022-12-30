import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

const remarkPlugins = [[remarkGfm, { singleTilde: false }]]
const rehypePlugins = [rehypeRaw]

const defaultComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={nightOwl}
        language={match[1]}
        PreTag="div"
        className="rounded-lg"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  img({ node, ...props }) {
    if (props.src.endsWith('.mp4')) {
      return (
        <video {...props} controls loop muted></video>
      )
    }
    if (props.src.endsWith('.mp3')) {
      return (
        <audio {...props} controls loop></audio>
      )
    }
    return (
      <img {...props}/>
    )
  },
  codepen({ node, children }) {
    return <h1>Hello World!</h1>
  },
  a({ node, children, ...props }) {
    if (props.href.startsWith('http')) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }

    return <a {...props}>{children}</a>
  },
}

const cardComponents = {
  img({ node, ...props }) {
    if (props.src.endsWith('.mp4')) {
      return (
        <video className="rounded-lg" {...props} controls loop muted></video>
      )
    }
    if (props.src.endsWith('.mp3')) {
      return (
        <audio className="rounded-lg" {...props} controls loop></audio>
      )
    }
    return (
      <img className="rounded-lg" {...props}/>
    )
  }
}

const ContentBlock = ({ type, children }) => {
  const components = {...defaultComponents}
  if (type === 'card') components.img = cardComponents.img
  return (
    <Markdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {children}
    </Markdown>
  )
}

export default ContentBlock
