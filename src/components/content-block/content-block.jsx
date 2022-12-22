import React from 'react'
import Markdown from 'react-markdown'

const ContentBlock = ({ children }) => {
  console.info(children)
  return <Markdown>{children}</Markdown>
}

export default ContentBlock
