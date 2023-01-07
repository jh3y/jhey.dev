import React from 'react'
import ContentBlock from '../content-block/content-block.jsx'
import { ABOUT } from '../../constants/routes.js'

const About = ({ body }) => {
  return (
    <div class="px-4">
      <ContentBlock type="card">{body}</ContentBlock>
    </div>
  )
}

export default About