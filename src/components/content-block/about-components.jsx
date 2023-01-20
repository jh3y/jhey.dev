import React from 'react'
import slugify from 'slugify'

const aboutComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen' || child.tagName === 'guestbookform'
    )
    if (interactive) return <>{props.children}</>
    return (
      <p
        {...props}
        className={`mb-6`}
      ></p>
    )
  },
  h1({ node, ...props }) {
    return (
      <h1 className="mb-6 text-fluid-1 font-bold">{props.children}</h1>
    )
  },
  signature() {
    return (
      <div className="">
        <img src="/media/image/signature.svg" alt="" width="271" height="209" className="ml-6 w-1/4" />
      </div>
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
    return (
      <figure className="grid place-items-center my-6">
        <img className="rounded-lg mb-2" {...props} />
        {props.alt && props.alt !== "" && <figcaption className="text-text-3 text-fluid--1">{props.alt}</figcaption>}
      </figure>
    )
  }
}

export default aboutComponents