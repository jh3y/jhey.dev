import React from "react"
import ContentBlock from '../content-block/content-block.jsx'
import PostHeader from '../post-header/post-header.jsx'
import Card from '../card/card.jsx'

const PostLayout = ({ _type: type, title, body, cheep, ...props}) => {
  if (type === 'cheep') {
    return (
      <main className="w-main-content flex items-center grow max-w-full mv-0 mx-auto px-4">
        <Card {...props} cheep={cheep} permacard={true} />
      </main>

    )
  }
  if (type === 'article') {
    return (
      <>
        <PostHeader character={props.author} title={title} body={body} {...props} />
        <main className="w-article max-w-full mv-0 mx-auto px-4 leading-[1.5]">
          <div className="text-fluid-0">
            <ContentBlock type={type}>{body}</ContentBlock>
          </div>
        </main>
      </>
    )

  }
  return null
}

export default PostLayout