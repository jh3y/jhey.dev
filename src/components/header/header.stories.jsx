import React from 'react'

import Header from './header.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Header',
  component: Header,
}

const character = {
  _id: "d70ecc62-bdae-42fc-af88-f078456ac669",
  bio: "Brings ideas to life with code ✨ Web Developer. Googler. Content Creator. Whimsical Specialist. International Speaker.",
  displayName: "Jhey ✨",
  handle: "jh3yy",
  avatar: "/media/image/headshot--small.jpeg",
  name: "Jhey Tompkins",
  verified: true
}

export const Default = () => <Header character={character} />
