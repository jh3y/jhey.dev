import React from 'react'
import ContentBlock from '../content-block/content-block.jsx'

const About = ({ about }) => {
  return (
    <div className="px-4">
      <ContentBlock type="about">{about}</ContentBlock>
    </div>
  )
}

export default About