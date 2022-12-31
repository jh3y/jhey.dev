import React from "react"
import ContentBlock from '../content-block/content-block.jsx'
import Card from '../card/card.jsx'

const PostLayout = ({ _type: type, title, body, cheep, ...props}) => {
  return (
    <main className={`w-${type === 'article' ? '[66ch]' : 'main-content flex items-center grow'} max-w-full mv-0 mx-auto px-4 leading-[1.5]`}>
      {type === 'article' && <h1 className="font-bold">{title}</h1>}
      {type === 'article' && (
        <div className="text-fluid-0">
          <ContentBlock type={type}>{body}</ContentBlock>
        </div>
      )}
      {type === 'cheep' && (
        <Card {...props} cheep={cheep} permacard={true} />
      )}
    </main>
  )
}

export default PostLayout