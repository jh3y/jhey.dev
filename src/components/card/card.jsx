import React from 'react'
import Markdown from 'react-markdown'

const Card = (props) => {
  return (
    <div className="card grid-cols-[auto_1fr] gap-fluid-space-2 grid">
      <img
        src={`${props.author.avatar}?h=96`}
        alt=""
        className="card__author rounded-full"
      />
      <div className="card__content">
        <Markdown>
          {props.post}
        </Markdown>
        <img src="https://picsum.photos/1280/720?random=12" alt="" />
      </div>
      <a href={`/${props.slug.current}`} target="_blank" rel="noopener noreferrer">Read more.</a>
    </div>
  )
}

export default Card