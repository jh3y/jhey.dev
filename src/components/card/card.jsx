import React from 'react'
import Markdown from 'react-markdown'
import ContentBlock from '../content-block/content-block'

const Card = (props) => {
  return (
    <article className="card grid-cols-[auto_1fr] gap-x-2 grid p-2 hover:bg-surface-3 rounded-lg w-full">
      <img
        src={`${props.author.avatar}?h=96`}
        alt=""
        className="card__author rounded-full w-10 h-10"
      />
      <div className="card__content grid gap-y-1">
        <div className="text-fluid--1 bold">Jhey Tompkins</div>
        <ContentBlock>{props.cheep}</ContentBlock>
        <a
          href={`/post/${props.slug.current}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more.
        </a>
        <div className="card__actions flex gap-x-2 justify-end items-center">
          <button>Like</button>
          <button>Share</button>
        </div>
      </div>
    </article>
  )
}

export default Card
