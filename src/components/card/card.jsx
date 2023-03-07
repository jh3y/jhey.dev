import React from 'react'
import ContentBlock from '../content-block/content-block'

const Card = (props) => {
  const authorLink = `/cheeps/${
    props.author.specialty
      ? props.author.specialty.title.toLowerCase()
      : ''
  }`
  return (
    <article
      data-cheep-id={props._id}
      className={`card grid grid-cols-[auto_1fr] p-4 gap-2 rounded-lg max-w-full w-full ${
        props.permacard
          ? 'bg-surface-2 shadow-lg border border-surface-3'
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
      <a href={authorLink} className="w-10 h-10">
        <span className="sr-only">{`${props.author.name}'s feed`}</span>
        <img
          src={props.author.avatar}
          alt="Author image"
          className="rounded-full bg-surface-4"
          width="80"
          height="80"
        />
      </a>
      <div className="card__content grid gap-y-1 leading-tight">
        <div className="flex gap-x-2 text-fluid--1 items-center text-text-4">
          <a
            href={authorLink}
            className="hover:underline font-bold text-text-1"
          >
            {props.author.displayName}
          </a>
          <span>•</span>
          {props.publishedAt && (
            <time className="text-fluid--2">{`${new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
          }).format(new Date(props.publishedAt))}`}</time>)}
        </div>
        {props.status && (
          <div>
            <div className="py-1 px-3 inline-flex items-center gap-1 bg-surface-4 inline rounded-full">
              <span role="img" alt="Status icon" aria-hidden="true">{props.status.icon}</span>
              <span className="text-fluid--2 font-bold">
                {props.status.title}
              </span>
            </div>
          </div>
        )}
        <ContentBlock type="card">{props.cheep}</ContentBlock>
        {props.location && (
          <div className="card__location text-text-4 text-fluid--2 flex gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span>Berlin, Germany</span>
          </div>
        )}
        <div className="card__actions flex justify-end items-center">
          {props.slug.current && (
            <a
              title="Permalink"
              className="w-10 h-10 grid place-items-center hover:bg-surface-4 rounded-md text-text-2 hover:text-brand-stroke"
              href={`/cheep/${props.slug.current}`}
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
          )}
          {/*
            <button title="Like post" disabled className="w-10 h-10 grid place-items-center hover:bg-surface-4 rounded-md text-text-2 hover:text-brand-stroke">
          */}
          <button
            title="Like post"
            disabled
            className="w-10 h-10 grid place-items-center rounded-md text-text-2 opacity-20"
          >
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