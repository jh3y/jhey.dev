import React from 'react'

import Nav from './nav.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Nav',
  component: Nav,
}

export const Default = () => <Nav/>
