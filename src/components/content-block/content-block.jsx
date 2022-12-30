import React from 'react'
import slugify from 'slugify'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

const remarkPlugins = [[remarkGfm, { singleTilde: false }]]
const rehypePlugins = [rehypeRaw]

const defaultComponents = {
  strong({ node, ...props }) {
    return <strong className="bold" {...props}></strong>
  },
  li({ node, className, children, ...props }) {
    return <li className={className ? 'flex gap-x-2' : 'pl-1'} {...props}>{children}</li>
  },
  ol({ node, children, ...props }) {
    return <ol className="list-decimal pl-8 mb-6" {...props}>{children}</ol>
  },
  input({ node, type, checked, ...props }) {
    if (type === 'checkbox') {
      return <input {...props} type="checkbox" disabled={checked ? false : true} checked={checked}></input>
    }
  },
  ul({ node, className, children, ...props }) {
    return <ul {...props} className={`${className ? 'pl-3 mb-6' : 'list-disc pl-8 mb-6'}`}>{children}</ul>
  },
  pre({ node, ...props }) {
    return <pre className="rounded-lg bg-black p-4 m-0 overflow-auto mb-6">{props.children}</pre>
  },
  p({ node, ...props }) {
    const interactive = node.children.find(child => child.tagName === 'tweet' || child.tagName === 'codepen')
    if (interactive) return <>{props.children}</>
    return <p {...props} className="mb-6"></p>
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
  tweet({ node, account = 'jh3yy', id, ...props }) {
    return (
      <>
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={`https://twitter.com/${account}/status/${id}`}>Check out this tweet!</a>
        </blockquote>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </>
    )
  },
  codepen({ node, ...props }) {
    return (
      <iframe
        height="300"
        className="m-0 mb-6 max-w-[100vw] bleed transform relative left-1/2 -translate-x-1/2"
        scrolling="no"
        title={props.title}
        src={`https://codepen.io/jh3y/embed/preview/${props.id}?default-tab=result&editable=true&theme-id=43641`}
        frameBorder="no"
        loading="lazy"
        allowtransparency="true"
        allowFullScreen={true}
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
  h2({ node, children, ...props }) {
    const id = `#${slugify(node.children[0].value.toLowerCase(), {
      remove: /[*+~.()'"!:@?]/g,
    })}`
    return (
      <h2 id={id} tabIndex="-1" className="flex gap-x-2 items-center">
        <span>
          {children}    
        </span>
        <a href={id} title="permalink" className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
          </svg>
        </a>
      </h2>
    )
  },
  pre({ node, ...props }) {
    return <pre className="mb-6 lg:rounded-lg bg-black p-4 m-0 max-w-[100vw] bleed overflow-auto transform relative left-1/2 -translate-x-1/2">{props.children}</pre>
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