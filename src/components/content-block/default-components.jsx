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
    return <details className="bg-surface-4 mb-4">{props.children}</details>
  },
  guestbookentry({ node, ...props }) {
    return <h1>Guestbook</h1>
  },
  summary({ node, ...props }) {
    if (node.properties.dataTocSummary) return <summary {...props}></summary>
    return (
      <summary className="flex justify-between items-center cursor-pointer p-4">
        <span className="uppercase text-fluid--1 font-bold">
          {props.children}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-brand-stroke"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
    )
  },
  signature() {
    return (
      <svg
        aria-hidden="true"
        className="ml-6 w-1/4"
        stroke="var(--text-1)"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 271 209"
      >
        <title>Jhey</title>
        <path
          d="M144.745 123.82c1.907-1.258-3.266-2.199-4.184-2.418-4.076-.973-15.825-2.609-16.141 4.319-.725 15.907 36.347 5.736 16.072-3.986M102.952 112.797c-5.6848 0-6.2149 7.73-.728 7.12 6.139-.682 3.185-9.905-1.861-6.877M170.025 108.347c-1.398-2.796-7.244 2.284-4.531 6.23 2.713 3.946 8.442-.486 6.149-4.612-.608-1.094-3.096-2.133-4.288-1.537M117.998 100.704c0-9.5524-14.086-13.3378-21.4395-11.3323-11.7769 3.2119-15.927 9.6813-15.927 21.1333M187.183 101.246C182.107 82.5407 155.739 77.9455 151.5 99"
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254c-.337-.94488-1.163-3.24224-2.31-3.47304-1.224-.24653-4.009 4.38498-4.311 4.81425C100.965 36.1863 95.2641 73.5992 74.5923 102.644c-10.8878 15.298-59.8032 43.034-69.03244 10.837C-17.5939 32.705 78.7483 76.0672 105.741 67.4678c14.016-4.4657 19.556-16.7853 27.09-28.3056 2.387-3.6496 4.797-14.5469 7.212-10.9155 4.728 7.1114-20.401 41.6294-24.484 50.2225-4.6 9.679 13.669-31.7231 21.237-24.1359 9.433 9.4564-8.56 28.4026 16.571 7.3471 4.267-3.5745 13.215-15.2775 7.666-14.8349-7.056.563-19.468 20.1743-9.348 23.1872 9.846 2.9308 24.354-31.3131 22.327-21.2426-1.003 4.9789-5.669 18.5794 1.966 20.1168 10.559 2.1259 15.596-33.041 21.559-24.071C240.356 109.24 81.7126 283.324 50.2184 167.261 25.2159 75.1229 240.563 89.2082 268.88 137.08"
          strokeWidth="5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  aside({ node, type, ...props }) {
    if (type === 'tableofcontents') {
      return (
        <aside className="my-12" {...props}>
          {props.children}
        </aside>
      )
    }
    return (
      <aside
        className="relative my-12 rounded-lg bg-surface-3 text-fluid--1 text-text-2 p-8"
        {...props}
      >
        {type && (
          <span className="absolute top-0 left-0 p-2 bg-surface-4 rounded-md -translate-x-1/4 border-2 border-surface-1 -translate-y-1/4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              {type === 'warning' && (
                <>
                  <path
                    fillRule="evenodd"
                    d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </>
              )}
              {type === 'note' && (
                <>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </>
              )}
              {type === 'random' && (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  />
                </>
              )}
              {type === 'tip' && (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </>
              )}
            </svg>
          </span>
        )}
        <div className="overflow-auto">
          {props.children}
        </div>
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
          <input
            id={id}
            type="checkbox"
            disabled={!children[0].props.checked}
            defaultChecked={children[0].props.checked}
          />
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
      <pre
        tabIndex="0"
        className="rounded-lg bg-[var(--gray-8)] p-4 m-0 overflow-auto mb-6"
      >
        {props.children}
      </pre>
    )
  },
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) =>
        child.tagName === 'tweet' ||
        child.tagName === 'codepen' ||
        child.tagName === 'guestbookform' ||
        child.tagName === 'browsersupport' ||
        child.tagName === 'tableofcontents'
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
      <div className="col-span-full mb-6 rounded-lg grid place-items-center">
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
  demopreview({ node, ...props }) {
    return (
      <video src={props.video}  preload="none" controls loop muted width="600" height="400" poster={props.image}></video>
    )
  },
  demo({ node, ...props }) {
    return (
      <div className="m-0 mb-6 max-w-[100vw]">
        <iframe
          className="w-full aspect-[3/2]"
          title={props.title || 'A demo from Jhey'}
          src={props.src}
          loading="lazy"
          allowtransparency="true"
          allowFullScreen={true}
        >
          Check out <a href={props.src}>this demo</a> from{' '}
          <a href="https://jhey.dev/">Jhey</a>.
        </iframe>
      </div>
    )
  },
  codepen({ node, ...props }) {
    return (
      <div className="m-0 mb-6 max-w-[100vw] col-span-full">
        <iframe
          className="w-full aspect-[3/2]"
          title={props.title || 'A demo from Jhey'}
          src={`https://codepen.io/jh3y/embed/preview/${props.id}?default-tab=result&editable=true&theme-id=43641`}
          loading="lazy"
          allowtransparency="true"
          allowFullScreen={true}
        >
          Check out the{' '}
          <a href={`https://codepen.io/jh3y/${props.id}`}>demo pen</a> by Jhey (
          <a href="https://codepen.io/jh3y">@jh3y</a>) over on{' '}
          <a href={`https://codepen.io/jh3y/${props.id}`}>CodePen</a>.
        </iframe>
      </div>
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
