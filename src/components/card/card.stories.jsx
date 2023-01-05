import React from "react";

import Card from "./card.jsx";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-main-content max-w-full mv-0 mx-auto flex flex-col gap-x-0">
        <Story />
      </div>
    ),
  ],
};


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

const PINNED_CARD = {
  ...DEFAULT_CARD,
  pinned: true,
}

const STATUS_CARD = {
  ...DEFAULT_CARD,
  status: {
    title: 'Feelin fresh',
    icon: '🌴',
  }
}

const SHORT_CARD = {
  ...DEFAULT_CARD,
  cheep: 'Hey'
}

export const Default = () => <Card {...DEFAULT_CARD} />;
export const Pinned = () => <Card {...PINNED_CARD} />;
export const Status = () => <Card {...STATUS_CARD} />;
export const Short = () => <Card {...SHORT_CARD} />;
