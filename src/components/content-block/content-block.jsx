import React from 'react'
import slugify from 'slugify'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

const headingBold = ({ node, ...props }) => {
  return React.createElement(node.tagName, {
    className: 'font-bold mb-6',
    ...props,
  })
}

const remarkToc = () => {
  return (tree, file) => {
    let headers = []
    visit(tree, 'heading', (node) => {
      headers.push(node)
    })
    visit(tree, 'html', (node) => {
      if (node.value.indexOf('<TableOfContents') !== -1) {
        node.type = 'html'
        const children = headers
          .map((h) => {
            if (h.depth < 2) return null
            const id = slugify(h.children[0].value.toLowerCase(), {
              remove: /[*+~.()'"!:@?]/g,
            })
            return `
              <li class="uppercase text-fluid--1 pl-1 ${
                h.depth > 2 ? 'ml-6' : 'ml-2'
              }">
                <a href="#${id}" className="text-text-1 block w-full decoration-brand-stroke">${
              h.children[0].value
            }</a>
              </li>`
          })
          .join('')
        node.value = `
          <aside data-type="tableofcontents">
            <details role="navigation" className="bg-surface-2 p-4">
              <summary class="flex justify-between cursor-pointer">
                <span class="uppercase text-fluid--1 font-bold">Table of Contents</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-brand-stroke">
                  <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                </svg>
              </summary>
              <ul className="mb-0 list-disc pl-4 pt-4 grid gap-y-1">
                ${children}
              </ul>
            </details>
          </aside>
        `
      }
    })
  }
}

const remarkPlugins = [[remarkGfm, { singleTilde: false }]]
const rehypePlugins = [rehypeRaw]

const defaultComponents = {
  aside({ node, dataType, ...props }) {
    if (node?.properties?.dataType === 'tableofcontents') {
      return (
        <aside className="my-12" {...props}>
          {props.children}
        </aside>
      )
    }
    return (
      <aside
        className="relative my-12 rounded-lg bg-surface-3 text-text-2 p-8"
        {...props}
      >
        {node?.properties?.dataType && (
          <span className="absolute top-0 left-0 p-2 bg-surface-4 rounded-md -translate-x-1/4 border-2 border-surface-1 -translate-y-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              {node?.properties?.dataType === 'warning' && (
                <>
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </>
              )}
              {node?.properties?.dataType === 'note' && (
                <>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </>
              )}
            </svg>
          </span>
        )}
                  <path fillRule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
        {props.children}
      </aside>
    )
  },
  hr({ node, ...props }) {
    return <hr className="my-16 w-1/2 mx-auto"></hr>
  },
  strong({ node, ...props }) {
    return <strong className="bold" {...props}></strong>
  },
  li({ node, className, children, ...props }) {
    let key
    if (className === 'task-list-item') {
      const id = slugify(children[1].toLowerCase(), {
        remove: /[*+~.()'"!:@?]/g,
      })
      return (
        <li className="flex gap-x-2">
          <input id={id} type="checkbox" disabled={!children[0].props.checked} defaultChecked={children[0].props.checked} />
          <label htmlFor={id}>{children[1]}</label>
        </li>
      )
    }
    return <li className={className ? className : 'pl-1'}>{children}</li>
  },
  ol({ node, children, ...props }) {
    return <ol className="list-decimal pl-8 mb-6">{children}</ol>
  },
  blockquote({ node, ...props }) {
    return (
      <blockquote
        {...props}
        className="mb-6 border-l-4 pl-8 border-brand-stroke italic"
      ></blockquote>
    )
  },
  input({ node, type, checked, ...props }) {
    if (type === 'checkbox') {
      return (
        <input
          {...props}
          type="checkbox"
          disabled={checked ? false : true}
          defaultChecked={checked}
        ></input>
      )
    }
  },
  h1: headingBold,
  h2: headingBold,
  h3: headingBold,
  ul({ node, className, children, ...props }) {
    if (className === 'contains-task-list') {
      return <ul className="pl-3 mb-6">{children}</ul>
    }
    return (
      <ul className={`${className ? className : 'list-disc pl-8 mb-6'}`}>
        {children}
      </ul>
    )
  },
  pre({ node, ...props }) {
    return (
      <pre className="rounded-lg bg-[var(--gray-8)] p-4 m-0 overflow-auto mb-6">
        {props.children}
      </pre>
    )
  },
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
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
        useInlineStyles={false}
        PreTag={({ children }) => <>{children}</>}
        codeTagProps={{
          className: 'code w-full text-white font-mono font-bold',
        }}
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
      <div className="mb-6 rounded-lg grid place-items-center">
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={`https://twitter.com/${account}/status/${id}`}>
            Check out this tweet!
          </a>
        </blockquote>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
      </div>
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
        <a href={`https://codepen.io/jh3y/${props.id}`}>CodePen</a>.
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
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    if (interactive) return <>{props.children}</>
    return (
      <p
        {...props}
        className={`mb-6 ${
          node?.position?.start?.line === 1
            ? 'first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left'
            : ''
        }`}
      ></p>
    )
  },
  h2({ node, children, ...props }) {
    const id = `${slugify(node.children[0].value.toLowerCase(), {
      remove: /[*+~.()'"!:@?]/g,
    })}`
    return (
      <h2
        id={id}
        tabIndex="-1"
        className="scroll-mt-16 flex gap-x-2 items-center mb-6 mt-24 font-bold"
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          title="permalink"
          className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </a>
      </h2>
    )
  },
  h3({ node, children, ...props }) {
    const id = `${slugify(node.children[0].value.toLowerCase(), {
      remove: /[*+~.()'"!:@?]/g,
    })}`
    return (
      <h3
        id={id}
        tabIndex="-1"
        className="scroll-mt-16 flex gap-x-2 items-center mb-2 mt-12 font-bold"
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          title="permalink"
          className="w-11 h-11 text-text-1 grid place-items-center hover:bg-surface-4 rounded-md hover:text-brand-stroke"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </a>
      </h3>
    )
  },
  pre({ node, ...props }) {
    return (
      <pre className="mb-6 group lg:rounded-lg bg-[var(--gray-8)] p-4 m-0 max-w-[100vw] bleed overflow-auto transform relative left-1/2 -translate-x-1/2">
        <button
          data-copy-code="true"
          data-copied="false"
          className="absolute right-1 top-1 group-hover:opacity-100 transition opacity-0 bg-surface-2 rounded-md w-11 h-11 grid place-items-center"
        >
          <span className="sr-only">Copy to clipboard</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
            <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
            <path
              fillRule="evenodd"
              d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5zm6.61 10.936a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </button>
        {props.children}
      </pre>
    )
  },
}

const cardComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    if (interactive) return <>{props.children}</>
    return <p {...props} className="mb-4"></p>
  },
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
  pre({ node, ...props }) {
    return (
      <pre className="rounded-lg bg-[var(--gray-8)] p-4 m-0 overflow-auto mb-2">
        {props.children}
      </pre>
    )
  },
  a({ node, children, ...props }) {
    props.target = '_blank'
    props.rel = 'noopener noreferrer'
    return <a className="font-bold" {...props}>{children}</a>
  },
}
const bioComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    if (interactive) return <>{props.children}</>
    return <p {...props} className="mb-2"></p>
  },
}
const footerComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    if (interactive) return <>{props.children}</>
    return <p {...props} className="mb-2"></p>
  },
}

const rssComponents = {
  tweet({ node, account = 'jh3yy', id, ...props }) {
    return (
      <p>
        <a href={`https://twitter.com/${account}/status/${id}`}>
          Check out this related tweet!
        </a>
      </p>
    )
  },
  codepen({ node, ...props }) {
    return (
      <p>
        See the Pen by Jhey (<a href="https://codepen.io/jh3y">@jh3y</a>) on{' '}
        <a href={`https://codepen.io/jh3y/${props.id}`}>CodePen</a>.
      </p>
    )
  },
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    const toc = node.children.find(child => child.tagName === 'tableofcontents')
    if (toc) return null
    if (interactive) return <>{props.children}</>
    return <p>{props.children}</p>
  },
  img({ node, ...props }) {
    if (props.src.endsWith('.mp4')) {
      props.src = `https://jhey.dev${props.src}`
      return <video {...props} controls loop muted></video>
    }
    if (props.src.endsWith('.mp3')) {
      props.src = `https://jhey.dev${props.src}`
      return <audio {...props} controls loop></audio>
    }
    return <img {...props} />
  },
  a({ node, children, ...props }) {
    if (props.href.startsWith('/')) {
      props.href = `https://jhey.dev${props.href}`
    }
    return <a {...props}>{children}</a>
  },
}

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