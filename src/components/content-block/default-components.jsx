import React from 'react'
import slugify from 'slugify'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

const headingBold = ({ node, ...props }) => {
  return React.createElement(node.tagName, {
    className: 'font-bold mb-6',
    ...props,
  })
}

const defaultComponents = {
  details({ node, ...props }) {
    return (
      <details className="bg-surface-4 mb-4">
        {props.children}
      </details>
    )
  },
  guestbookentry({ node, ...props }) {
    return <h1>Guestbook</h1>
  },
  summary({ node, ...props }) {
    if (node.properties.dataTocSummary) return <summary {...props}></summary>
    return (
      <summary className="flex justify-between cursor-pointer p-4">
        <span className="uppercase text-fluid--1 font-bold">{props.children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-brand-stroke">
          <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
        </svg>
      </summary>
    )
  },
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
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen' || child.tagName === 'guestbookform'
    )
    if (interactive) return <>{props.children}</>
    return <p className="mb-6" {...props}></p>
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
      return <audio {...props} controls></audio>
    }
    return <img {...props} />
  },
  tweet({ node, account = 'jh3yy', id, ...props }) {
    return (
      <div className="mb-6 rounded-lg grid place-items-center">
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={`https://twitter.com/${account}/status/${id}`}>
            Check out this related tweet!
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
        Check out the <a href={`https://codepen.io/jh3y/${props.id}`}>demo pen</a> by Jhey (<a href="https://codepen.io/jh3y">@jh3y</a>) over on{' '}
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

export default defaultComponents