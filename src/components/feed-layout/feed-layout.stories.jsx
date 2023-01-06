import React from 'react'

import items from '../../constants/routes.js'
import FeedLayout from './feed-layout.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Feed Layout',
  component: FeedLayout,
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

// Set an active item
items[0].active = true

const cheep = `
  Lorem ipsum dolar amet. Jus' sitting in [Phoenix]() airport waiting for the captain... Hope he gets here soon. I'm getting kinda hungry.

  <img className="rounded-lg aspect-video object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>

  <div className="rounded-lg overflow-auto gap-x-2 flex mb-2">
    <img className="h-36 rounded-lg aspect-[4/3] object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>
    <img className="h-36 rounded-lg aspect-[4/3] object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>
    <img className="h-36 rounded-lg aspect-[4/3] object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>
    <img className="h-36 rounded-lg aspect-[4/3] object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>
  </div>

  \`\`\`js
  console.info('Are we there yet?')
  \`\`\`

  ![Video of traffic](/media/video/test-video.mp4)
`


const DEFAULT_CARD = {
  author: {
    avatar: '/media/image/headshot--small.jpeg',
    displayName: "Jhey ✨",
    handle: "jh3yy",
  },
  slug: {
    current: '#'
  },
  publishedAt: '2022-12-29T02:05:04.583Z',
  cheep,
}

const posts = [
  DEFAULT_CARD
]

export const Default = () => <FeedLayout navItems={items} character={character} posts={posts} />
