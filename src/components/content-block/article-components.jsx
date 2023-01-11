import React from 'react'
import slugify from 'slugify'

const articleComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen' || child.tagName === 'guestbookform'
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
      <pre tabIndex="0" className="mb-6 group lg:rounded-lg bg-[var(--gray-8)] p-4 m-0 max-w-[100vw] bleed overflow-auto transform relative left-1/2 -translate-x-1/2">
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

export default articleComponents