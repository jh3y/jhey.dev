import React from 'react'
import ContentBlock from '../content-block/content-block.jsx'

const About = ({ about }) => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-4">
        <a href="/about" className="text-fluid--2 font-bold">permalink</a>
      </div>
      <ContentBlock type="about">{about}</ContentBlock>
    </div>
  )
}

export default About