import React from 'react'
import Markdown from 'react-markdown'

const components = {
  codepen({ node, children }) {
    return (
      <h1>Hello World!</h1>
    )
  },
  a({ node, children, ...props }) {

    if (props.href.startsWith('http')) {
      props.target = "_blank"
      props.rel = "noopener noreferrer"
    }

    return (
      <a {...props}>{children}</a>
    )
  }
}


const ContentBlock = ({ children }) => {
  return <Markdown components={components}>{children}</Markdown>
}

export default ContentBlock
