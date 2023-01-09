import React from 'react'

const bioComponents = {
  p({ node, ...props }) {
    const interactive = node.children.find(
      (child) => child.tagName === 'tweet' || child.tagName === 'codepen'
    )
    if (interactive) return <>{props.children}</>
    return <p {...props} className="mb-2"></p>
  },
}

export default bioComponents