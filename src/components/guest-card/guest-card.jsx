import React from 'react'
import Markdown from 'react-markdown'
import ContentBlock from '../content-block/content-block'

const GuestCard = (props) => {
  return (
    <article
      data-cheep-id={props._id}
      className={`card border border-transparent grid grid-cols-[auto_1fr] p-4 gap-2 rounded-lg max-w-full w-full ${
        props.permacard
          ? 'bg-surface-2 shadow-lg border-surface-3'
          : 'hover:bg-surface-2'
      }`}
    >
      {props.pinned && !props.permacard && (
        <>
          <div className="w-10 grid justify-end text-text-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z"
              />
            </svg>
          </div>
          <div className="items-center text-fluid--2 text-text-4">
            Pinned Cheep
          </div>
        </>
      )}
      <a
        title="Permalink"
        className="w-10 h-10"
        href={props.link || `/post/${props.slug.current}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.avatar && (
          <img
            src={props.avatar}
            alt="Author avatar"
            className="rounded-full"
            width="40"
            height="40"
          />
        )}
        {!props.avatar && (
          <svg className="w-10 h-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
          </svg>
        )}
        <span className="sr-only">{`${props.name}'s entry`}</span>
      </a>
      <div className="card__content grid gap-y-1 leading-tight">
        <div className="flex gap-x-2 text-fluid--1 items-center text-text-4">
          <a
            href={props.link || `/post/${props.slug.current}`}
            className="hover:underline font-bold text-text-1"
          >
            {props.name}
          </a>
          <span>•</span>
          <time className="text-fluid--2">{`${new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
          }).format(new Date(props.when || props._createdAt))}`}</time>
        </div>
        <ContentBlock type="card">{props.body}</ContentBlock>
        <div className="card__actions flex justify-end items-center">
          <a
            title="Permalink"
            className="w-10 h-10 grid place-items-center hover:bg-surface-4 rounded-md text-text-2 hover:text-brand-stroke"
            href={props.link || `/post/${props.slug.current}`}
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
          </a>
        </div>
      </div>
    </article>
  )
}

export default GuestCard