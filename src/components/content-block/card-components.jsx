import React from 'react'
import { GUESTBOOK_SUCCESS_PATH } from '../../constants/routes.js'

const cardComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) =>
        child.tagName === 'tweet' ||
        child.tagName === 'codepen' ||
        child.tagName === 'guestbookform'
    )
    if (interactive) return <>{props.children}</>
    return <p className="mb-4" {...props}></p>
  },
  guestbookform({ node, ...props }) {
    return (
      <div data-guestbook="true">
        <p className="mb-4">Wanna leave me a message? Fill in this form</p>
        <details className="bg-surface-4">
          <summary className="p-4 flex justify-between items-center cursor-pointer">
            <span className="uppercase text-fluid--1 font-bold">
              Guestbook Form
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
          <div className="p-4">
            <form
              className="flex flex-col gap-2"
              name="guestbook"
              data-netlify="true"
              data-guestbook-form="true"
              action={`/guestbook/${GUESTBOOK_SUCCESS_PATH}`}
            >
              <p className="mb-4">
                Fill in this form and I'll get your guestbook entry added.
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-fluid--1 font-bold" htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required className="p-2 rounded-md mb-4" />
                <label className="text-fluid--1 font-bold" htmlFor="url">URL (site, etc.)</label>
                <input type="url" id="url" name="url" className="p-2 rounded-md mb-4" />
                <label className="text-fluid--1 font-bold" htmlFor="organisation">Organisation</label>
                <input type="text" id="organisation" name="organisation" className="p-2 rounded-md mb-4" />
                <label className="text-fluid--1 font-bold" htmlFor="avatar">Avatar URL</label>
                <input type="url" id="avatar" name="avatar" className="p-2 rounded-md mb-4" />
                <label className="text-fluid--1 font-bold" htmlFor="message">Message (Markdown OK)</label>
                <textarea id="message" name="message" className="p-2 rounded-md mb-4" />
              </div>
              <button
                type="submit"
                className="font-bold text-center mt-2 border-transparent focus:border-text-1 outline-transparent focus-visible:border-text-1 hover:border-text-1 border-4 rounded-full text-fluid--1 text-white bg-brand-fill px-3 py-1"
              >
                Submit
              </button>
            </form>
          </div>
        </details>
      </div>
    )
  },
  h2({ node, children, ...props }) {
    return (
      <h2 className="mb-2 font-bold text-fluid-2">{children}</h2>
    )
  },
  img({ node, ...props }) {
    if (props.src.endsWith('.mp4')) {
      return (
        <video className="rounded-lg" {...props} controls loop muted></video>
      )
    }
    if (props.src.endsWith('.mp3')) {
      return <audio className="rounded-lg" {...props} controls></audio>
    }
    return <img className="rounded-lg" {...props} />
  },
  pre({ node, ...props }) {
    return (
      <pre tabIndex="0" className="rounded-lg bg-[var(--gray-8)] p-4 m-0 overflow-auto mb-2">
        {props.children}
      </pre>
    )
  },
  a({ node, children, ...props }) {
    return (
      <a className="font-bold" {...props}>
        {children}
      </a>
    )
  },
}

export default cardComponents