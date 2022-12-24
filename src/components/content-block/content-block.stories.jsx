import React from 'react'

import ContentBlock from './content-block.jsx'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Content Block',
  component: ContentBlock,
  decorators: [
    (Story) => (
      <div className="w-main-content max-w-full mv-0 mx-auto grid gap-fluid-space-0 px-fluid-space-0">
        <Story />
      </div>
    ),
  ],
}

export const Default = () => <ContentBlock />

const BlockOfText = `
  # Hello World!

  ---

  Did you ever wonder what happens when you put a [link](#) in your text?
`
export const TextBlock = () => <ContentBlock>{BlockOfText}</ContentBlock>

const BlockOfLinks = `
  # External Links!

  ---

  Did you ever wonder what happens when you put a [link](#) in your text?

  But, what about an [external link](https://codepen.io/jh3y)? That should \`target=_blank\`.
`
export const Links = () => <ContentBlock>{BlockOfLinks}</ContentBlock>

const BlockOfCustom = `
  # Custom Blocks!

  ---

  Did you ever wonder what happens when you put a \`CodePen\` tag in your markup?

  Well. Here it is.

  <h1>Hello World!</h1>

  <codepen></codepen>
`
export const CustomBlocks = () => <ContentBlock>{BlockOfCustom}</ContentBlock>
