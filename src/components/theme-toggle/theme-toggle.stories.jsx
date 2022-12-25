import React from 'react'

import ThemeToggle from './theme-toggle.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Theme Toggle',
  component: ThemeToggle,
}

export const Default = () => <ThemeToggle />
