import React from "react"
import ContentBlock from '../content-block/content-block.jsx'

const PostLayout = (props) => {
  if (props._type === 'article') {
    return (
      <main className="w-[66ch] max-w-full mv-0 mx-auto px-4 leading-[1.5]">
        <div className="text-fluid-0">
          <h1 className="font-bold">{props.title}</h1>
          <ContentBlock type="article">{props.body}</ContentBlock>
        </div>
      </main>
    )
  }
  return <h1>Render a Post instead</h1>
}

export default PostLayout