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
      <div className="w-main-content max-w-full mv-0 mx-auto grid gap-fluid-space-0 px-fluid-space-0">
        <Story />
      </div>
    ),
  ],
};


const cheep = `
  # Hello World

  Lorem ipsum dolar amet. Jus' sitting in [Phoenix]() airport waiting for the captain...

  <img className="rounded-lg aspect-video object-cover" alt="Jhey time" src="/media/image/stage-walk.jpeg"/>

  <div className="rounded-lg overflow-auto gap-x-2 flex">
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
  },
  slug: {
    current: '#'
  },
  cheep,
}

export const Default = () => <Card {...DEFAULT_CARD} />;
