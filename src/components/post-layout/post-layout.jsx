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
            <p className="mb-6 text-fluid--1 grid place-items-center">
              <span>Until next time, stay awesome!</span>
              <span className="font-bold">Jhey ʕ •ᴥ•ʔ</span>
            </p>
            {props.siteConfig.posts.postFooter && (
              <aside className="relative my-12 rounded-lg bg-surface-3 text-text-2 p-8 leading-tight gap-2 text-fluid--1 grid place-items-center">
                <span className="absolute top-0 left-0 p-2 bg-surface-4 rounded-md -translate-x-1/4 border-2 border-surface-1 -translate-y-1/4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                  </svg>
                </span>
                <ContentBlock type="footer">{props.siteConfig.posts.postFooter}</ContentBlock>
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