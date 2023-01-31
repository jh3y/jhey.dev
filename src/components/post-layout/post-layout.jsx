import React from "react"
import ContentBlock from '../content-block/content-block.jsx'
import PostHeader from '../post-header/post-header.jsx'
import Card from '../card/card.jsx'
import GuestCard from '../guest-card/guest-card.jsx'

const PostLayout = ({ _type: type, title, body, cheep, ...props}) => {

  if (type === 'cheep') {
    return (
      <main className="w-main-content flex items-center grow max-w-full mv-0 mx-auto px-4">
        <Card {...props} cheep={cheep} permacard={true} />
      </main>

    )
  }

  if (type === 'guestEntry') {
    return (
      <main className="w-main-content flex items-center grow max-w-full mv-0 mx-auto px-4">
        <GuestCard permacard={true} body={body} {...props} />
      </main>
    )
  }

  if (type === 'post') {
    return (
      <>
        <PostHeader character={props.author} title={title} body={body} {...props} />
        <main className="w-article max-w-full mv-0 mx-auto px-4 leading-[1.5]">
          <div className="text-fluid-0">
            <ContentBlock type="article">{body}</ContentBlock>
            <p className="mb-6 grid text-fluid--1 font-bold">
              <span>Until next time, stay awesome!</span>
            </p>
            <svg aria-hidden="true" className="ml-6 w-1/4" stroke="var(--text-1)" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271 209">
              <path d="M144.745 123.82c1.907-1.258-3.266-2.199-4.184-2.418-4.076-.973-15.825-2.609-16.141 4.319-.725 15.907 36.347 5.736 16.072-3.986M102.952 112.797c-5.6848 0-6.2149 7.73-.728 7.12 6.139-.682 3.185-9.905-1.861-6.877M170.025 108.347c-1.398-2.796-7.244 2.284-4.531 6.23 2.713 3.946 8.442-.486 6.149-4.612-.608-1.094-3.096-2.133-4.288-1.537M117.998 100.704c0-9.5524-14.086-13.3378-21.4395-11.3323-11.7769 3.2119-15.927 9.6813-15.927 21.1333M187.183 101.246C182.107 82.5407 155.739 77.9455 151.5 99" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M40.3725 26.8984C58.6558 41.1564 141.659 43.1867 128.248 5.48254c-.337-.94488-1.163-3.24224-2.31-3.47304-1.224-.24653-4.009 4.38498-4.311 4.81425C100.965 36.1863 95.2641 73.5992 74.5923 102.644c-10.8878 15.298-59.8032 43.034-69.03244 10.837C-17.5939 32.705 78.7483 76.0672 105.741 67.4678c14.016-4.4657 19.556-16.7853 27.09-28.3056 2.387-3.6496 4.797-14.5469 7.212-10.9155 4.728 7.1114-20.401 41.6294-24.484 50.2225-4.6 9.679 13.669-31.7231 21.237-24.1359 9.433 9.4564-8.56 28.4026 16.571 7.3471 4.267-3.5745 13.215-15.2775 7.666-14.8349-7.056.563-19.468 20.1743-9.348 23.1872 9.846 2.9308 24.354-31.3131 22.327-21.2426-1.003 4.9789-5.669 18.5794 1.966 20.1168 10.559 2.1259 15.596-33.041 21.559-24.071C240.356 109.24 81.7126 283.324 50.2184 167.261 25.2159 75.1229 240.563 89.2082 268.88 137.08" stroke-width="5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {props.siteConfig.posts.postFooter && (
              <aside className="relative my-12 rounded-lg bg-surface-3 text-text-2 p-8 leading-tight gap-2 text-fluid--1 grid place-items-center">
                <span className="absolute top-0 left-0 p-2 bg-surface-4 rounded-md -translate-x-1/4 border-2 border-surface-1 -translate-y-1/4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                  </svg>
                </span>
                <ContentBlock type="footer">{props.siteConfig?.cheeps?.footer}</ContentBlock>
              </aside>
            )}
          </div>
        </main>
      </>
    )

  }
  return null
}

export default PostLayout