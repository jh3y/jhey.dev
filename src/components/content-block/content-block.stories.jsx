import React from 'react'
import TestMarkdown from './test-markdown.md'
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
      <div className="w-main-content max-w-full mv-0 mx-auto px-2">
        <Story />
      </div>
    ),
  ],
}

export const Default = () => <ContentBlock />

const BlockOfText = `
  # Hello World!

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

  <CodePen id="bGoNOvN" title="Generative Christmas trees!"/>
`
export const CustomBlocks = () => <ContentBlock>{BlockOfCustom}</ContentBlock>


const BlockOfSyntax = `
  # Syntax Highlighting!

  ---

  Did you ever wonder what happens when you put some \`code\` in your MarkDown?

  Here we gooooo!

  ## HTML

  \`\`\`html
  <div class="cool">
    Hello World!
  </div>
  \`\`\`

  ## Shell

  \`\`\`shell
  yarn add rehype-raw
  echo Cooooool
  \`\`\`

  ## CSS

  \`\`\`css
  .box {
    --custom-property: red;
    background: linear-gradient(red, blue) 0 0 / 100% 100% no-repeat;
  }
  \`\`\`

  ## JavaScript

  \`\`\`javascript
  const hello = 'world'
  console.info({ hello })

  const func = () => console.info(\`Hello \$\{hello\}!\`)
  func() // Hello world!
  \`\`\`
`
export const SyntaxBlocks = () => <ContentBlock>{BlockOfSyntax}</ContentBlock>

const BlockOfMedia = `
  ## Media Blocks!
  ---
  Wondering how \`video\` and \`audio\` might look? Here you go.

  ## Video
  ![Test Video](/media/video/test-video.mp4)

  ## Audio
  ![Test Audio](/media/audio/test-audio.mp3)
`
export const MediaBlocks = () => <ContentBlock>{BlockOfMedia}</ContentBlock>

export const BlogPost = () => <ContentBlock type="article">{TestMarkdown}</ContentBlock>
