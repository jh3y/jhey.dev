import React from 'react'

import PostHeader from './post-header.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Post Header',
  component: PostHeader,
}

const bio = `
  Brings ideas to life with code ✨

  Web Developer. Googler. Content Creator. Whimsical Specialist. International Speaker.
`

const character = {
  _id: "d70ecc62-bdae-42fc-af88-f078456ac669",
  bio,
  displayName: "Jhey ✨",
  handle: "jh3yy",
  avatar: "/media/image/headshot--small.jpeg",
  name: "Jhey Tompkins",
  verified: true
}

const props = {
  character,
  body: '# Cool!',
  hero: undefined,
  publishedAt: new Date().toUTCString(),
  title: 'Some awesome post',
  shareLink: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"Some awesome post" via @jh3yy\n`)}https://jhey.dev/post/some-awesome-post/`,
  tags: [
    {
      title: 'CSS',
    }
  ]
}

export const Default = () => <PostHeader {...props} />
