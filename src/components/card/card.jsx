import React from 'react'
import Markdown from 'react-markdown'
import ContentBlock from '../content-block/content-block'

const Card = (props) => {
  return (
    <article data-cheep-id={props._id} className={`card grid-cols-[auto_1fr] gap-x-2 grid p-4 rounded-lg w-full ${props.permacard ? 'bg-surface-2 shadow-lg border border-surface-3' : 'hover:bg-surface-2 snap-center'}`}>
      <img
        src={`${props.author.avatar}?h=96`}
        alt=""
        className="card__author rounded-full w-10 h-10"
      />
      <div className="card__content grid gap-y-1 leading-tight">
        <div className="flex gap-x-2 text-fluid--1 items-center text-text-4">
          <span className="font-bold text-text-1">{props.author.displayName}</span>
          <span>•</span>
          <time className="text-fluid--2">{`${new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
          }).format(new Date(props.publishedAt))}`}</time>
        </div>
        <ContentBlock type="card">{props.cheep}</ContentBlock>
        <div className="card__actions flex justify-end items-center">
          {props.slug.current && <a
            title="Permalink"
            className="w-10 h-10 grid place-items-center hover:bg-surface-4 rounded-md text-text-2 hover:text-brand-stroke"
            href={`/post/${props.slug.current}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Permalink</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>}
          <button title="Like post" disabled className="w-10 h-10 grid place-items-center hover:bg-surface-4 rounded-md text-text-2 hover:text-brand-stroke">
            <span className="sr-only">Like</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card