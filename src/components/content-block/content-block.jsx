import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

const remarkPlugins = [[remarkGfm, { singleTilde: false }]]
const rehypePlugins = [rehypeRaw]

const defaultComponents = {
  pre({ node, ...props }) {
    return <pre className="rounded-lg bg-black p-4 m-0 overflow-auto">{props.children}</pre>
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={nightOwl}
        language={match[1]}
        useInlineStyles={true}
        PreTag={({ children }) => (<>{children}</>)}
        codeTagProps={
          {
            className: 'code w-full text-white font-mono',
          }
        }
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
      return <video {...props} controls loop muted></video>
    }
    if (props.src.endsWith('.mp3')) {
      return <audio {...props} controls loop></audio>
    }
    return <img {...props} />
  },
  codepen({ node, ...props }) {
    return (
      <iframe
        height="300"
        className="m-0 max-w-[100vw] bleed transform relative left-1/2 -translate-x-1/2"
        scrolling="no"
        title={props.title}
        src={`https://codepen.io/jh3y/embed/preview/${props.id}?default-tab=result&editable=true&theme-id=43641`}
        frameborder="no"
        loading="lazy"
        allowtransparency="true"
        allowfullscreen="true"
      >
        See the Pen by Jhey (<a href="https://codepen.io/jh3y">@jh3y</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </iframe>
    )
  },
  a({ node, children, ...props }) {
    if (props.href.startsWith('http')) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }

    return <a {...props}>{children}</a>
  },
}

const articleComponents = {
  pre({ node, ...props }) {
    return <pre className=" lg:rounded-lg bg-black p-4 m-0 max-w-[100vw] bleed overflow-auto transform relative left-1/2 -translate-x-1/2">{props.children}</pre>
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={nightOwl}
        language={match[1]}
        useInlineStyles={true}
        PreTag={({ children }) => (<>{children}</>)}
        codeTagProps={
          {
            className: 'code w-full text-white font-mono',
          }
        }
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
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
      return <audio className="rounded-lg" {...props} controls loop></audio>
    }
    return <img className="rounded-lg" {...props} />
  },
}

const ContentBlock = ({ type, children }) => {
  let components = { ...defaultComponents }
  if (type === 'card') components = {...defaultComponents, ...cardComponents }
  if (type === 'article') components = {...defaultComponents, ...articleComponents }
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