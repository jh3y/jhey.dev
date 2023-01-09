import React from 'react'
import ContentBlock from '../content-block/content-block.jsx'

const About = ({ body }) => {
  return (
    <div className="px-4">
      <ContentBlock type="card">{body}</ContentBlock>
    </div>
  )
}

export default About