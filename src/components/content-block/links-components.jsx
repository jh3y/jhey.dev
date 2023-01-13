import React from 'react'

const linksComponents = {
  h1({ node, ...props }) {
    return <h1 {...props} className="mb-0 font-bold"></h1>
  },
  h2({ node, ...props }) {
    return <h2 {...props} className="mb-0 mt-4 font-bold"></h2>
  },
  a({ node, children, ...props }) {
    if (props.href.startsWith('http')) {
      props.target = '_blank'
      props.rel = 'noopener noreferrer'
    }
    return <a {...props} className="w-full h-full p-3 bg-surface-3 rounded-lg text-text-2 hover:no-underline hover:bg-surface-2 border hover:border-brand-stroke hover:text-brand-stroke">{children}</a>
  },
  ul({ node, ...props }) {
    return <ul children={props.children} className="flex flex-wrap gap-2"></ul>
  },
  li({ node, ...props }) {
    return <li className="grid">{props.children}</li>
  }
}

export default linksComponents